---
layout: post
title: "nodeJS API 서버 만들기 실습 - Part 1. 프로젝트 생성 및 테스트 환경 구성"
date: 2019-08-14 16:31:38 +0900
update: 2019-08-19 10:15:43 +0900
categories: [tutorial, javascript, nodejs]
---

* TOC
{:toc}

# 참고한 글

김정환님의 [Node.js 코드랩](http://jeonghwan-kim.github.io/series/2018/12/01/node-web-0_index.html)

# 목적

nodeJS API 서버를 바닥부터 만들어보면서 모든 과정을 내가 이해한 문장으로 정리한다.

# 01 노드 프로젝트 생성

노드 패키지 매니저(NPM, Node Package Manager)를 사용해서 노드 프로젝트를 생성한다.

```bash
$ npm init  // 또는 npm init -y
```

`init` 명령은 노드 프로젝트를 생성한다. 명령을 실행하면 프로젝트 정보에 대해 질문을 하는데, 중요한 사항은 아니니 `-y` 옵션으로 모두 "yes"라고 대답할 수 있다.

명령을 실행하면 프로젝트 폴더에 `package.json` 파일이 생성된다. NPM은 이 파일에 프로젝트 관련 정보를 담는다.

# 02 테스트 환경 세팅

테스트 프레임워크인 모카와 슈드를 설치한다.

```bash
$ npm install --save-dev mocha should
```

테스트 프레임워크는 개발할 때 사용하는 것이고 서비스 운영 시에는 필요 없다. 따라서 `--save-dev` 옵션을 줘서 테스트 프레임워크에 대한 패키지 의존성을 개발용으로 관리하도록 설정한다.

모카는 테스트 코드를 실행해주는 테스트 러너(Test Runner)이고 슈드는 테스트 코드를 작성할 때 실행 결과가 기대하는 값과 같은지 검사해주는 밸리데이터(Validator) 역할을 한다.

# 03 테스트 코드 작성

간단하게 테스트 코드를 작성하기 위해 `server.spec.js` 이름으로 파일을 만든다. 테스트 파일은 파일명에 spec 또는 test를 붙이는 관례가 있는데 여기서는 spec으로 사용한다.

`server.spec.js` 파일에 아래 코드를 붙여 넣는다.

```javascript
const should = require('should')
const server = require('./server')

describe('server test suite', () => {
  it('should return "hello world"', () => {
    server().should.be.equal('Hello world')
  })
})
```

`server` 모듈을 가져와서 실행한 값이 'Hello world' 문자열인지 검증하는 코드다. 테스트 코드를 실행하기 위해 모카 명령어를 입력한다.

```bash
$ node_modules/.bin/mocha server.spec.js
/Users/jay/Practice/node-api/node_modules/yargs/yargs.js:1163
      else throw err
           ^

Error: Cannot find module './server'
```

실행하면 위와 같은 오류 메시지가 뜬다. `./server` 파일을 찾을 수 없다는 뜻이다. 테스트 코드는 작성했지만 테스트 대상인 `server.js`는 아직 만들지 않았기 때문이다.

---

`server.js` 파일을 만들기 전에, 자주 사용할 모카 명령어를 간단하게 사용할 수 있도록 설정하자.

모카 테스트처럼 자주 사용하는 명령어는 `package.json` 파일에 NPM 스크립트로 등록할 수 있다.

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
    "mocha": "^6.2.0",
    "should": "^13.2.3"
  }
}
```

쉘 스크립트를 사용해서 파일명이 "spec.js"로 끝나는 경우 모두 모카 테스트로 실행하도록 설정했다.

`package.json` 파일의 `scripts`에 등록한 `test` 키워드를 사용해서 다시 테스트를 실행해보자.

```bash
$ npm test
> node-api@1.0.0 test /Users/jay/Practice/node-api
> mocha $(find ./ -name "*.spec.js")

/Users/jay/Practice/node-api/node_modules/yargs/yargs.js:1163
      else throw err
           ^

Error: Cannot find module './server'
```

동일한 오류 메시지를 확인할 수 있다.

---

이제 테스트 통과를 위해 `server.js` 파일을 작성한다.

```javascript
const server = () => "Hello world"

module.exports = server
```

"Hello world" 문자열을 출력하는 익명 함수를 `server` 객체에 할당했다. 그리고 `server` 객체를 외부에서 사용 가능한 모듈로 공개하기 위해 `exports` 객체의 속성으로 추가했다.


다시 테스트를 실행한다.

```bash
$ npm test

> node-api@1.0.0 test /Users/jay/Practice/node-api
> mocha $(find ./ -name "*.spec.js")



  server test suite
    ✓ should return "hello world"


  1 passing (6ms)
```

테스트가 통과되었다.

# Links

* [Node.js 코드랩 \| 김정환님](http://jeonghwan-kim.github.io/series/2018/12/01/node-web-0_index.html)
* [ES6 const와 객체 \| poiemaweb](https://poiemaweb.com/es6-block-scope#23-const%EC%99%80-%EA%B0%9D%EC%B2%B4) 
* [ES6 module.exports에 함수를 할당하는 방식 \| poiemaweb](https://poiemaweb.com/nodejs-module#31-moduleexports%EC%97%90-%ED%95%A8%EC%88%98%EB%A5%BC-%ED%95%A0%EB%8B%B9%ED%95%98%EB%8A%94-%EB%B0%A9%EC%8B%9D)
