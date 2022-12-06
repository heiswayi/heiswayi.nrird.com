---
layout: post
title: Simple logger utility class in .NET
description: Just another simple logger utility class that I wrote for my own use in some of my .NET projects.
tags: [C#, Utility, Programming]
---

This is a simple C# utility class that I wrote to handle logging for small .NET projects.

### Full source code ([Gist](https://gist.github.com/heiswayi/69ef5413c0f28b3a58d964447c275058))

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

public class SimpleLogger
{
    private const string FILE_EXT = ".log";
    private readonly object fileLock = new object();
    private readonly string datetimeFormat;
    private readonly string logFilename;

    /// <summary>
    /// Initiate an instance of SimpleLogger class constructor.
    /// If log file does not exist, it will be created automatically.
    /// </summary>
    public SimpleLogger()
    {
        datetimeFormat = "yyyy-MM-dd HH:mm:ss.fff";
        logFilename = System.Reflection.Assembly.GetExecutingAssembly().GetName().Name + FILE_EXT;

        // Log file header line
        string logHeader = logFilename + " is created.";
        if (!System.IO.File.Exists(logFilename))
        {
            WriteLine(System.DateTime.Now.ToString(datetimeFormat) + " " + logHeader);
        }
    }

    /// <summary>
    /// Log a DEBUG message
    /// </summary>
    /// <param name="text">Message</param>
    public void Debug(string text)
    {
        WriteFormattedLog(LogLevel.DEBUG, text);
    }

    /// <summary>
    /// Log an ERROR message
    /// </summary>
    /// <param name="text">Message</param>
    public void Error(string text)
    {
        WriteFormattedLog(LogLevel.ERROR, text);
    }

    /// <summary>
    /// Log a FATAL ERROR message
    /// </summary>
    /// <param name="text">Message</param>
    public void Fatal(string text)
    {
        WriteFormattedLog(LogLevel.FATAL, text);
    }

    /// <summary>
    /// Log an INFO message
    /// </summary>
    /// <param name="text">Message</param>
    public void Info(string text)
    {
        WriteFormattedLog(LogLevel.INFO, text);
    }

    /// <summary>
    /// Log a TRACE message
    /// </summary>
    /// <param name="text">Message</param>
    public void Trace(string text)
    {
        WriteFormattedLog(LogLevel.TRACE, text);
    }

    /// <summary>
    /// Log a WARNING message
    /// </summary>
    /// <param name="text">Message</param>
    public void Warning(string text)
    {
        WriteFormattedLog(LogLevel.WARNING, text);
    }

    private void WriteLine(string text, bool append = false)
    {
        try
        {
            if (string.IsNullOrEmpty(text))
            {
                return;
            }
            lock (fileLock) 
            {
                using (System.IO.StreamWriter writer = new System.IO.StreamWriter(logFilename, append, System.Text.Encoding.UTF8))
                {
                    writer.WriteLine(text);
                }
            }
        }
        catch
        {
            throw;
        }
    }

    private void WriteFormattedLog(LogLevel level, string text)
    {
        string pretext;
        switch (level)
        {
            case LogLevel.TRACE:
                pretext = System.DateTime.Now.ToString(datetimeFormat) + " [TRACE]   ";
                break;
            case LogLevel.INFO:
                pretext = System.DateTime.Now.ToString(datetimeFormat) + " [INFO]    ";
                break;
            case LogLevel.DEBUG:
                pretext = System.DateTime.Now.ToString(datetimeFormat) + " [DEBUG]   ";
                break;
            case LogLevel.WARNING:
                pretext = System.DateTime.Now.ToString(datetimeFormat) + " [WARNING] ";
                break;
            case LogLevel.ERROR:
                pretext = System.DateTime.Now.ToString(datetimeFormat) + " [ERROR]   ";
                break;
            case LogLevel.FATAL:
                pretext = System.DateTime.Now.ToString(datetimeFormat) + " [FATAL]   ";
                break;
            default:
                pretext = "";
                break;
        }

        WriteLine(pretext + text, true);
    }

    [System.Flags]
    private enum LogLevel
    {
        TRACE,
        INFO,
        DEBUG,
        WARNING,
        ERROR,
        FATAL
    }
}
```

### Example code on how to use it

Simply instantiate the `SimpleLogger` class to a local variable:

```csharp
var logger = new SimpleLogger();
```

- Create a fresh new log file if the log file does not exist yet.
- The log file will be created in the same folder as the executing assembly.
- The log file name will follow the name of the executing assembly.

Full example:

```csharp
namespace SimpleLoggerDemo
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var logger = new SimpleLogger();

            // To log Trace message
            logger.Trace("--> Trace in message here...");

            // To log Info message
            logger.Info("Anything to info here...");

            // To log Debug message
            logger.Debug("Something to debug...");

            // To log Warning message
            logger.Warning("Anything to put as a warning log...");

            // To log Error message
            logger.Error("Error message...");

            // To log Fatal error message
            logger.Fatal("Fatal error message...");
        }
    }
}
```
