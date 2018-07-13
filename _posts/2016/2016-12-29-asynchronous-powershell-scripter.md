---
layout: project
title: Asynchronous PowerShell Scripter
description: Just another PowerShell scripter tool built in .NET C# and WPF to simply manages the PowerShell scripts, or to run the script asynchronously and also as a tool to learn PowerShell programming.
keywords: c# programming, asynchronous powershell scripter, learn powershell, manage powershell preset scripts, powershell scripts, execute powershell asynchronously
tags: [C#, WPF, PowerShell, Project, Open Source]
comments: true
---

Asynchronous PowerShell Scripter is just another PowerShell scripter tool made in .NET C# and **WPF** for executing PowerShell script **asynchronously** and has the abilities to:-

- save new or remove PowerShell preset scripts.
- import PowerShell script file directly.
- drag-n-drop PowerShell script file onto the Script Editor.
- export selected lines or all lines output into a text file.

### Screenshots

{% include figure.html src="http://i.imgur.com/jwH7z94.png" caption="Loading all preset scripts" %}

During application startup or adding/removing preset script will display this Loader overlay to show that the application is loading/reloading all preset script files from `presets` folder.

{% include figure.html src="http://i.imgur.com/QIiIiPb.png" caption="Application UI once finished loading preset scripts" %}

{% include figure.html src="http://i.imgur.com/aumSwRz.png" caption="Example of executing PowerShell script from selected preset script" %}

{% include figure.html src="http://i.imgur.com/wkeT8Yo.png" caption="Example of selecting output lines for exporting to a text file" %}

{% include figure.html src="http://i.imgur.com/cJBS41G.png" caption="Example of saving current script as new preset script" %}

{% include figure.html src="http://i.imgur.com/DGwi2J7.png" caption="Create a new name for the script" %}

{% include figure.html src="http://i.imgur.com/D6rnHDz.png" caption="Importing script from PowerShell script file (.ps1)" %}

### Preset Scripts

Preset scripts are stored in the plain text file format in "presets" folder where the title of the script is the filename of the text file itself. This makes thing easier to manually modify the script or to add a batch of scripts WITHOUT needing to run the application. It's more manageable, easy to backup or synchronize with the cloud storage service.

### Source Code and Downloads

Asynchronous PowerShell Scripter source code is available on [GitHub](https://github.com/heiswayi/AsyncPowerShellScripter) and licensed under [MIT License](https://github.com/heiswayi/AsyncPowerShellScripter/blob/master/LICENSE.md). The source code is personally maintained by me, however if anyone interested to contribute, feel free to fork, make changes and pull request.

To download the binary package (executable file), you may visit the [release page here](https://github.com/heiswayi/AsyncPowerShellScripter/releases).

### Credits

This project is originally inspired from or a derivative works of [Asynchronously Execute PowerShell Scripts from C# WinForms by jpmik](https://www.codeproject.com/Articles/18409/Asynchronously-Execute-PowerShell-Scripts-from-C).
