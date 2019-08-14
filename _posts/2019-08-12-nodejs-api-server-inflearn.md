---
layout: post
title: "[WIP] nodeJS API 서버 만들기 실습"
date: 2019-08-12 21:40:20 +0900
update: 2019-08-14 16:29:27 +0900
categories: [tutorial, javascript, nodejs]
published: false
---

* TOC
{:toc}

# 목적

[인프런 테스트주도개발(TDD)로 만드는 NodeJS API 서버](https://www.inflearn.com/course/%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%A3%BC%EB%8F%84%EA%B0%9C%EB%B0%9C-tdd-nodejs-api#) 강의 내용을 정리하고, NodeJS API 서버를 만든다.

# 설치

[https://nodejs.org/en/](https://nodejs.org/en/)로 이동해서 LTS 버전을 다운로드 받고 설치한다.

터미널에서 다음 명령어가 정상적으로 동작하면 설치가 성공한 것이다.

```bash
$ node -v
v10.16.2
```

```bash
$ npm -v
6.9.0
```

# NodeJS 기초

## NodeJS는 이벤트 기반의 비동기 I/O 프레임워크이다

**이벤트 기반인 이유**:

* 클라이언트가 NodeJS로 만든 애플리케이션에 요청을 보내면, NodeJS는 클라이언트의 요청을 이벤트로 만들어서 이벤트 큐에 차곡차곡 쌓아둔다. 
* 이벤트 루프(Event Loop)는 이벤트 큐에 있는 이벤트 하나 하나를 뽑아서 실행한다.
* 이벤트 루프는 싱글 스레드(single thread)이며 요청받은 일을 처리한다. 일을 처리한 다음에는 일의 결과를 클라이언트에게 전달한다.

즉, NodeJS는 일을 처리하는 단위가 이벤트이고 일을 처리하는 방식 또한 이벤트 루프를 사용하기 때문에 이벤트 기반이라고 한다.

> NodeJS가 싱글 스레드라는 것은 이벤트 루프를 두고 하는 말이다.

**비동기 I/O인 이유**:

* 이벤트 루프가 이벤트를 처리할 때, 바로 응답할 수 없고 많은 시간이 걸릴 때도 있다. 이런 무거운 일(long-running jobs)은 이벤트 루프가 직접 실행하지 않고 다른 스레드에게 일을 위임한다.
* 무거운 일을 실행하는 워커들을 Non-blocking Worker라고 부른다. 이 워커들은 실행이 완료되면 그 결과를 다시 이벤트 형태로 이벤트 큐에 전달한다.
* 이벤트 루프는 이벤트 큐에 있는 이벤트를 하나씩 실행하고, 워커 스레드는 완료된 이벤트를 이벤트 루프에 보낸다. 이벤트 루프가 이벤트 큐에서 워커 스레드가 보내준 이벤트를 뽑으면 그 이벤트를 계속 실행하고, 실행이 완료되면 결과를 클라이언트에게 보낸다.

클라이언트가 보낸 요청 중에서 무거운 일은 워커 스레드에게 전달해서 비동기로 처리하기 때문에 비동기 I/O라고 한다.

# NodeJS 모듈 시스템

NodeJS는 파일 형태로 모듈을 관리할 수 있는 스펙인 CommonJS로 구현되어 있다.

따라서 파일 하나 하나를 모듈로 만들어서 관리할 수 있다.

## 기본 내장 모듈

```javascript
const http = require('http');

http.createServer();
```

NodeJS에 내장된`http` 기본 모듈을 가져와서 `http` 모듈이 제공하는`createServer()` 메소드를 사용할 수 있다.

## 사용자 정의 모듈

사용자가 모듈을 직접 만들 수도 있다.

`math.js` 파일을 만들고 다음 코드를 붙여 넣는다:

```javascript
function sum (a, b) {
    return a + b;
}

// 모듈로 만들기 위한 코드
module.exports = {
    sum: sum
};
```

모듈로 만들려면 `module`이라는 키워드를 사용해서 `exports`를 쓴 다음 객체를 할당해줘야 한다.

이제 `math.js` 모듈을 `index.js`에서 사용해보자:

```javascript
const math = require('./math.js');

const result = math.sum(1, 2);

console.log(result); // 3
```

터미널로 가서 `index.js` 파일을 실행해본다:

```javascript
$ node index.js
3
```

`math.js` 모듈을 사용하여 기대하는 값이 나오는 것을 알 수 있다.

---

# 익스프레스JS 기초

익스프레스JS는 노드JS로 만들어진 웹 프레임워크다.

익스프레스는 총 5가지 개념이 있다.

* 애플리케이션
* 미들웨어: 함수들의 배열. 익스프레스에 어떤 기능을 추가하고 싶을 때마다 미들웨어를 통해 서버에 기능을 추가한다.
* 라우팅: 클라이언트가 요청한 URL에 따라 어떤 반응을 해야 하는지 설정하는 것.
* 요청객체
* 응답객체

## 애플리케이션

익스프레스 인스턴스를 애플리케이션이라고 한다.


```javascript
const exmpress = require('express');
const app = express();
```

이때 `app`을 익스프레스 애플리케이션이라고 한다.

## 미들웨어

미들웨어는 함수들의 연속이다. 익스프레스에 기능을 추가할 때 미들웨어 형태로 추가할 수 있다.


