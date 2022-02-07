---
layout: post
title: Singleton serial port manager class in .NET
description: A snippet of singleton class written in .NET C# for handling serial data communication.
tags: [Programming, C#, SerialPort]
---

_SerialPortManager.cs_ file contains a snippet of singleton class written in .NET C# that I wrote and used in some of my .NET projects to handle serial data communication, especially for the projects that required interfacing with [Arduino](https://www.arduino.cc/) board. This class basically is a wrapper written on top of [System.IO.Ports.SerialPort class](https://msdn.microsoft.com/en-us/library/system.io.ports.serialport).

<script src="https://gist.github.com/heiswayi/80eda1a6905ba4edee8bd21a45f3a22d.js"></script>
<noscript><p class="warning">
Embedding the GitHub Gist does not work here because your browser does not support JavaScript or JavaScript has been disabled. Here is the link to <a href="https://gist.github.com/heiswayi/80eda1a6905ba4edee8bd21a45f3a22d">SerialPortManager.cs</a> source code on GitHub Gist.
</p></noscript>


### Example code on how to use it

There is an event called `OnDataReceived` for you to subscribe to retrieve the data.

Example:

```csharp
using HeiswayiNrird.SomethingManagers;
using System.Windows;

namespace SerialPortExample
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Subscribe to the event
            SerialPortManager.Instance.OnDataReceived += Handler_OnDataReceived;
        }

        // Event handler
        private void Handler_OnDataReceived(object sender, string data)
        {
            // TODO
            // Process your 'data' here...
        }
    }
}
```

Alternatively you can use anonymous function and marshall it to the main UI thread.

Example:

```csharp
using HeiswayiNrird.SomethingManagers;
using System;
using System.Windows;

namespace SerialPortExample
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Subscribe to the event
            SerialPortManager.Instance.OnDataReceived += (sender, data) =>
            {
                // TODO
                // Process your 'data' here...
                double value = Convert.ToDouble(incomingData); // Assuming the 'data' contains value "123"...

                // Update the value to UI component...
                Application.Current.Dispatcher.BeginInvoke(new Action(() =>
                {
                    BindingTextBoxValue = value;
                }));
            };
        }

        // Binding properties
        public double BindingTextBoxValue { get; set; }
    }
}
```



### Opening or closing the serial port connection

Example:

```csharp
// To open/start serial port on COM4 with 9600 bps
SerialPortManager.Instance.Open("COM4", 9600);

// To close/stop serial port on COM4
SerialPortManager.Instance.Close();
```

Events to subscribe:

- `OnStatusChanged` - to get the status message.
- `OnSerialPortOpened` - to know if the serial port is opened or not.

Example:

```csharp
using HeiswayiNrird.SomethingManagers;
using System.Windows;

namespace SerialPortExample
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Subscribe to the event
            SerialPortManager.Instance.OnStatusChanged += (sender, status) =>
            {
                // Update connection status message to UI component
                ConnectionStatus = status;
            };
        }

        // Binding properties
        public string ConnectionStatus { get; set; }
    }
}
```



### How this class avoids the deadlock issue

`SerialPortManager` class uses `ReadPort()` method to be run on a new different thread and implements `while` loop statement for acquiring or reading data from the serial port. When `SerialPortManager.Instance.Close()` method is called, `_keepReading` variable will be set to `false` which will stop the app UI from receiving and updating the data while waiting the thread is fully terminated.

Using `System.IO.Ports.SerialPort.Close()` method directly on the app UI thread to stop acquiring/reading data will cause a deadlock issue or hang the application. This is because the serial port base stream is locked while serial port events are being handled.
