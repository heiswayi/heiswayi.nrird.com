---
layout: project
title: Directory Crawler
description: Simple command-line utility program to crawl all accessible directories recursively within a target directory and outputs the results into a text file.
keywords: c# programming, console application, directory crawler, get directories
tags: [C#, Utility, Project, Open Source]
comments: true
---

Directory Crawler is a simple command-line utility program that is built in .NET C# to crawl all accessible directories within a target directory (as an entry point) and output the results to a text file. I created this utility program because I need to monitor some shared directories within a local network.

{% include figure.html src="https://i.imgur.com/Re1267D.gif" caption="Showing how the program looked like in action" %}

### Usage

Command:

```shell
DirectoryCrawler.exe /targetdir=<PATH_TO_TARGET_FOLDER> 
```

After the program finished running, an output text file will be created within the program base folder and if you open the text file, you will get a list of accessible directories within the target directory.

Example of output text file:

{% include figure.html src="http://i.imgur.com/qaUZ9n3.png" %}

### Source Code

The source code of this program is available on [GitHub](https://github.com/heiswayi/DirectoryCrawler), and you may need to compile it by yourself using Visual Studio software.
