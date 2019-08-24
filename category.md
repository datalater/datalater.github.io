---
layout: page
title: Category
permalink: /category/
---

{% assign my_categories = (site.categories | sort) %}
{% for category in my_categories %}
  <h3>{{ category[0] }}</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
