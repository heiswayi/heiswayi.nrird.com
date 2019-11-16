---
layout: page
title: Projects
description: List of some projects. Some are still being maintained, some others are just made for fun and learning!
keywords: part-time projects, hobby stuffs, open source, web apps, github repo
---

This page contains a collection of links to my projects, page shortcuts, source code repos and working demos. These projects are part of my spare time projects that made available online. Most of the projects have been done for fun and learning. Some projects may be published as Open Source, while some others may be used for personal purposes.

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

### Minimalist static site templates for Jekyll

<ul>
  <li>
    <a href="https://github.com/heiswayi/the-plain">The Plain</a> (2015)<br>
    Centered one-column display, ideal for a personal blog.
  </li>
  <li>
    <a href="https://github.com/heiswayi/thinkspace">Thinkspace</a> (2016)<br>
    Centered one-column display, nerdy typeface, ideal for something like technical blog or documentation.
  </li>
  <li>
    <a href="http://github.com/heiswayi/textlog">TextLog</a> (2017)<br>
    Left-aligned one-column display, ideal for documentation-styled blog.
  </li>
</ul>

### _Onepage_-styled listing sites for my stuffs on GitHub

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

### Client-side web-based apps

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

### Experimental AI projects demo

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

### Web tools (PHP)

<ul>
  <li>
    <a href="https://nullableobject.com/xnote">XNote</a><br>
    Minimalist, secure and encrypted pastebin app for personal use purpose.
  </li>
  <li>
    <a href="https://nullableobject.com/speedtest/">Speedtest</a><br>
    Minimalist speedtest site. No ads &amp; mobile friendly!
  </li>
  <li>
    <a href="https://nullableobject.com/write/">Write</a><br>
    A browser-based document writer featuring WYSIWYG HTML Editor from TinyMCE.
  </li>
  <li>
    <a href="https://nullableobject.com/whois/">Whois Script</a><br>
    Simple domain whois script.
  </li>
</ul>

### Misc. stuffs

<ul>
  <li>
    <a href="http://heiswayi.github.io/website-checklist">Website Checklist</a><br>
    Checklist for web developer.
  </li>
  <li>
    <a href="https://nullableobject.com/s/shorten">Link Shortening Service</a><br>
    My minimalist link shortening service. (PHP)
  </li>
  <li>
    <a href="https://heiswayi.github.io/simple-tools">Index of /simple-tools</a><br>
    Collection of my simple web tools/scripts.
  </li>
  <li>
    <a href="https://nullableobject.com/pr0xy/">nullableObject.pr0xy()</a><br>
    My private web proxy script. (PHP)
  </li>
  <li>
    <a href="https://nullableobject.com/imgh/">Personal Image Hosting Script</a><br>
    My private image hosting script. (PHP)
  </li>
</ul>