---
layout: post
title: Easiest way to install Jekyll on Windows using Chocolatey
description: Tips to easily install Jekyll on Windows via Command Prompt using Chocolatey, a package manager for Windows.
keywords: jekyll installation, windows os, chocolatey, command prompt
tags: [Jekyll, Chocolatey]
comments: true
---

### What is Jekyll?

Jekyll is a parsing engine bundled as a ruby gem used to build static websites from dynamic components such as templates, partials, liquid code, markdown, etc. which basically is known as "a simple, blog aware, static site generator". [Learn More](https://jekyllrb.com/)

### What is Chocolatey?

Chocolatey is a package manager for Windows, takes advantage of PowerShell to provide automated software management instructions and Chocolatey's built-in module to run complex tasks into one line function calls. [Learn More](https://chocolatey.org/)

### Let's install Jekyll on Windows using Chocolatey

First, you need to install Chocolatey and the easy way to do is from your Command Prompt. Just copy-and-paste this script into your Command Prompt (run as Administrator) and hit Enter:

```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

After finished with Chocolatey installation, close the Command Prompt and re-open it (run as Administrator) to start installing [Ruby package](https://chocolatey.org/packages/ruby) using `choco install` command:

```
choco install ruby -y
```

After finished with Ruby installation, now is the time to install Jekyll, the same way to install Ruby, close and re-open the Command Prompt (run as Administrator), but using `gem install` command like this:

```
gem install jekyll
```

Finished! Now, you can use standard Jekyll commands to create a new site and serve it with such commands below:

```
jekyll new myblog
cd myblog
jekyll serve
```

Credit to [David Burela](https://davidburela.wordpress.com/2015/11/28/easily-install-jekyll-on-windows-with-3-command-prompt-entries-and-chocolatey/) for this tips.

### Additional tips

In case you are new to Jekyll or just start learning to build your own static site, assuming you are using Windows, there are few tools you may need to install or set up to start building your static site. The following tools are recommended to install if you don't have it yet, but it's optional:

- [GitHub](https://github.com/) - Get a GitHub account if you don't have yet. It's free and your static site can live easily using GitHub Pages. You will have the free subdomain like this: `https://<your_username>.github.io` and free SSL too.
- [Git](https://git-scm.com/downloads) - Get Git installed in your Windows so you can use git commands to commit and push your Jekyll source to your GitHub repository.
- [Atom](https://atom.io/) - Get Atom, it's really cool and best code editor. It also has Git and GitHub integration too. FYI, Atom is made by GitHub.
- [Visual Studio Code](https://code.visualstudio.com/) - Best alternative to Atom. It's made by Microsoft. I have both of them installed in Windows.
- [FileMenu Tools](https://www.lopesoft.com/index.php/en/download/filemenu-tools) - Easier way to open Command Prompt from the current directory. To be honest, I'm quite lazy to type `cd <DIRECTORY_PATH>`.

Happy Jekyll-ing and good luck!
