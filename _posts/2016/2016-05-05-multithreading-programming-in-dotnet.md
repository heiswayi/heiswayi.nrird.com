---
layout: post
title: Multithreading programming in .NET
description: Demonstrating multithreading programming available in .NET System.Threading.
tags: [C#, Multithreading, Programming]
---

### What is multithreading?

Multithreading is a widespread programming and execution model that allows multiple threads to exist within the context of one process. They share the process's resources, but they are able to execute independently while the single threading is the processing of one command at a time.

The purpose of threading is to allow computer to do more than one thing at a time. In a single core computer, multithreading won't give much advantages for overall speed. But for computer with multiple processor cores (which is so common these days), multithreading can take advantage of additional cores to perform separate instructions at the same time or by splitting the tasks between the cores.

### Multithreading programming in .NET

There are few ways to do multithreading programming in .NET, for example:
- Using Thread class
- Using ThreadPool class
- Using Task class
- Using BackgroundWorker class

### Code snippets and benchmark results

All the following code snippets have been tested on my PC with the following specs: Intel(R) Core(TM) i3-4130 CPU @ 3.40GHz (2 cores, 4 threads).

#### Thread class

The `Thread` class is used for creating and manipulating a [thread](http://msdn.microsoft.com/en-us/library/windows/desktop/ms684841%28v=vs.85%29.aspx) in Windows.

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

#### ThreadPool class

The `ThreadPool` class manages a group of threads in which tasks are added to a queue and automatically started when threads are created.

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

#### Task class

A `Task` represents asynchronous operation and is part of the [Task Parallel Library](http://msdn.microsoft.com/en-us/library/dd460717%28v=vs.110%29.aspx), a set of APIs for running tasks asynchronously and in parallel.

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

#### BackgroundWorker class

The `BackgroundWorker` class executes an operation on a separate thread.

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

#### Benchmark results

| Single threading | 8419ms |
| Multithreading using Thread | 7532ms |
| Multithreading using ThreadPool | 2901ms |
| Multithreading using Task | 3061ms |
| Multithreading using BackgroundWorker | 3100ms |

To summarize, `ThreadPool`, `Task` and `BackgroundWorker` can perform 2x faster compared to `Thread` and single threading method. So, if you're going to perform any CPU intensive task, you can always take advantage of multithreading programming in your code to have better performance in your application. I could say that `BackgroundWorker` class is easy to use and very popular among developers I have been working with.