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
        <a href="{{ post.url }}">{{ post.title }}</a><br>
        {{ post.description }}
    </li>

    {% endif %}
  {% endfor %}
</ul>

### Jekyll themes

<ul>
  <li>
    <a href="https://github.com/heiswayi/the-plain">The Plain</a> (2015, MIT) &middot; <a href="http://heiswayi.github.io/the-plain">View Demo</a>
  </li>
  <li>
    <a href="https://github.com/heiswayi/thinkspace">Thinkspace</a> (2016, MIT) &middot; <a href="http://heiswayi.github.io/thinkspace">View Demo</a>
  </li>
  <li>
    <a href="http://github.com/heiswayi/textlog">TextLog</a> (2017, MIT) &middot; <a href="http://heiswayi.github.io/textlog">View Demo</a>
  </li>
</ul>

### Listing sites for my stuffs on GitHub

<ul>
  <li>
    <a href="https://heiswayi.github.io/gist/">heiswayi.github.io/gist</a><br>
    Listing site of my public gists / code snippets. Made using GitHub API.
  </li>
  <li>
    <a href="https://heiswayi.github.io/repo/">heiswayi.github.io/repo</a><br>
    Listing site of my open source projects on GitHub. Made using GitHub API.
  </li>
</ul>

### HTML-based apps

<ul>
  <li>
    <a href="http://heiswayi.github.io/pgp/">PGP Key Generator</a><br>
    Client-side PGP keys generator using web browser.
  </li>
  <li>
    <a href="http://heiswayi.github.io/spelling-uk-vs-us">Spelling: UK vs US</a><br>
    Comprehensive* list of British vs. American spelling differences.
  </li>
  <li>
    <a href="http://heiswayi.github.io/math-console/">Math Console</a><br>
    Mathematical-powered console to evaluate basic arithmetic operations and common math functions.
  </li>
  <li>
    <a href="http://heiswayi.github.io/color-contrast-checker">Color Contrast Checker</a><br>
    To check color constrast compliant ratios.
  </li>
  <li>
    <a href="http://heiswayi.github.io/encryptjs/">EncryptJS</a><br>
    JavaScript library for encrypting message on your site.
  </li>
  <li>
    <a href="http://heiswayi.github.io/random-name-picker/">Random Name Picker</a><br>
    Simple web tool for indoor events - to pick a random name from a list.
  </li>
  <li>
    <a href="http://heiswayi.github.io/markdown-editor">Markdown-HTML Live Preview Editor</a><br>
    Simple markdown-to-HTML live preview editor created in vanilla JavaScript.
  </li>
</ul>

### Experimental AI projects

<ul>
  <li>
    <a href="http://heiswayi.github.io/w4y1/">W4Y1</a><br>
    Experimental AI chatbot for digitalizing my memories.
  </li>
  <li>
    <a href="http://heiswayi.github.io/hellobot/">HelloBot</a><br>
    Just another AI Chatbot.
  </li>
</ul>

### Scripts and utilities

<ul>
  <li>
    <a href="http://nrird.xyz/proxy/">Web Proxy</a><br>
    My personal web proxy script.
  </li>
  <li>
    <a href="http://nrird.xyz/scripts/whois/">Whois</a><br>
    Simple domain whois script.
  </li>
  <li>
    <a href="http://nrird.xyz/scripts/indenter-tool/">Indenter Tool</a><br>
    Simple script to prettify and fix indentation of code.
  </li>
  <li>
    <a href="http://nrird.xyz/scripts/js-packer/">JavaScript Packer</a><br>
    Compress and obfuscate JavaScript code.
  </li>
  <li>
    <a href="http://nrird.xyz/scripts/url-shortener/">Personal URL Shortening Service</a><br>
    My personal URL shortener script.
  </li>
  <li>
    <a href="http://nrird.xyz/scripts/sparkline/">Static Sparkline Image Generator</a><br>
    Generate static sparkline image with browser caching with ETag.
  </li>
</ul>

Visit [https://nrird.xyz/scripts](https://nrird.xyz/scripts/) for more other scripts.

### Web tools

<ul>
  <li>
    <a href="http://nrird.xyz/ultimate-blocks">FREE Ultimate Blocks - Website Maker</a><br>
    A FREE block-based HTML drag-and-drop bootstrap theme builder with 126+ predesigned unique blocks and unlimited variants.
  </li>
  <li>
    <a href="https://nrird.xyz/encrypto-zero">Encrypto Zero</a><br>
    Minimalist, secure and encrypted pastebin app for personal use purpose.
  </li>
  <li>
    <a href="https://nrird.xyz/document-writer">Document Writer</a><br>
    Minimalist web-based writing tool to write document using web browser.
  </li>
  <li>
    <a href="https://nrird.xyz/speedtest/">Speedtest</a><br>
    Minimalist speedtest site. No ads &amp; mobile friendly!
  </li>
</ul>

### Misc. stuffs

<ul>
  <li>
    <a href="http://nrird.xyz/website-checklist">Website Checklist</a><br>
    Checklist for web developer.
  </li>
  <li>
    <a href="/reminder">Personal Reminder Note</a><br>
    A note to remind myself.
  </li>
</ul>
