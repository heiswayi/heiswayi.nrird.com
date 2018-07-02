---
layout: post
title: Creating AI chatbot using RiveScript
description: I have published two AI chatbot app projects based on RiveScript interpreter engine; one is rendered using Jekyll, another is built using Node.js and Socket.IO.
keywords: ai chatbot, artificial intelligence, rivescript, node.js, socket.io, jquery terminal
tags: [Artificial Intelligence, Chatbot, Jekyll, Node.js]
comments: true
---

Three years ago, I wrote [a blog post](https://heiswayi.nrird.com/2015/experiment-with-ai-chatbot-app-development) talking about how I started exploring and experimenting with AI chatbot application development. In the end I found myself likely interested more in building AI chatbots for the web. Basically when designing a chatbot, in order to have a natural human-like conversation, the chatbot needs a knowledgebase system that works like a brain to respond to particular conversation inputs.

I remembered before I created my first AI chatbot web app known as [W4Y1](https://heiswayi.nrird.com/w4y1/), I had been struggling to find a better chatbot interpreter engine that can provides easier way to program the bot brain. Then, I found one that is a quite good fit for my requirement known as [elizabot.js](http://www.masswerk.at/elizabot/). So, I built my chatbot based on this JavaScript library. I liked this library because it uses JSON format for the knowledgebase markup language. Thus, it was easy for me to program my chatbot brain.

After a while using elizabot.js, I started to feel that the knowledgebase markup language should be more simpler than JSON format. Without wasting my time to go into the source code and modify it, I opted to look for a better chatbot interpreter engine alternative. And then, I found two of them that can provide me a "more simpler" solution to program my bot brain - [BotML](https://github.com/BotML/botml-js) and [RiveScript](https://www.rivescript.com/). After some researches, I decided to use **RiveScript** since it has more supports for different programming languages, good documentations and active contributions from its community. So, I have developed two chatbot app projects that are based on RiveScript interpreter engine; _HelloBot_ and _hnbot_.

### HelloBot - AI chatbot web app built using Jekyll

![HelloBot - Screenshot](https://i.imgur.com/tn3C7Bw.png)

HelloBot is built using [Jekyll](https://jekyllrb.com/) and [rivescript-js](https://github.com/aichaos/rivescript-js) for the bot interpreter engine. HelloBot is live and currently being hosted using GitHub Pages for demo purpose. HelloBot contains terminal-like interface designed using [Bootstrap](https://getbootstrap.com/), [jQueryTerminal](https://terminal.jcubic.pl/) and [jquery-mousewheel](https://github.com/jquery/jquery-mousewheel).

[**Demo**](https://heiswayi.nrird.com/hellobot) // [**Source code on GitHub**](https://github.com/heiswayi/hellobot)

### hnbot - AI chatbot web app built using Node.js and Socket.IO

![hnbot - Screenshot](https://i.imgur.com/tYLZEhZ.png)

hnbot is using a similar interface design with HelloBot, and the only difference is that hnbot is built based on [Node.js](https://nodejs.org/en/) and [Socket.IO](https://socket.io/). Also similarly to HelloBot, hnbot's interpreter engine is based on [RiveScript NPM package](https://www.npmjs.com/package/rivescript).

[**Source code on GitHub**](https://github.com/heiswayi/hnbot)

To run the demo locally, you need Git and Node.js installed, then run following commands:

```shell
git clone https://github.com/heiswayi/hnbot.git
cd hnbot
npm install
npm start
```
