/*©agpl*************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
* Copyright (c) Friend Software Labs AS. All rights reserved.                  *
*                                                                              *
* Licensed under the Source EULA. Please refer to the copy of the GNU Affero   *
* General Public License, found in the file license_agpl.txt.                  *
*                                                                              *
*****************************************************************************©*/

window.Convos = {
	outgoing: []
};

Application.run = function( msg )
{
	this.holdConnection( { method: 'messages', roomType: 'jeanie' } );
}

// Start polling
Application.holdConnection = function( flags )
{
	let args = {};
	
	// Apply flags
	if( flags )
	{
	    for( let a in flags )
	        args[ a ] = flags[ a ];
	}
	
	// Push outgoing messages to args
	if( Convos.outgoing.length )
	{
		args.outgoing = Convos.outgoing;
		
		let system = FUI.getElementByUniqueId( 'messages' );
		if( system && system.clearQueue )
		{
		    system.clearQueue();
		}
		
		Convos.outgoing = [];
	}
	
	let m = new XMLHttpRequest();
	m.open( 'POST', '/system.library/module/?module=system&command=convos&authid=' + Application.authId + '&args=' + JSON.stringify( args ), true );
	m.onload = function( data )
	{
		if( this.response )
		{
		    let js = JSON.parse( this.response.split( '<!--separate-->' )[1] );
		    if( js && js.response == 1 )
		    {
		        if( js.messages )
		        {
		            let mess = FUI.getElementByUniqueId( 'messages' );
		            mess.addMessages( js.messages );
		        }
		    }
		}
		// Restart polling
		Application.holdConnection();
	}
	m.send();
}
