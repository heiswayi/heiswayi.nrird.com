---
layout: post
title: Adding line numbering in the code block using vanilla JS
description: This is how I added a line numbering in my code block by using a few lines of vanilla JavaScript and some SCSS for styling.
tags: [Jekyll, SCSS, JavaScript, Programming]
comments: true
---

When I use a code block written in Markdown format, it will be converted into HTML code and wrapped using `<pre><code>` markup. No line numbering by default. It's just a plain view code block. So, I used this vanilla JavaScript code to enable the line numbering in my code block and a little SCSS for the styling.

```js
(function() {
  var pre = document.getElementsByTagName('pre'),
      pl = pre.length;
  for (var i = 0; i < pl; i++) {
    pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML + '<span class="cl"></span>';
    var num = pre[i].innerHTML.split(/\n/).length;
    for (var j = 0; j < (num - 1); j++) {
      var line_num = pre[i].getElementsByTagName('span')[0];
      line_num.innerHTML += '<span>' + (j + 1) + '</span>';
    }
  }
})();
```

Here's my SCSS code:

```scss
pre {
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    line-height: 1.4;
    white-space: pre;
    overflow: auto;
    padding: .5rem 2rem .5rem .5rem;
    max-height: 800px;
    font-size: .9rem;
    code {
        display: block;
        padding: 0;
    }
    .line-number {
        display: block;
        float: left;
        margin: 0 1em 0 -1em;
        user-select: none; /* Standard */
        text-align: right;
        span {
            display: block;
            padding: 0 .5em 0 1em;
        }
    }
    .cl {
        display: block;
        clear: both;
    }
}
```