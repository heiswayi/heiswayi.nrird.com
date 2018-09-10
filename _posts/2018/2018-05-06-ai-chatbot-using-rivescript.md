---
layout: post
title: AI chatbot app development using RiveScript
description: Development of AI chatbot app project based on RiveScript interpreter engine; one is built using Jekyll, another is built using Node.js and Socket.IO.
keywords: ai chatbot, artificial intelligence, rivescript, node.js, socket.io, jquery terminal
tags: [Artificial Intelligence, Chatbot, Jekyll, Node.js, Open Source, Programming]
comments: true
---

Three years ago, I wrote [a blog post](https://heiswayi.nrird.com/building-ai-chatbot-app) talking about how I tried to build AI chatbot apps. In the end I found myself likely interested more in building AI chatbots for the web. When designing a chatbot, in order to have a natural human-like conversation, the chatbot needs a knowledgebase system that works like a "brain" to respond to particular conversation inputs.

I remembered, before I created my first AI chatbot web app known as [W4Y1](https://heiswayi.github.io/w4y1/), I had been struggling to find a better chatbot interpreter engine that can provides easier way to program the "bot brain". Then, I found one that was a quite good fit for my requirements known as [elizabot.js](http://www.masswerk.at/elizabot/). So, I built my chatbot based on that JavaScript library. I like this library because it used JSON format for the knowledgebase markup language. Thus, it was easy for me to program my chatbot brain.

After a while using elizabot.js, I started to feel that the knowledgebase markup language should have been more simpler than JSON format. Without wasting the time to dig into the source code and make modification, I opted to look for a better chatbot interpreter engine alternative. Then, I found two of them that can provide me a "more simpler solution than elizabot.js" to program my "bot brain" - they are [BotML](https://github.com/BotML/botml-js) and [RiveScript](https://www.rivescript.com/). After some researches, I decided to use **RiveScript** since it has more supports for different programming languages, good documentations and active contributions from its community. So, I have built two chatbot app projects which are based on RiveScript interpreter engine known as _HelloBot_ and _hnbot_.

### HelloBot - AI chatbot web app built using Jekyll

{% include figure.html src="https://i.imgur.com/tn3C7Bw.png" caption="Having conversation with HelloBot via web browser" %}

HelloBot is built using [Jekyll](https://jekyllrb.com/) and [rivescript-js](https://github.com/aichaos/rivescript-js) for the bot interpreter engine. HelloBot is live and currently being hosted using GitHub Pages for demo purpose. HelloBot contains terminal-like interface designed using [Bootstrap](https://getbootstrap.com/), [jQueryTerminal](https://terminal.jcubic.pl/) and [jquery-mousewheel](https://github.com/jquery/jquery-mousewheel).

- [**Demo**](https://heiswayi.github.io/hellobot)
- [**Source code on GitHub**](https://github.com/heiswayi/hellobot)

### hnbot - AI chatbot web app built using Node.js and Socket.IO

{% include figure.html src="https://i.imgur.com/tYLZEhZ.png" caption="Having conversation with hnbot via web browser locally" %}

hnbot is using a similar interface design with HelloBot, and the only difference is that hnbot is built based on [Node.js](https://nodejs.org/en/) and [Socket.IO](https://socket.io/). Also similarly to HelloBot, hnbot's interpreter engine is based on [RiveScript NPM package](https://www.npmjs.com/package/rivescript).

- _Sorry, I don't have the online demo for this._
- [**Source code on GitHub**](https://github.com/heiswayi/hnbot)

To run the hnbot demo locally, you need Git and Node.js installed, then run following commands:

```shell
git clone https://github.com/heiswayi/hnbot.git
cd hnbot
npm install
npm start
```

**N.B.** These apps are just proof-of-concept, and I don't have the time to design the "bot brain" for specific application purpose. If you're playing with the demo, the current "bot brain" is based on predefined samples.