---
layout: project
title: Dotfuscated Checker
description: Simple GUI tool built in .NET C# and WPF to check for obfuscated assemblies by Dotfuscator software and digital signing at a glance.
keywords: c# programming, dotfuscated checker, obfuscated assemblies, dotfuscator, dotfuschecker, .net obfuscation, dotfuscation checking, digital signing checking
tags: [C#, WPF, Project]
comments: true
---

Dotfuscated Checker is a simple GUI tool that I built in .NET C# and WPF **to help QA engineer to check at a glance of eyes that the required assemblies extracted from our app installer that deployed by our automated build process are obfuscated and digitally signed**. This checking guarantees that the obfuscation and digital signing set up by our build engineer on the automated build definition are not missing anything.

{% include figure.html src="https://i.imgur.com/2iYCNYO.png" caption="Dotfuscated Checker" %}

If you want to give a try for this tool, you can download [the precompiled version here](https://www.dropbox.com/s/8lss51zhhx0p4xq/DotfuscatedCheckerV1.zip?dl=0) (unofficial beta version). This tool requires [.NET Framework 4.6.1](https://www.microsoft.com/en-us/download/details.aspx?id=49981) (minimum).
