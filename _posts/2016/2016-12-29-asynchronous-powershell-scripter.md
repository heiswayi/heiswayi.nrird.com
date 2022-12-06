---
layout: project
title: Asynchronous PowerShell Scripter (WPF Version)
description: Just another PowerShell scripter tool written in .NET C# and WPF to manage, run and learn PowerShell scripting.
tags: [C#, WPF, PowerShell, Project, Open Source]
---

Here is a remake of [jpmik's "Asynchronously Execute PowerShell Scripts"](https://www.codeproject.com/Articles/18409/Asynchronously-Execute-PowerShell-Scripts-from-C) written in .NET C# and WPF, plus the following extra features:

- Save new or remove PowerShell preset scripts.
- Import PowerShell script files directly.
- Drag and drop PowerShell script files onto the Script Editor.
- Export selected lines or all lines of output to a text file.

<a href="https://github.com/heiswayi/AsyncPowerShellScripter" class="button big">Source Code on GitHub</a>



### Screenshots

{% include image.html src="assets/images/jwH7z94.png" caption="Loading all preset scripts" %}

During application startup or adding/removing preset script will display this Loader overlay to show that the application is loading/reloading all preset script files from `presets` folder.

{% include image.html src="assets/images/QIiIiPb.png" caption="Application UI once finished loading preset scripts" %}

{% include image.html src="assets/images/aumSwRz.png" caption="Example of executing PowerShell script from selected preset script" %}

{% include image.html src="assets/images/wkeT8Yo.png" caption="Example of selecting output lines for exporting to a text file" %}

{% include image.html src="assets/images/cJBS41G.png" caption="Example of saving current script as new preset script" %}

{% include image.html src="assets/images/DGwi2J7.png" caption="Create a new name for the script" %}

{% include image.html src="assets/images/D6rnHDz.png" caption="Importing script from PowerShell script file (.ps1)" %}



### Preset scripts

Preset scripts are stored in plain text files in the "presets" folder, where the title of the script is the filename of the text file itself. This makes it easier to manually modify the script or add a batch of scripts without needing to run the application. It is more manageable and easy to back up or synchronize with a cloud storage service.
