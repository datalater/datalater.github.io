---
layout: page
title: Daily Journal
permalink: /daily/
---
{{ site.categories.CATEGORY }}
{% assign categories = site.categories | sort %}
{% for category in categories %}
  {% if category[0] == "daily" %}
  <h3>{{ category[0] }} ({{ category[1] | size }})</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}
