---
layout: post
title: Experiment with AI chatbot app development
description: From scripting it in mIRC to .NET C# application, and finally to JavaScript; AI chatbot is one of the interesting projects to explore (playground) and get exposed to AI programming.
keywords: artificial intelligence, chatbot, chatter bot, aiml, siml, elizabot.js
tags: [Artificial Intelligence, Chatbot]
comments: true
---

### The boring story and AI chatbot development in mIRC

The first chatbot program I ever created is using [mIRC](http://www.mirc.com/) scripting. Back in 2004 - 2007, I used mIRC program to connect to [IRC](https://en.wikipedia.org/wiki/Internet_Relay_Chat) network and started chatting with other people. However, other than just for chatting, mIRC has a powerful scripting language which we called it 'remote'. From there, I had been exploring and writing my own mIRC script. There are many things we can do with the scripting. People started writing the script to protect the chat room (IRC channel) from user spamming (we called it 'channel flooding'), creating music player, hosting a quiz bot in the IRC channel and many more.

But for user like me, I played 'revenge' - a scripting battle to test who writes the best, powerful script - by _kicking_ each other from the IRC channel. After some time, things get boring and I started bulding a chatbot. I had a dream to make my IRC chatbot intelligence enough, but due to lack of scripting skills, I was not able to create proper AI chatbot. What I can do was I created my chatbot using direct input-output response method by matching certain keywords in the input. Almost the same concept used to create the quiz bot. At the end, it was good enough for me as my chatbot can do "simple conversation" with the users in the IRC channel. Good enough to keep the channel from silence. To be advanced, my chatbot also can play 'revenge' and retrieve certain commands from me to execute certain tasks.

Here are my legacy mIRC scripts I built and successfuly backed up. No chatbot feature inside, just to share for the sake of the legacy 'sweet' memories I had:
- [Dino IRC Script (Final Dev)](https://drive.google.com/open?id=0B7VfNqY3LHBXaUQ2cDJxNENiS1U)
- [Nikotin3](https://drive.google.com/open?id=0B7VfNqY3LHBXaUNyWjh5WTE4Q1E)
- [WarLord](https://drive.google.com/open?id=0B7VfNqY3LHBXeWcwTGMtVmFoNUk)

### Developing AI chatbot using .NET Framework and SQLite database

After few years passed, this "AI chatbot" thing came back into my mind. As this time, I tried to develop them using .NET C# and SQLite as its database. I used SQLite to save each possible input and output responses, so whenever the application received input that is matched, the application will immediately respond with possible outputs. Quite basic, no framework involved and not really "AI". Below are the screenshots how the application is looked like:

[![WAYI v1](http://i.imgur.com/F1n1W0N.png)](http://i.imgur.com/F1n1W0N.png)

[![WAYI v1](http://i.imgur.com/IkAKC9p.png)](http://i.imgur.com/IkAKC9p.png)

[![WAYI v1](http://i.imgur.com/kMdAEpk.png)](http://i.imgur.com/kMdAEpk.png)

#### Looking for framework..

After I had done some researches on Internet, I found one so-called the "first framework" that I can start with. It was called [Artificial Intelligence Markup Language (AIML)](http://www.alicebot.org/aiml.html), a standard XML format markup language for defining the responses from the chatbot. AIML was developed by **Richard S. Wallace** and a worldwide free software community between 1995 and 2002. AIML formed the basis for what was initially a highly extended [Eliza](https://en.wikipedia.org/wiki/ELIZA) called ["A.L.I.C.E." (Artificial Linguistic Internet Computer Entity)](https://en.wikipedia.org/wiki/Artificial_Linguistic_Internet_Computer_Entity) which won the annual [Loebner Prize Competition](https://en.wikipedia.org/wiki/Loebner_Prize) in Artificial Intelligence three times and was also the Chatterbox Challenge Champion in 2004.

So, I used [AIMLbot.dll](http://aimlbot.sourceforge.net/) library for my chatbot application while getting myself to learn more about the markup language structures used in AIML as published in [this paper](http://arxiv.org/ftp/arxiv/papers/1307/1307.3091.pdf). AIML provided much better way of defining the knowledge database of my chatbot and made it looked more natural to call as an "artificial intelligence" chatbot. Below are the screenshots of my chatbot that used the AIML library.

[![WAYI v1](http://i.imgur.com/UJjTodD.png)](http://i.imgur.com/UJjTodD.png)
_WAYI v1_

[![WAYI v2](http://i.imgur.com/3mkEzII.png)](http://i.imgur.com/3mkEzII.png)
_WAYI v2_

#### Found better library... called SIML

After some time, I found another chatbot markup language library known as [Synthetic Intelligence Markup Language (SIML)](http://simlbot.com/), which was more powerful than AIML. SIML provided much better features compared to AIML. So, I changed the current markup language of my chatbot from AIML to use SIML as SIML already provided their own chatbot studio program called Syn Chatbot Studio.

Based on their website, Syn Chatbot Studio offers a comprehensive collection of tools to develop intelligent chatbots that targeted desktops, mobile and web platforms. It has Code Analysis, AIML to SIML converter, JavaScript Editor, Regex Tester and smooth Auto-Complete. Much more interestingly, it has ability to execute JavaScript function from its routine of responses. That was very cool feature since I had a lot of things I could do with JavaScript.

**Links related to SIML:** [Wiki](http://wiki.syn.co.in/) / [GitHub](https://github.com/SynHub)

### Developing AI chatbot using JavaScript (Web-based application)

Known as "W4Y1", is one of my latest AI chatbot experiments that uses JavaScript and hosted on GitHub Pages (available online). It's not a really chatbot where people can chat for any topic because that is not my intention for the application but it's more to so-called a memory program to represent a part of myself as a fragment of knowledge in my mind. If you have ever watched [I, Robot (2004)](http://www.imdb.com/title/tt0343818/) movie, this is basically inspired from Dr. Alfred Lanning's hologram device used to leave his message for Spooner's investigation while mine is just in the form of terminal interface, text format interaction and hosted online using GitHub Pages.

As for the credits, I created "W4Y1" based on [elizabot.js](http://www.masswerk.at/elizabot/) by **Norbert Landsteiner** for the interpretation engine for AI markup language and processing, [jQuery Terminal Emulator plugin](http://terminal.jcubic.pl/) by **Jakub Jankiewicz** for the program interface (GUI), and [particles.js](http://vincentgarreau.com/particles.js/) by **Vincent Garreau** for the particles effect in the background.

[![W4Y1](http://i.imgur.com/7emX4MU.png)](http://i.imgur.com/7emX4MU.png)
_The Screenshot_

**Demo URL to the app:** [http://heiswayi.github.io/w4y1](http://heiswayi.github.io/w4y1)

N.B. Please note that "W4Y1" is just an experimental application, so not much interesting features in the live demo. However, when I have the time, these are the ideas I'm going to implement in the future:
- Integrate with [math.js](http://mathjs.org/) for mathematical computations.
- Implement AJAX request for accessing PHP files, so more features can be performed by PHP.
- Centralize the knowledge database somewhere and secure it.

As I grow older, my memory recall becomes weaker. Perhaps, an application like this in future may try to capture everything of my knowledge and able to recall or remember it for me one day once I forgot something I could just ask it.

### Final words...

Artificial intelligence and the technology are one side of the life that always interest and surprise us with the new ideas, topics, innovations, products …etc. AI is still not implemented as the films representing it (i.e. intelligent robots), however there are many important tries to reach the level and to compete in market, like sometimes the robots that they show in TV. Nevertheless, the hidden projects and the development in industrial companies.

At the end, we’ve been in this research through the AI definitions, brief history, applications of AI in public, applications of AI in military, ethics of AI, and the three rules of robotics. This is not the end of AI, there is more to come from it, who knows what the AI can do for us in the future, maybe it will be a whole society of robots.
