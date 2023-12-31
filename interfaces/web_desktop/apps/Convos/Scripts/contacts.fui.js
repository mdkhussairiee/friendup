/*©agpl*************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
* Copyright (c) Friend Software Labs AS. All rights reserved.                  *
*                                                                              *
* Licensed under the Source EULA. Please refer to the copy of the GNU Affero   *
* General Public License, found in the file license_agpl.txt.                  *
*                                                                              *
*****************************************************************************©*/

class FUIContacts extends FUIElement
{
    constructor( options )
    {
        super( options );
        
        this.initialized = true;
        this.contactFilter = '';
        this.userList = {}; // Dom elements
        this.userListOrder = []; // Sorted list
        
        this.refreshDom();
        
        if( this.options )
        {
        	// If this is group list, initialize the group chat
        	if( this.options.groupid && this.options.groupname )
        	{
        		this.setChatView( {
        			Type: 'chatroom',
        			ID: this.options.groupid,
        			Fullname: this.options.groupname
        		} );
        	}
        }
    }
    getBasicTemplate()
    {
    	let ex = this.options.groupid ? '<div class="Group"></div>' : '<div class="Videocall"></div>';
        let add = this.options.groupid ? '<div class="Add"></div>' : '';
        
        // <div class="Gearbox"></div>
        
    	return '\
        <div class="ContactSearch"><input type="text" value="' + ( typeof( self.contactFilter ) != 'undefined' ? self.contactFilter : '' ) + '" placeholder="Find a contact..."/></div>\
        <div class="Contacts"><div class="ContactList"></div><div class="Settings"><div class="Avatar"></div><div class="Toolbar">' + ex + add + '</div></div></div>\
        <div class="Chat"><div class="Placeholder"><span>' + i18n( 'i18n_start_conversation' ) + '</span></div></div>\
        ';
    }
    attachDomElement()
    {
        super.attachDomElement();
        
        let self = this;
        
        this.domElement.className = 'FUIContacts';
        
        let data = this.getBasicTemplate();
        
        this.domElement.innerHTML = data;
        
        this.domContacts = this.domElement.querySelector( '.Contacts' );
        this.domContactList = this.domContacts.querySelector( '.ContactList' );
        this.domSettings = this.domContacts.querySelector( '.Settings' );
        this.domChat = this.domElement.querySelector( '.Chat' );
        this.domSearch = this.domElement.querySelector( '.ContactSearch' ).getElementsByTagName( 'input' )[0];
        
        let cntbtn = this.domSettings.querySelector( '.Add' );
        if( cntbtn )
        {
        	cntbtn.onclick = function()
        	{
        		self.inviteDialog = new FUIInvitedialog( { channelName: self.record.Fullname, groupId: self.record.ID } );
        	}
        }
        
        let cnvbtn = this.domSettings.querySelector( '.AddConversation' );
        if( cnvbtn )
        {
        	cnvbtn.onclick = function()
        	{
        		if( self.initChatTopic )
        			self.initChatTopic();
        	}
        }
        
        let grp = this.domSettings.querySelector( '.Group' );
        if( grp )
        {
        	grp.onclick = function()
        	{
        		self.groupSettings = new FUIGroupsettings( { channelName: self.record.Fullname, groupId: self.record.ID, description: self.record.Description } );
        	}
        }
        
        let vid = this.domSettings.querySelector( '.Videocall' );
        if( vid )
        {
        	vid.onclick = function()
        	{
        		if( self.videoCall )
        			return self.videoCall.activate();
    			
        		self.videoCall = new View( {
        			title: i18n( 'i18n_video_call' ) + ' - ' + self.record.Fullname,
        			width: 650,
        			height: 512
        		} );
        		self.videoCall.record = self.record;
        		self.videoCall.onClose = function()
        		{
        			window.currentPeerId = null;
        			self.videoCall = null;
        		}
        		let f = new File( 'Progdir:Markup/videocall.html' );
        		f.replacements = { 'peerId': window.currentPeerId ? window.currentPeerId : '' };
        		f.i18n();
        		f.onLoad = function( data )
        		{
        			self.videoCall.setContent( data );
        		}
        		f.load();
        	}
        }
        
        // Cache this globally!
        if( window.myAvatar )
        {
        	self.domSettings.querySelector( '.Avatar' ).style.backgroundImage = 'url(' + window.myAvatar.src + ')';
	        self.domSettings.querySelector( '.Avatar' ).classList.add( 'Loaded' );
        }
        else
        {
		    let i = new Image();
		    window.myAvatar = i;
		    i.src = '/system.library/module/?module=system&command=getavatar&userid=' + Application.userId + '&width=128&height=128&authid=' + Application.authId;
		    i.onload = function()
		    {
		        self.domSettings.querySelector( '.Avatar' ).style.backgroundImage = 'url(' + this.src + ')';
		        self.domSettings.querySelector( '.Avatar' ).classList.add( 'Loaded' );
		        document.body.removeChild( i );
		    }
		    i.style.position = 'absolute';
		    i.style.visibility = 'hidden';
		    document.body.appendChild( i );
	    }
        
        this.domSearch.addEventListener( 'keyup', function( e )
        {
            let s = this;
	        if( self.contacttimeo )
	            clearTimeout( self.contacttimeo );
            if( self.newcontacttimeo )
            	clearTimeout( self.newcontacttimeo );
    	
	        self.contacttimeo = setTimeout( function()
	        {
	            self.contactFilter = s.value.toLowerCase();
	            self.refreshDom();
	        }, 100 );
        } );
        
        // Set stuff on this.domElement.innerHTML
        this.refreshDom();
    }
    grabAttributes( domElement )
    {
        super.grabAttributes( domElement );
        
        let uniqueId = domElement.getAttribute( 'uniqueid' );
        if( uniqueId ) this.options.uniqueid = uniqueId;
        
        let groupId = domElement.getAttribute( 'group' );
        if( groupId ) this.options.groupid = groupId;
        
        let groupName = domElement.getAttribute( 'name' );
        if( groupName ) this.options.groupname = groupName;
        
        let parentElement = domElement.getAttribute( 'parentelement' );
        if( parentElement ) this.options.parentElement = parentElement;
        
        let user = domElement.getAttribute( 'user' );
        if( user ) this.options.user = user;
    }
    // Just check the contact
    poll( contactName, message )
    {
        let self = this;
        
        // TODO: Replace with UniqueID at one point
        // Only poll active channels
        if( typeof( self.userList[ contactName ] ) != 'undefined' )
        {
            let ele = self.userList[ contactName ].querySelector( '.Contact' );
            if( ele.classList.contains( 'Active' ) )
            {
                Application.holdConnection( { method: 'messages', roomType: 'dm-user', cid: ele.record.ID } );
            }
            // Not active, simply add activity marker
            else
            {
            	// TODO: Support public key decryption
				let text = decodeURIComponent( message );
			    try
			    {
			        let dec = new TextDecoder().decode( base64ToBytes( text ) );
			        text = dec;
			    }
			    catch( e2 ){};
            
                ele.classList.add( 'NewActivity' );
                Notify( {
                	title: 'From ' + contactName, 
                	text: text
                }, false, function()
                {
                	ele.click();                	
                } );
            }
        }
    }
    getRowClass()
    {
    	return 'Contact';
    }
    base64ToBytes( base64 )
    {
        const binString = atob( base64 );
        return Uint8Array.from( binString, ( m ) => m.codePointAt( 0 ) );
    }
    addRow( contact )
    {
        let self = this;
        
        let parentEl = self.domContactList;
        
        let d = document.createElement( 'div' );
        d.className = this.getRowClass();
        if( contact.Type == 'User' )
        {
            d.className += ' User';
        }
        d.record = contact;
       	let online = ( Math.floor( new Date().getTime() / 1000 ) - parseInt( contact.LastActionTime ) ) <= 600;
       	if( online )
       		d.className += ' Online';
       	
       	let text = contact.Fullname;
       	
       	// TODO: Fix hack
       	if( self.initChatTopic )
       	{
		   	try
		    {
		        let dec = new TextDecoder().decode( self.base64ToBytes( text ) );
		        text = dec;
		    }
		    catch( e ){};
	    }
       		
        d.innerHTML = '<span class="Avatar"></span><span class="Name">' + text + '</span>';
        d.onclick = function()
        {
            self.setChatView( this.record );
            this.classList.remove( 'NewActivity' );
        }
        
        // Init user
        if( contact.Fullname == this.options.user )
        {
            self.queuedClick = function()
            {
                self.options.user = null;
                self.queuedClick = null;
                d.click();
            }
        }
        
        // Load avatar
        let i = new Image();
        i.src = '/system.library/module/?module=system&command=getavatar&userid=' + contact.UserID + '&width=128&height=128&authid=' + Application.authId;
        i.onload = function()
        {
            d.querySelector( '.Avatar' ).style.backgroundImage = 'url(' + this.src + ')';
            document.body.removeChild( i );
        }
        i.style.position = 'absolute';
        i.style.visibility = 'hidden';
        document.body.appendChild( i );
        
        // The slot does not exist?
        
        let listKey = this.getListKey();
       
        if( !this.userList[ contact[ listKey ] ] )
        {
            this.userList[ contact[ listKey ] ] = document.createElement( 'div' );
            this.userList[ contact[ listKey ] ].className = 'Slot';
            parentEl.appendChild( this.userList[ contact[ listKey ] ] );
            // Add to slot
            this.userList[ contact[ listKey ] ].appendChild( d );
        }
        setTimeout( function(){ d.classList.add( 'Showing' ); }, 2 );
    }
    getListKey()
    {
    	return 'Fullname';
    }
    contactsMode()
    {
        this.domElement.classList.remove( 'Chat' );
        
        if( this.options.parentElement )
        {
            let par = FUI.getElementByUniqueId( this.options.parentElement );
            par.setChat( false );
        }
    }
    getContacts()
    {
    	let self = this;
    	let out = [];
    	let contacts = this.domContacts.getElementsByClassName( self.getRowClass() );
        for( let a = 0; a < contacts.length; a++ )
        {
            if( contacts[ a ].record )
            {
            	out.push( {
            		uniqueId: contacts[ a ].record.ID,
            		fullname: contacts[ a ].record.Fullname
            	} );
            }
        }
        return out;
    }
    setChatView( record )
    {
    	let self = this;
    	
    	this.record = record;
    	if( this.record && this.record.Type && this.record.Type == 'User' )
    	{
    		this.domContacts.classList.add( 'User' );
    	}
    	else
    	{
    		this.domContacts.classList.remove( 'User' );
    	}
    	
        let context = ' context="' + ( record.Type == 'User' ? 'user' : ( record.Type == 'chatroom' ? 'chatroom' : 'contact' ) ) + '"';
        context += ' cid="' + record.ID + '"';
        let dm = record.Type == 'User' ? 'dm-user' : ( record.Type == 'chatroom' ? 'chatroom' : 'dm-contact' );
        if( record.RoomType )
        	dm = record.RoomType;
        this.domChat.innerHTML = '<fui-chatlog parentelement="' + this.options.uniqueid + '" uniqueid="messages" type="' + dm + '" name="' + record.Fullname + '"' + context + '></fui-chatlog>';
        FUI.initialize();
        
        let contacts = this.domContacts.getElementsByClassName( self.getRowClass() );
        for( let a = 0; a < contacts.length; a++ )
        {
            if( contacts[a].record == record )
            {
                contacts[a].classList.add( 'Active' );
            }
            else
            {
                contacts[a].classList.remove( 'Active' );
            }
        }
        
        this.domElement.classList.add( 'Chat' );
        
        if( this.options.parentElement )
        {
            let par = FUI.getElementByUniqueId( this.options.parentElement );
            par.setChat( true, record );
        }
        
        Application.holdConnection( { method: 'messages', roomType: dm, cid: record.ID } );
        
        if( !isMobile )
        {
		    let ta = document.querySelector( '.Textarea' );
		    if( ta ) ta.focus();
	    }
    }
    getMemberAttribute()
    {
    	return 'contacts';
    }
    // Contacts are refreshed by date active
    refreshDom( evaluated = false )
    {
        super.refreshDom();
        
        if( !this.initialized ) return;
        
        let self = this;
        
        if( self.contactFilter != '' )
        {
            let conts = self.domContacts.getElementsByClassName( self.getRowClass() );
            for( let a = 0; a < conts.length; a++ )
            {
                if( conts[ a ].querySelector( '.Name' ).innerText.toLowerCase().indexOf( self.contactFilter ) >= 0 )
                {
                    conts[ a ].parentNode.style.display = '';
                }
                else
                {
                    conts[ a ].parentNode.style.display = 'none';
                }
            }
            if( self.queuedClick )
                self.queuedClick();
        }
        else
        {
            let m = new Module( 'system' );
            m.onExecuted = function( me, md )
            {
                // Reset hidden
                let conts = self.domContacts.getElementsByClassName( self.getRowClass() );
                for( let a = 0; a < conts.length; a++ )
                {
                    conts[ a ].parentNode.style.display = '';
                }
                if( me == 'ok' )
                {
                    let list = JSON.parse( md );
                    let m = self.getMemberAttribute();
                    for( let a = 0; a < list[ m ].length; a++ )
                    {
                        self.addRow( list[ m ][a] );
                    }
                    self.domContacts.classList.remove( 'NoContacts' );
                }
                else
                {
                	self.domContacts.classList.add( 'NoContacts' );
                	self.showNoContactsMenu();
                }
                if( self.queuedClick )
                    self.queuedClick();
            }
            let opts = { method: self.getListMethod() };
            if( this.options.groupid )
            {
            	opts.groupid = this.options.groupid;
            }
            m.execute( 'convos', opts );
        }
    }
    
    getListMethod()
    {
    	return 'contacts';
    }
    
    // Oh, no contacts, do something about it?
    showNoContactsMenu()
    {
    	let self = this;
    	let d = document.createElement( 'div' );
    	d.className = 'NoContacts';
    	d.innerHTML = '<h2>' + i18n( 'i18n_nobody_here' ) + '</h2><p>' + i18n( 'i18n_you_have_no_contacts' ) + '</p>';
    	let b = document.createElement( 'div' );
    	b.className = 'NoContacts';
    	b.innerHTML = '<p><button class="AddButton" type="button">' + i18n( 'i18n_add_contacts' ) + '</button></p>';
    	let cl = this.domContacts.querySelector( '.ContactList' );
    	cl.innerHTML = '';
    	cl.appendChild( d );
    	cl.appendChild( b );
    	b.querySelector( '.AddButton' ).onclick = function()
    	{
    		self.inviteDialog = new FUIInvitedialog( { channelName: self.record.Fullname, groupId: self.record.ID } );
    	}
    }
    // Get markup for object
    getMarkup( data )
    {
    	// Return meta-markup for class instantiation later
    	let props = '';
    	let n = 0;
    	for( let a in this.options )
    	{
    	    if( n++ > 0 ) props += ' ';
    	    props += a + '="' + props[ a ] + '"';
    	}
    	return '<fui-contacts' + props + '></fui-contacts>';
    }
    // Just display an error message
    errorMessage( string )
    {
        this.domElement.innerHTML = '<h2 class="Error">' + string + '</h2>';
    }
}
FUI.registerClass( 'contacts', FUIContacts );

