---
layout: post
title: "ES5 핵심개념 - 02 호이스팅"
date: 2019-09-30 20:16:37 +0900
update: 2019-11-02 21:35:56 +0900
categories: ['javascript']
---

* TOC
{:toc}

# 호이스팅이란 무엇인가

`hoist`는 "끌어올리다"라는 뜻이다. 무엇을 끌어올리냐면,

* 변수 **선언**
* 함수 **선언**

# 예제

아래 코드를 실행하면 오류가 날까, 안 날까?

```javascript
console.log(a());
console.log(b());
console.log(c());

function a() {
  return 'a';
}
var b = function bb() {
  return 'bb';
}
var c = function() {
  return 'c';
}
```

자바스크립트 엔진은 코드를 실행하기 전 단계에서 코드 전반에 걸쳐,

* 선언된 내용이 있는지 쭉 훑어본다.
* 발견하는 족족 위로 끌어올린다.

따라서, 자바스크립트 엔진이 실제로 실행할 내용은 다음과 같다:

```javascript
function a() {
  return 'a';
}
var b;
var c;
console.log(a());
console.log(b());
console.log(c());

b = function bb() {
  return 'bb';
}
c = function() {
  return 'c';
}
```

> 할당은 호이스팅의 대상이 아니다.

결론적으로 에러가 나지 않는다.

# 함수선언문과 함수표현식

## 함수선언문

```javascript
function a() {
  return 'a';
}
```

## 함수표현식

**기명 (named)**

```javascript
var b = function bb() {
  return 'bb';
}
```

**익명 (unnamed / annonymous)**

```javascript
var c = function() {
  return 'c';
}
```

## 함수선언문을 쓰지 말고 함수표현식을 써라

더글라스 크락포드는 함수선언문 대신에 반드시 함수표현식을 쓸 것을 권한다.

```javascript
function sum(a, b) {
  return a + ' + ' + b + ' = ' + (a + b);
}
sum(1, 2);

/* 5000줄 중략 */

function sum(a, b) {
  return a + b;
}
sum(3, 4);
```

위 코드는 함수선언문을 사용했다. 만약 위 함수를 실행하면 `sum(1, 2)`가 `"1 + 2 = 3"`가 나오지 않고, `3`이 나올 것이다. 왜냐하면 함수선언문은 호이스팅되기 때문이다.

다른 개발자가 소스를 파악하고 이해하는데 상당히 저해가 된다.

호이스팅 및 기타 등등의 이유로 더글라스 크락포드는 함수선언문 대신 무조건 함수표현식을 쓸 것을 권한다.

WIP: `2-2. 함수선언문과 함수표현식`까지 완료함.



