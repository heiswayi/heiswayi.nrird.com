---
layout: post
title: Adding line numbering in code block
description: This is how I added a line numbering in my code block by using a few lines of vanilla JavaScript and some SCSS for styling.
tags: [jekyll, scss, javascript]
---

Utilizing a code block in Markdown format results in its conversion to HTML code, encapsulated within `<pre><code>` markup. By default, there is no line numbering. It's a straightforward code block display. To incorporate line numbering and apply some CSS styling through SCSS, I employed vanilla JavaScript code:

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

And, this is the example of SCSS code that I used:

```scss
code,
pre {
  font-family: monospace;
  font-variant-ligatures: none;
  font-feature-settings: "liga"0;
}

pre {
  width: 100%;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  white-space: pre;
  overflow: auto;
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  font-size: 0.9rem;

  code {
    padding: 0;
  }

  .line-number {
    float: left;
    margin: 0 1em 0 -1em;
    user-select: none;
    text-align: right;
    border-right: 1px solid red;

    span {
      display: block;
      padding: 0 0.5em 0 1em;
      color: red;
    }
  }

  .cl {
    display: block;
    clear: both;
  }
}
```

## Demo

<script async src="//jsfiddle.net/heiswayi/kqrt5wrL/embed/result/"></script>