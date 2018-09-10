---
layout: post
title: Generating code block line numbers with pure JavaScript
description: This is how I added the line numbers at the left side of my code block layout using few lines of vanilla JavaScript and SCSS.
keywords: line numbers, code block layout, jekyll site template, line numbers using javascript, line numbers css
tags: [Jekyll, CSS, JavaScript, Programming]
comments: true
---

Previously, my code block for this site is just a simply plain code block. Then, I thought I want to make it a little bit "fancy" by adding the line numbers on it. Finally, I realized "my desire" by using few lines of vanilla JavaScript code and a little bit of styles using SCSS code. Since the markdown will generate the code block into something like `<pre><code>...</code></pre>`, so I can use JavaScript to create the line numbers and inject the HTML code into my `<pre><code>` block.

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

> If you want to implement into your site, you can use the JavaScript code above and include it before the `</body>` tag of your site.

Below is the example of my SCSS code used for styling the code block layout as you can see on this page right now:

```css
pre {
  background-color: #212326;
  border: 1px solid #212326;
  box-shadow: 3px 3px rgba(0,0,0,.6);
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
    color: #93a1a1;
    background-color: transparent;
    display: block;
    padding: 0;
  }
  .line-number {
    border-right: 1px solid #444;
    float: left;
    margin: 0 1em 0 -1em;
    user-select: none;
    text-align: right;
    span {
      color: #444;
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