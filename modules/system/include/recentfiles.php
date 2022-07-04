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

global $SqlDatabase, $User;

$maxToList = 10;

$extra = $extrasql = '';
if( isset( $args->args->mode ) && $args->args->mode == 'sql-only' )
{
	$extra = ', FSFile fl';
	$extrasql = 'AND fl.ID = filelog.FileID';
}

// Get files from workgroup drives
if( isset( $args->args->workgroup ) )
{
	if( $distinct = $SqlDatabase->fetchObjects( '
		SELECT DISTINCT(filelog.FileID) DCT FROM `FSFileLog` filelog, Filesystem f, FUserGroup fug, FUserToGroup ffug' . $extra . '
        WHERE
            filelog.FilesystemID = f.ID AND
            f.GroupID = fug.ID AND
            filelog.UserID = ffug.UserID AND
            ffug.UserGroupID = fug.ID AND
            fug.ID = \'' . intval( $args->args->workgroup, 10 ) . '\' AND
            filelog.UserID != \'' . $User->ID . '\' AND
            filelog.Accessed < ( NOW() + INTERVAL 30 DAY )
            ' . $extrasql . '
        ORDER BY filelog.Accessed DESC
        LIMIT 20
    ' ) )
    {
    	$list = [];
    	foreach( $distinct as $dis )
    	{
    		$list[] = $dis->DCT;
    	}
    	
    	if( $rows = $SqlDatabase->fetchObjects( $q = ( '
		    SELECT 
		        filelog.*, 
		        otheruser.FullName AS UserFullname 
		    FROM 
		        FSFileLog filelog, 
		        FUserGroup ug, 
		        Filesystem f, 
		        FUser otheruser, 
		        FUser myuser,
		        FUserToGroup otherrelation, 
		        FUserToGroup myrelation' . $extra . '
		    WHERE
		        f.ID = filelog.FilesystemID AND 
		        f.GroupID = ug.ID AND 
		        ug.ID = \'' . intval( $args->args->workgroup, 10 ) . '\' AND
		        otheruser.ID = otherrelation.UserID AND
		        ug.ID = otherrelation.UserGroupID AND
		        filelog.FileID IN ( ' . implode( ', ', $list ) . ' ) AND
		        filelog.UserID = otherrelation.UserID AND 
		        myuser.ID != otherrelation.UserID AND 
		        myuser.ID = \'' . $User->ID . '\' AND 
	        	myrelation.UserID = myuser.ID AND 
	        	myrelation.UserGroupID = ug.ID 
		       	' . $extrasql . '
			ORDER BY filelog.Accessed DESC
		' ) ) )
		{
		    $Logger->log( $q );
		    $test = [];
		    $out = [];
		    $count = 0;
		    foreach( $rows as $row )
		    {
		        if( !isset( $test[ $row->FileID ] ) )
		        {
					// Skip hidden files
					$path = explode( ':', $row->Path );
					$path = array_pop( $path );
					if( strstr( $path, '/' ) )
						$path = array_pop( explode( '/', $row->Path ) );
					if( substr( $path, 0, 1 ) == '.' ) continue;
					if( $count++ >= $maxToList ) continue;
					// Here we go
		            $test[ $row->FileID ] = true;
		            $out[] = $row;
		        }
		    }
		    die( 'ok<!--separate-->' . json_encode( $out ) );
		}
		else
		{
		    $Logger->log( $q );
		}
    }
}
// Get files from personal drives
else
{
    if( $rows = $SqlDatabase->fetchObjects( '
        SELECT filelog.* FROM 
            FSFileLog filelog, Filesystem f' . $extra . '
        WHERE 
            filelog.FilesystemID = f.ID AND
            filelog.FileID IN ( 
                SELECT DISTINCT(FileID) FROM `FSFileLog`
                WHERE
                    UserID = \'' . $User->ID . '\'
                AND `Accessed` < ( NOW() + INTERVAL 30 DAY )
                ' . $extrasql . '
        ) AND filelog.UserID = \'' . $User->ID . '\' ORDER BY filelog.Accessed DESC
    ' ) )
    {
        $test = [];
        $out = [];
        $count = 0;
        foreach( $rows as $row )
        {
            if( !isset( $test[ $row->FileID ] ) )
            {
                // Skip hidden files
                $path = explode( ':', $row->Path );
		    	$path = array_pop( $path );
		    	if( strstr( $path, '/' ) )
		    	{
		    	    $path = explode( '/', $row->Path );
		    		$path = array_pop( $path );
		        }
		    	if( substr( $path, 0, 1 ) == '.' ) continue;
		    	if( $count++ >= $maxToList ) continue;
		    	// Here we go
                $test[ $row->FileID ] = true;
                $out[] = $row;
            }
        }
        die( 'ok<!--separate-->' . json_encode( $out ) );
    }
}

die( 'fail<!--separate-->{"message":"Could not find recent files.","response":-1}' );

?>
