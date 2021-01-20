---
layout: project
title: Directory Crawler
description: A simple command-line utility program to crawl all accessible directories recursively within a target directory.
tags: [C#, Utility, Project, Open Source]
comments: true
---

Directory Crawler is a simple command-line utility program written in .NET C# to crawl all accessible directories within a target directory (entry point) and save the results into a text file. I created this utility program because I need to monitor some shared directories in some local networks.

<a href="https://github.com/heiswayi/DirectoryCrawler" class="button big">Source Code on GitHub</a>



### Screenshot

{% include figure.html src="assets/images/Re1267D.gif" caption="Showing how the program looked like in action" %}



### Usage example

CLI:

```shell
DirectoryCrawler.exe /targetdir=<PATH_TO_TARGET_FOLDER> 
```

Example result (screenshot):

{% include figure.html src="assets/images/qaUZ9n3.png" %}
