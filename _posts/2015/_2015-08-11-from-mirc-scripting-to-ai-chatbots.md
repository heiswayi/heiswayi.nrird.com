---
layout: post
title: From mIRC scripting to AI chatbots
description: 
tags: [mirc, ai, chatbot]
---

https://codeberg.org/hn/my-jekyll-site-template-variants/src/branch/main/jekyll-intro-first/_posts/2015/2015-08-11-experiment-with-ai-chatbot-app-development.md

`REVISED`

In the early 2000s, the world of online communication witnessed a unique intersection of chatrooms, IRC networks, and the creative minds of scripters. This era marked my initiation into the creation of chatbots, leveraging the potent [mIRC](#) scripting language. Beyond its primary function as an IRC client, mIRC offered a hidden gem known as the 'Remote' scripting language, allowing enthusiasts like me to delve into creating a variety of functionalities.

(mIRC screenshot?)

During this period, scripters ingeniously developed mIRC **scripts** to protect chatrooms from spam, host quizzes, and even engage in "revenge" battles by kicking users from IRC channels. Seeking a novel challenge, I embarked on the journey of constructing my own chatbot named "Puteri Allyssa" using direct input-output matching responses. While not the epitome of artificial intelligence, it provided a lively interaction within IRC channels.

Below is how the mIRC script source looked like for my chatbot called "Puteri Allyssa":
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
    .timer 1 2 $puteri His name Lirdzwanka Noraz. 19 years old. A male. He's a scripter, graphic designer, photographer, programmer and etc... I can't remember more~ :|
    .timer 1 3 $puteri Oh~ He lived in Kelantan, some place he called Rantau Kasih (when he was asked about his village)...
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

As technology advanced, my interest in AI-driven chatbots persisted. In the mid-2000s, I transitioned to .NET C# programming, utilizing a SQLite database to create "NALIKA," my second-generation chatbot. Although rudimentary in its intelligence, it marked a departure from simplistic matching responses. The use of SQLite allowed for more sophisticated handling of inputs and outputs, providing a foundation for future advancements.

(NALIKA app screenshots)

A pivotal moment in my quest for a more intelligent chatbot came with the discovery of the Artificial Intelligence Markup Language (AIML). AIML, the brainchild of Richard S. Wallace, formed the basis for my third-generation chatbot, "WAYI." Utilizing the AIMLbot.dll library, WAYI demonstrated a more nuanced understanding of user inputs, resembling a step closer to genuine conversational AI.

(WAYI app screenshots)

Evolving further, the Synthetic Intelligence Markup Language (SIML) caught my attention as a more powerful alternative to AIML. The transition to SIML marked the birth of my chatbot "W4Y1," a JavaScript-based application hosted on GitHub Pages. SIML provided a comprehensive set of tools through "Syn Chatbot Studio," offering features like Code Analysis, AIML to SIML conversion, and the ability to execute JavaScript functions within responses.

"W4Y1" represents a departure from conventional chatbots, serving as a digital repository of my knowledge and experiences. Inspired by Dr. Alfred Lanning's hologram device in "I, Robot," this experiment presents a terminal-like interface on GitHub Pages, combining elizabot.js, jQuery Terminal Emulator, and particles.js for a visually engaging experience.

While "W4Y1" currently serves as an experimental web app, future plans include integration with math.js for mathematical computations, AJAX requests for enhanced functionality, and a centralized knowledge database for secure storage.

(W4Y1 web app screenshot)

In conclusion, the evolution of AI chatbots reflects not only technological advancements but also the creative endeavors of individuals pushing the boundaries of what is possible. As we continue to explore the realms of artificial intelligence, the future holds exciting prospects for the integration of AI into various aspects of our lives.