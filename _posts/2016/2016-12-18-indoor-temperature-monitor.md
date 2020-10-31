---
layout: project
title: Indoor Temperature Monitor
description: A simple DIY project based on Arduino, a .NET app used to record and monitor indoor temperature.
tags: [C#, SerialPort, Oxyplot, Arduino, Project, Open Source, Programming]
comments: true
---

Indoor Temperature Monitor is a simple DIY project based on Arduino, a .NET app that used to record and monitor indoor temperature. Since I have an old, unused Arduino Uno board, so I bought [1-wire digital temperature sensor (DS18B20)](https://www.maximintegrated.com/en/products/analog/sensors-and-sensor-interface/DS18B20.html) and made use of it for this project.

<hr class="break">

### Software development

Indoor Temperature Monitor is a simple GUI app written in .NET C# and WPF. This application uses [OxyPlot](http://www.oxyplot.org/) library to plot the graph that reads temperature values sent by Arduino board using [serial port](https://msdn.microsoft.com/en-us/library/system.io.ports.serialport) connection. The background color of the current temperature will automatically change based on a certain temperature range. The temperature reading will be logged into a CSV file for a certain interval of time.

{% include figure.html src="assets/images/8CPtSVg.png" caption="IndoorTempMonitor - simple GUI app written .NET C# and WPF" %}

<a href="https://github.com/heiswayi/IndoorTempMonitor" class="button big">Source Code on GitHub</a>

<hr class="break">

### Hardware development

#### Arduino board setup with DS18B20

{% include figure.html src="assets/images/9OlPFLG.png" caption="Graphical representation for DS18B20 with Arduino Uno" %}

#### Arduino code

Here's the Arduino sketch, compiled with [Arduino software](https://www.arduino.cc/en/Main/Software) v1.6.13:

```c
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 2 /* Connect to Pin 2 */

/* Set up a oneWire instance to communicate with any OneWire device*/
OneWire ourWire(ONE_WIRE_BUS);

/* Tell Dallas Temperature Library to use oneWire Library */
DallasTemperature sensors(&ourWire);

void setup() /* SETUP: RUNS ONCE */
{

delay(1000);
Serial.begin(9600);
//Serial.println("Temperature Sensor: DS18B20");
delay(1000);

/* Start up the DallasTemperature library */
sensors.begin();

}


void loop() /* LOOP: RUNS CONSTANTLY */
{

//Serial.println();
//Serial.print("Requesting temperature...");
sensors.requestTemperatures(); // Send the command to get temperatures
//Serial.println("DONE");

//Serial.print("Device 1 (index 0) = ");
//Serial.print(sensors.getTempCByIndex(0));
Serial.println(sensors.getTempCByIndex(0));
//Serial.println(" Degrees C");
delay(1000);

}
```