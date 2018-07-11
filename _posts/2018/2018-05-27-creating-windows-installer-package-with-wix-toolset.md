---
layout: post
title: Creating Windows Installer package with WiX Toolset
description: Here's how I created a basic MSI setup (Windows Installer) for my application using WiX Toolset.
keywords: wix toolset, windows installer, msi setup
tags: [WiX Toolset, Windows Installer]
comments: true
---

{% include figure.html src="https://i.imgur.com/9RPzlsd.png" caption="Installer UI - welcome dialog" %}

I have been working with Windows-based installation development for some time, and for some software projects that required simple deployment, I preferred to use a basic `.msi` installer package. And to do that, my first go-to tool is [WiX Toolset](http://wixtoolset.org/).

Windows Installer XML (WiX) Toolset is a Microsoft open source project used to create the Office 2007 installer. WiX includes some advanced capabilities, but it has a steep learning curve even though the scripting language is using XML format. It took me some time to learn both technologies (WiX and Windows Installer itself), but it's worth spending the time.

There are some advantages working with WiX toolset for creating Windows app installer and here are some of them that I can summarize based on my personal experience:

- Source code in XML format, better clarity, easy to modify and debug.
- Fresh clean `.msi` installer, no extra stuffs embedded, smaller file size.
- Everything can be done using command-line, easy to integrate into CI build system.
- Easy to source-control and edit using any code editor.
- Good community support and a lot of examples. (You get one here too!)

In this post, I would like to share one example of my WiX project. Hopefully it would help for those who are looking to get started with WiX toolset, or for those may need to see more real-world examples of WiX-based projects.

### Example of my WiX project files structure

```
<root>
├── app\
|   ├── config.ini
|   ├── Eula-en.rtf
|   ├── filters.txt
|   └── MiniAppKiller.exe
├── images\
|   ├── app.ico
|   ├── Dialog.bmp
|   └── TopBanner.bmp
├── MakeInstaller.bat
├── Product.Loc-en.wxl
├── Product.Var.wxi
└── Poduct.wxs
```

Folders:
- `app` - Contains my application files to be installed
- `images` - Contains graphic resource for customizing the installer UI.

WiX project files:
- `Product.wxs` - Main file
- `Product.Var.wxi` - Variables file. Included automatically into the main file during compile time.
- `Product.Loc-en.wxl` - Localization file for custom strings used in the main file
- `MakeInstaller.bat` - The batch script to compile WiX project files

### Preprocessor variables file

_Product.Var.wxi_

```xml
<?xml version="1.0" encoding="utf-8"?>
<Include>
    <!-- #### USER-DEFINED VARIABLES THAT DEFINED DURING BUILD #### -->
    <?define AppVersion="$(var.BUILD_VERSION)" ?>
    <!-- Upgrade code HAS to be the same for all updates. Once you've chosen it, don't change it. -->
    <?define UpgradeCode="$(var.BUILD_GUID)" ?>
    <!-- Project directory -->
    <?define ProjectDir="$(var.BUILD_PROJECTDIR)" ?>

    <!-- #### USER-DEFINED VARIABLES #### -->
    <!-- Set to 1 if you want to enable major upgrade -->
    <?define EnableMajorUpgrade="1" ?>
    <?define AppExeName="MiniAppKiller.exe" ?>
    <!-- App Info -->
    <!-- The URL for Add/Remove Programs -->
    <?define InfoURL="https://heiswayi.nrird.com/" ?>
    <!-- If your app supports both platform (x86 & x64), you have to create separate MSI. -->
    <?define Platform="x86" ?>
    <!-- App Icon -->
    <?define AppIconSource="images\app.ico" ?>
    <!-- Other resources -->
    <!-- TopBanner.bmp: 499x58 px -->
    <?define ImageTopBannerSource="images\TopBanner.bmp" ?>
    <!-- Dialog.bmp: 499x301 px; Graphical area: 165x301 px -->
    <?define ImageDialogSource="images\Dialog.bmp" ?>
    <!-- GUIDs -->
    <?define GuidInstallLocation="3F638FF4-C84D-480F-83B8-31CCE0C10617" ?>
    <?define GuidApplicationShortcut="433B5301-96B9-4FD4-BD86-2A54FB5B9570" ?>
    <?define GuidApplicationShortcutDesktop="00EA4184-52A8-478D-8A89-47892454B0DD" ?>
    <?define GuidProductId="9996A526-5535-4DEB-BB56-B4D84BA96E38" ?>

    <!-- #### DO NOT EDIT ANYTHING BELOW THIS LINE #### -->
    <?if $(var.EnableMajorUpgrade) = 1 ?>
        <?define ProductId = "*" ?>
    <?else ?>
        <?define ProductId = "$(var.GuidProductId)" ?>
    <?endif ?>
    <?if $(var.Platform) = x64 ?>
        <?define Win64 = "yes" ?>
        <?define PlatformProgramFilesFolder = "ProgramFiles64Folder" ?>
        <?define MainExeSourcePath = "$(var.ProjectDir)\$(var.AppExeName)" ?>
    <?else ?>
        <?define Win64 = "no" ?>
        <?define PlatformProgramFilesFolder = "ProgramFilesFolder" ?>
        <?define MainExeSourcePath = "$(var.ProjectDir)\$(var.AppExeName)" ?>
    <?endif ?>
</Include>
```

**Note:** `BUILD_VERSION`, `BUILD_GUID` and `BUILD_PROJECTDIR` are preprocessor variables that will be used in `MakeInstaller.bat` file to compile the WiX files.

### Main WiX file

Below is the source code for my main WiX file to create a `.msi` installer. In this file, I have combined the code for my installer UI which includes **few custom dialogs**:
- Custom license agreement dialog
- Custom upgrade dialog
- Custom install dir dialog (for Desktop shortcut option checkbox)

{% include figure.html src="https://i.imgur.com/FPHfm08.png" caption="With Create Desktop shortcut option" %}

Following are the **extra features other the defaults** that have been implemented into the source code:
- Detect for minimum .NET Framework and OS version.
- Detect if newer version is installed, and abort the installation.
- Detect if older version is installed, show Upgrade Welcome Dialog, and skip License Agreement Dialog.
- Prompt user to close if the application executable file is running during upgrade.
- Create registry to memorize the installation directory path.
- Create Start Menu and Desktop shortcut. Desktop shortcut is optional, user can choose to not create it.

_Product.wxs_

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Add xmlns:util namespace definition to be able to use stuff from WixUtilExtension.dll -->
<Wix xmlns="http://schemas.microsoft.com/wix/2006/wi" xmlns:util="http://schemas.microsoft.com/wix/UtilExtension">
    <!-- Include defined variables -->
    <?include Product.Var.wxi ?>
    <!-- The upgrade code must never change as long as the product lives! -->
    <!-- Product IDs must be autogenerated (*) or else major upgrades will not work -->
    <Product Id="$(var.ProductId)" Name="!(loc.ApplicationName)" Language="!(loc.Language)" Version="$(var.AppVersion)" Manufacturer="!(loc.ManufacturerName)" UpgradeCode="$(var.UpgradeCode)" >
        <!-- Package IDs are valid for a single package version only - they are autogenerated by WiX -->
        <!-- Let's require Windows Installer 4.0 (included in Vista) -->
        <!-- And ALWAYS install per machine!!! -->
        <Package Id="*" InstallerVersion="400" Compressed="yes" InstallPrivileges="elevated" InstallScope="perMachine"  Description="!(loc.ProductDescription)" Comments="!(loc.Comments) $(var.AppVersion)" />
        <!-- Define icons (ID should not be longer than 18 chars and must end with ".exe") -->
        <Icon Id="AppIcon.exe" SourceFile="$(var.AppIconSource)" />
        <!-- We do not have more than one medium (Floppy, CD, ...). Everything in one file. -->
        <Media Id="1" Cabinet="media1.cab" EmbedCab="yes" />
        <!-- Upgrade settings -->
        <Upgrade Id="$(var.UpgradeCode)">
            <UpgradeVersion OnlyDetect="yes" Minimum="$(var.AppVersion)" IncludeMinimum="no" Property="NEWER_VERSION_FOUND" />
            <UpgradeVersion Minimum="0.0.0.0" IncludeMinimum="yes" Maximum="$(var.AppVersion)" IncludeMaximum="no" Property="OLDER_VERSION_FOUND" />
        </Upgrade>

        <!-- License agreement text: dummy. Real text is set in WXS file -->
        <!--<WixVariable Id="WixUILicenseRtf" Value="dummy" />-->
        <!-- UI customization -->
        <WixVariable Id="WixUIBannerBmp" Value="$(var.ImageTopBannerSource)" />
        <WixVariable Id="WixUIDialogBmp" Value="$(var.ImageDialogSource)" />
        <Binary Id="imageDialog" SourceFile="$(var.ImageDialogSource)" />
        <!-- Set properties for Add/Remove Programs -->
        <Property Id="ARPPRODUCTICON" Value="AppIcon.exe" />
        <Property Id="ARPHELPLINK" Value="$(var.InfoURL)" />
        <!-- Remove repair -->
        <!--<Property Id="ARPNOREPAIR" Value="yes" Secure="yes" />-->
        <!-- Remove modify -->
        <!--<Property Id="ARPNOMODIFY" Value="yes" Secure="yes" />-->
        <Property Id="WIXUI_INSTALLDIR" Value="INSTALLDIR" />
        <Property Id="DialogBitmap">imageDialog</Property>
        <!-- Determine the directory of a previous installation (if one exists). If not INSTALLDIR stays empty -->
        <Property Id="INSTALLDIR">
            <RegistrySearch Id="DetermineInstallLocation" Type="raw" Root="HKLM" Key="Software\!(loc.ManufacturerName)\InstalledProducts\!(loc.ApplicationName)" Name="InstallLocation" />
        </Property>
        <Property Id="UpgradeDlgHasShown" Value="0" />
        <Property Id="ADDDESKTOPSHORTCUT" Value="1"/> 

        <!-- Reference the global NETFRAMEWORK35 property to check if it exists -->
        <PropertyRef Id="NETFRAMEWORK35"/>    
        <!-- 
        Startup conditions that checks if .Net Framework 3.5 is installed or if 
        we're running the OS higher than Windows XP SP2.
        If not the installation is aborted.
        By doing the (Installed OR ...) property means that this condition will only 
        be evaluated if the app is being installed and not on uninstall or changing
        -->
        <Condition Message="!(loc.DotNetFrameworkNeeded)">
            <![CDATA[Installed OR NETFRAMEWORK35]]>
        </Condition>
        <Condition Message="!(loc.AppNotSupported)">
            <![CDATA[Installed OR ((VersionNT >= 501 AND ServicePackLevel >= 2) OR (VersionNT >= 502))]]>
        </Condition>

        <!-- Set up ARPINSTALLLOCATION property (http://blogs.technet.com/b/alexshev/archive/2008/02/09/from-msi-to-wix-part-2.aspx) -->
        <CustomAction Id="SetARPINSTALLLOCATION" Property="ARPINSTALLLOCATION" Value="[INSTALLDIR]" />
        <!-- Save the command line value INSTALLDIR and restore it later in the sequence or it will be overwritten by the value saved to the registry during an upgrade -->
        <!-- http://robmensching.com/blog/posts/2010/5/2/the-wix-toolsets-remember-property-pattern/ -->
        <CustomAction Id='SaveCmdLineValueINSTALLDIR' Property='CMDLINE_INSTALLDIR' Value='[INSTALLDIR]' Execute='firstSequence' />
        <CustomAction Id='SetFromCmdLineValueINSTALLDIR' Property='INSTALLDIR' Value='[CMDLINE_INSTALLDIR]' Execute='firstSequence' />
        <CustomAction Id="NewerVersionFound" Error="!(loc.NewerVersionInstalled)" />

        <!-- UI Sequence -->
        <InstallUISequence>
            <!-- Check for newer versions with FindRelatedProducts and execute the custom action after it -->
            <Custom Action="NewerVersionFound" After="FindRelatedProducts">
                <![CDATA[NEWER_VERSION_FOUND]]>
            </Custom>
            <Custom Action='SaveCmdLineValueINSTALLDIR' Before='AppSearch' />
            <Custom Action='SetFromCmdLineValueINSTALLDIR' After='AppSearch'>CMDLINE_INSTALLDIR</Custom>
        </InstallUISequence>
        
        <!-- Exec Sequence -->
        <!-- This is the main installer sequence run when the product is actually installed -->
        <InstallExecuteSequence>
            <!-- Check for newer versions with FindRelatedProducts and execute the custom action after it -->
            <Custom Action="NewerVersionFound" After="FindRelatedProducts">
                <![CDATA[NEWER_VERSION_FOUND]]>
            </Custom>
            <!-- Remove the previous versions of the product -->
            <RemoveExistingProducts After="InstallInitialize"/>
            <!-- WixCloseApplications is a built in custom action that uses util:CloseApplication below -->
            <Custom Action="WixCloseApplications" Before="InstallInitialize" />
            <!-- Determine the install location after the install path has been validated by the installer -->
            <Custom Action="SetARPINSTALLLOCATION" After="InstallValidate"></Custom>
            <Custom Action='SaveCmdLineValueINSTALLDIR' Before='AppSearch' />
            <Custom Action='SetFromCmdLineValueINSTALLDIR' After='AppSearch'>CMDLINE_INSTALLDIR</Custom>
        </InstallExecuteSequence>

        <!-- This will ask the user to close the app if it's running while upgrading -->
        <util:CloseApplication Id="CloseApp" CloseMessage="no" Description="!(loc.CloseRunningApp)" ElevatedCloseMessage="no" RebootPrompt="no" Target="$(var.AppExeName)" />
        
        <!-- Outermost folder (kind of virtual). Fixed entry. -->
        <Directory Id="TARGETDIR" Name="SourceDir">
            <!-- We start building our directory structure here -->
            <!-- "ProgramFilesFolder" is a variable containing the absolute path. -->
            <!-- For a list of folder variables, see: http://msdn.microsoft.com/en-us/library/aa372057%28VS.85%29.aspx -->
            <Directory Id="$(var.PlatformProgramFilesFolder)">
                <!-- All folders from here on are relative to their parent. -->
                <Directory Id="MyProgramFiles" Name="!(loc.ManufacturerName)">
                    <!-- INSTALLDIR is a property name. We need it later for the UI (to be able to change the install dir. -->
                    <Directory Id="INSTALLDIR" Name="!(loc.ApplicationName)"></Directory>
                </Directory>
            </Directory>
            <!-- Registry entries -->
            <Component Id="RegValInstallLocation_comp" Guid="$(var.GuidInstallLocation)">
                <!-- Do NOT use the application's default registry key here, because THIS key will be removed on uninstall
                 (important when installing a newer version, because that is uninstall followed by install) -->
                <RegistryKey Root="HKLM" Key="Software\!(loc.ManufacturerName)\InstalledProducts\!(loc.ApplicationName)">
                    <RegistryValue Name="InstallLocation" Value="[INSTALLDIR]" Type="string" KeyPath="yes" />
                </RegistryKey>
            </Component>
            <!-- Shortcut folders -->
            <Directory Id="ProgramMenuFolder">
                <Directory Id="ApplicationProgramsFolder" Name="!(loc.ApplicationName)" /></Directory>
            <Directory Id="DesktopFolder" Name="Desktop"></Directory>
        </Directory>
        <!-- Shortcut components -->
        <DirectoryRef Id="ApplicationProgramsFolder">
            <Component Id="ApplicationShortcut" Guid="$(var.GuidApplicationShortcut)">
                <Shortcut Id="ApplicationStartMenuShortcut" Name="!(loc.ApplicationName)" Description="!(loc.ProductDescription)" Target="[INSTALLDIR]$(var.AppExeName)" WorkingDirectory="INSTALLFOLDER" />
                <RemoveFolder Id="RemoveApplicationProgramsFolder" Directory="ApplicationProgramsFolder" On="uninstall" />
                <RegistryValue Root="HKCU" Key="Software\!(loc.ManufacturerName)\InstalledProducts\!(loc.ApplicationName)" Name="installed" Type="integer" Value="1" KeyPath="yes" />
            </Component>
        </DirectoryRef>
        <DirectoryRef Id="DesktopFolder">
            <Component Id="ApplicationShortcutDesktop" Guid="$(var.GuidApplicationShortcutDesktop)">
                <Shortcut Id="ApplicationDesktopShortcut" Name="!(loc.ApplicationName)" Description="!(loc.ProductDescription)" Target="[INSTALLDIR]$(var.AppExeName)" WorkingDirectory="INSTALLFOLDER" />
                <RemoveFolder Id="RemoveDesktopFolder" Directory="DesktopFolder" On="uninstall" />
                <RegistryValue Root="HKCU" Key="Software\!(loc.ManufacturerName)\InstalledProducts\!(loc.ApplicationName)" Name="installed" Type="integer" Value="1" KeyPath="yes" />
                <Condition>ADDDESKTOPSHORTCUT</Condition>
            </Component>
        </DirectoryRef>
        <!-- Features define which parts of the application can be installed in a custom installation -->
        <Feature Id="Complete" Title="!(loc.ApplicationName)" Description="!(loc.FeatureCompleteDescription)" Display="expand" Level="1" ConfigurableDirectory="INSTALLDIR">
            <!-- A feature block for the main (GUI) program and all its dependencies -->
            <Feature Id="MainProgram" Title="!(loc.FeatureMainProgramTitle)" Description="!(loc.FeatureMainProgramDescription)" Level="1">
                <!-- Installation folder: Generated automatically by heat.exe -->
                <ComponentGroupRef Id="INSTALLDIR_comp" />
                <!-- Registry entries -->
                <ComponentRef Id="RegValInstallLocation_comp" />
                <!-- Shortcuts -->
                <ComponentRef Id="ApplicationShortcut" />
                <ComponentRef Id="ApplicationShortcutDesktop" />
            </Feature>
        </Feature>
        <UI Id="MyWixUI">
            <TextStyle Id="WixUI_Font_Normal" FaceName="Tahoma" Size="8" />
            <TextStyle Id="WixUI_Font_Bigger" FaceName="Tahoma" Size="12" />
            <TextStyle Id="WixUI_Font_Title" FaceName="Tahoma" Size="9" Bold="yes" />
            <Property Id="DefaultUIFont" Value="WixUI_Font_Normal" />
            <Property Id="WixUI_Mode" Value="InstallDir" />
            <DialogRef Id="BrowseDlg" />
            <DialogRef Id="DiskCostDlg" />
            <DialogRef Id="ErrorDlg" />
            <DialogRef Id="FatalError" />
            <DialogRef Id="FilesInUse" />
            <DialogRef Id="MsiRMFilesInUse" />
            <DialogRef Id="PrepareDlg" />
            <DialogRef Id="ProgressDlg" />
            <DialogRef Id="ResumeDlg" />
            <DialogRef Id="UserExit" />
            <Dialog Id="CustomLicenseAgreementDlg" Width="370" Height="270" Title="!(loc.LicenseAgreementDlg_Title)">
                <Control Id="LicenseAcceptedCheckBox" Type="CheckBox" X="20" Y="207" Width="330" Height="18" CheckBoxValue="1" Property="LicenseAccepted" Text="!(loc.LicenseAgreementDlgLicenseAcceptedCheckBox)" />
                <Control Id="Back" Type="PushButton" X="180" Y="243" Width="56" Height="17" Text="!(loc.WixUIBack)" />
                <Control Id="Next" Type="PushButton" X="236" Y="243" Width="56" Height="17" Default="yes" Text="!(loc.WixUINext)">
                    <Publish Event="SpawnWaitDialog" Value="WaitForCostingDlg">CostingComplete = 1</Publish>
                    <Condition Action="disable">
                        <![CDATA[LicenseAccepted <> "1"]]>
                    </Condition>
                    <Condition Action="enable">LicenseAccepted = "1"</Condition>
                </Control>
                <Control Id="Cancel" Type="PushButton" X="304" Y="243" Width="56" Height="17" Cancel="yes" Text="!(loc.WixUICancel)">
                    <Publish Event="SpawnDialog" Value="CancelDlg">1</Publish>
                </Control>
                <Control Id="BannerBitmap" Type="Bitmap" X="0" Y="0" Width="370" Height="44" TabSkip="no" Text="!(loc.LicenseAgreementDlgBannerBitmap)" />
                <Control Id="LicenseText" Type="ScrollableText" X="20" Y="60" Width="330" Height="140" Sunken="yes" TabSkip="no">
                    <!-- This is the original line -->
                    <!--<Text SourceFile="!(wix.WixUILicenseRtf=$(var.LicenseRtf))" />-->
                    <!-- To enable EULA localization we change it to this: -->
                    <Text SourceFile="$(var.ProjectDir)\!(loc.LicenseRtf)" />
                    <!-- In each of the localization files (wxl) put a line like this:
            <String Id="LicenseRtf" Overridable="yes">EULA_en-us.rtf</String>-->
                </Control>
                <Control Id="Print" Type="PushButton" X="112" Y="243" Width="56" Height="17" Text="!(loc.WixUIPrint)">
                    <Publish Event="DoAction" Value="WixUIPrintEula">1</Publish>
                </Control>
                <Control Id="BannerLine" Type="Line" X="0" Y="44" Width="370" Height="0" />
                <Control Id="BottomLine" Type="Line" X="0" Y="234" Width="370" Height="0" />
                <Control Id="Description" Type="Text" X="25" Y="23" Width="340" Height="15" Transparent="yes" NoPrefix="yes" Text="!(loc.LicenseAgreementDlgDescription)" />
                <Control Id="Title" Type="Text" X="15" Y="6" Width="200" Height="15" Transparent="yes" NoPrefix="yes" Text="!(loc.LicenseAgreementDlgTitle)" />
            </Dialog>

            <Dialog Id="CustomUpgradeDlg" Width="370" Height="270" Title="!(loc.UpgradeWelcomeDlgTitle)" NoMinimize="yes">
                <Control Id="Back" Type="PushButton" X="180" Y="243" Width="56" Height="17" Disabled="yes" Text="!(loc.WixUIBack)">
                    <Publish Event="NewDialog" Value="WelcomeDlg">1</Publish>
                </Control>
                <Control Id="Next" Type="PushButton" X="236" Y="243" Width="56" Height="17" Default="yes" Text="!(loc.WixUINext)">
                    <Publish Event="NewDialog" Value="VerifyReadyDlg">1</Publish>
                    <Publish Property="UpgradeDlgHasShown" Value="1">1</Publish>
                </Control>
                <Control Id="Cancel" Type="PushButton" X="304" Y="243" Width="56" Height="17" Cancel="yes" Text="!(loc.WixUICancel)">
                    <Publish Event="SpawnDialog" Value="CancelDlg">1</Publish>
                </Control>
                <Control Id="Bitmap" Type="Bitmap" X="0" Y="0" Width="370" Height="234" TabSkip="no" Text="[DialogBitmap]" />
                <Control Id="BottomLine" Type="Line" X="0" Y="234" Width="374" Height="0" />
                <Control Id="Description" Type="Text" X="135" Y="70" Width="220" Height="30" Transparent="yes" NoPrefix="yes">
                    <Text>!(loc.UpgradeWelcomeDlgMessage)</Text>
                </Control>
                <Control Id="Title" Type="Text" X="135" Y="20" Width="220" Height="60" Transparent="yes" NoPrefix="yes">
                    <Text>{\WixUI_Font_Bigger}!(loc.UpgradeWelcomeDlgHeaderTitle)</Text>
                </Control>
            </Dialog>

            <Dialog Id="CustomInstallDirDlg" Width="370" Height="270" Title="!(loc.InstallDirDlg_Title)">
                <Control Id="Next" Type="PushButton" X="236" Y="243" Width="56" Height="17" Default="yes" Text="!(loc.WixUINext)" />
                <Control Id="Back" Type="PushButton" X="180" Y="243" Width="56" Height="17" Text="!(loc.WixUIBack)" />
                <Control Id="Cancel" Type="PushButton" X="304" Y="243" Width="56" Height="17" Cancel="yes" Text="!(loc.WixUICancel)">
                    <Publish Event="SpawnDialog" Value="CancelDlg">1</Publish>
                </Control>

                <Control Id="Description" Type="Text" X="25" Y="23" Width="280" Height="15" Transparent="yes" NoPrefix="yes" Text="!(loc.InstallDirDlgDescription)" />
                <Control Id="Title" Type="Text" X="15" Y="6" Width="200" Height="15" Transparent="yes" NoPrefix="yes" Text="!(loc.InstallDirDlgTitle)" />
                <Control Id="BannerBitmap" Type="Bitmap" X="0" Y="0" Width="370" Height="44" TabSkip="no" Text="!(loc.InstallDirDlgBannerBitmap)" />
                <Control Id="BannerLine" Type="Line" X="0" Y="44" Width="370" Height="0" />
                <Control Id="BottomLine" Type="Line" X="0" Y="234" Width="370" Height="0" />

                <Control Id="FolderLabel" Type="Text" X="20" Y="60" Width="290" Height="30" NoPrefix="yes" Text="!(loc.InstallDirDlgFolderLabel)" />
                <Control Id="Folder" Type="PathEdit" X="20" Y="100" Width="320" Height="18" Property="WIXUI_INSTALLDIR" Indirect="yes" />
                <Control Id="ChangeFolder" Type="PushButton" X="20" Y="120" Width="56" Height="17" Text="!(loc.InstallDirDlgChange)" />
                <Control Id="DesktopShortcutCheckBox" Type="CheckBox" X="20" Y="160" Width="290" Height="17" Property="ADDDESKTOPSHORTCUT" CheckBoxValue="1" Text="!(loc.CreateDesktopShortcutCheckboxText)"/> 
            </Dialog>

            <Publish Dialog="WelcomeDlg" Control="Next" Event="NewDialog" Value="CustomLicenseAgreementDlg">NOT Installed</Publish>

            <!--<Publish Dialog="WelcomeDlg" Control="Next" Event="NewDialog" Value="VerifyReadyDlg">(Installed AND PATCH) OR WIX_UPGRADE_DETECTED</Publish>-->
            <Publish Dialog="WelcomeDlg" Control="Next" Event="NewDialog" Value="CustomUpgradeDlg">(Installed AND PATCH) OR OLDER_VERSION_FOUND</Publish>

            <Publish Dialog="CustomLicenseAgreementDlg" Control="Back" Event="NewDialog" Value="WelcomeDlg">1</Publish>
            <Publish Dialog="CustomLicenseAgreementDlg" Control="Next" Event="NewDialog" Value="CustomInstallDirDlg">LicenseAccepted = "1"</Publish>
            <Publish Dialog="CustomInstallDirDlg" Control="Back" Event="NewDialog" Value="CustomLicenseAgreementDlg">1</Publish>
            <Publish Dialog="CustomInstallDirDlg" Control="Next" Event="SetTargetPath" Value="[WIXUI_INSTALLDIR]" Order="1">1</Publish>
            <Publish Dialog="CustomInstallDirDlg" Control="Next" Event="DoAction" Value="WixUIValidatePath" Order="2">NOT WIXUI_DONTVALIDATEPATH</Publish>
            <Publish Dialog="CustomInstallDirDlg" Control="Next" Event="SpawnDialog" Value="InvalidDirDlg" Order="3">
                <![CDATA[NOT WIXUI_DONTVALIDATEPATH AND WIXUI_INSTALLDIR_VALID<>"1"]]>
            </Publish>
            <Publish Dialog="CustomInstallDirDlg" Control="Next" Event="NewDialog" Value="VerifyReadyDlg" Order="4">WIXUI_DONTVALIDATEPATH OR WIXUI_INSTALLDIR_VALID="1"</Publish>
            <Publish Dialog="CustomInstallDirDlg" Control="ChangeFolder" Property="_BrowseProperty" Value="[WIXUI_INSTALLDIR]" Order="1">1</Publish>
            <Publish Dialog="CustomInstallDirDlg" Control="ChangeFolder" Event="SpawnDialog" Value="BrowseDlg" Order="2">1</Publish>
            <Publish Dialog="CustomInstallDirDlg" Control="Next" Event="NewDialog" Value="VerifyReadyDlg">1</Publish>
            <Publish Dialog="BrowseDlg" Control="OK" Event="DoAction" Value="WixUIValidatePath" Order="3">1</Publish>
            <Publish Dialog="BrowseDlg" Control="OK" Event="SpawnDialog" Value="InvalidDirDlg" Order="4">
                <![CDATA[WIXUI_INSTALLDIR_VALID<>"1"]]>
            </Publish>
            <Publish Dialog="VerifyReadyDlg" Control="Back" Event="NewDialog" Value="CustomInstallDirDlg" Order="1">NOT Installed</Publish>
            <Publish Dialog="VerifyReadyDlg" Control="Back" Event="NewDialog" Value="MaintenanceTypeDlg" Order="2">Installed</Publish>
            
            <Publish Dialog="VerifyReadyDlg" Control="Back" Event="NewDialog" Value="CustomUpgradeDlg" Order="2">UpgradeDlgHasShown = "1"</Publish>

            <Publish Dialog="MaintenanceWelcomeDlg" Control="Next" Event="NewDialog" Value="MaintenanceTypeDlg">1</Publish>
            <Publish Dialog="MaintenanceTypeDlg" Control="RepairButton" Event="NewDialog" Value="VerifyReadyDlg">1</Publish>
            <Publish Dialog="MaintenanceTypeDlg" Control="RemoveButton" Event="NewDialog" Value="VerifyReadyDlg">1</Publish>
            <Publish Dialog="MaintenanceTypeDlg" Control="Back" Event="NewDialog" Value="MaintenanceWelcomeDlg">1</Publish>
            <Publish Dialog="ExitDialog" Control="Finish" Event="EndDialog" Value="Return" Order="999">1</Publish>
        </UI>
        <UIRef Id="WixUI_Common" />
    </Product>
</Wix>
```

{% include figure.html src="https://i.imgur.com/sXeMVyS.png" caption="License agreement dialog" %}

{% include figure.html src="https://i.imgur.com/WaHqBhg.png" caption="When existing version already installed - upgrade dialog" %}

### Localization file

_Product.Loc-en.wxl_

```xml
<?xml version="1.0" encoding="utf-8"?>
<WixLocalization Culture="en-us" Codepage="1252" xmlns="http://schemas.microsoft.com/wix/2006/localization">
    <String Id="Language">1033</String>
    <!-- Supported language and codepage codes can be found here: http://www.tramontana.co.hu/wix/lesson2.php#2.4 -->
    <String Id="ApplicationName">MiniAppKiller</String>
    <String Id="ManufacturerName">Heiswayi Nrird</String>
    <String Id="ProductDescription">Process killer</String>
    <String Id="Comments">Installs MiniAppKiller</String>

    <String Id="LicenseRtf" Overridable="yes">Eula-en.rtf</String>

    <String Id="AppNotSupported">This application is is not supported on your current OS. Minimal OS supported is Windows XP SP2</String>
    <String Id="DotNetFrameworkNeeded">.NET Framework 3.5 is required. Please install the .NET Framework then run this installer again.</String>
    <String Id="NewerVersionInstalled">A newer version of !(loc.ApplicationName) is already installed.</String>
    <String Id="CloseRunningApp">!(loc.ApplicationName) is running. You need to close it first!</String>

    <String Id="FeatureCompleteDescription">The complete package.</String>
    <String Id="FeatureMainProgramDescription">The main version including all dependencies.</String>
    <String Id="FeatureMainProgramTitle">Main program</String>

    <!--<String Id="LicenseAgreementDlgLicenseAcceptedCheckBox">Agree</String>-->

    <String Id="UpgradeWelcomeDlgTitle">!(loc.ApplicationName) Setup</String>
    <String Id="UpgradeWelcomeDlgHeaderTitle">A previous version of !(loc.ApplicationName) is detected</String>
    <String Id="UpgradeWelcomeDlgMessage">The setup will perform an upgrade of !(loc.ApplicationName). Click Next to proceed with the upgrade or Cancel to exit the setup.</String>

    <String Id="CreateDesktopShortcutCheckboxText">Create a shortcut on Desktop</String>
</WixLocalization>
```

### Batch script for compiling the WiX project

These are the WiX toolset that I used in the script below:-
- **heat.exe** - To automatically harvest my application files and generate a collection of `<Component>` elements and `<ComponentGroup>` that will be used in _Product.wxs_ file under `<Feature>` element. Output from this tool is _Product.Files.wxs_ file.
- **candle.exe** - To generate `*.wixobj` file with some preprocessor variables.
- **light.exe** - To compile `*.wixobj` and localization file using WiX extensions and generate `*.msi` file.

_MakeInstaller.bat_

```shell
@echo off

set projectDir=.

rem Automatically generated fragment file for application files
"%WIX%bin\heat.exe" dir "app" -cg INSTALLDIR_comp -gg -scom -sreg -sfrag -srd -dr INSTALLDIR -var var.ProjectDir -out "Product.Files.wxs"
"%WIX%bin\candle.exe" "Product.Files.wxs" -out "_Product.Files.wixobj" -dProjectDir="%projectDir%\app"

rem Create setup-1.0.msi
"%WIX%bin\candle.exe" "Product.wxs" -out "_Product.wixobj" -dBUILD_GUID="2BEA883D-BB4C-4A70-B668-88AA54025F5A" -dBUILD_VERSION="1.0.0.0" -dBUILD_PROJECTDIR="%projectDir%\app" -ext WixUtilExtension -nologo
"%WIX%bin\light.exe" "_Product.Files.wixobj" "_Product.wixobj" -loc "Product.Loc-en.wxl" -cultures:en-US -ext WixUtilExtension -ext WixUIExtension -ext WixNetFxExtension -out "setup-1.0.msi" -nologo

rem Create setup-1.1.msi
"%WIX%bin\candle.exe" "Product.wxs" -out "_Product.wixobj" -dBUILD_GUID="2BEA883D-BB4C-4A70-B668-88AA54025F5A" -dBUILD_VERSION="1.1.0.0" -dBUILD_PROJECTDIR="%projectDir%\app" -ext WixUtilExtension -nologo
"%WIX%bin\light.exe" "_Product.Files.wixobj" "_Product.wixobj" -loc "Product.Loc-en.wxl" -cultures:en-US -ext WixUtilExtension -ext WixUIExtension -ext WixNetFxExtension -out "setup-1.1.msi" -nologo

rem Create setup-2.0.msi
"%WIX%bin\candle.exe" "Product.wxs" -out "_Product.wixobj" -dBUILD_GUID="2BEA883D-BB4C-4A70-B668-88AA54025F5A" -dBUILD_VERSION="2.0.0.0" -dBUILD_PROJECTDIR="%projectDir%\app" -ext WixUtilExtension -nologo
"%WIX%bin\light.exe" "_Product.Files.wixobj" "_Product.wixobj" -loc "Product.Loc-en.wxl" -cultures:en-US -ext WixUtilExtension -ext WixUIExtension -ext WixNetFxExtension -out "setup-2.0.msi" -nologo
```

Here's the final project files structure after I run `MakeInstaller.bat` script:

![Project files structure after compile](https://i.imgur.com/2tFxHpB.png)

{% include figure.html src="https://i.imgur.com/DZAhwKu.png" caption="Installation progress dialog" %}

### WiX references

This project is done based on **WiX v3.11** ([GitHub](https://github.com/wixtoolset/wix3)) at the time I'm writing this post. If you need to customize your installer UI or to support multiple localizations, you can refer to [this repository](https://github.com/wixtoolset/wix3/tree/develop/src/ext/UIExtension/wixlib) on GitHub for the code references.