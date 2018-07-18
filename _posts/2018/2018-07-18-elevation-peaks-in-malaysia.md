---
layout: project
title: Elevation Peaks in Malaysia
description: Simple web project demo using Google Map API and JSON data to show some of the recorded elevation peaks in Malaysia.
keywords: google map api, web project, elevation peaks profile, malaysia map, hiking
tags: [JavaScript, Google Map API, Project]
comments: true
---

A few years ago, I created a simple web project using Google Map API. It is a map that shows some of the recorded elevation peaks in Malaysia. Those elevation peak data contain the peak name, GPS coordinates, elevation profile in meter and remark or short description of the peak. Currently, the data are recorded in JSON format and static. The data that I had not really much as I don't hike as much as other hikers here did. Plus, some of the data are gathered from the Internet itself.

### Data

The data are hosted on [GitHub](https://github.com/heiswayi/elevation-peaks) under the filename called `data.json` and below is an example of the data format in JSON:

```json
{
  "lat": 5.787534,
  "lng": 100.433707,
  "title": "Gunung Jerai",
  "remark": "-",
  "elevation": 1217
}
```

**VOLUNTARY CONTRIBUTION WANTED!** If anyone who likes to contribute to make those data better, the contribution is encouraged and really appreciated. Feel free to make a pull request to the repo on [GitHub](https://github.com/heiswayi/elevation-peaks).

### Demo

Here's the project demo in the embedded CodePen:

<p data-height="415" data-theme-id="light" data-slug-hash="rjJjEz" data-default-tab="result" data-user="heiswayi" data-embed-version="2" data-pen-title="Elevation Peaks in Malaysia" class="codepen">See the Pen <a href="https://codepen.io/heiswayi/pen/rjJjEz/">Elevation Peaks in Malaysia</a> by Heiswayi Nrird (<a href="https://codepen.io/heiswayi">@heiswayi</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Alternatively, you can [click here for fullscreen view](https://codepen.io/heiswayi/full/rjJjEz) in your web browser.