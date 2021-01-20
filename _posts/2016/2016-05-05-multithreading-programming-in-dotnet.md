---
layout: post
title: Multithreading programming in .NET
description: Demonstrating multithreading programming available in .NET System.Threading.
tags: [C#, Multithreading, Programming]
comments: true
---

### What is multithreading?

Multithreading is a widespread programming and execution model that allows multiple threads to exist within the context of one process. They share the process's resources, but they are able to execute independently while the single threading is the processing of one command at a time.

The purpose of threading is to allow computer to do more than one thing at a time. In a single core computer, multithreading won't give much advantages for overall speed. But for computer with multiple processor cores (which is so common these days), multithreading can take advantage of additional cores to perform separate instructions at the same time or by splitting the tasks between the cores.



### Let's create a simple base program for testing

```csharp
using System;
using System.Diagnostics;
using System.Threading;

namespace MultithreadingProgramming
{
    internal class Program
    {
        private const int threadCount = 1000; // No. of threads to be spawned
        private const int totalCount = 100000; // No. of spins the actual work is carried out

        // PROGRAM ENTRY FUNCTION
        private static void Main(string[] args)
        {
            // Code to perform CPU intensive task will be here
        }

        private static void ComplexWork(int n)
        {
            for (int j = 0; j < n; j++)
            {
                for (int i = 1; i < 100; i++)
                {
                    Fac(i);
                }
            }
        }

        private static double Fac(double n)
        {
            if (n > 1)
            {
                return n * Fac(n - 1);
            }
            else
            {
                return 1;
            }
        }
    }
}
```



### Single threading programming

First, let's see the benchmark for single threading.

```csharp
private static void Main(string[] args)
{
    Thread.CurrentThread.Priority = ThreadPriority.Highest;
    Stopwatch sw = Stopwatch.StartNew();
    ComplexWork(totalCount); // single threading
    sw.Stop();
    Console.WriteLine("Single threading - elapsed time: {0}ms", sw.ElapsedMilliseconds);
}
```

Result:

```
Single threading - elapsed time: 8419ms
```



### Multithreading programming using Thread class

The `Thread` class is used for creating and manipulating a [thread](http://msdn.microsoft.com/en-us/library/windows/desktop/ms684841%28v=vs.85%29.aspx) in Windows.

```csharp
private static void Main(string[] args)
{
    Thread.CurrentThread.Priority = ThreadPriority.Highest;
    RunThreadMode(); // multithreading - using Thread
}

/// <summary>
/// Spawns new threads based on the thread count and starts the activity.
/// </summary>
private static void RunThreadMode()
{
    Stopwatch sw = Stopwatch.StartNew();
    Thread[] t = new Thread[threadCount];

    for (int i = 0; i < threadCount; i++)
    {
        t[i] = new Thread(() =>
        {
            ComplexWork(totalCount / threadCount);
        });
        t[i].Priority = ThreadPriority.Highest;
        t[i].Start();
    }

    // Waits for all the threads to finish.
    foreach (var ct in t)
    {
        ct.Join();
    }
    sw.Stop();
    Console.WriteLine("Using Thread - elapsed time: {0}ms", sw.ElapsedMilliseconds);
}
```

Result:

```
Using Thread - elapsed time: 7532ms
```



### Multithreading programming using ThreadPool

The `ThreadPool` class manages a group of threads in which tasks are added to a queue and automatically started when threads are created.

```csharp
private static void Main(string[] args)
{
    Thread.CurrentThread.Priority = ThreadPriority.Highest;
    RunInThreadPool(); // multithreading - using ThreadPool.QueueUserWorkItem
}

/// <summary>
/// Executes the task in a thread pooling context.
/// </summary>
private static void RunInThreadPool()
{
    Stopwatch sw = Stopwatch.StartNew();
    using (CountdownEvent signaler = new CountdownEvent(threadCount))
    {
        for (int i = 0; i < threadCount; i++)
        {
            ThreadPool.QueueUserWorkItem((x) =>
            {
                ComplexWork(totalCount / threadCount);
                signaler.Signal();
            });
        }
        signaler.Wait();
    }
    sw.Stop();
    Console.WriteLine("Using ThreadPool - elapsed time: {0}ms", sw.ElapsedMilliseconds);
}
```

Result:

```
Using ThreadPool - elapsed time: 2901ms
```



### Multithreading programming using Task

A `Task` represents asynchronous operation and is part of the [Task Parallel Library](http://msdn.microsoft.com/en-us/library/dd460717%28v=vs.110%29.aspx), a set of APIs for running tasks asynchronously and in parallel.

```csharp
private static void Main(string[] args)
{
    Thread.CurrentThread.Priority = ThreadPriority.Highest;
    RunTaskMode(); // multithreading - using Task
}

/// <summary>
/// Creates a new task based on the TPL library.
/// </summary>
private static void RunTaskMode()
{
    Stopwatch sw = Stopwatch.StartNew();
    Task[] taskList = new Task[threadCount];
    for (int i = 0; i < threadCount; i++)
    {
        taskList[i] = new Task(new Action(() =>
        {
            ComplexWork(totalCount / threadCount);
        }));
        taskList[i].Start();
    }
    Task.WaitAll(taskList);
    sw.Stop();
    Console.WriteLine("Using Task - elapsed time: {0}ms", sw.ElapsedMilliseconds);
}
```

Result:

```
Using Task - elapsed time: 3061ms
```



### Multithreading programming using BackgroundWorker

The `BackgroundWorker` class executes an operation on a separate thread.

```csharp
private static void Main(string[] args)
{
    Thread.CurrentThread.Priority = ThreadPriority.Highest;
    RunInBackgroundWorker(); // multithreading - using BackgroundWorker
}

/// <summary>
/// Starts BackgroundWorker to perform the same action.
/// </summary>
private static void RunInBackgroundWorker()
{
    Stopwatch sw = Stopwatch.StartNew();
    BackgroundWorker[] backgroundWorkerList = new BackgroundWorker[threadCount];
    using (CountdownEvent signaler = new CountdownEvent(threadCount))
    {
        for (int i = 0; i < threadCount; i++)
        {
            backgroundWorkerList[i] = new BackgroundWorker();
            backgroundWorkerList[i].DoWork += delegate (object sender, DoWorkEventArgs e)
            {
                ComplexWork(totalCount / threadCount);
                signaler.Signal();
            };
            backgroundWorkerList[i].RunWorkerAsync();
        }
        signaler.Wait();
    }
    sw.Stop();
    Console.WriteLine("Using BackgroundWorker - elapsed time: {0}ms", sw.ElapsedMilliseconds);
}
```

Result:

```
Using BackgroundWorker - elapsed time: 3100ms
```



### Overall results

| Single threading | 8419ms |
| Multithreading using Thread | 7532ms |
| Multithreading using ThreadPool | 2901ms |
| Multithreading using Task | 3061ms |
| Multithreading using BackgroundWorker | 3100ms |

**PC Specs:** Intel(R) Core(TM) i3-4130 CPU @ 3.40GHz (2 cores, 4 threads)

From the results above, I can say that `ThreadPool`, `Task` and `BackgroundWorker` can perform 2x faster compared to `Thread` and single threading method. Of course, the single threading method is the slowest.



If you're going to perform any CPU intensive task, you can always take advantage of multithreading programming in your code to have better performance in your application. I could say that `BackgroundWorker` class is easy to use and very popular among developers I have been working with.