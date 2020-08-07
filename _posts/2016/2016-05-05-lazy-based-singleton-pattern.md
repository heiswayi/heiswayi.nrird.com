---
layout: post
title: How to create a Lazy-based singleton class in .NET
description: "Convert your C# class to become a singleton pattern based on System.Lazy<T>"
tags: [Singleton, C#, Programming]
comments: true
---

To convert your C# class into a singleton pattern based on [System.Lazy](https://docs.microsoft.com/en-us/dotnet/api/system.lazy-1), all you need to do is just adding these two lines of code into your class:

```csharp
private static readonly Lazy<YourClass> lazy = new Lazy<YourClass>(() => new YourClass());
public static YourClass Instance { get { return lazy.Value; } }
```

Example:

```csharp
using System;

namespace YourNamespace
{
    // 1. Make your class as a "public sealed" class
    public sealed class YourClass
    {
        // 2. Add these lines of code
        private static readonly Lazy<YourClass> lazy = new Lazy<YourClass>(() => new YourClass());
        public static YourClass Instance { get { return lazy.Value; } }

        // 3. Make your constructor as "private"
        private YourClass() {}

        // 4. Example methods you want to expose
        public void Foo() {}
        public void Bar() {}
    }
}
```

And this is how you or other people will use your singleton class:

```csharp
using System;
using YourNamespace;

namespace ExampleProgram
{
    class Program
    {
        static void Main(string[] args)
        {
            YourClass.Instance.Foo();
            YourClass.Instance.Bar();
        }
    }
}
```