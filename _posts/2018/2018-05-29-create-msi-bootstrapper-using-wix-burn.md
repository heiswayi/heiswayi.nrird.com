---
layout: post
title: Create MSI bootstrapper (setup.exe) using WiX Burn
description: Here's how I create a custom bootstrapper (setup.exe) for my MSI installer using Windows Installler (WiX) Burn. Full example source code provided.
keywords: wix toolset, windows installer, msi, windows installer xml, wix burn, installer bootstrapper, setup.exe
tags: [WiX Toolset, Windows Installer, MSI]
comments: true
---

In my previous blog post "[Create a basic MSI installer using WiX Toolset](https://heiswayi.nrird.com/2018/create-basic-msi-installer-using-wix-toolset)", I have shared about how I created a basic `.msi` installer using WiX toolset for my app deployment. And today, I'm going to share how I create a bootstrapper i.e. setup.exe using WiX to chain the installations that are packaged as `*.msi`. One of the reasons you need a bootstrapper is because there is only one instance of `.msi` can be run at a time. Using a bootstrapper, you can install the required prerequisites for your app deployment, e.g. .NET Framework.

Example of my bootstrapper UI
![Example of my bootstrapper UI](https://i.imgur.com/G6mL3rE.png)

### Example of project files structure for creating the bootstrapper

```
<root>
├── bootstrapper_res\
|   ├── banner.png
|   ├── ClassicTheme.wxl
|   └── ClassicTheme.xml
├── prereq\
|   └── NDP471-KB4033344-Web.exe
├── Bootstrapper.wxs
├── MakeBootstrapper.bat
├── myAppSetup.msi
├── ...
```

Folders:
- `bootstrapper_res` - Contains graphic resource and theme files for my WiX bootstrapper UI
- `prereq` - Contains necessary prerequisites to be bundled into my bootstrapper

WiX project files:
- `Bootstrapper.wxs` - Main file for generating the bootstrapper (`*.exe` file)
- `MakeBootstrapper.bat` - Batch script to compile `Bootstrapper.wxs` file
- `myAppSetup.msi` - Example of `.msi` installer file for my app installation
- `banner.png`, `ClassicTheme.wxl` & `ClassicTheme.xml` - Modified theme for customizing the bootstrapper interface ([Check this GitHub repo for the source code](https://github.com/heiswayi/wix-msi/tree/master/exe-bootstrapper/bootstrapper_res))

### Bootstrapper source code

_Bootstrapper.wxs_

```xml
<Wix
    xmlns="http://schemas.microsoft.com/wix/2006/wi"
    xmlns:bal="http://schemas.microsoft.com/wix/BalExtension"
    xmlns:util="http://schemas.microsoft.com/wix/UtilExtension">
    <Bundle Name="MiniAppKiller Bundle" 
        Version="!(bind.packageVersion.MainPackage)" 
        Manufacturer="Heiswayi Nrird" 
        UpgradeCode="56888B11-D5D0-4068-8E94-39E696DAD1D4" 
        Copyright="(C) 2018 Heiswayi Nrird" 
        IconSourceFile="images/app.ico" 
        AboutUrl="https://heiswayi.nrird.com"
        Compressed="yes">
        
        <!-- Layout setup -->
        <BootstrapperApplicationRef Id="WixStandardBootstrapperApplication.HyperlinkLicense">
            <bal:WixStandardBootstrapperApplication 
                LicenseUrl="https://heiswayi.nrird.com"
                LogoFile="bootstrapper_res/banner.png"
                ThemeFile="bootstrapper_res/ClassicTheme.xml"
                LocalizationFile="bootstrapper_res/ClassicTheme.wxl"
                LicenseFile="app\Eula-en.rtf"
                SuppressOptionsUI="yes" />
        </BootstrapperApplicationRef>

        <util:RegistrySearch Root="HKLM" 
            Key="SOFTWARE\Microsoft\Net Framework Setup\NDP\v4\Full" 
            Value="Version" 
            Variable="Net4FullVersion" />
        <util:RegistrySearch Root="HKLM" 
            Key="SOFTWARE\Microsoft\Net Framework Setup\NDP\v4\Full" 
            Value="Version" 
            Variable="Net4x64FullVersion" 
            Win64="yes" />
        
        <Chain DisableSystemRestore="yes">
            <ExePackage Id="Net471" 
                Name="Microsoft .NET Framework 4.7.1 Web Installer" 
                Cache="no" 
                Compressed="yes" 
                PerMachine="yes" 
                Permanent="yes" 
                Vital="yes"
                InstallCommand="/passive /norestart"
                SourceFile="prereq\NDP471-KB4033344-Web.exe"
                DetectCondition="(Net4FullVersion = &quot;4.7.2558&quot;) AND (NOT VersionNT64 OR (Net4x64FullVersion = &quot;4.7.2558&quot;))"
                InstallCondition="(VersionNT >= v6.0 OR VersionNT64 >= v6.0) AND (NOT (Net4FullVersion = &quot;4.7.2558&quot; OR Net4x64FullVersion = &quot;4.7.2558&quot;))"/>
            <RollbackBoundary />
            <MsiPackage Id="MainPackage" 
                SourceFile="setup-1.0.msi" 
                DisplayInternalUI="yes" 
                Compressed="yes" 
                Vital="yes"/>
        </Chain>
    </Bundle>
</Wix>
```

For more detailed on other available element properties, please take a look on [WiX Bundle Element documentation here](http://wixtoolset.org/documentation/manual/v3/xsd/wix/bundle.html).

### Batch script for compiling the WiX project

These are the WiX toolset that I use in the script below:-
- **candle.exe** - To generate `*.wixobj` file
- **light.exe** - To compile `*.wixobj` and generate the bootstrapper file (`*.exe`).

_MakeBootstrapper.bat_

```shell
@echo off

"%WIX%bin\candle.exe" "Bootstrapper.wxs" -out "_Bootstrapper.wixobj" -ext WixNetFxExtension -ext WixBalExtension -ext WixUtilExtension -nologo
"%WIX%bin\light.exe" "_Bootstrapper.wixobj" -out "Bootstrapper.exe" -ext WixNetFxExtension -ext WixBalExtension -ext WixUtilExtension -nologo
```

### More screenshots of my bootstrapper

Installing the packages
![Installing the packages](https://i.imgur.com/0dMOkiD.png)

When user cancelled installation
![When user cancelled installtion](https://i.imgur.com/3Ou5t8d.png)

### Extra good readings and references

- [Windows Installer Basics: Bootstrapper EXE Programs](http://makemsi-manual.dennisbareis.com/bootstrapper_exe_programs.htm)
- [Joy of Setup - Best Practices](https://www.joyofsetup.com/tag/best-practices/)
- [Understanding the Difference Between .EXE and .MSI](https://www.symantec.com/connect/articles/understanding-difference-between-exe-and-msi)
- [hould you run MSI or EXE Setup files?](https://www.ghacks.net/2009/03/23/msi-or-exe-setup/)
- And a lot more... the rest are on Google in case you don't know :P
