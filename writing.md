---
layout: page
title: Writing
description: A list of blog posts
keywords: blog posts, articles, writing, non-project
---

{% assign rawtags = "" %}
{% for post in site.posts %}
	{% assign ttags = post.tags | join:'|' | append:'|' %}
	{% assign rawtags = rawtags | append:ttags %}
{% endfor %}
{% assign rawtags = rawtags | split:'|' | sort %}

{% assign tags = "" %}
{% for tag in rawtags %}
	{% if tag != "" %}
		{% if tags == "" %}
			{% assign tags = tag | split:'|' %}
		{% endif %}
		{% unless tags contains tag %}
			{% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
		{% endunless %}
	{% endif %}
{% endfor %}

<div class="posts">
  {% for post in site.posts %}

    {% unless post.tags contains "Project" %}

    <div class="post-list">
	    <div class="text-truncate"><a href="{{ post.url }}">{{ post.title }}</a></div>
      <div class="post-list-desc">{{ post.description }}</div>
    </div>

    {% endunless %}

  {% endfor %}
</div>
