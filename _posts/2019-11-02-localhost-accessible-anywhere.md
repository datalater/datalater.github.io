---
layout: post
title: "localhost 웹 서버 공유하기"
date: 2019-11-02 21:04:10 +0900
update: 2019-11-02 21:26:36 +0900
categories: ['infra']
---

* TOC
{:toc}

# 계기

localhost로 접속 가능한 로컬 웹 서버를 친구에게 공유하고 싶었다.

# 참고

[localtunnel](https://localtunnel.github.io/www/)

# 설치

```bash
$ npm install -g localtunnel
```

# 방법

**1. 로컬 웹 서버를 특정 포트를 지정해서 실행한다**

예를 들어, 3000 포트로 지정했다면 브라우저에서 [http://localhost:3000/](http://localhost:3000/)로 접속 가능하다.

**2. localtunnel 명령어에 방금 지정한 특정 포트를 입력해서 실행한다**

```bash
$ lt --port 3000
your url is: https://silent-bulldog-38.localtunnel.me
```

**3. 친구에게 url을 공유한다**

[https://silent-bulldog-38.localtunnel.me](https://silent-bulldog-38.localtunnel.me)

# Links

* [localtunnel](https://localtunnel.github.io/www/): 본 포스팅에서 이용한 서비스 웹 페이지
* [Access localhost from the internet](https://stackoverflow.com/questions/5108483/access-localhost-from-the-internet): stackoverflow QNA



