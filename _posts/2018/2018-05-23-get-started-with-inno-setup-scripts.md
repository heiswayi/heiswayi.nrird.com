---
layout: post
title: Get started with Inno Setup scripts
description: Inno Setup is the best freeware alternative, non-MSI and script-driven installation system software for creating Windows app installer that is easy-to-use, rich of features and Open Source.
keywords: inno setup, windows installer, creating windows app installer
tags: [Inno Setup, Pascal]
comments: true
---

[Inno Setup](http://www.jrsoftware.org/isinfo.php) is the best freeware alternative, non-MSI and **script-driven** installation system software for creating Windows app installer that is easy-to-use, rich of features and [open source](https://github.com/jrsoftware/issrc). In this post you will find some of sample scripts I have been using to create my Windows app installer using Inno Setup Compiler. Inno Setup is completely free of charge even for commercial use.mediately get started.

### Getting started

First thing first, you need to [install Inno Setup software](http://www.jrsoftware.org/isdl.php) into your PC to get started, so you can have the Inno Setup Compiler program and some sample scripts. Any version will do, for me I use the "unicode" version.

**Using Inno Script Studio**

If you want better intuitive graphical interface for generating and compiling Inno Setup scripts, you can [download and install **Inno Script Studio** software](https://www.kymoto.org/products/inno-script-studio).

**Using VS Code or Atom**

If you are using [VS Code](https://code.visualstudio.com/)/[Atom](https://atom.io/) editor to edit Inno Setup scripts, you download and install Inno Setup extension for the script syntax highlighting:

- VS Code: [Inno Setup for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=idleberg.innosetup)
- Atom: [Inno Setup for Atom](https://atom.io/packages/language-innosetup)

_P/S: For your information, VS Code and Atom are also using Inno Setup to create their Windows installer package._

**Using Inno Setup in your automated build system**

If you have automated build system set up that builds your app source code such as CI/CD, you can simply integrate Inno Setup Compiler into your build system to compile the `*.iss` file. You need to use `ISCC.exe` for the command-line compiler.

Example:
```
"C:\Program Files (x86)\Inno Setup 5\ISCC.exe" path\to\myinstaller.iss
```

If you add `C:\Program Files (x86)\Inno Setup 5` into the PATH environment, you can simply use:
```
iscc path\to\myinstaller.iss
```

For more info on what command-line options are available, just run `iscc /?` from a command prompt.

### Full example of my basic Inno Setup script

The script is written based on the example of my app file structure as shown below. If you use the script below, you may need to modify it to suit your app output and file structure. Any feature you don't need, you can simply remove or comment it out. I always reuse this script as a starter and make some modifications that suit the app output and requirements to create another app installer.

_Example of app file structure:_

```
.\
├── basic.iss
└── basic\
    ├── app\
    |   ├── Resources\
    |   |   ├── map.xml
    |   |   └── res.ini
    |   ├── ExifReader.exe
    |   ├── ICSharpCode.SharpZipLib.dll
    |   ├── MetadataExtractor.dll
    |   ├── Ookii.Dialogs.Wpf.dll
    |   └── XmpCore.dll
    ├── appconfig\
    |   └── config.ini
    ├── doc\
    |   ├── EULA.rtf
    |   ├── Readme.rtf
    |   └── Requirements.rtf
    └── res\
        ├── app.ico
        ├── TopBanner.bmp
        └── VerticalBanner.bmp
```

_Example of the complete script:_

{% raw %}
```
; Define app basic info
#define MyAppName "EXIF Reader"
#define MyAppVersion "0.0.1"
#define MyAppPublisher "Heiswayi Nrird"
#define MyAppURL "https://heiswayi.nrird.com/exifreader"
#define MyAppExeName "ExifReader.exe"
#define MyAppCopyright "Copyright (C) 2018 Heiswayi Nrird"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{41045341-CB76-446F-8180-6489D9474F1F}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
AppCopyright={#MyAppCopyright}
; Default location of installation
DefaultDirName={pf}\{#MyAppPublisher}\{#MyAppName}
DefaultGroupName={#MyAppPublisher}\{#MyAppName}
; Installer name
OutputBaseFilename="ExifReaderSetup"
; Installer icon
SetupIconFile=.\basic\res\app.ico
Compression=lzma
SolidCompression=yes
LicenseFile=.\basic\doc\EULA.rtf
InfoBeforeFile=.\basic\doc\Requirements.rtf
InfoAfterFile=.\basic\doc\Readme.rtf
; Uninstaller icon
UninstallDisplayIcon={app}\{#MyAppExeName}
DisableWelcomePage=no
; Installer vertical banner, max resolution: 164x314 px
WizardImageFile=.\basic\res\VerticalBanner.bmp
; Installer top logo, max resolution: 55x58 px
; I'm not using this as I'm using top banner instead (see below), so I commented it out.
;WizardSmallImageFile=TopLogo.bmp
; Installer FileVersion
VersionInfoVersion=1.0.0.0
UserInfoPage=yes
;CreateUninstallRegKey=no
PrivilegesRequired=admin
; Installer output is the same as source (.iss file)
OutputDir=.

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 0,6.1

[Files]
; NOTE: Don't use "Flags: ignoreversion" on any shared system files
Source: ".\basic\app\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: ".\basic\doc\*"; DestDir: "{app}\Docs"; Flags: ignoreversion
; These files will not be removed during uninstallation
; {userdocs} = My Documents folder
Source: ".\basic\appconfig\*"; DestDir: "{userdocs}\{#MyAppName}"; Flags: ignoreversion uninsneveruninstall
; Customized top banner, max resolution: 499x58 px
Source: ".\basic\res\TopBanner.bmp"; Flags: dontcopy

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[Messages]
; Customized license agreement checkbox messages
LicenseAccepted=&Agree
LicenseNotAccepted=&Do Not Agree

[Code]
// Customized installer top banner
procedure InitializeWizard();
var
  BitmapImage: TBitmapImage;
begin
  ExtractTemporaryFile('TopBanner.bmp');
  BitmapImage := TBitmapImage.Create(WizardForm);
  BitmapImage.Parent := WizardForm.MainPanel;
  BitmapImage.Width := WizardForm.MainPanel.Width;
  BitmapImage.Height := WizardForm.MainPanel.Height;
  BitmapImage.Stretch := True;
  BitmapImage.AutoSize := False;
  BitmapImage.Bitmap.LoadFromFile(ExpandConstant('{tmp}\TopBanner.bmp'));

  WizardForm.WizardSmallBitmapImage.Visible := False;
  WizardForm.PageDescriptionLabel.Visible := True;
  WizardForm.PageNameLabel.Visible := True;

  WizardForm.PageDescriptionLabel.Color := TColor($E8E8E8);
  WizardForm.PageNameLabel.Color := TColor($E8E8E8);

  WizardForm.PageDescriptionLabel.Width :=
    WizardForm.PageDescriptionLabel.Width - ScaleX(60);
  WizardForm.PageNameLabel.Width :=
    WizardForm.PageNameLabel.Width - ScaleX(60);
end;
```
{% endraw %}

Please note that any line that starts with `;` character is a comment. For `[Code]` section, the comment line is started with `//` characters.

These are commonly used **Flags** under `[Files]` section and its meaning:
- `ignoreversion` - replace existing files regardless of their version number
- `onlyifdoesntexist` - only install the file if it doesn't already exist on the user's system
- `recursesubdirs` - use this when you use wildcard for the `Source` as shown in the script above
- `createallsubdirs` - create all subdirectories, and must be combined with `recursesubdirs`
- `uninsneveruninstall` - never remove the file during uninstallation
- `deleteafterinstall` - delete file once the installation is completed/aborted

You can refer to [Inno Setup documentation here](http://www.jrsoftware.org/ishelp/index.php?topic=filessection) for more details about other Flags that are available.

### Using components-based installation style

If you want to design your app installer using components-based installation, you may need to modify the script and add two extra sections; `[Types]` and `[Components]`. Basically you can find this example script from `Components.iss` file that located in `C:\Program Files (x86)\Inno Setup 5\Examples` folder.

{% raw %}
```
[Setup]
AppName=My Program
AppVersion=1.5
DefaultDirName={pf}\My Program
DefaultGroupName=My Program
UninstallDisplayIcon={app}\MyProg.exe
OutputDir=userdocs:Inno Setup Examples Output

[Types]
Name: "full"; Description: "Full installation"
Name: "compact"; Description: "Compact installation"
Name: "custom"; Description: "Custom installation"; Flags: iscustom

[Components]
Name: "program"; Description: "Program Files"; Types: full compact custom; Flags: fixed
Name: "help"; Description: "Help File"; Types: full
Name: "readme"; Description: "Readme File"; Types: full
Name: "readme\en"; Description: "English"; Flags: exclusive
Name: "readme\de"; Description: "German"; Flags: exclusive

[Files]
Source: "MyProg.exe"; DestDir: "{app}"; Components: program
Source: "MyProg.chm"; DestDir: "{app}"; Components: help
Source: "Readme.txt"; DestDir: "{app}"; Components: readme\en; Flags: isreadme
Source: "Readme-German.txt"; DestName: "Liesmich.txt"; DestDir: "{app}"; Components: readme\de; Flags: isreadme

[Icons]
Name: "{group}\My Program"; Filename: "{app}\MyProg.exe"
```
{% endraw %}

Meaning of the **Flags** used:
- `fixed` - usually used in the main program file where user cannot unselect that component
- `exclusive` - user only can select one of the exclusive components, mostly used for localized files

### Creating installer prerequisites

**.NET Framework**

If your app requires particular .NET Framework to be installed as part of the prerequisites, there are few ways you can do with Inno Setup script:-
- Include the offline installer of .NET Framework into your app installer
- Just check and if not installed, inform user to download and install particular .NET Framework manually

You can use the [Check](http://jrsoftware.org/ishelp/topic_scriptcheck.htm) parameter to run check if particular .NET Framework is installed.

**Using offline .NET Framework installer**

Add a new `Source` under the `[Files]` section:
{% raw %}
```
[Files]
; .NET Framework v4.7.1 offline installer
Source: ".\basic\dependencies\NDP471-KB4033342-x86-x64-AllOS-ENU.exe"; DestDir: {tmp}; Flags: deleteafterinstall; AfterInstall: InstallFramework; Check: FrameworkIsNotInstalled
```
{% endraw %}

Add these two code under `[Code]` section:
{% raw %}
```pascal
[Code]
// Check for installed .NET Framework 4.7.1 in the registry
// MSDN page: https://msdn.microsoft.com/en-us/library/hh925568.aspx
function FrameworkIsNotInstalled: Boolean;
var
  readVal: cardinal;
  success: Boolean;
begin               
  success := RegQueryDWordValue(HKLM, 'SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full', 'Release', readVal);
  success := success and (readVal < 461308);
  Result := not success;
end;

// Create progress dialog for installing .NET Framework 4.7.1
procedure InstallFramework;
var
    StatusText: string;
    ResultCode: Integer;
begin
   StatusText := WizardForm.StatusLabel.Caption;
   WizardForm.StatusLabel.Caption := 'Installing .NET Framework 4.5.2. This might take a few minutes...';
   WizardForm.ProgressGauge.Style := npbstMarquee;

   try
       Exec(ExpandConstant('{tmp}\NDP471-KB4033342-x86-x64-AllOS-ENU.exe'), '/passive /norestart', '', SW_SHOW, ewWaitUntilTerminated, ResultCode)
       if ResultCode <> 0 then
       begin
           MsgBox('.NET installation failed with code: ' + IntToStr(ResultCode) + '.' + #13#10 + #13#10 + 'Setup will now terminate.', mbError, MB_OK);
           DeleteFile(ExpandConstant('{tmp}\NDP471-KB4033342-x86-x64-AllOS-ENU.exe'));
           Exterminate;
       end
       else
       begin
           WizardForm.StatusLabel.Caption := StatusText;
           WizardForm.ProgressGauge.Style := npbstNormal;
       end;
   finally
           DeleteFile(ExpandConstant('{tmp}\NDP471-KB4033342-x86-x64-AllOS-ENU.exe'));
   end;
end;

var
    ForceClose: Boolean;

procedure Exterminate;
begin
    ForceClose:= True;
    WizardForm.Close;  
end;

procedure CancelButtonClick(CurPageID: Integer; var Cancel, Confirm: Boolean);
begin
    Confirm:= not ForceClose;
end;
```
{% endraw %}

**Check and inform user to download and install if particular .NET Framework is not installed**

Another way is to check the required .NET Framework at the beginning of installation, if not installed, inform user to download and install, then abort the installer.

{% raw %}
```pascal
[Code]
function IsDotNetDetected(version: string; service: cardinal): boolean;
// Indicates whether the specified version and service pack of the .NET Framework is installed.
//
// version -- Specify one of these strings for the required .NET Framework version:
//    'v1.1'          .NET Framework 1.1
//    'v2.0'          .NET Framework 2.0
//    'v3.0'          .NET Framework 3.0
//    'v3.5'          .NET Framework 3.5
//    'v4\Client'     .NET Framework 4.0 Client Profile
//    'v4\Full'       .NET Framework 4.0 Full Installation
//    'v4.5'          .NET Framework 4.5
//    'v4.5.1'        .NET Framework 4.5.1
//    'v4.5.2'        .NET Framework 4.5.2
//    'v4.6'          .NET Framework 4.6
//    'v4.6.1'        .NET Framework 4.6.1
//    'v4.6.2'        .NET Framework 4.6.2
//    'v4.7'          .NET Framework 4.7
//    'v4.7.1'        .NET Framework 4.7.1
//    'v4.7.2'        .NET Framework 4.7.2
//
// service -- Specify any non-negative integer for the required service pack level:
//    0               No service packs required
//    1, 2, etc.      Service pack 1, 2, etc. required
var
    key, versionKey: string;
    install, release, serviceCount, versionRelease: cardinal;
    success: boolean;
begin
    versionKey := version;
    versionRelease := 0;

    // .NET 1.1 and 2.0 embed release number in version key
    if version = 'v1.1' then begin
        versionKey := 'v1.1.4322';
    end else if version = 'v2.0' then begin
        versionKey := 'v2.0.50727';
    end

    // .NET 4.5 and newer install as update to .NET 4.0 Full
    else if Pos('v4.', version) = 1 then begin
        versionKey := 'v4\Full';
        case version of
          'v4.5':   versionRelease := 378389;
          'v4.5.1': versionRelease := 378675; // 378758 on Windows 8 and older
          'v4.5.2': versionRelease := 379893;
          'v4.6':   versionRelease := 393295; // 393297 on Windows 8.1 and older
          'v4.6.1': versionRelease := 394254; // 394271 before Win10 November Update
          'v4.6.2': versionRelease := 394802; // 394806 before Win10 Anniversary Update
          'v4.7':   versionRelease := 460798; // 460805 before Win10 Creators Update
          'v4.7.1': versionRelease := 461308; // 461310 before Win10 Fall Creators Update
          'v4.7.2': versionRelease := 461808; // 461814 before Win10 April 2018 Update
        end;
    end;

    // installation key group for all .NET versions
    key := 'SOFTWARE\Microsoft\NET Framework Setup\NDP\' + versionKey;

    // .NET 3.0 uses value InstallSuccess in subkey Setup
    if Pos('v3.0', version) = 1 then begin
        success := RegQueryDWordValue(HKLM, key + '\Setup', 'InstallSuccess', install);
    end else begin
        success := RegQueryDWordValue(HKLM, key, 'Install', install);
    end;

    // .NET 4.0 and newer use value Servicing instead of SP
    if Pos('v4', version) = 1 then begin
        success := success and RegQueryDWordValue(HKLM, key, 'Servicing', serviceCount);
    end else begin
        success := success and RegQueryDWordValue(HKLM, key, 'SP', serviceCount);
    end;

    // .NET 4.5 and newer use additional value Release
    if versionRelease > 0 then begin
        success := success and RegQueryDWordValue(HKLM, key, 'Release', release);
        success := success and (release >= versionRelease);
    end;

    result := success and (install = 1) and (serviceCount >= service);
end;

function InitializeSetup(): Boolean;
begin
    if not IsDotNetDetected('v4.7.1', 0) then begin
        MsgBox('EXIF Reader requires Microsoft .NET Framework 4.7.1.'#13#13
            'Please use Windows Update to install this version,'#13
            'and then re-run the EXIF Reader setup program.', mbInformation, MB_OK);
        result := false;
    end else
        result := true;
end;
```
{% endraw %}

(Code taken from here: [http://www.kynosarges.de/DotNetVersion.html](http://www.kynosarges.de/DotNetVersion.html))

### Prevent install if newer version already installed

In case you want to prevent install if newer version already installed in user PC, you can apply this code within `InitializeSetup`, so your installer wouldn't downgrade existing installation.

Add a custom message under `[CustomMessages]` section:
{% raw %}
```
[CustomMessages]
english.NewerVersionExists=A newer version of {#AppName} is already installed.%n%nInstaller version: {#AppVersion}%nCurrent version:
```
{% endraw %}

Apply this code to check for existing installation version:
{% raw %}
```pascal
[Code]
// Check for existing installation version
function InitializeSetup: Boolean;
var Version: String;
begin
  if RegValueExists(HKEY_LOCAL_MACHINE,'Software\Microsoft\Windows\CurrentVersion\Uninstall\{#AppId}_is1', 'DisplayVersion') then
    begin
      RegQueryStringValue(HKEY_LOCAL_MACHINE,'Software\Microsoft\Windows\CurrentVersion\Uninstall\{#AppId}_is1', 'DisplayVersion', Version);
      if Version > '{#AppVersion}' then
        begin
          MsgBox(ExpandConstant('{cm:NewerVersionExists} '+Version), mbInformation, MB_OK);
          Result := False;
        end
      else
        begin
          Result := True;
        end
    end
  else
    begin
      Result := True;
    end
end;
```
{% endraw %}

### Automatically uninstall previous installed version

Using solution from [Craig McQueen at StackOverflow](https://stackoverflow.com/a/2099805):

{% raw %}
```pascal
[Code]
function GetUninstallString(): String;
var
  sUnInstPath: String;
  sUnInstallString: String;
begin
  sUnInstPath := ExpandConstant('Software\Microsoft\Windows\CurrentVersion\Uninstall\{#emit SetupSetting("AppId")}_is1');
  sUnInstallString := '';
  if not RegQueryStringValue(HKLM, sUnInstPath, 'UninstallString', sUnInstallString) then
    RegQueryStringValue(HKCU, sUnInstPath, 'UninstallString', sUnInstallString);
  Result := sUnInstallString;
end;

function IsUpgrade(): Boolean;
begin
  Result := (GetUninstallString() <> '');
end;

function UnInstallOldVersion(): Integer;
var
  sUnInstallString: String;
  iResultCode: Integer;
begin
  // Return Values:
  // 1 - uninstall string is empty
  // 2 - error executing the UnInstallString
  // 3 - successfully executed the UnInstallString

  // default return value
  Result := 0;

  // get the uninstall string of the old app
  sUnInstallString := GetUninstallString();
  if sUnInstallString <> '' then begin
    sUnInstallString := RemoveQuotes(sUnInstallString);
    if Exec(sUnInstallString, '/SILENT /NORESTART /SUPPRESSMSGBOXES','', SW_HIDE, ewWaitUntilTerminated, iResultCode) then
      Result := 3
    else
      Result := 2;
  end else
    Result := 1;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if (CurStep=ssInstall) then
  begin
    if (IsUpgrade()) then
    begin
      UnInstallOldVersion();
    end;
  end;
end;
```
{% endraw %}

### Kill existing running services before re-install (or upgrade)

What you need to do is to apply [BeforeInstall](https://www.kymoto.org/documentation/scriptstudio/index.html?common_beforeinstall.html) parameter at the service file you're going to (re)install. Take a look on the example script below:

{% raw %}
```
[Files]
Source: ".\bin\Service1.exe"; DestDir: "{app}"; Flags: ignoreversion; BeforeInstall: TaskKill('Service1.exe')
Source: ".\bin\Service2.exe"; DestDir: "{app}"; Flags: ignoreversion; BeforeInstall: TaskKill('Service2.exe')

[Code]
procedure TaskKill(FileName: String);
var
  ResultCode: Integer;
begin
    Exec(ExpandConstant('taskkill.exe'), '/f /im ' + '"' + FileName + '"', '', SW_HIDE,
     ewWaitUntilTerminated, ResultCode);
end;
```
{% endraw %}
