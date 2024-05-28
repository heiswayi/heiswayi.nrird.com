---
layout: page
title: Now
---

Hi, this is my "now" page!<br>
I'm based in Penang, 🇲🇾, where the local time here right now is <strong id="localTime">MYLOCALTIME</strong>.

## What I'm doing...

- Procrastinating...
- EValuating my career path... sometimes, looking for better chances.
- Planning to complete [Elements of AI course](https://course.elementsofai.com/).
- Planning to complete my reading for "The Psychology of Money" book by Morgan Housel.
- Looking for new investment vectors...

Last update: 2024-05-26

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