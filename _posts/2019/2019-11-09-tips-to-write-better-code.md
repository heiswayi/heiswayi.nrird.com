---
layout: post
title: Tips to write a better code
description: I have been using this mental model to improve how I do coding and writing better code.
tags: [Best Practices, Software Engineering, Coding Tips]
comments: true
---

Coding is part of my life. That's what I do the most now, for living. Everyday I learn to improve my coding skill. I love the errors in code. Every error is giving me a challenge, and at the same time an opportunity for me to learn my mistake. One day, while I was reading some posts and comments on [Hacker News](https://news.ycombinator.com/), I came across that someone had mentioned somewhere in the comments about something to consider on how to write a better code. Since then, I have been asking myself each time I started to code and it becomes some sort of a mental model to me. Yep, it worked and helped in improving my code.

Here are what you need to ask yourself whenever you started to code:

1. Is your code working regardless of how ugly or buggy it was?
2. Is your code now working correctly, meeting all the acceptance criteria?
3. Is your code simple enough?
4. Is your code getting optimized properly?



### Working code

First thing you need is a working code. Don't bother if your code is just experimental, proof-of-concept or prototype. Don't bother if your code looks ugly or buggy. The only thing that matter is that it works in the way you are expecting at first. Without the working code, it doesn't prove you anything on the thing you have done. Making the code works first is crucial. There are many things you can do with the working code, starting with writing the unit test for it.



### Working correctly. Correctness of the code.

Working code is not complete. It needs to meet all the acceptance criteria. These acceptance criteria usually are written based on the use cases from your users (or customers). The same feature that may be used in different ways. Meeting all of these acceptance criteria must be validated. Correctness is the destination of any piece of software (ultimately the goal of any piece of software is to work).



### Simplicity in code

> _A good code should be read like a story, not like a puzzle._

Complex code is error-prone. If your code complexity is high, you should do your best to reduce or minimize that complexity. If the problem can be solved with less code, it would be better. The importance of simplicity in code is to ensure the code is easier to be maintained, debugged and extended (e.g. API compatibility). There are few coding principles that are designed to help you code with simplicity mind:

- [Don't Repeat Yourself (DRY) principle](https://thevaluable.dev/dry-principle-cost-benefit-example/)
- [Keep It Simple Stupid (KISS) principle](https://thevaluable.dev/kiss-principle-explained/)

Other examples:

- Writing self-explainable code would be the best documentation.
- Handling code duplication with _Rule of 3: Write once, copy twice and refactor after 3_.



### Getting optimized

If you plan properly before you code, there is nothing much you can do here. In term of code performance, you should be measuring or benchmarking your code performance as earlier as possible, probably during the design time. When come to here, if you're not satisfied with the current code performance, then this is where you shall start the optimization works, e.g. changing existing algorithm or method.

Another way that you may do the optimization works here is that when there is a bug that required you to change some designs or methods in order to resolve that bug. This is where you may change your code, refactor or restructure the flow.

Here are a few examples on what people mostly do at this stage:

- Change code algorithm/method for better performance.
- Refactor some code due to little change in design requirements or bug fixing.
- Clean up code or fix code linting errors.
- Writing code documentation wherever it's necessary.