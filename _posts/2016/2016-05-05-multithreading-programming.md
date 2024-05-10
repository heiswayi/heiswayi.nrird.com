---
layout: post
title: Multithreading programming in .NET
description: Demonstrating multithreading programming available in .NET System.Threading.
tags: [csharp, multithreading, dotnet, programming]
---

## Understanding multithreading

Multithreading is a prevalent programming and execution model that enables the concurrent existence of multiple threads within a single process. While these threads share the process's resources, they can execute independently. In contrast, single-threading processes one command at a time.

The primary aim of multithreading is to enable computers to perform more than one task simultaneously. While it may not significantly enhance overall speed on a single-core computer, it proves advantageous on systems with multiple processor cores. In such cases, multithreading leverages additional cores to execute separate instructions simultaneously or distribute tasks among the cores.

## Multithreading in .NET

In the context of .NET, there are several methods for implementing multithreading, including:

|Multithreading|Description|
|---|---|
| **Thread class** | Responsible for creating and manipulating threads in Windows. |
| **ThreadPool class** | Manages a group of threads, automatically starting tasks when threads are created. |
| **Task class** | Represents asynchronous operations and is part of the Task Parallel Library for running tasks asynchronously and in parallel. |
| **BackgroundWorker class** | Executes operations on a separate thread. |

## Example C# code

Thread class:

```csharp
Thread[] t = new Thread[threadCount];
for (int i = 0; i < threadCount; i++)
{
    t[i] = new Thread(() =>
    {
        DoComplexWork();
    });
    t[i].Priority = ThreadPriority.Highest;
    t[i].Start();
}
foreach (var ct in t)
{
    ct.Join();
}
```

ThreadPool class:

```csharp
using (CountdownEvent signaler = new CountdownEvent(threadCount))
{
    for (int i = 0; i < threadCount; i++)
    {
        ThreadPool.QueueUserWorkItem((x) =>
        {
            DoComplexWork();
            signaler.Signal();
        });
    }
    signaler.Wait();
}
```

Task class:

```csharp
Task[] taskList = new Task[threadCount];
for (int i = 0; i < threadCount; i++)
{
    taskList[i] = new Task(new Action(() =>
    {
        DoComplexWork();
    }));
    taskList[i].Start();
}
Task.WaitAll(taskList);
```

BackgroundWorker class:

```csharp
BackgroundWorker[] backgroundWorkerList = new BackgroundWorker[threadCount];
using (CountdownEvent signaler = new CountdownEvent(threadCount))
{
    for (int i = 0; i < threadCount; i++)
    {
        backgroundWorkerList[i] = new BackgroundWorker();
        backgroundWorkerList[i].DoWork += delegate (object sender, DoWorkEventArgs e)
        {
            DoComplexWork();
            signaler.Signal();
        };
        backgroundWorkerList[i].RunWorkerAsync();
    }
    signaler.Wait();
}
```

### Benchmark summary

The following benchmark data presented herein are derived from the specifications of my personal computer:

|Test|Time Taken|
|---|---|
| Single threading | 8419ms |
| Multithreading using Thread | 7532ms |
| Multithreading using ThreadPool | 2901ms |
| Multithreading using Task | 3061ms |
| Multithreading using BackgroundWorker | 3100ms |

In summary, when compared to single threading and the Thread class, ThreadPool, Task, and BackgroundWorker demonstrate approximately 2x faster performance. Therefore, incorporating multithreading techniques in CPU-intensive tasks can significantly enhance application performance. Among these, the BackgroundWorker class stands out as both user-friendly and popular among developers.