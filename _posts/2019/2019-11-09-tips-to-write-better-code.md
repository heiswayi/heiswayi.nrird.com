---
layout: post
title: Tips to write a better code
description: I have been using this mental model to improve how I do coding or writing better code.
keywords: coding practices, simple rules, better code, workable, working, correctness, simple, simplicity, optimization, optimized
tags: [Best Practices, Software Engineering, Coding Tips]
comments: true
---

Coding is part of my life. That's what I do the most, for living. While I was reading something on [Hacker News](https://news.ycombinator.com/), I came across that someone had mentioned somewhere in the comments about something to consider on writing a better code. I don't really remember which post, to be exact. But I did some quick notes on those. Since then, I have been practicing the following mental model in my coding, and it helped a lot in improving my code. I think this is something good to share here.

To simplify, in your code, just ensure you have all of these:

> Working, simple, correct, optimized

---

To elaborate further...

### Working

The first thing you want to ask yourself whenever you are writing your code, _is it working?_ It doesn't matter _how_ you do it, the code just needs to work the way it is expected to be. The code represents a proof of concept. It does at least 90% of the things, some part may look ugly and messy but it validates a hypothesis. This is maybe your Alpha version!

### Simple

_A good code should be read like a story, not like a puzzle._ The best documentation is self-explainable code. You have to review, simplify and refactor your code so it's readable and embracing [DRY principle](https://thevaluable.dev/dry-principle-cost-benefit-example/). If reviewers don't understand the "why" of some code, a comment is left. Learn about [KISS principle](https://thevaluable.dev/kiss-principle-explained/) may help you to understand better on the code simplicity.

### Correct

Edge cases are covered, tests are written, internal users have validated that the feature is working as expected. Correctness is the destination of any piece of software (ultimately the goal of any piece of software is to work). There are some hot debates going on over which comes first between simplicity and correctness, and it has no winner. Some may depend on how the project structure would look like.

### Optimized

This is where mostly you polish your code. To avoid premature optimization, you should be measuring/benchmarking your code performance as earlier as possible. Your algorithm may need to be changed/updated if it's slow. If something doesn't look right on the design, you may want to optimize your design as earlier as possible, especially before the lines of code starts to grow too much.
