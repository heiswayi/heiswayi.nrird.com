---
layout: project
title: Inhouse Camguard - Live Video Motion Detection Analysis & Data Logging
description: A simple .NET application based on AForge libraries to analyze motion, capture image and data logging from a live webcam feed.
keywords: c# programming, aforge, motion analysis, live video feed, webcam streaming, motion detection, data logging
tags: [C#, WPF, Project]
comments: true
---

Few months ago, I built Inhouse Camguard in my spare time to experiment with some AForge libraries using C# and WPF. AForge.NET Framework is easy to use and we can do many great applications with it. Other than just detecting motion in the live video feed, Inhouse Camguard also can plot a continuous graph showing the sensivity of the motion from the camera source, do data logging with some options and capture the image based on trigger threshold.

{% include figure.html src="https://i.imgur.com/1vAwAmW.png" caption="Inhouse Camguard 1.0" %}

### Application features

- 2 type of motion detection algorithms
- 4 type of motion processing algorithms
- display motion history overlay chart at the bottom of live video feed
- access to Local Video Capture Settings and Crossbar Video Settings tool
- display histogram (luminosity, red, green, blue) of the current video feed
- display motion sensitivity graph plotting
- data logging with some options
- trigger settings with option to capture the image

### Source code & download

<a href="https://github.com/heiswayi/inhousecamguard/releases" class="button big">Download precompiled binary</a> <a href="https://github.com/heiswayi/inhousecamguard" class="button big">Get source code</a>