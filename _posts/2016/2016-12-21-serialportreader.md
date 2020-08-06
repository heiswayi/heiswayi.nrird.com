---
layout: post
title: Serial port reader script in PowerShell
description: A simple and complete PowerShell script for reading serial data from a Serial Port and export it into a file.
tags: [Programming, PowerShell, SerialPort, Scripting]
comments: true
---

<a href="https://gist.github.com/heiswayi/10b412aa96d3f35d85f5f8c2e0075a33" class="button big">SerialPortReader.ps1<br><span style="font-size:0.8rem;opacity:0.7">Source Code on Gist</span></a>

This is PowerShell script that I wrote and used to read data from a serial port and export it into a file when I was working with Arduino board. The script is written based on [System.IO.Ports.SerialPort](https://msdn.microsoft.com/en-us/library/system.io.ports.serialport) class.