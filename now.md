---
layout: page
title: Now
---

Hi, this is my "now" page!<br>
I'm based in Penang, 🇲🇾, where the local time here right now is <strong id="localTime">MYLOCALTIME</strong>.

## What I'm doing...

- Planning to complete my reading for "The Psychology of Money" book by Morgan Housel.

Last update: 2024-09-26

<small>Inspired by [Derek Sivers](https://sive.rs/nowff) and [nownownow.com](https://nownownow.com/) community.</small>

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