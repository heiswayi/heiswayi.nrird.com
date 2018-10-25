---
layout: post
title: Writing a simple singleton pattern class using .NET 4's Lazy type
description: Here's a simple singleton pattern to turn your class into a singleton class. It's really simple and perform well, best used with time-consuming operation class in .NET C# programming.
keywords: singleton pattern, .net 4, laziness, lambda expression
tags: [Singleton, C#, Lambda Expression, Programming]
comments: true
---

### What is singleton class?

Recently, most of Microsoft .NET based applications are using .NET 4 or higher. There are debates around saying either singleton is an anti-pattern or not and mostly said yes when it is overused. However, there are times where it becomes useful, especially for simple application development. Singletons make having single instances easy. They allow for single allocations and instances of data.

This is the most common way to implement multithreaded singleton class:

```csharp
using System;

namespace SingletonExample
{
    public sealed class Singleton
    {
        private static volatile Singleton instance;
        private static object syncRoot = new Object();

        private Singleton() {}

        public static Singleton Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (syncRoot)
                    {
                        if (instance == null)
                            instance = new Singleton();
                    }
                }
                return instance;
            }
        }
    }
}
```

### Singleton pattern based on System.Lazy

So, here's my favorite way of implementing the singleton pattern by using `System.Lazy<T>` type. All you need to do is to pass a delegate to the constructor which calls the single constructor, which is done most easily with a lambda expression as shown below:

```csharp
using System;

namespace SingletonExample
{
    public sealed class Singleton
    {
        private static readonly Lazy<Singleton> lazy = new Lazy<Singleton>(() => new Singleton());
        public static Singleton Instance { get { return lazy.Value; } }

        private Singleton() {}

        // Example method
        public void Foo() {}
        public void Bar() {}
    }
}
```

Usage example:

```csharp
using System;

namespace SingletonExample
{
    // Main program class
    class Program
    {
        static void Main(string[] args)
        {
            Singleton.Instance.Foo();
            Singleton.Instance.Bar();
        }
    }
}
```

That's it, simple and quick!