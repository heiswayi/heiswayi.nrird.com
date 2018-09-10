---
layout: post
title: Writing a simple logger utility class in .NET
description: Just another simple logger utility class that I wrote for my own use in some of my .NET projects.
keywords: c# programming, simple logger class
tags: [C#, Utility, Open Source, Programming]
comments: true
---

When I work with minor .NET projects, sometimes I need a logger utility to easily do the logging for me to debug the application during the run-time. So, I have wrote my own simple logger utility class that I can simply use for my projects without using any other logger library or utility.

### Source code

File name: `SimpleLogger.cs` // Mirror link: [Gist](https://git.io/vpfKC)

```csharp
public class SimpleLogger
{
    private readonly string datetimeFormat;
    private readonly string logFilename;

    /// <summary>
    /// Initiate an instance of SimpleLogger class constructor.
    /// If log file does not exist, it will be created automatically.
    /// </summary>
    public SimpleLogger()
    {
        datetimeFormat = "yyyy-MM-dd HH:mm:ss.fff";
        logFilename = System.Reflection.Assembly.GetExecutingAssembly().GetName().Name + ".log";

        // Log file header line
        string logHeader = logFilename + " is created.";
        if (!System.IO.File.Exists(logFilename))
        {
            WriteLine(System.DateTime.Now.ToString(datetimeFormat) + " " + logHeader, false);
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

        WriteLine(pretext + text);
    }

    private void WriteLine(string text, bool append = true)
    {
        try
        {
            using (System.IO.StreamWriter writer = new System.IO.StreamWriter(logFilename, append, System.Text.Encoding.UTF8))
            {
                if (text != "")
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

### How to use

To get started, just initialize the `SimpleLogger` class. Initializing the constructor will create a fresh new log file if the log file doesn't yet exist. **The log file will be created in the same folder with the application assembly file and the log file name will follow the executing assembly name.** For example, let say the application file name is `SimpleLoggerDemo.exe`, so the log file name would be `SimpleLoggerDemo.log`.

Here's the example code may look like:

```csharp
namespace SimpleLoggerDemo
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // Instantiate the class
            var logger = new SimpleLogger(); // Will create a fresh new log file if it doesn't exist.

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
