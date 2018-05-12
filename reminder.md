---
layout: page
title: Tick-tock. Tick-tock.
description: Self reminder.
keywords: self reminder, manifesto, tick-tock
---

<div class="clock-container">
<div class="clock">
  <div class="block" data-num="0"></div>
  <div class="block" data-num="1"></div>
  <div class="block" data-num="2"></div>
  <div class="block" data-num="3"></div>
  <div class="block" data-num="4"></div>
  <div class="block" data-num="5"></div>
  <div class="block" data-num="6"></div>
  <div class="block" data-num="7"></div>
  <div class="block" data-num="8"></div>
  <div class="block" data-num="9"></div>
  <div class="block" data-num="10"></div>
  <div class="block" data-num="11"></div>
  <div class="block" data-num="12"></div>
  <div class="block" data-num="13"></div>
  <div class="block" data-num="14"></div>
  <div class="block" data-num="15"></div>
  <div class="block" data-num="16"></div>
  <div class="block" data-num="17"></div>
  <div class="block" data-num="18"></div>
  <div class="block" data-num="19"></div>
  <div class="block" data-num="20"></div>
  <div class="block" data-num="21"></div>
  <div class="block" data-num="22"></div>
  <div class="block" data-num="23"></div>
  <div class="block" data-num="24"></div>
  <div class="block" data-num="25"></div>
  <div class="block" data-num="26"></div>
  <div class="block" data-num="27"></div>
  <div class="block" data-num="28"></div>
  <div class="block" data-num="29"></div>
  <div class="block" data-num="30"></div>
  <div class="block" data-num="31"></div>
  <div class="block" data-num="32"></div>
  <div class="block" data-num="33"></div>
  <div class="block" data-num="34"></div>
  <div class="block" data-num="35"></div>
  <div class="block" data-num="36"></div>
  <div class="block" data-num="37"></div>
  <div class="block" data-num="38"></div>
  <div class="block" data-num="39"></div>
  <div class="block" data-num="40"></div>
  <div class="block" data-num="41"></div>
  <div class="block" data-num="42"></div>
  <div class="block" data-num="43"></div>
  <div class="block" data-num="44"></div>
  <div class="block" data-num="45"></div>
  <div class="block" data-num="46"></div>
  <div class="block" data-num="47"></div>
  <div class="block" data-num="48"></div>
  <div class="block" data-num="49"></div>
  <div class="block" data-num="50"></div>
  <div class="block" data-num="51"></div>
  <div class="block" data-num="52"></div>
  <div class="block" data-num="53"></div>
  <div class="block" data-num="54"></div>
  <div class="block" data-num="55"></div>
  <div class="block" data-num="56"></div>
  <div class="block" data-num="57"></div>
  <div class="block" data-num="58"></div>
  <div class="block" data-num="59"></div>
  <div class="divider"></div>
</div>
</div>
<script>
const numbers = [
	[1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1],
	[1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1]
];

const blocks = [];
const digits = Array.from(document.querySelectorAll('.block'));

for (let i = 0; i < 4; i++) {
	blocks.push(digits.slice( i * 15, i * 15 + 15 ));
}

const setNum = (block, num) => {
	let n = numbers[num];
	for (let i = 0; i < block.length; i++) {
		 block[i].classList[ n[i] === 1 ?  'add' : 'remove']('active');
	}
};

const time = {
	s: '',
	m: '',
	h: '',
	p: null
};

const animator = () => {
	let d = new Date(),
		 h = d.getHours().toString(),
		 m = d.getMinutes().toString(),
		 s = d.getSeconds().toString();

	s = s.length === 1 ? '0' + s : s;
	m = m.length === 1 ? '0' + m : m;
	h = h.length === 1 ? '0' + h : h;

	if (s !== time.s) {
		for (let i = 0; i < digits.length; i++) {
			let d = digits[i];
			if (i === +s) {
				d.classList.add('second');
				if (time.p !== null)
					digits[time.p].classList.remove('second');
				time.p = i;
				time.s = s;
			}
		}
	}

	if (m !== time.m) {
		setNum(blocks[2], m[0]);
		setNum(blocks[3], m[1]);
		time.m = m;
	}

	if (h !== time.h) {
		setNum(blocks[0], h[0]);
		setNum(blocks[1], h[1]);
		time.h = h;
	}
 	window.requestAnimationFrame(animator);
};

window.requestAnimationFrame(animator);
</script>

```
Time is the most important asset.
Time does not equal money.
Time equals life.
And you only have one chance to make it right.
Every human being is fighting a battle inside themselves.
It’s your obligation to help and inspire them.
Regardless of what you do,
you can always inspire others to do good.
Nobody is better than you.
And you’re not better than anybody else.
Be humble.
Being in the comfort zone is wonderful,
but nothing ever grows there.
Keep studying.
Keep creating.
Haters will come if you have the audacity to build something new.
Don’t let them define you.
Don’t let them stop you.
Just block them and keep going.
Don’t expect others to make you happy.
You are the only one responsible for your happiness.
Don’t wait until Friday to enjoy life.
Joy should be present in everything you do.
Be kind to your parents.
They gave up many things for you.
Having millions of people admiring you is worthless,
if you’re not admired by your own family.
Don’t fear the unknown.
Fear knowing everything.
Life is too damn short and every day counts.
Do what you wanna do and do it now.
Tick-tock don't stop.
Tick-tock don't wait.
```

<small style="opacity:0.5">Written by Zeno Rocha & Carol Moreschi.</small>
