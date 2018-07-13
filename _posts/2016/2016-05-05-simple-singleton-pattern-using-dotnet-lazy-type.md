---
layout: post
title: Simple singleton pattern using .NET 4's Lazy type
description: Here's a simple singleton pattern to turn your class into a singleton class. It's really simple and perform well, best used with time-consuming operation class in C# programming.
keywords: singleton pattern, .net 4, laziness, lambda expression
tags: [Singleton, C#, Lambda Expression]
comments: true
---

Recently, most of Microsoft .NET based applications are using .NET 4 or higher. There are debates around saying either singleton is an anti-pattern or not and mostly said yes when it is overused. However, there are times where it becomes useful too, especially for simple application development. Singletons make having single instances easy. They allow for single allocations and instances of data.

So, here's my favorite way of implementing the singleton pattern by using the `System.Lazy<T>` type. All you need to do is to pass a delegate to the constructor which calls the single constructor, which is done most easily with a lambda expression as shown below.

**Example of a custom class implemented with singleton pattern:**

```csharp
using System;

namespace SingletonExample
{
    public sealed class SayHello
    {
        private static readonly Lazy<SayHello> lazy = new Lazy<SayHello>(() => new SayHello());
        public static SayHello Instance { get { return lazy.Value; } }

        // This is the class constructor
        private SayHello() {}

        // This is example method
        public void MyMethod() {}
    }
}
```

**Example on how to use the singleton in the main class:**

```csharp
using System;

namespace SingletonExample
{
    class Program
    {
        static void Main(string[] args)
        {
            // Call MyMethod() function from SayHello class
            SayHello.Instance.MyMethod();
        }
    }
}
```