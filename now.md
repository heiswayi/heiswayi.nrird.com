---
layout: page
title: Now
---

{:.muted}
_This is my "now" page, inspired by [Derek Sivers](https://sive.rs/nowff) and [nownownow.com](https://nownownow.com/)._

---

I'm based in Penang, 🇲🇾, where the local time here right now is <strong id="localTime">MYLOCALTIME</strong>.

## What I've been doing right now...

- Procrastinating...
- Looking for some inspirations to do something meaningful for my life.
- Looking for interesting book to read.

Last update: 2024-05-23

<script>
function updateClock() {
  var now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }));
  var timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  var dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  document.getElementById('localTime').textContent = timeString + " (" + dayName + ")";
}
setInterval(updateClock, 1000);
updateClock();
</script>