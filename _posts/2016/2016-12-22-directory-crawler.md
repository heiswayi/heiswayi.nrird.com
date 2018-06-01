---
layout: post
title: Directory Crawler
description: A simple command-line program to crawl all accessible directories recursively within a target directory and outputs the results into a text file.
keywords: c# programming, console application, directory crawler, get directories
tags: [CSharp, Console Application, Project]
comments: true
---

Directory Crawler is a simple command-line program that is built in .NET C# to crawl all accessible directories within a target directory (entry point) and output the results to a text file. I created this program because I need to monitor some shared directories within a local network.

Command:

```shell
DirectoryCrawler.exe /targetdir=<PATH_TO_TARGET_FOLDER> 
```

### Animated screenshot

![DirectoryCrawler](https://i.imgur.com/Re1267D.gif)

After the program finished running, an output text file will be created within the program base folder and if you open the text file, you will get a list of accessible directories within the target directory.

Example of output text file:

![Output file](http://i.imgur.com/qaUZ9n3.png)

### Source Code

You may need to compile by your own. You may use the latest version Visual Studio Community.

[View source code on GitHub](https://github.com/heiswayi/DirectoryCrawler)
