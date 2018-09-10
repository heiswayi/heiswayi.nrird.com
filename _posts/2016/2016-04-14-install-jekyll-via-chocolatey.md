---
layout: post
title: Get started with Jekyll using Chocolatey
description: Some tips to install Jekyll on Windows via Command Prompt using Chocolatey, a package manager for Windows.
keywords: jekyll installation, windows os, chocolatey, command prompt, tips
tags: [Jekyll, Chocolatey, Engineering]
comments: true
---

### What is Jekyll? What is Chocolatey?

[Jekyll](https://jekyllrb.com/) is a parsing engine bundled as a Ruby gem used **to build static websites** from dynamic components such as templates, partials, liquid code, markdown, etc. which basically is known as "a simple, blog aware, static site generator".

[Chocolatey](https://chocolatey.org/) is a **package manager for Windows**, takes advantage of PowerShell to provide automated software management instructions and Chocolatey's built-in module to run complex tasks into one line function calls.

### Why using Jekyll?

I moved from WordPress to Jekyll few years ago. From that moment, I never look back. Here are my reasons why I choose static sites and Jekyll:

- Static site is fast, secure and FREE!
- Static site or Jekyll source can be hosted FREE of charge using GitHub Pages, BitBucket (using Netlify to deploy), GitLab, etc.
- Static site provides Freedom of Customization.
- Majority of static sites are minimalist design layout, content-focused site.
- Jekyll is the most popular static site generator!

### Installing Jekyll using Chocolatey

First, you need to **install Chocolatey and the easy way to do this is from your Command Prompt**. Just copy-and-paste this script into your Command Prompt (run as Administrator) and hit Enter:

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

Once finished, you should be able to use the standard Jekyll commands either to create a new site, or to build and serve existing Jekyll source.

Example commands to create a new Jekyll site:

```
$ jekyll new myblog
$ cd myblog
$ jekyll serve
```

### Best way to start is with a Jekyll theme

There are [numbers of Jekyll themes](http://lmgtfy.com/?q=jekyll+theme) available for FREE for you to get started with a new Jekyll site (or blog).

### Extra tips!

If the Jekyll source contains **Gemfile** file, you may need to run these following commands beforehand by pointing your Command Prompt current directory to the folder path of Jekyll source:

```
$ gem install bundler
$ bundle install
```

Once complete, you can **build/serve** those Jekyll source using the command below:

```
$ bundle exec jekyll serve
```

By default, if build successfully, you should be able to open `http://localhost:4000` in your web browser to see the compiled version of Jekyll site. Unless, if the port is specified, it may not be port 4000 anymore. Happy Jekyll-ing!