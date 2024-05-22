---
layout: post
title: Multithreading programming
description: Demonstrating multithreading programming available in .NET System.Threading.
tags: [csharp, multithreading, dotnet, programming]
---

## Understanding multithreading

Multithreading is a prevalent programming and execution model that enables the concurrent existence of multiple threads within a single process. While these threads share the process's resources, they can execute independently. In contrast, single-threading processes one command at a time.

The primary aim of multithreading is to enable computers to perform more than one task simultaneously. While it may not significantly enhance overall speed on a single-core computer, it proves advantageous on systems with multiple processor cores. In such cases, multithreading leverages additional cores to execute separate instructions simultaneously or distribute tasks among the cores.

## Multithreading in .NET

In the context of .NET, there are several methods for implementing multithreading, including:

|Multithreading Class|Description|
|---|---|
| Thread | Responsible for creating and manipulating threads in Windows. |
| ThreadPool | Manages a group of threads, automatically starting tasks when threads are created. |
| Task | Represents asynchronous operations and is part of the Task Parallel Library for running tasks asynchronously and in parallel. |
| BackgroundWorker | Executes operations on a separate thread. |

## Let's do some benchmarking

### Preparation

I used [OneCompiler](https://onecompiler.com/csharp) to run the code below:

```csharp
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel;
namespace MultithreadingProgramming {
    internal class Program {
        private const int threadCount = 1000; // no. of threads to be spawned
        private const int totalCount = 100000; // no. of spins the actual work is carried out
        private static void Main(string[] args) {
            Thread.CurrentThread.Priority = ThreadPriority.Highest;
            // let's perform CPU intensive task here...
        }
        private static void ComplexWork(int n) {
            for (int j = 0; j < n; j++) {
                for (int i = 1; i < 100; i++) {
                    Fac(i);
                }
            }
        }
        private static double Fac(double n) {
            if (n > 1) {
                return n * Fac(n - 1);
            } else {
                return 1;
            }
        }
    }
}
```

### Using single threading code

```csharp
Stopwatch sw = Stopwatch.StartNew();
ComplexWork(totalCount); // single threading
sw.Stop();
Console.WriteLine("Single threading - elapsed time: {0}ms", sw.ElapsedMilliseconds);
```

### Using Thread class

```csharp
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
```

### Using ThreadPool class

```csharp
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
```

### Using Task class

```csharp
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
```

### Using BackgroundWorker class

```csharp
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
```

## Benchmark summary

The test result is ranked from slowest to fastest.

|Test|Time Taken|
|---|---|
| Single threading | 4432ms |
| Multithreading using Thread | 2994ms |
| Multithreading using ThreadPool | 2647ms |
| Multithreading using BackgroundWorker | 2609ms |
| Multithreading using Task | 2487ms |

In summary, when compared to single threading and the Thread class, ThreadPool, Task, and BackgroundWorker demonstrate approximately 2x faster performance. Therefore, incorporating multithreading techniques in CPU-intensive tasks can significantly enhance application performance.