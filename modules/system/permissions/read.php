<?php

/*©lgpl*************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
* Copyright (c) Friend Software Labs AS. All rights reserved.                  *
*                                                                              *
* Licensed under the Source EULA. Please refer to the copy of the GNU Lesser   *
* General Public License, found in the file license_lgpl.txt.                  *
*                                                                              *
*****************************************************************************©*/

// /module/module=system&sessionid=378953;
// 	command  = permissions
// 	type     = read
// 	context  = application
// 	name     = Admin (optional, not needed)
//  authid   = bcb1954645eff865397ab5a9a048cc45 
// 	object   = user
// 	objectid = 37628

global $User;

if ( isset( $args->authid ) && $args->authid == '(null)')
	$args->authid = null;

if( isset( $args->args->authid ) && !isset( $args->authid ) )
{
	$args->authid = $args->args->authid;
}

if( !isset( $args->args->name ) )
    $args->args->name = false;
if( !isset( $args->args->objectid ) )
    $args->args->objectid = false;
if( !isset( $args->args->listdetails ) )
    $args->args->listdetails = false;
if( !isset( $args->args->data ) )
    $args->args->data = false;
if( !isset( $args->args->object ) )
    $args->args->object = false;

if( $data = Permissions( $args->args->type, $args->args->context, ( isset( $args->authid ) ? 'AUTHID'.$args->authid : $args->args->name ), $args->args->data, $args->args->object, $args->args->objectid, $args->args->listdetails ) )
{
	if( is_object( $data ) )
	{
		if( $data->response == 1 )
		{
			die( 'ok<!--separate-->' . json_encode( $data ) );
		}
		
		if( $data->response == -1 )
		{
			die( 'fail<!--separate-->' . json_encode( $data ) );
		}
	}

	die( 'ok<!--separate-->{"message":"Permission granted.","response":1}' );
}

die( 'ok<!--separate-->{"message":"Permission granted.","reason":"Permission for this app isn\'t set ...","response":1}' );

?>
