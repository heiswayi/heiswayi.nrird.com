---
layout: project
title: Asynchronous PowerShell Scripter (WPF Version)
description: Just another PowerShell scripter tool written in .NET C# and WPF to manage, run and learn PowerShell scripting.
tags: [C#, WPF, PowerShell, Project, Open Source]
comments: true
---

Originally inspired from [jpmik's Asynchronously Execute PowerShell Scripts](https://www.codeproject.com/Articles/18409/Asynchronously-Execute-PowerShell-Scripts-from-C), Asynchronous PowerShell Scripter is just another PowerShell scripter tool that has been undergone a remake in .NET C# and _WPF_.

**Other Features:**

- Save new or remove PowerShell preset scripts.
- Import PowerShell script file directly.
- Drag-n-drop PowerShell script file onto the Script Editor.
- Export selected lines or all lines output into a text file.

<a href="https://github.com/heiswayi/AsyncPowerShellScripter" class="button big">Source Code on GitHub</a>

<hr class="break">

### Screenshots

{% include figure.html src="assets/images/jwH7z94.png" caption="Loading all preset scripts" %}

During application startup or adding/removing preset script will display this Loader overlay to show that the application is loading/reloading all preset script files from `presets` folder.

{% include figure.html src="assets/images/QIiIiPb.png" caption="Application UI once finished loading preset scripts" %}

{% include figure.html src="assets/images/aumSwRz.png" caption="Example of executing PowerShell script from selected preset script" %}

{% include figure.html src="assets/images/wkeT8Yo.png" caption="Example of selecting output lines for exporting to a text file" %}

{% include figure.html src="assets/images/cJBS41G.png" caption="Example of saving current script as new preset script" %}

{% include figure.html src="assets/images/DGwi2J7.png" caption="Create a new name for the script" %}

{% include figure.html src="assets/images/D6rnHDz.png" caption="Importing script from PowerShell script file (.ps1)" %}

<hr class="break">

### Preset scripts

Preset scripts are stored in the plain text file format in "presets" folder where the title of the script is the filename of the text file itself. This makes thing easier to manually modify the script or to add a batch of scripts WITHOUT needing to run the application. It's more manageable, easy to backup or synchronize with the cloud storage service.
