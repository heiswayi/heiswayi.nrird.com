---
layout: post
title: Simple logger utility class in .NET
description: Just another simple logger utility class that I wrote for my own use in some of my .NET projects.
tags: [C#, Utility, Programming]
comments: true
---

<a href="https://gist.github.com/heiswayi/69ef5413c0f28b3a58d964447c275058" class="button big">SimpleLogger.cs<br><span style="font-size:0.8rem;opacity:0.7">Source Code on Gist</span></a>

This is a simple C# utility class that I wrote to do the app logging for small .NET projects.



### Usage examples

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
