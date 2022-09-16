---
layout: project
title: Directory Crawler
description: A simple command-line utility program to crawl all accessible directories recursively within a target directory.
tags: [C#, Utility, Project, Open Source]
---

Directory Crawler is a simple command-line utility program that is written in .NET C# to crawl all accessible directories within a target location folder (entry point) and automatically save the results into a text file. I created this utility program because I need to monitor some shared directories in my local networks.

<a href="https://github.com/heiswayi/DirectoryCrawler" class="button big">Source Code on GitHub</a>



### Screenshot

{% include image.html src="assets/images/Re1267D.gif" caption="Animated example of the program" %}



### Usage example

Commandline:

```shell
DirectoryCrawler.exe /targetdir=<PATH_TO_TARGET_FOLDER> 
```

Example result (screenshot):

{% include image.html src="assets/images/qaUZ9n3.png" %}
