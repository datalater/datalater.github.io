---
layout: page
title: Category
permalink: /category/
---
{{ site.categories.CATEGORY }}
{% assign my_categories = site.categories | sort %}
{% for category in my_categories %}
  <h3>{{ category[0] }} ({{ category[1] | size }})</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
