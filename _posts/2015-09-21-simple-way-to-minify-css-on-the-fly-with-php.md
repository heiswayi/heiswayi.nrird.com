---
layout: post
title: Simple way to minify CSS on the fly with PHP
description: Here's a simple trick to minify CSS code on the fly if your website is built using PHP code.
keywords: web optimization, css compression, css minification, php script
tags: [PHP, Compression]
comments: true
---

If you website contains a lot of CSS files and is built using PHP, then this simple trick may help to minify all your CSS code on the fly. You may check the sample PHP code snippet below.

```php
<?php
header('Content-type: text/css');
ob_start("compress");

function compress($buffer) {

  // Remove comments
  $buffer = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $buffer);

  // Remove tabs, spaces, newlines, etc.
  $buffer = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $buffer);

  return $buffer;
}

// CSS files to compress..
include('grid.css');
include('typography.css');
include('button.css');
include('form.css');
include('table.css');
include('backgrounds.css');
include('pagination.css');
include('breadcrumbs.css');
include('font.css');
include('helpers.css');
include('print.css');
include('animation.css');
include('responsive.css');

ob_end_flush();
?>
```

The code above will include all of your CSS files, minify the code and output itself as a functional CSS-compressed file. Then, this file you can include the same way you include CSS file in your `<head>` section but using `.php` extension file as shown in the example code below:

```HTML
<link href="assets/css/minified.css.php" rel="stylesheet">
```

That's it!
