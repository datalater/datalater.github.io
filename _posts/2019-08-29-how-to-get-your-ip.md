---
layout: post
title: "IP 주소 알아내는 법"
date: 2019-08-30 18:17:42 +0900
update: 2019-08-30 18:26:38 +0900
categories: 
---

* TOC
{:toc}

# 목적

사용하는 리눅스 계열 서버의 IP 주소를 터미널에서 바로 알아내는 방법을 기록한다.

# 방법

```bash
$ curl ifconfig.me
192.168.***.**
``` 

`ifconfig`란 interface configuration for network의 약자이다.

# 추가 공부

* Q1. 터미널에서 `ifconfig`를 실행할 때와 결과가 다른 이유는 무엇일까?
* Q2. 정확히 어떤 원리일까?

# Links

* [How to Check the IP Address in Linux](https://www.wikihow.com/Check-the-IP-Address-in-Linux)

