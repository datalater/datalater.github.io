---
layout: post
title: "nodeJS API 서버 만들기 실습 - Part 3. Application 모듈"
date: 2019-08-14 16:31:38 +0900
update: 2019-08-19 15:40:25 +0900
categories: [tutorial, javascript, nodejs]
published: true
---

* TOC
{:toc}

# 참고한 글

김정환님의 [Node.js 코드랩](http://jeonghwan-kim.github.io/series/2018/12/01/node-web-0_index.html)

# 목적

nodeJS API 서버를 바닥부터 만들어보면서 모든 과정을 내가 이해한 문장으로 정리한다.

# Application 모듈 생성 

외부 라이브러리를 사용할 때는 한 번 래핑해서 사용하는 것이 좋다. 작성하는 코드가 라이브러리와 강하게 결합되지 않도록 하기 위함이다. 한 단계 완충지를 두면 외부 코드의 변화에 유연하게 대처할 수 있다.

## sinon 패키지 설치

```bash
$ npm install --save-dev sinon
```

sinon은 단위 테스트에 필요한 패키지다. 네트워킹, 데이터베이스 등 종속성이 강한 코드는 테스트하기 어렵다. sinon라이브러리는 stub, mock, fake 등 테스트 더블(Test Duoble)을 제공하여 단위 테스트를 용이하게 만들어준다.

설치 후에는 sinon 패키지가 `package.json`에 추가된다.

```json
{
  "name": "node-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha $(find ./ -name \"*.spec.js\")"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint-config-standard": "^13.0.1",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^9.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "mocha": "^6.2.0",
    "should": "^13.2.3",
    "sinon": "^7.4.1"
  }
}
``` 

## 테스트 코드 작성

`src` 디렉토리를 만들고 그 안에 `Application.spec.js` 파일을 만들어서 아래 코드를 붙여 넣는다. 

```javascript
const describe = require('mocha').describe;
const should = require('should');
const sinon = require('sinon');

const App = require('./Application');

describe('Application', () => {
  describe('listen()', () => {
    it('server 객체의 listen 함수를 실행한다', () => {
      // arrange
      const app = App();
      const spy = sinon.spy();
      app._server.listen = spy

      // act
      app.listen();

      // assert
      should(spy.called).be.equal(true);
    });
  });
});
```

위 코드는 테스트 환경이 `Application 모듈`이고, 테스트 케이스는 Application 모듈의 `listen()` 메소드를 실행한 결과이다.

단위 테스트는 3가지 단계를 거친다.

* 준비(arrange) => 실행(act) => 검증(assert)

위 코드의 구체적인 내용은 다음과 같다.

* `// arrange`: 애플리케이션 객체와 스파이 객체를 만든다. 그리고 `app._server` 객체의 `listen` 속성에 스파이를 할당한다. 스파이를 심은 이유는 검증할 때 `listen` 함수가 호출되었는지 스파이로 확인하기 위해서다.
* `// act`: 테스트할 메소드를 실행한다.
* `// assert`: `listen` 메소드가 실행되었는지 스파이를 통해 검증한다.

테스트를 실행해보자.

```bash
$ npm test
> node-api@1.0.0 test /Users/jay/Practice/node-api
> mocha $(find ./ -name "*.spec.js")

/Users/jay/Practice/node-api/node_modules/yargs/yargs.js:1163
      else throw err
           ^

Error: Cannot find module './Application'
```

Application 모듈을 찾지 못하는 오류가 발생한다.

## 테스트 통과 

테스트 코드를 통과할 수 있도록 Application 모듈과 `listen` 메소드를 구현한다.

```javascript
const http = require('http')

const Application = () => {
  const _server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello, World!\n')
  })

  const listen = (port = 3000, hostname = '127.0.0.1', fn) => {
    _server.listen(port, hostname, fn)
  }

  return {
    _server,
    listen
  }
}

module.exports = Application;
```

코드 설명:

* 우리가 구현할 Application 모듈은 HTTP 웹 서버다. 따라서 `http` 모듈을 먼저 임포트한다.
* 테스트 코드에 보면 `_server` 객체를 통해 스파이를 심는다. 테스트 용도로 노출하는 것이기 때문에 변수 이름 앞에 언더스코어(`_`)를 붙인다. `http.createServer()` 함수로 테스트용 서버를 만들어 `_server`에 할당한다.
* 생성한 `_server` 객체를 통해 `listen` 메소드를 구현한다. `listen` 메소드는 포트 번호와 호스트명에 대한 기본 인자값을 설정해서 방어 코드를 만든다. 테스트 코드에서 `listen` 함수 호출 여부를 체크했기 때문에 `_server.listen()`을 호출한다.
* 모듈 패턴은 자바스크립트 객체를 반환한다. 여기서는 테스트 코드에 `_server`와 `listen` 함수를 넣어서 반환한다.

테스트 코드를 실행하면 다음과 같이 통과한다.

```bash
$ npm test

> node-api@1.0.0 test /Users/jay/Practice/node-api
> mocha $(find ./ -name "*.spec.js")

Server running at http://127.0.0.1:3000/
  server
    ✓ should have listen()

  Application
    listen()
      ✓ server 객체의 listen 함수를 실행한다

  2 passing (15ms)
```

이제 `server.js`를 `aps.js`로 이름을 바꾼다. 서버라기보다는 애플리케이션 모듈을 이용한 애플리케이션 객체라는 의미다. `app.js` 코드는 다음과 같다.


```javascript
const App = require('./src/Application');
const app = App();

module.exports = app;
```

Application 모듈을 임포트하여 객체로 만들어 `app`에 할당한 후, 모듈로 공개한다.

서버 구동용으로 `bin.js` 파일을 만든다.

```javascript
const app  = require('./app');
const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

서버 실행에 대한 명령어 스크립트를 `package.json`에 추가해준다.


```json
{
  "name": "node-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node bin",
    "test": "mocha $(find ./ -name \"*.spec.js\")"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint-config-standard": "^13.0.1",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^9.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "mocha": "^6.2.0",
    "should": "^13.2.3",
    "sinon": "^7.4.1"
  }
}
```

`npm start`는 `package.json`의 `scripts`에 있는 `start` 명령어를 실행하는 부분이다. 만약 `start` 명령어를 따로 설정하지 않을 경우 `node server.js`가 실행된다.

서버를 실행해보자.

```bash
$ npm start
> node-api@1.0.0 start /Users/jay/Practice/node-api
> node bin

Server running at http://127.0.0.1:3000/
```

# Links

* [Node.js 코드랩 \| 김정환님](http://jeonghwan-kim.github.io/series/2018/12/01/node-web-0_index.html)
* [HTTP \| nodejs.org](https://nodejs.org/dist/latest-v10.x/docs/api/http.html)
* [Http Server \| poiemaweb](https://poiemaweb.com/nodejs-basics#5-nodejs-맛보기--http-server)
* [Sinon.js의 spy, stub, mock의 Best Practice](https://tiffany.devpools.kr/2018/03/19/sinon/)
* [단위 테스트 케이스와 테스트 더블(Test Double)](https://medium.com/@SlackBeck/%EB%8B%A8%EC%9C%84-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BC%80%EC%9D%B4%EC%8A%A4%EC%99%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8D%94%EB%B8%94-test-double-2b88cccd6a96)
* [npm 명령어 \| zerocho](https://www.zerocho.com/category/NodeJS/post/58285e4840a6d700184ebd87)
