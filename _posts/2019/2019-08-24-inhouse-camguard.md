---
layout: project
title: Inhouse Camguard
description: A simple .NET GUI application based on AForge libraries to analyze motion, capture image and perform data logging from a live webcam feed.
tags: [C#, WPF, Project]
---

I created _this Inhouse Camguard app_ few months ago in my spare time to experiment with some AForge libraries using C# and WPF. [AForge.NET Framework](http://www.aforgenet.com/framework/) is easy to use, and I can do many great applications with it. The purpose of this app is to automatically detect a motion from a video feed like a webcam video while plotting a continuous graph showing the sensitivity of that motion. This app can do some data logging and able to capture a static image of the video when the motion sensitivity hit the certain threshold.

<a href="https://github.com/heiswayi/inhousecamguard" class="button big">Source Code on GitHub</a>



### Screenshot

{% include figure.html src="assets/images/1vAwAmW.png" caption="Inhouse Camguard 1.0" %}



### Features

- Contains 2 types of motion detection algorithms.
- Contains 4 types of motion processing algorithms.
- Able to display motion history overlay chart at the bottom of live video feed.
- Able to access to Local Video Capture Settings and Crossbar Video Settings tool.
- Can display histogram (luminosity, red, green, blue) of the current video feed.
- Can display motion sensitivity graph plotting.
- Can do data logging with few options available.
- Has trigger settings with certain options to capture the image.