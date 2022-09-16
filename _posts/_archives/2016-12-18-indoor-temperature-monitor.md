---
layout: project
title: Indoor Temperature Monitor
description: A simple DIY project based on Arduino, a .NET app used to record and monitor indoor temperature.
tags: [C#, SerialPort, Oxyplot, Arduino, Project, Open Source, Programming]
---

Indoor Temperature Monitor is a simple DIY project based on Arduino, a .NET app that used to record and monitor indoor temperature. Since I have an old, unused Arduino Uno board, so I bought [1-wire digital temperature sensor (DS18B20)](https://www.maximintegrated.com/en/products/analog/sensors-and-sensor-interface/DS18B20.html) and made use of it for this project.



### Software development

Indoor Temperature Monitor is a simple GUI app written in .NET C# and WPF. This application uses [OxyPlot](http://www.oxyplot.org/) library to plot the graph that reads temperature values sent by Arduino board using [serial port](https://msdn.microsoft.com/en-us/library/system.io.ports.serialport) connection. The background color of the current temperature will automatically change based on a certain temperature range. The temperature reading will be logged into a CSV file for a certain interval of time.

{% include image.html src="assets/images/8CPtSVg.png" caption="IndoorTempMonitor - simple GUI app written .NET C# and WPF" %}

<a href="https://github.com/heiswayi/IndoorTempMonitor" class="button big">Source Code on GitHub</a>



### Hardware development

#### Arduino board setup with DS18B20

{% include image.html src="assets/images/9OlPFLG.png" caption="Graphical representation for DS18B20 with Arduino Uno" %}

#### Arduino code

Here's the Arduino sketch, compiled with [Arduino software](https://www.arduino.cc/en/Main/Software) v1.6.13:

```c
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 2

OneWire ourWire(ONE_WIRE_BUS);
DallasTemperature sensors(&ourWire);

void setup()
{
    delay(1000);
    Serial.begin(9600);
    delay(1000);
    sensors.begin();
}

void loop()
{
    sensors.requestTemperatures();
    Serial.println(sensors.getTempCByIndex(0));
    delay(1000);
}
```