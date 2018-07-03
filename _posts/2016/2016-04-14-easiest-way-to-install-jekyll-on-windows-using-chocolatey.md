---
layout: post
title: Easiest way to install Jekyll on Windows using Chocolatey
description: Some tips to install Jekyll on Windows via Command Prompt using Chocolatey, a package manager for Windows.
keywords: jekyll installation, windows os, chocolatey, command prompt, tips
tags: [Jekyll, Chocolatey]
comments: true
---

[Jekyll](https://jekyllrb.com/) is a parsing engine bundled as a Ruby gem used to build static websites from dynamic components such as templates, partials, liquid code, markdown, etc. which basically is known as "a simple, blog aware, static site generator".

[Chocolatey](https://chocolatey.org/) is a package manager for Windows, takes advantage of PowerShell to provide automated software management instructions and Chocolatey's built-in module to run complex tasks into one line function calls.

### Installing Jekyll using Chocolatey

First, you need to **install Chocolatey and the easy way to do is from your Command Prompt**. Just copy-and-paste this script into your Command Prompt (run as Administrator) and hit Enter:

```
$ @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

After finished with Chocolatey installation, close the Command Prompt and re-open it (run as Administrator) to start **installing [Ruby](https://chocolatey.org/packages/ruby)** using `choco install` command:

```
$ choco install ruby -y
```

After finished with Ruby installation, now is the time to **install Jekyll via Ruby gem command**, the same way to install Ruby, close and re-open the Command Prompt (run as Administrator):

```
$ gem install jekyll
```

Once finished, you should be able to use the standard Jekyll commands either to create a new site, or to build and serve existing Jekyll site.

Example to create a new site:

```
$ jekyll new myblog
$ cd myblog
$ jekyll serve
```

The credit goes to [David Burela](https://davidburela.wordpress.com/2015/11/28/easily-install-jekyll-on-windows-with-3-command-prompt-entries-and-chocolatey/) for this tips.

### Extra tips

If the Jekyll source contains **Gemfile** file, you may need to run these following commands beforehand:

```
$ gem install bundler
$ bundle install
```