---
layout: post
title: "[WIP] 인프런 Node.js 웹 개발 강의 정리"
date: 2019-09-01 17:44:00 +0900
update: 2019-09-02 21:31:46 +0900
categories: ['javascript', 'express']
---

* TOC
{:toc}

# 목적

[인프런 Node.js 웹 개발 강의](https://www.inflearn.com/course/node-js-웹개발)를 듣고 나만의 방식으로 정리한다.

# 01 NPM Project 시작하기

node 프로젝트를 생성한다:

```bash
$ npm init
```

node 기반 웹 서버 프레임워크인 익스프레스를 설치한다:

```bash
$ npm install express --save
```

`node_modules`에 익스프레스가 필요로 하는 모듈이 설치된다. 그리고 `package.json`을 보면 익스프레스가 dependency에 추가된다.

# 02 Express 기반 웹 서버 구동

`app.js` 파일을 만든 후 코드를 붙여 넣는다:

```javascript
var express = require("express"); // node_modules 디렉토리에서 express 관련된 파일을 가져온다.
var app = express(); // require('express')의 반환값이 함수이다. 그 함수를 실행하여 함수의 반환값을 app에 할당한다.

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});
```

`app.js` 파일을 실행한다:

```bash
$ node app.js
start! express erver on port 3000
```

위 코드와 같이 `console.log()` 메시지가 출력된다.

서버를 멈추고 (ctrl + c), `app.js` 마지막에 코드를 추가한다:

```javascript
var express = require("express"); // node_modules 디렉토리에서 express 관련된 파일을 가져온다.
var app = express(); // require('express')의 반환값이 함수이다. 그 함수를 실행하여 함수의 반환값을 app에 할당한다.

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

console.log("end of server code...");
```

`app.js` 파일을 다시 실행한다:

```bash
$ node app.js
end of server code ...
start! express erver on port 3000
```

줄 넘버가 더 뒤에 있는 "end of server code..."가 먼저 출력되었다. 그 이유는 노드가 비동기로 동작하기 때문이다. 노드에서 콜백함수(함수 안에서 실행되는 함수)는 다 비동기로 동작된다고 생각하면 된다. 즉 위 코드에서는 `app.listen()` 함수가 실행될 때까지 기다리지 않고 아래 라인인 `console.log("end of server code...")` 실행된다. 그리고 나서 콜백함수가 실행된다.

파일을 변경할 때마다 서버를 종료하고 다시 실행하는 작업은 매우 귀찮다. 자동으로 파일의 변화를 감지하고 서버를 내렸다가 다시 올려주는 프로그램이 있다:

```bash
$ npm install nodemon -g
```

노드몬은 지금 작업 중인 프로젝트뿐만 아니라 PC내 모든 노드 프로젝트에서 사용하는 것이 좋으므로 `-g` 옵션을 추가한다.

nodemon으로 `app.js`를 실행한다:

```bash
$ nodemon app.js
```

파일을 변경하고 저장하면, 자동으로 서버가 종료되었다가 다시 시작되는 것을 확인할 수 있다.

## 결론

* `var express = require("express");`: `node_modules` 디렉토리에서 express 관련 파일을 import 한다.
* `var app = express();`: express 함수를 실행해서 서버 객체를 app에 할당한다.
* 노드의 콜백함수는 비동기로 동작한다.
* `npm install nodemon -g`: nodemon은 파일 변경을 감지하고 자동으로 서버를 재실행시켜준다.

# 03 URL Routing 처리

nodemon으로 서버를 실행한 상태에서 `app.js` 파일에 코드를 추가한다:

```javascript
var express = require("express"); // node_modules 디렉토리에서 express 관련된 파일을 가져온다.
var app = express(); // require('express')의 반환값이 함수이다. 그 함수를 실행하여 함수의 반환값을 app에 할당한다.

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

app.get("/", function(req, res) {
  res.send("<h1>Hi, friend!</h1>");
});
```

브라우저에 `127.0.0.1:3000`으로 접속해보면 "Hi, friend!"가 출력된다. `res.send()` 메소드는 익스프레스 공식 홈페이지에 가서 getting started를 찾아보면 설명이 자세히 나온다.

루트 홈페이지에 접속하면 `main.html` 페이지를 클라이언트에게 보여주는 기능을 구현해보자. 먼저 `public` 디렉토리를 만들고 그 안에  `main.html`을 만든다:

```html
<html>
    <head>
        <meta charset="utf-8">
        <title>main.html</title>
    </head>
    <body>
        <h1>main page</h1>

        <p>Lorem ipsum dolor sit ament.</p>
    </body>
</html>
```

브라우저에서 `127.0.0.1:3000/public/main.html`로 접속해봐도 제대로 되지 않는다. 모든 요청에 대해서 일일이 처리해줘야 한다.

`app.js` 파일에 코드를 추가한다:

```javascript
var express = require("express"); // node_modules 디렉토리에서 express 관련된 파일을 가져온다.
var app = express(); // require('express')의 반환값이 함수이다. 그 함수를 실행하여 함수의 반환값을 app에 할당한다.

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});
```

브라우저에서 `127.0.0.1:3000`으로 서버에 접속해보면 `main.html` 내용이 출력된다.

## 결론

* 클라이언트가 요청했을 때 응답을 줄려면 일일이 라우팅 설정을 해야 한다.
* `app.get("/", function(req, res) { });`: 클라이언트가 "/" URL로 GET 요청을 보낼 때 콜백함수로 응답을 주기 위해 라우팅을 설정한다.
* `res.sendFile(__dirname + "/public/main.html");`: `/public/main.html` 파일을 응답으로 보낸다.

# 04 static 디렉토리 설정

`main.html` 코드가 있는 `public` 디렉토리에 `main.js` 파일을 만든다:

```javascript
console.log("main js loaded");
```

그리고 나서 `main.html`에 자바스크립트 코드를 연결시킨다:

```html
<html>
    <head>
        <meta charset="utf-8">
        <title>main.html</title>
    </head>
    <body>
        <h1>main page</h1>

        <p>Lorem ipsum dolor sit ament.</p>

        <script src="main.js"></script>
    </body>
</html>
```

브라우저에서 서버에 접속해서 개발자도구 콘솔창을 보면 "Failed to load resource: the server responded with a status of 404 (Not Found)" 메시지가 뜬다. `127.0.0.1:3000/main.js`를 접속했을 때 `main.js`를 불러오지 못하는 것이다.

자바스크립트, CSS, 이미지 파일을 static 파일이라고 한다. 이런 static 파일은 서버에서 요청받는대로 바로 바로 처리해주는 게 좋다. 그래서 static 파일을 지정해두면 편하다.

static 디렉토리를 익스프레스에 등록을 해주는 절차가 필요하다. `app.js` 파일에 코드를 추가한다:

```javascript
app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});
```

`127.0.0.1:3000/main.js`를 접속하면 "console.log("main js loaded")"가 정상적으로 출력된다.

이번에는 이미지 디렉토리를 만들어보자. `public` 디렉토리에 `images` 디렉토리를 추가한다. 그리고 원하는 이미지 파일(ex. favicon.png)을 디렉토리에 추가한다. 그리고 나서 `main.html`에 이미지 연결 코드를 추가한다:

```html
<html>
    <head>
        <meta charset="utf-8">
        <title>main.html</title>
    </head>
    <body>
        <h1>main page</h1>

        <p>Lorem ipsum dolor sit ament.</p>

        <img src="images/favicon.png" alt="">
        <script src="main.js"></script>
    </body>
</html>
```

이번에는 `/main`으로 접속해도 동일한 페이지가 나오도록 설정해보자:

```javascript
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});
```

`127.0.0.1:3000/main`으로 접속하면 루트 홈페이지와 동일한 내용이 출력된다.

## 결론

* 프로젝트 루트 경로에 `public` 디렉토리를 만든다.
* `app.js`에 `app.use(express.static('public'));` 코드를 추가한다.
* `public` 디렉토리에 있는 html, css, 이미지 파일이 라우팅 처리없이 URL로 연결된다.

# 05 POST 요청 처리

간단한 form을 만들어보자. `public`이 static 디렉토리이기 때문에 html 파일을 만들면 URL로 바로 접속할 수 있다. `public` 안에 `form.html`을 만든다:

```html
<html>
  <head> </head>
  <body>
    <form action="/email_post" method="post">
      email : <input type="text" name="email" /><br />
      <input type="submit">
    </form>
  </body>
</html>
```

`127.0.0.1:3000/form.html`에 접속하면 `form.html`이 렌더링된다. 이메일을 입력해서 `submit` 버튼을 눌러본다. `Cannot POST /email_post` 오류가 발생한다. 아직 `/email_post`에 대한 URL 라우팅 처리를 안해줬기 때문이다.

`app.js`에 가서 post 요청에 대한 라우팅 처리를 추가한다:

```javascript
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function(req, res) {
  res.send("post response");
});
```

`127.0.0.1:3000/form.html`에 접속해서 이메일을 입력한 후 다시 submit을 누르면 "post response" 메시지가 정상적으로 출력된다.

그런데 중요한 점은 데이터다. post 요청의 본문(body)을 사용하려고 한다. 별도의 모듈인 `body-parser`가 필요하다. 설치한다:

```bash
$ npm install body-parser --save
```

설치한 모듈을 사용하려면 코드에서 import 해야 한다. `app.js` 코드에 require 구문을 추가한다:

```javascript
var express = require("express"); // node_modules 디렉토리에서 express 관련된 파일을 가져온다.
var app = express(); // require('express')의 반환값이 함수이다. 그 함수를 실행하여 함수의 반환값을 app에 할당한다.
var bodyParser = require("body-parser");
```

이렇게만 하면 안되고, 익스프레스 서버에게 '나 bodyParser 쓸래.'라고 알려줘야 한다. `use()` 구문을 추가한다:

```javascript
app.use(express.static("public"));
app.use(bodyParser.json()); // 클라이언트에서 오는 요청이 JSON일 수도 있고
app.use(bodyParser.urlencoded({ extended: true })); // JSON 아닐 때는 urlencdoed로 요청이 온다. 이 코드는 그냥 외운다고 생각하면 된다. 클라이언트와 서버는 데이터를 주고 받을 때는 인코딩을 해서 통신한다. 쉽게 얘기하면, 아스키 형태의 데이터만 주고 받을 수 있는데, 예를 들어 한글이나 특수기호 같은 데이터는 다른 문자열로 치환을 해서 보낸다. 이를 인코딩한다고 말한다.
```

`bodyParser`가 들어간 코드는 한 마디로 클라이언트의 요청 메시지를 JSON일 때나 urlencoded일 때 모두 처리된다는 뜻이다.

이제 `bodyParser`가 적용되었으니 `req.body`를 출력해본다:

```javascript
app.post("/email_post", function(req, res) {
  console.log(req.body);
  res.send("post response");
});
```

브라우저에서 이메일 제출 버트을 누르면 아래와 같은 메시지가 서버에 찍힌다.

```bash
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
start! express server on port 3000
{ email: 'the7mincheol@gmail.com' }
```

> 만약, `bodyParser`에 대한 `use()` 구문을 주석처리하면 `undefined`로 출력된다.

오브젝트 형태로 오는 것을 확인했으니 코드를 다음과 같이 수정한다:

```javascript
app.post("/email_post", function(req, res) {
  console.log(req.body.email);
  res.send("post response");
});
```

이제 클라이언트에서 전송한 form이 서버로 왔으니, 값을 사용해서 DB를 조회하거나 등의 기능을 구현할 수 있다. 

가령, 클라이언트에서 요청한 결과에 대해 html 메시지를 보내보자:

```javascript
app.post("/email_post", function(req, res) {
  console.log(req.body.email);
  res.send("<h1>Welcome, " + req.body.email + "</h1>");
});
```

form.html에서 이메일을 입력한 후 제출하면, "Welcome, the7mincheol@gmail.com" 메시지가 출력된다.

## 결론

* static 디렉토리 `public` 하위에 `form.html`을 만든다.
* `form.html`에서 설정한 action url(ex. `/email_post`)에 대한 라우팅을 설정한다.
* POST 요청의 body를 읽어오려면 `npm install body-parser --save`를 통해 `body-parser` 모듈을 설치한다.
* `body-parser` 모듈을 사용하기 위해 `var bodyParser = require("body-parser");` 모듈 import 코드를 추가한다.
* 익스프레스에게 `bodyParser`를 사용할 것이라고 알려주기 위해 `app.use(bodyParser.json());`과 `app.use(bodyParser.urlencoded({ extended: true }));` 미들웨어 사용 코드를 추가한다.
* `app.post("/email_post", function(req, res) {  });`: POST 요청에 대한 라우팅 설정을 한다.
* `req.send("<h1>Welcome, " + req.body.email + "</h1>");`: POST 요청 바디 오브젝트의 email 속성의 값을 사용해서 응답을 보낸다.
* 참고로 GET 요청의 쿼리 파라미터를 읽어오려면 `req.param('email')`와 같이 코드를 작성한다.

# 06 View engine을 활용한 응답 처리

html 응답을 줄 때 데이터와 html을 결합해서 주는 방법을 알아본다. 즉 서버에서 html을 생성해서 응답을 줄 때 데이터를 섞어서 보내줄 수 있다.

미리 html을 만들어 두고 데이터를 삽입해보자. 익스프레스와 결합해서 동작하는 템플릿인 `ejs`를 설치한다:

```bash
$ npm install ejs --save
```

`app.js`에서 코드를 추가한다:

```javascript
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // view engine으로 ejs를 사용할게.
```

모듈을 import 하지 않고, `app.set()`을 이용한다.

view는 지정된 디렉토리가 있다. `views` 디렉토리를 만들고 그 안에 `email.ejs` 파일을 만든다:

```html
<html>
  <head> 
      <title>email ejs template</title>
  </head>
  <body>
    <h1>Welcome! <%= email %> </h1>
    <p>정말로 반가워요 :)</p>
  </body>
</html>
```

템플릿마다 치환하기 위한 데이터 영역을 `<%= %>` 등 다양한 방법으로 사용한다. 

템플릿을 만들었으니, `email.ejs`를 사용해보자:

```javascript
app.post("/email_post", function(req, res) {
  // get : req.param('email')
  console.log(req.body.email);
  // res.send("<h1>Welcome, " + req.body.email + "</h1>");
  res.render("email.ejs", { email: req.body.email });
});
```

`res.render("email.ejs", { email: req.body.email })`: `email.ejs`에다가 `req.body.email` 값을 `email`이라는 네임값에 치환시켜서 클라이언트에 응답을 해줘.

`express view engine`으로 구글링을 해보면 `pug`를 사용한 [예시 코드](https://expressjs.com/en/guide/using-template-engines.html)를 확인할 수 있다. 링크처럼 사용해도 된다.

> 강의에서 사용한 것은 `Ejs`였는데 `Pug`는 더 최신 라이브러리로 보인다. 강의자가 추천했듯이, express 공식 문서에서 Getting started와 Guide를 여러 개 따라해보면 노드에 대한 자신감이 생길 것이다.

## 결론

* 익스프레스와 결합해서 동작하는 템플릿 모듈 `Ejs`를 `npm install ejs --save`로 설치한다.
* 모듈 import 코드 없이 `app.set("view engine", "ejs");` 코드를 추가하여 view engine으로 ejs를 사용하도록 설정한다.
* 프로젝트 루트 디렉토리 하위에 `views`라는 템플릿 지정 디렉토리를 만들고 그 안에 `email.ejs` 파일을 만든다.
* `<h1>Welcome! <%= email %> </h1>`: html 코드 안에 데이터 치환 영역을 설정한다.
* `res.render("email.ejs", { email: req.body.email });`: `email.ejs`의 email이라는 네임에 `req.body.email` 값을 치환한 후 클라이언트에 응답을 보낸다.

이렇게 해서 템플릿 조작을 실습했다. 응답을 줄 때, `res.sendFile()`를 사용하지 않고 `res.render()`를 사용해서 데이터와 html을 결합해서 클라이언트에 주고 싶을 때는 템플릿을 사용하면 된다.

## 마치기 전에

`package.json`을 보면 내가 설치한 모듈인 `body-parser`, `ejs`, `express`가 추가되어 있다. `node_modules`가 없어도 `npm install` 명령을 실행하면 `package.json`에서 `dependencies`를 읽어서 자동으로 모듈을 모두 설치해준다. 

다시 말하면, `node_modules`는 크고 무거운 파일이라 github에 업로드하지 않는다.

# 07 JSON 활용한 Ajax 처리

Ajax 처리를 노드 웹 서버와 연동을 해서 구현해본다. Ajax 처리는 브라우저 새로고침 없이 xml http request로 서버와 데이터를 주고받을 수 있다.

`form.html` 코드:

```html
<html>
  <head> </head>
  <body>
    <form action="/email_post" method="post">
      email : <input type="text" name="email" /><br />
      <input type="submit" />
    </form>

    <button class="ajaxsend">ajaxsend</button>

    <div class="result"></div>

    <script>
      document.querySelector(".ajaxsend").addEventListener("click", function() {
        var inputdata = document.forms[0].elements[0].value;
        sendAjax("http://127.0.0.1:3000/ajax_send_email", inputdata);
      });

      function sendAjax(url, data) {
        var data = { email: data };
        data = JSON.stringify(data);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
        xhr.addEventListener("load", function() {
          var result = JSON.parse(xhr.responseText);

          if (result.result !== "OK") return;

          document.querySelector(".result").innerHTML = result.email;
        });
      }
    </script>
  </body>
</html>
```

`app.js` 코드:

```javascript
app.post("/ajax_send_email", function(req, res) {
  console.log(req.body.email);
  var responseData = { result: "OK", email: req.body.email };
  res.json(responseData);
});
```

# 08 중간 실습 과제 1


