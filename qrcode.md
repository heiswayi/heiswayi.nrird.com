---
layout: page
title: QR Code Generator
description: Simple QR code generator API
keywords: qrcode, qrcode generator, qrcode api, qrcode google, qrcode php
---

This is a simple QR Code generator API that you can simply use.

**API URL:** [https://x.nrird.com/qrcode/](https://x.nrird.com/qrcode/)

**Parameters:**

| data | Data to encode.<br>_Example: `https://heiswayi.nrird.com/qrcode`_ |
| size | Image dimension; width × height in pixels. (Optional)<br>Default is 200x200.<br>_Example: `300x300`_ |
| logo | Logo image URL. (Optional)<br>Default is empty.<br>_Example: `https://x.nrird.com/cube.png`_ |

<hr class="break">

### Demo

#### Usage Example 1

```html
<img src="https://x.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=200x200">
```

![Example 1](https://x.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=200x200)

#### Usage Example 2 - With Logo

```html
<img src="https://x.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=200x200&logo=https://x.nrird.com/sale.png">
```

![Example 2](https://x.nrird.com/qrcode/?data=https://heiswayi.nrird.com/qrcode&size=200x200&logo=https://x.nrird.com/sale.png)

<hr class="break">