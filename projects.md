---
layout: page
title: Projects
description: List of some projects
keywords: part-time projects, hobby stuffs, open source, web apps, github
---

<ul>
  {% for post in site.posts %}
    {% if post.tags contains "Project" %}

    <li>
        <a href="{{ post.url }}">{{ post.title }}</a> — {{ post.description }}
    </li>

    {% endif %}
  {% endfor %}
</ul>

### Jekyll themes

- The Plain (2015) — [GitHub](https://github.com/heiswayi/the-plain) // [View Demo](http://heiswayi.github.io/the-plain)
- Thinkspace (2016) — [GitHub](https://github.com/heiswayi/thinkspace) // [View Demo](http://heiswayi.github.io/thinkspace)
- TextLog (2017) — [GitHub](http://github.com/heiswayi/textlog) // [View Demo](http://heiswayi.github.io/textlog)

### Listing sites for my stuffs on GitHub

- [heiswayi.github.io/gist](https://heiswayi.github.io/gist/) — List of my public gists / code snippets.
- [heiswayi.github.io/repo](https://heiswayi.github.io/repo/) — List of my open source projects on GitHub.

### HTML-based apps

- [PGP Key Generator](http://heiswayi.github.io/pgp/) — Client-side PGP keys generator.
- [Spelling: UK vs US](http://heiswayi.github.io/spelling-uk-vs-us) — Comprehensive* list of British vs. American spelling differences.
- [Math Console](http://heiswayi.github.io/math-console/) — Mathematical-powered console to evaluate basic arithmetic operations and common math functions.
- [Color Contrast Checker](http://heiswayi.github.io/color-contrast-checker) — To check color constrast compliant ratios.
- [EncryptJS](http://heiswayi.github.io/encryptjs/) — JavaScript library for encrypting message on your site.
- [Random Name Picker](http://heiswayi.github.io/random-name-picker/) — Simple web tool for indoor events.
- [Markdown-HTML Live Preview Editor](http://heiswayi.github.io/markdown-editor) — Simple markdown-to-HTML live preview editor created in vanilla JavaScript.

### Experimental AI projects

- [W4Y1](http://heiswayi.github.io/w4y1/) — Experimental AI chatbot for digitalizing my memories.
- [HelloBot](http://heiswayi.github.io/hellobot/) — Just another AI Chatbot.

### Scripts and utilities

- [Web Proxy](http://nrird.xyz/proxy/) — My personal web proxy script.
- [Whois](http://nrird.xyz/scripts/whois/) — Simple domain whois script.
- [Indenter Tool](http://nrird.xyz/scripts/indenter-tool/) — Simple script to prettify and fix indentation of code.
- [JavaScript Packer](http://nrird.xyz/scripts/js-packer/) — Compress and obfuscate JavaScript code.
- [Personal URL Shortening Service](http://nrird.xyz/scripts/url-shortener/) — My personal URL shortener script.
- [Static Sparkline Image Generator](http://nrird.xyz/scripts/sparkline/) — Generate static sparkline image with browser caching with ETag.

Visit [https://nrird.xyz/scripts](https://nrird.xyz/scripts/) for more other scripts.

### Web tools

- [FREE Ultimate Blocks - Website Maker](http://nrird.xyz/ultimate-blocks) — A FREE block-based HTML drag-and-drop bootstrap theme builder with 126+ predesigned unique blocks and unlimited variants.
- [Encrypto Zero](https://nrird.xyz/encrypto-zero) — Minimalist, secure and encrypted pastebin app for personal use purpose.
- [Document Writer](https://nrird.xyz/document-writer) — Minimalist web-based writing tool to write document using web browser.
- [Speedtest](https://nrird.xyz/speedtest/) — Minimalist speedtest site. No ads & mobile friendly!

### Misc. stuffs

- [Website Checklist](http://nrird.xyz/website-checklist) — Checklist for web developer.
- [Personal Reminder Note](/reminder) — A note to remind myself.
