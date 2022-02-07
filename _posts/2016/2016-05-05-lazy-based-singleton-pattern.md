---
layout: post
title: Creating Lazy-based singleton class in .NET
description: "How to convert your C# class to become a singleton pattern based on System.Lazy<T>"
tags: [Singleton, C#, Programming]
---

Here is an example to convert a C# class into a singleton pattern based [System.Lazy](https://docs.microsoft.com/en-us/dotnet/api/system.lazy-1):

```csharp
using System;

namespace MyNamespace
{
    // 1. Make the class as a "public sealed"
    public sealed class MyClassName
    {
        // 2. Add these lines of code
        private static readonly Lazy<MyClassName> lazy = new Lazy<MyClassName>(() => new MyClassName());
        public static MyClassName Instance { get { return lazy.Value; } }

        // 3. Make the constructor as "private"
        private MyClassName() {}

        // 4. Example methods we want to expose
        public void MyFooFunction() {}
        public void MyBarFunction() {}
    }
}
```

Here is how we will use it:

```csharp
using System;
using MyNamespace;

namespace ExampleProgram
{
    class Program
    {
        static void Main(string[] args)
        {
            MyClassName.Instance.MyFooFunction();
            MyClassName.Instance.MyBarFunction();
        }
    }
}
```