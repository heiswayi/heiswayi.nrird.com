---
layout: post
title: How to modify file content with InstallScript using deferred custom action
description: This is how I dynamically modify the file content by using deferred custom action with InstallScript to do a find-and-replace of a string during installation time in InstallShield Basic MSI.
tags: [InstallShield, InstallScript, Windows Installer, Programming]
comments: true
---

### The problem that I encountered

I have a metadata file that contains the installation path of my application (executable), and this metadata file is installed by my application installer (setup) in a different location than my application files. The purpose of this metadata file is that it would be used by other application to display my application info and also to know the install location of my application.

The problem is that the installation path is hard-coded (default path) in that metadata file, and when the user has changed the install location to a different path during the installation time, the installation path now becomes mismatched with the one in the metadata file. Thus, this has caused the other application cannot recognize the present of my application. My application installer is created using InstallShield 2016 Basic MSI project.

**_The question is, how can I solve this in InstallShield?_**



### This is how I solved the problem

To solve this problem, I figured it out that I need to apply a deferred custom action using InstallScript. The reason for using the deferred custom action is because I need to make a change to the system and only the deferred custom action can be run in elevated context.

Here's how I did it:

**1. Created New Set Property custom action (type 51)**

- Custom action name: `CA_PopulateCustomActionData`
- Property Name: `CA_UpdateMetadataFile`
- Property Value: `[INSTALLDIR]`
- Install Exec Sequence: `After ScheduleReboot`
- Install Exec Condition: `NOT REMOVE`

The purpose of this type-51 custom action is to pass other property value to `CustomActionData` property since the deferred custom action can only access to these built-in Windows Installer properties; `CustomActionData`, `ProductCode` and `UserSID`. That is the limitation of the deferred custom action.

**2. Created New InstallScript custom action as a deferred custom action**

- Custom action name: `CA_UpdateMetadataFile`
- Function Name: `MODIFY_METADATA`
- In-Script Execution: `Deferred Execution`
- Install Exec Sequence: `After CA_PopulateCustomActionData`
- Install Exec Condition: `NOT REMOVE`

Below is the InstallScript that I used to associate with my deferred custom action as defined above:

```cs
#include "ifx.h"
#include "isrt.h"
#include "iswi.h"

prototype FindAndReplace(STRING, STRING, STRING);

//Global Variables
STRING SrcDirFileName, SrchString, RplcString;
STRING firstPart;
NUMBER SrchLen, nvLineNumber;

function FindAndReplace(SrcDirFileName, SrchString, RplcString)
	STRING svReturnLine,szString, secPart;
	NUMBER nReturn, subPos;
begin
	Disable(STATUSEX); //stop displaying the progress bar
    ShowObjWizardPages(NEXT); //WARNING this may throw a user interface
    SrchLen = StrLength(SrchString); //length of search string
    nvLineNumber = 0; //pre-set file line number to 0
    
    Din: 
		while (FileGrep (SrcDirFileName, SrchString, svReturnLine, nvLineNumber, RESTART)=0)
			//subPos is the number where the first char of search string was found
			subPos	= StrFind(svReturnLine, SrchString);
			//firstPart is the string upto search string but not including searchString
			StrSub (firstPart, svReturnLine, 0, subPos);
			//secPart is the string after search string
			StrSub (secPart, svReturnLine, subPos+SrchLen, 50);
			//new string is firstPart followed by replace string followed by secPart
			TextSub.Value( "SUBBED" ) = RplcString;
			szString = firstPart+"<SUBBED>"+secPart;
			TextSub.Substitute( szString );
			//write line replacing original  
			FileInsertLine (SrcDirFileName, szString, nvLineNumber, REPLACE);
			//the code below examines the line written back for any other occurences
			//systematically searching and re-writting back to file
			//search first line again for search string
			if (FileGrep (SrcDirFileName, SrchString, svReturnLine, nvLineNumber, RESTART)=0) then
				goto Din;  //another occurence found
			else
				//increment line number and start all over again
				nvLineNumber = nvLineNumber + 1;
			endif;
		endwhile;  //while loop exited when END_OF_FILE reached  
end;

export prototype MODIFY_METADATA(HWND);
function MODIFY_METADATA(hMSI)
	STRING installDirPath;
	NUMBER installDirPathBuffer;
begin
	installDirPathBuffer = MAX_PATH;
	if (MsiGetProperty(hMSI, "CustomActionData", installDirPath, installDirPathBuffer) == ERROR_SUCCESS) then
		StrReplace(installDirPath,"\\","\\\\",0);
	endif;
	if (SYSINFO.bIsWow64 != 0) then
		if Is(FILE_EXISTS, "<PATH_TO_METADATA_FILE>") = TRUE then
			FindAndReplace("<PATH_TO_METADATA_FILE>","<STRING_TO_FIND>", installDirPath);
		endif;
	else
		if Is(FILE_EXISTS, "<PATH_TO_METADATA_FILE>") = TRUE then
			FindAndReplace("<PATH_TO_METADATA_FILE>","<STRING_TO_FIND>", installDirPath);
		endif;
	endif;
end;
```



The script above should be self-explanatory. If you encountered the similar problem as mine, you may need to change `<PATH_TO_METADATA_FILE>` and `<STRING_TO_FIND>` to your own strings. Be aware of possible deadlock, if any, you may need to apply certain conditional statement (checking). Hopefully this method may help others who are in the similar situation.