---
layout: post
title: Building AI chatbot app
description: Experimental works on making computer programs to talk like a human.
keywords: artificial intelligence, chatbot app, AIML, SIML, elizabot.js
tags: [Artificial Intelligence, Chatbot, Programming]
comments: true
---

### It began with a IRC client program called mIRC

Back in 2004, I had been using a chit-chat client program called [mIRC](http://www.mirc.com/). It's a program to connect to [IRC](https://en.wikipedia.org/wiki/Internet_Relay_Chat) networks and started chatting with other people in the chatrooms called channels.

### Chit-chat was boring, but not "scripting"

mIRC program had an insteresting feature called **Remote** under its Editor menu. It was a scripting tool. This is where people were expanding the program capabilities. Check [this link](http://www.mircscripts.org/), [this link](http://hawkee.com/mirc/snippets/), or [this link](http://www.oldschoolirc.com/scripts) to see what other people did with that mIRC scripting.

Yep, I had made few mIRC scripts too, in case you're curious to see how the scripting was written and worked:

- [Dino IRC Sc. (Final Dev.).zip](https://www.dropbox.com/s/5m6fcpwfe998vg1/Dino%20IRC%20Sc.%20%28Final%20Dev.%29.zip?dl=0) - Official casual script, channel protections, private protections, a bunch of utilities and more...
- [Nikotin3.zip](https://www.dropbox.com/s/2cjjvfsw9m2wpwa/Nikotin3.zip?dl=0) - War script (Revenge)
- [WarLord.zip](https://www.dropbox.com/s/fala3ispr3b1ntc/WarLord.zip?dl=0) - War script (Revenge)

### War script? Revenge?

It means that was a "battle" script. A script used to "kick out" people, each other, within a particular IRC chatroom (channel). The objective was to measure the strength of your scripting code, something we called "revenge" script.

### 'nuff said, here the "AI" thing came

Other than "warring", I did build a quiz bot in my previous mIRC scripts. The purpose of the scipt is to entertain people in some particular IRC channels. Then, I was thinking to build something more "intelligent" (which was not really intelligent of course). Something called a "chit-chat" bot to be exact. So, **I reprogrammed my mIRC script to have the ability to parse some inputs, match them with preprogrammed keywords from the keyword list, and then respond to the user with particular preprogrammed outputs (answers)**. Genius? No. Interesting? Definitely. Fun? Absolutely.

To be honest, I'm not really remembered how many script that I wrote to build this so-called chat bot. Some was experimental, incomplete program while some others were completely gone when my external hard drive corrupted. As far as I can recover, one of my script code is looked something like this. The chatbot as called "Puteri Allyssa". Just ignore the unprintable characters. Those characters were usually used for coloring code.

```
alias psys return echo @Puteri_Allyssa 12•4•8•9• 9SYSTEM15:14
alias puteri return echo @Puteri_Allyssa 10Puteri Allyssa  4•
alias p return 12•4•8•9•
alias pw return @Puteri_Allyssa
alias u return echo @Puteri_Allyssa %u 9:
alias kc return 8Keyword(s) captured:4
alias puteri.starter {
  .showmirc -x
  .color editbox 1
  .color editbox text 9
  .window -aked $pw 50 100 $pw Arial 12
  .timer 1 0 $psys You are activating 15Puteri Allyssa (a IRC Artificial Intelligence Project) Alpha Version...
  .timer 1 1 $psys 4RULES :14 You are free to talk with her as long as the captured keywords are in her database. Version Alpha means her program is unstable and under Phase 1 (prototype only). Do not to flood the lines!
  set %u unknown
  set %puteri active
}
alias callher {
  %callher = $rand(1,5)
  if (%callher == 1) { if (%u == unknown) { $puteri Yerp.. What's up? } | else { $puteri Yerp.. What's up? %u } }
  if (%callher == 2) { if (%u == unknown) { $puteri Yes~? } | else { $puteri Yes~? %u } }
  if (%callher == 3) { if (%u == unknown) { $puteri Em what? } | else { $puteri Em what? %u } }
  if (%callher == 4) { $puteri I'm here... }
  if (%callher == 5) { $puteri ??? }
}
on *:close:@Puteri_Allyssa: { .timer off }
on *:input:@Puteri_Allyssa: {
  if (/timer* == $1) || (//timer* == $1) || (///timer* == $1) { if (off == $2) { halt } }
  if (puteri isin $1-) || (allyssa isin $1-) || (puteri allyssa isin $1-) {
    $u $1-
    callher
  }
  if (help me isin $1-) {
    $u $1-
    $puteri $kc *help me*
    .timer 1 1 $puteri Need my help? Please type puteri~help to list what can I do for you or how to use my services! TQ
  }
  if (what you can do isin $1-) { $u $1- | $puteri $kc *what you can do*
    .timer 1 1 $puteri Ahaks~ I can do anything under your commands...but depends how far I was programmed.
    .timer 1 2 $puteri I can handle this script for you, manually or automatically.. Everything that I can execute, I do~
    .timer 1 3 $puteri You also can ask me for some conversation... Type puteri~scope to see what scopes I covered in my program!
    .timer 1 4 $puteri Oorr.. type puteri~help for getting some helps (if you blurred)~
  }
  if (who are you isin $1-) {
    $u $1-
    $puteri $kc *who are you*
    .timer 1 1 $puteri Do you ask me? Ahaks.. If that's so... :)
    .timer 1 2 $puteri My name is Puteri Allyssa. I was programmed on May 2009 as a Script Robot by my creator, Y-E.
    .timer 1 3 $puteri I'm still a child, under Alpha Version...
    .timer 1 4 $puteri Please type puteri~rules to see the rules of using me!
  }
  if (Y-E isin $1-) {
    $u $1- | $puteri $kc *Y-E*
    .timer 1 1 $puteri Do you call my creator or what?
    .timer 1 2 $puteri Do you want to know who my creator is?
  }
  if (call your creator isin $1-) {
    $u $1-
    .timer 1 1 $puteri For what? | set %call.creator %u
  }
  if (nothing == $1) { $u $1 | $puteri Ok~ }
  if (know your creator isin $1-) || (know ur creator isin $1-) {
    $u $1- | $puteri $kc *know your creator*
    .timer 1 1 $puteri Erm...
    .timer 1 2 $puteri His name $creatorName. 19 years old. A male. He's a scripter, graphic designer, photographer, programmer and etc... I can't remember more~ :|
    .timer 1 3 $puteri Oh~ He lived in $creatorHometown, some place he called $creatorVillage (when he was asked about his village)...
    .timer 1 4 $puteri He was known as Y-E. Directly, to see his face, please puteri~my creator.
    .timer 1 5 $puteri Oorr if you want to know more about him, I suggest you meet him by yourself... :P
  }
  if (let's sleep isin $1-) || (lets sleep isin $1-) {
    $u $1-
    $puteri $kc *let's sleep*
    .timer 1 1 $puteri Are you feel sleepy now? Or you want me to sleep?
    .timer 1 2 $puteri Or..request me to accompany you sleep together? :P
  }
  if (feel sleepy isin $1-) { $u $1 | $puteri $kc *feel sleepy*
    .timer 1 1 $puteri Erm.. You should go sleep now... Tomorrow morning, you will feel so tired if you have no enough sleep!
  }
  if (you sleep isin $1-) || (want you to sleep isin $1-) || (you need to sleep isin $1-) { $u $1- | $puteri $kc *you sleep*, *want you to sleep*, *you need to sleep*
    .timer 1 1 $puteri Oh~ Alright, see you later!
    .timer 1 2 $puteri zzZZzzZZZz...~
    .timer 1 3 $psys Puteri Allyssa begins to sleep... This script will be closed in 3 seconds, TQ!
    .timer 1 4 $psys 3
    .timer 1 5 $psys 2
    .timer 1 6 window -c @Puteri_Allyssa | set %puteri.mode sleep | .timer 1 7 exit
  }
  if (accompany me sleep isin $1-) || (accompany me to sleep isin $1-) { $u $1- | $puteri $kc *accompany me sleep*, *accompany me to sleep*
    .timer 1 1 $puteri Hehe~
    .timer 1 2 $puteri You go sleep first, then I will follow you later... I'm not sleepy yet! :)
  }
}
```

In 2007, I stopped using IRC, and was no longer connect to the servers. This is where I started to abandon everything about mIRC, including my scripts.

### AI chatbot in .NET Framework and SQLite

Few years later, I started working with C# programming and WinForms. So, the "AI" idea came back to me. At this time, I coded for a basic WinForms app and used SQLite to build my "AI" chatbot knowledgebase. And I called it **NALIKA**. It had a basic implementation where by matching keywords in the input text and then stream out the possible output response. I used SQLite to save the inputs and the predictive outputs.

Screenshots:

{% include figure.html src="http://i.imgur.com/F1n1W0N.png" caption="When clicked Configure DB" %}

{% include figure.html src="http://i.imgur.com/IkAKC9p.png" caption="Database Audit will be displayed when unlock succeeded" %}

{% include figure.html src="http://i.imgur.com/kMdAEpk.png" caption="To edit the database, add new or import/export" %}

### NALIKA app still boring, so I need something called "framework"

After I did some researches on Internet, I found one so-called the "first framework" that I can start with. It was called [Artificial Intelligence Markup Language (AIML)](http://www.alicebot.org/aiml.html), a standard XML format markup language for defining the responses from the chatbot. AIML was developed by **Richard S. Wallace** and a worldwide free software community between 1995 and 2002. AIML formed the basis for what was initially a highly extended [Eliza](https://en.wikipedia.org/wiki/ELIZA) called ["A.L.I.C.E." (Artificial Linguistic Internet Computer Entity)](https://en.wikipedia.org/wiki/Artificial_Linguistic_Internet_Computer_Entity) which won the annual [Loebner Prize Competition](https://en.wikipedia.org/wiki/Loebner_Prize) in Artificial Intelligence three times and was also the Chatterbox Challenge Champion in 2004.

So, I used [AIMLbot.dll](http://aimlbot.sourceforge.net/) library for my chatbot app while getting myself to learn more about the markup language structures used in the AIML as published in [this paper](http://arxiv.org/ftp/arxiv/papers/1307/1307.3091.pdf). AIML provided much better way of defining the knowledgebase of my chatbot and made it looked more natural to call it as "artificial intelligence" chatbot. For the bot name, I called "WAYI".

Screenshots:

{% include figure.html src="http://i.imgur.com/UJjTodD.png" caption="WAYI v1 - Simple console-like interface" %}

{% include figure.html src="http://i.imgur.com/3mkEzII.png" caption="WAYI v2 - Bot response in different view" %}

### Writing the bot "brain" (AIML) was hard and tedious!

After some time, I found another chatbot markup language library known as [Synthetic Intelligence Markup Language (SIML)](http://simlbot.com/), which was more powerful than AIML. SIML provided much better features compared to AIML. So, I changed the current markup language of my chatbot from AIML to use SIML as SIML already provided their own chatbot studio program called **Syn Chatbot Studio**.

Based on their website, Syn Chatbot Studio offers a comprehensive collection of tools to develop intelligent chatbots that targeted desktops, mobile and web platforms. It has Code Analysis, AIML to SIML converter, JavaScript Editor, Regex Tester and smooth Auto-Complete. And it's much more interesting when it has ability to execute JavaScript function from its routine of responses. That's cool! A lot of things I can do with JavaScript itself. Simply heads to their [wiki site](http://wiki.syn.co.in/) or [GitHub](https://github.com/SynHub) for more details and source code.

### AI chatbot with JavaScript library and online deployment

Known as "W4Y1", was one of my latest AI chatbot experiments (read: code for fun) that used JavaScript and I hosted it on GitHub Pages. It was not a really chatbot where people can chat for any topic of conversations because that was not my primary intention when I started building it. But it was more to so-called a memory program to represent a digital side of myself by holding a fragment of knowledgebase from my mind.

This idea was inspired from one of the Sci-Fi movies called [I, Robot (2004)](http://www.imdb.com/title/tt0343818/). In the movie, Dr. Alfred Lanning used a hologram device to leave his message for Spooner's investigation. Just that mine was in the form of terminal-like web interface, text-formatted interaction and clumsy JavaScript app.

I created **W4Y1** based on [elizabot.js](http://www.masswerk.at/elizabot/) by **Norbert Landsteiner**, its interpretation engine for AI markup language and processing, and [jQuery Terminal Emulator plugin](http://terminal.jcubic.pl/) by **Jakub Jankiewicz** for the terminal-like interface, and [particles.js](http://vincentgarreau.com/particles.js/) by **Vincent Garreau** for the particles effect in the background.

{% include figure.html src="http://i.imgur.com/7emX4MU.png" caption="W4Y1" %}

<a href="https://heiswayi.github.io/w4y1" class="button big">View demo</a> <a href="https://github.com/heiswayi/w4y1" class="button big">Get source code</a>

### The bottom line

These experimental, exploratory, incomplete developments have taught me some understanding on artificial intelligence concept, technical challenges, and the designing of the markup languages. Artificial intelligence and the technology are one side of the life that always interest and surprise us with the new ideas, topics, innovations, products …etc. AI is still not implemented as the films representing it (i.e. intelligent robots), however there are many important tries to reach the level and to compete in market, like sometimes the robots that they show in TV. Nevertheless, the hidden projects and the development in industrial companies. At the end, we’ve been in this research through the AI definitions, brief history, applications of AI in public, applications of AI in military, ethics of AI, and the three rules of robotics. This is not the end of AI, there is more to come from it, who knows what the AI can do for us in the future, maybe it will be a whole society of robots.
