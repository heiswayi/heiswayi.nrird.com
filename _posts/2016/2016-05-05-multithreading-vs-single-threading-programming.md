---
layout: post
title: Multithreading programming in .NET
description: Examples of C# code to demonstrate the multithreading programming available in .NET System.Threading.
keywords: multithreading, single threading, sample source code, demonstration, threadpool, task, backgroundworker, windows console application
tags: [C#, Multithreading, Programming]
comments: true
---

### What is multithreading?

Multithreading is a widespread programming and execution model that allows multiple threads to exist within the context of one process. They share the process's resources, but they are able to execute independently while the single threading is the processing of one command at a time.

The purpose of threading is to allow computer to do more than one thing at a time. In a single core computer, multithreading won't give much advantages for overall speed. But for computer with multiple processor cores (which is so common these days), multithreading can take advantage of additional cores to perform separate instructions at the same time or by splitting the tasks between the cores.

### Demo code

Let's write a simple demo code to demonstrate four kind of multithreading programming in .NET C# using `System.Threading`. Here's the basic structure of the code to start:

```csharp
using System;
using System.Diagnostics;
using System.Threading;

namespace MultithreadingVsSingleThreading
{
    internal class Program
    {
        private const int threadCount = 1000; // no. of threads to be spawned
        private const int totalCount = 100000; // no. of spins the actual work is carried out

        private static void Main(string[] args)
        {
            Thread.CurrentThread.Priority = ThreadPriority.Highest;

            // let's perform CPU intensive task here...
            // single threading vs multithreading
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

For single threading programming, we can just simply call the `ComplexWork` method in our `Main` method as shown below:

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

### Multithreading programming

#### 1. Using Thread class

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

#### 2. Using ThreadPool

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

#### 3. Using Task

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

#### 4. Using BackgroundWorker

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

### Output results

```
Single threading - elapsed time: 8419ms
Using Thread - elapsed time: 7532ms
Using ThreadPool - elapsed time: 2901ms
Using Task - elapsed time: 3061ms
Using BackgroundWorker - elapsed time: 3100ms
```

As you can see, for direct method call (single threading) with `Thread` class, there is not much different. But when you use `ThreadPool`, `Task` or `BackgroundWorker`, it takes 2x faster compared to the direct method call. I use Intel(R) Core(TM) i3-4130 CPU @ 3.40GHz (2 cores, 4 threads) when running these tests.

### Bottom line

If you're going to perform any CPU intensive task, you can always take advantage of multithreading programming in your code to have better performance in your application. I could say that `BackgroundWorker` class is easy to use and very popular among developers I have been working with.