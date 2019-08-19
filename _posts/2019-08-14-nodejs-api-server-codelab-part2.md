---
layout: post
title: "nodeJS API 서버 만들기 실습 - Part 2. 웹 서버"
date: 2019-08-14 16:31:38 +0900
update: 2019-08-19 13:55:31 +0900
categories: [tutorial, javascript, nodejs]
published: true
---

* TOC
{:toc}

# 참고한 글

김정환님의 [Node.js 코드랩](http://jeonghwan-kim.github.io/series/2018/12/01/node-web-0_index.html)

# 목적

nodeJS API 서버를 바닥부터 만들어보면서 모든 과정을 내가 이해한 문장으로 정리한다.

# 기본 모듈을 사용한 웹 서버 생성

웹 서버라면 HTTP 통신이 가능해야 한다. 기존에 만든 `server.js`는 "Hello world"라는 문자열을 출력할 뿐, HTTP 요청을 받거나 HTTP 응답을 반환할 수 없다. 

## 테스트 코드 작성

서버가 HTTP 요청을 받으려면 HTTP 요청 대기상태여야 한다. HTTP 요청 대기상태인지 확인하려면 server 객체가 `listen` 메소드를 가지고 있는지 확인하면 된다. 테스트 코드를 작성해보자.

```javascript
// server.spec.js
const mocha = require('mocha')
const describe = mocha.describe;
const should = require('should');
const server = require('./server');

describe('server', () => {
  it('should have listen()', () => {
    server.should.have.property('listen');
    should(typeof server.listen).be.equal('function');
  })
})
```

테스트를 실행하면 다음과 같은 결과가 출력된다.

```bash
$ npm test

> node-api@1.0.0 test /Users/jay/Practice/node-api
> mocha $(find ./ -name "*.spec.js")

  server
    1) should have listen()


  0 passing (7ms)
  1 failing

  1) server
       should have listen():
     AssertionError: expected Function { name: 'server' } to have property listen
      at Assertion.fail (node_modules/should/cjs/should.js:275:17)
      at Assertion.value [as property] (node_modules/should/cjs/should.js:356:19)
      at Context.it (server.spec.js:6:24)
```

server 객체는 listen 속성이 없다는 오류이다.

## 테스트 통과 

테스트 코드를 통과할 수 있도록 `server.js`를 웹 서버로 만들기 위해 [Node.js 공식문서 예제](https://nodejs.org/dist/latest-v10.x/docs/api/synopsis.html) 코드를 붙여 넣는다.


```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http//${hostname}${port}/`);
});

module.exports = server;
```

> 코드 설명
* http 모듈을 임포트하여 변수 http에 할당한다.
* `createServer([requestListener])` 메소드를 사용하여 HTTP 서버 객체를 생성한다. HTTP 서버 객체는 `EventEmitter` 클래스를 상속한 것으로 request 이벤트가 발생하면 HTTP request를 처리하여 response를 반환하는 request Listener 함수를 호출한다. request Listener 함수는 request와 response 객체를 전달받으며 HTTP request 이벤트가 발생할 때마다 한번씩 호출된다.
* 현재 `createServer()` 함수의 인자에는 서버가 실행된 후의 동작이 콜백 함수로 등록되어 있다.
* `createServer` 메소드가 반환한 HTTP 서버 객체의 `listen` 메소드에 포트 번호 3000을 전달하여 서버를 실행한다.
* `server` 객체를 모듈로 사용할 수 있도록 외부에 공개한다.

테스트를 실행하면 다음과 같이 통과한다.

```bash
$ npm test
> node-api@1.0.0 test /Users/jay/Practice/node-api
> mocha $(find ./ -name "*.spec.js")

Server running at http//127.0.0.13000/
  server
    ✓ should have listen()

  1 passing (11ms)
```

서버를 실행하면 어떤 응답을 할지 확인하기 위해 다음 명령을 입력한다.

```bash
$ node server.js
```

curl 명령어로 입력하여 'Hello, World!' 출력을 확인한다.

```bash
$ curl -X GET 127.0.0.1:3000
Hello, World!
```

# Links

* [Node.js 코드랩 \| 김정환님](http://jeonghwan-kim.github.io/series/2018/12/01/node-web-0_index.html)
* [HTTP \| nodejs.org](https://nodejs.org/dist/latest-v10.x/docs/api/http.html)
* [Http Server \| poiemaweb](https://poiemaweb.com/nodejs-basics#5-nodejs-맛보기--http-server)
