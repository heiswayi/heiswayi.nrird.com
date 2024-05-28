---
layout: post
title: Using Android tablet as an extend screen on Windows PC
description: The cheapest way to repurpose the old unused Android tablet to be an extra extend screen for Windows PC.
tags: [windows, android-tablet, howto, tips]
---

If you've got an old unused Android tablet lying around, why not repurpose it as an extra extend screen for your Windows computer? Here's how:

## Step 1: Creating a virtual monitor

Start by setting up a virtual monitor on your Windows PC. Even if you already have a second monitor, you can add the tablet as a third screen. To do this, download and install the Virtual Display Driver from [this GitHub repo](https://github.com/itsmikethetech/Virtual-Display-Driver). Follow the instructions in the README file to install the driver. Once installed, configure the virtual monitor's display resolution to match your Android tablet's screen as close as possible and also ensure the display is set to "Extend desktop to this display" mode.

## Step 2: Installing a VNC server on Windows

Next, install a VNC server on your Windows machine. This allows you to connect to your computer from your Android tablet. I recommend using TightVNC, which you can download from [here](https://www.tightvnc.com/download.php). To make the VNC server to display only the virtual monitor you've set up, with TightVNC, you can run this command while the VNC server is running:

```bash
> "C:\Program Files\TightVNC\tvnserver.exe" -controlservice -sharedisplay 3
```

This command configures the VNC server to exclusively show the virtual monitor display to the connected VNC viewer, identified as display number #3 in this instance, given that the second display is already active.

## Step 3: Setting up your Android tablet

On your Android tablet, install a VNC viewer app like bVNC Free, available on the [Google Play Store](https://play.google.com/store/apps/details?id=com.iiordanov.freebVNC&hl=en&gl=US). Once installed, configure the app to connect to your Windows machine's IP address. Now, your tablet will display the third virtual monitor display of your Windows PC.

For smoother performance, both your Windows PC and your tablet must be connected to the same network (LAN). Optionally, you can enable "View-only mode" in the app's advanced settings if you don't need to interact with it. Keep in mind that because the tablet is connecting remotely, the display might not be as responsive as a regular monitor.

## Conclusion

My Android tablet just connected remotely to my Windows machine via VNC, albeit not as seamlessly as the native monitor screen. Nevertheless, it's the most straightforward, quickest, and cost-effective (totally free!) way to utilize my unused Android tablet as a third screen. While there are superior apps available offering more features, they often come at a price and mostly not cheap. Admittedly, this method may not be ideal for tasks requiring rapid responsiveness like watching movies or gaming; in those cases, using the actual monitor screen would be preferable. However, for additional display purposes, it serves adequately.