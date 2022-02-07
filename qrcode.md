---
layout: page
title: QR Code Generator
description: Simple QR code generator API
keywords: qrcode, qrcode generator, qrcode api, qrcode google, qrcode php
---

This is a simple QR Code generator API that you can simply use.

**API URL:** [https://dev.nrird.com/qrcode/](https://dev.nrird.com/qrcode/)

**Parameters:**

| data | Data to encode.<br>_Example: `https://heiswayi.nrird.com/qrcode`_ |
| size | Image dimension; width × height in pixels. (Optional)<br>Default is 200x200.<br>_Example: `300x300`_ |
| logo | Logo image URL. (Optional)<br>Default is empty.<br>_Example: `https://static.nrird.com/mylogo.png`_ |



### Demo

#### Usage Example 1

```html
<img src="https://dev.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=400x400">
```

[![Example 1](https://dev.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=400x400)](https://dev.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=400x400)

#### Usage Example 2 - With Logo

```html
<img src="https://dev.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=400x400&logo=https://dev.nrird.com/qrcode/example.png">
```

[![Example 2](https://dev.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=400x400&logo=https://dev.nrird.com/qrcode/example.png)](https://dev.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=400x400&logo=https://dev.nrird.com/qrcode/example.png)