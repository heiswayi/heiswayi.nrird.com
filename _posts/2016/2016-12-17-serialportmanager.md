---
layout: post
title: Singleton serial port manager class in .NET
description: A snippet of singleton class written in .NET C# for handling serial data communication.
tags: [Programming, C#, SerialPort]
---

The `SerialPortManager.cs` file contains a snippet of a singleton class written in .NET C# that I wrote and used in some of my .NET projects to handle serial data communication, particularly for projects that required interfacing with an Arduino board. This class is essentially a wrapper written on top of the [`System.IO.Ports.SerialPort`](https://msdn.microsoft.com/en-us/library/system.io.ports.serialport) class.

### Full source code ([Gist](https://gist.github.com/heiswayi/80eda1a6905ba4edee8bd21a45f3a22d))

```cs
/*
MIT License

Copyright (c) 2016 Heiswayi Nrird

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

using System;
using System.IO;
using System.IO.Ports;
using System.Threading;

namespace HeiswayiNrird.SomethingManagers
{
    public sealed class SerialPortManager
    {
        private static readonly Lazy<SerialPortManager> lazy = new Lazy<SerialPortManager>(() => new SerialPortManager());
        public static SerialPortManager Instance { get { return lazy.Value; } }

        private SerialPort _serialPort;
        private Thread _readThread;
        private volatile bool _keepReading;

        private SerialPortManager()
        {
            _serialPort = new SerialPort();
            _readThread = null;
            _keepReading = false;
        }

        /// <summary>
        /// Update the serial port status to the event subscriber
        /// </summary>
        public event EventHandler<string> OnStatusChanged;

        /// <summary>
        /// Update received data from the serial port to the event subscriber
        /// </summary>
        public event EventHandler<string> OnDataReceived;

        /// <summary>
        /// Update TRUE/FALSE for the serial port connection to the event subscriber
        /// </summary>
        public event EventHandler<bool> OnSerialPortOpened;

        /// <summary>
        /// Return TRUE if the serial port is currently connected
        /// </summary>
        public bool IsOpen { get { return _serialPort.IsOpen; } }

        /// <summary>
        /// Open the serial port connection using basic serial port settings
        /// </summary>
        /// <param name="portname">COM1 / COM3 / COM4 / etc.</param>
        /// <param name="baudrate">0 / 100 / 300 / 600 / 1200 / 2400 / 4800 / 9600 / 14400 / 19200 / 38400 / 56000 / 57600 / 115200 / 128000 / 256000</param>
        /// <param name="parity">None / Odd / Even / Mark / Space</param>
        /// <param name="databits">5 / 6 / 7 / 8</param>
        /// <param name="stopbits">None / One / Two / OnePointFive</param>
        /// <param name="handshake">None / XOnXOff / RequestToSend / RequestToSendXOnXOff</param>
        public void Open(
            string portname = "COM1",
            int baudrate = 9600,
            Parity parity = Parity.None,
            int databits = 8,
            StopBits stopbits = StopBits.One,
            Handshake handshake = Handshake.None)
        {
            Close();

            try
            {
                _serialPort.PortName = portname;
                _serialPort.BaudRate = baudrate;
                _serialPort.Parity = parity;
                _serialPort.DataBits = databits;
                _serialPort.StopBits = stopbits;
                _serialPort.Handshake = handshake;

                _serialPort.ReadTimeout = 50;
                _serialPort.WriteTimeout = 50;

                _serialPort.Open();
                StartReading();
            }
            catch (IOException)
            {
                if (OnStatusChanged != null)
                    OnStatusChanged(this, string.Format("{0} does not exist.", portname));
            }
            catch (UnauthorizedAccessException)
            {
                if (OnStatusChanged != null)
                    OnStatusChanged(this, string.Format("{0} already in use.", portname));
            }
            catch (Exception ex)
            {
                if (OnStatusChanged != null)
                    OnStatusChanged(this, "Error: " + ex.Message);
            }

            if (_serialPort.IsOpen)
            {
                string sb = StopBits.None.ToString().Substring(0, 1);
                switch (_serialPort.StopBits)
                {
                    case StopBits.One:
                        sb = "1"; break;
                    case StopBits.OnePointFive:
                        sb = "1.5"; break;
                    case StopBits.Two:
                        sb = "2"; break;
                    default:
                        break;
                }

                string p = _serialPort.Parity.ToString().Substring(0, 1);
                string hs = _serialPort.Handshake == Handshake.None ? "No Handshake" : _serialPort.Handshake.ToString();

                if (OnStatusChanged != null)
                    OnStatusChanged(this, string.Format(
                    "Connected to {0}: {1} bps, {2}{3}{4}, {5}.",
                    _serialPort.PortName,
                    _serialPort.BaudRate,
                    _serialPort.DataBits,
                    p,
                    sb,
                    hs));

                if (OnSerialPortOpened != null)
                    OnSerialPortOpened(this, true);
            }
            else
            {
                if (OnStatusChanged != null)
                    OnStatusChanged(this, string.Format(
                    "{0} already in use.",
                    portname));

                if (OnSerialPortOpened != null)
                    OnSerialPortOpened(this, false);
            }
        }

        /// <summary>
        /// Close the serial port connection
        /// </summary>
        public void Close()
        {
            StopReading();
            _serialPort.Close();

            if (OnStatusChanged != null)
                OnStatusChanged(this, "Connection closed.");

            if (OnSerialPortOpened != null)
                OnSerialPortOpened(this, false);
        }

        /// <summary>
        /// Send/write string to the serial port
        /// </summary>
        /// <param name="message"></param>
        public void SendString(string message)
        {
            if (_serialPort.IsOpen)
            {
                try
                {
                    _serialPort.Write(message);

                    if (OnStatusChanged != null)
                        OnStatusChanged(this, string.Format(
                        "Message sent: {0}",
                        message));
                }
                catch (Exception ex)
                {
                    if (OnStatusChanged != null)
                        OnStatusChanged(this, string.Format(
                            "Failed to send string: {0}",
                            ex.Message));
                }
            }
        }

        private void StartReading()
        {
            if (!_keepReading)
            {
                _keepReading = true;
                _readThread = new Thread(ReadPort);
                _readThread.Start();
            }
        }

        private void StopReading()
        {
            if (_keepReading)
            {
                _keepReading = false;
                _readThread.Join();
                _readThread = null;
            }
        }

        private void ReadPort()
        {
            while (_keepReading)
            {
                if (_serialPort.IsOpen)
                {
                    //byte[] readBuffer = new byte[_serialPort.ReadBufferSize + 1];
                    try
                    {
                        //int count = _serialPort.Read(readBuffer, 0, _serialPort.ReadBufferSize);
                        //string data = Encoding.ASCII.GetString(readBuffer, 0, count);
                        string data = _serialPort.ReadLine();

                        if (OnDataReceived != null)
                            OnDataReceived(this, data);
                    }
                    catch (TimeoutException) { }
                }
                else
                {
                    TimeSpan waitTime = new TimeSpan(0, 0, 0, 0, 50);
                    Thread.Sleep(waitTime);
                }
            }
        }
    }
}
```


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
