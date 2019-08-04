---
layout: post
title: "자바스크립트 핵심 가이드 - 객체"
date: 2019-08-04 11:47:32 +0900
update: 2019-08-04 17:21:15 +0900
categories: book-report TIR javascript
---

* TOC
{:toc}

# Quotes & Thoughts

**intro**:

* 객체는 이름과 값이 있는 속성들을 포함하는 컨테이너라고 할 수 있다.
	> 여러 개를 공통된 하나로 묶고 싶다면, 컨테이너가 필요한 것이고, 자바스크립트에서 컨테이너가 필요하다면 객체를 사용하면 된다.
* 속성의 이름은 문자열이면 모두 가능한데, 여기에는 빈 문자열도 포함한다. (배열?!)
	> 배열은 속성의 이름이 빈 문자열인 객체인건가?
* 객체는 데이터를 한 곳에 모으고 구조화하는데 유용하다.
	> 함수의 인자로 여러 개를 넘겨야 하는데 이때 하나로 묶을 수 있다면 그 여러 개를 객체로 구조화해 볼 것을 시도해보자.
* 자바스크립트에는 객체 하나에 있는 속성들을 다른 객체에 상속하게 해주는 프로토타입(prototype) 연결 특성이 있다. 이 특성을 잘 활용하면, 객체를 초기화하는 시간과 메모리 사용을 줄일 수 있다.

**01 객체 리터럴**:

* 속성의 이름을 사용할 때 따옴표를 생략할 수 있다. 단, 자바스크립트에서 사용할 수 있는 유효한 이름이 아니거나 예약어일 경우에는 따옴표를 반드시 써야 한다. 예를 들어, `first-name`은 유효한 변수명이 아니기 때문에 따옴표를 생략할 수 없지만, `first_name`은 따옴표를 생략할 수 있다.

**02 속성값 읽기**:

* 속성의 값은 속성 이름을 대괄호로 둘러싼 형태(`flight["departure"]`)뿐만 아니라 마침표 표기법(`flight.departure`)을 사용하여 읽을 수 있다. 단, 속성 이름이 유효한 자바스크립트 이름이 아니거나 예약어일 때는 마침표 표기법을 사용할 수 없다. 마침표 표기법은 보다 간단하고 읽기 편해서 보통 더 선호한다.
* 객체에 존재하지 않는 속성을 읽으려고 하면 `undefined`를 반환한다.
* `||` 연산자를 사용해서 기본값을 지정할 수 있다.
	```javascript
	var middle = stooge["middle-name"] || "(none)";
	var status = flight.status || "unknown";
	```
* 존재하지 않는 속성, 즉 `undefined`의 속성을 참조하려 할 때 `TypeError` 예외가 발생한다. 이런 상황을 방지하기 위해 `&&` 연산자를 사용할 수 있다.
	```javascript
	flight.equipment							// undefined
	flight.equipment.model						// throw "TypeError"
	flight.equipment && flight.equipment.model	// undefined
	```

**03 속성값의 갱신**:

* 객체의 값은 할당으로 갱신한다.

**04 참조**:

* 객체는 참조 방식으로 전달된다. 결코 복사되지 않는다.
	```javascript
	var x = stooge;
	x.nickname = 'Curly';
	var nick = stooge.nickname;
	// x와 stooge 모두 같은 객체를 참조하기 때문에,
	// 변수 nicke의 값은 'Curly'.
	```

**05 프로토타입**:

* 객체 리터럴로 생성되는 모든 객체는 자바스크립트의 표준 객체인 Object의 속성인 prototype(Object.prototype) 객체에 연결된다.
* 모든 객체는 속성을 상속하는 프로토타입 객체에 연결돼 있다.

---

## 프로토타입 further study

**객체는 언제나 함수에 new 연산자를 사용해서 생성한다**

형식은 `var 객체명 = new 함수명()`이다.

```javascript
function Child() {}				// 함수를 먼저 정의하고

var personObject = new Child();	// 정의한 함수를 사용해서 객체를 생성한다
```

객체 리터럴(`{}`)도 사실 다음과 같다.

```javascript
var obj = {};

var obj = new Object();
```

> `Object()`는 자바스크립트에서 기본적으로 제공하는 함수다. Object와 마찬가지로 Function, Array도 모두 함수로 정의되어 있다.

즉, 객체를 만들려면 객체를 만들기 위한 함수를 정의하고, 그 함수에 new 연산자를 사용해서 객체를 만들어야 한다.

**함수를 정의하면 두 가지 일이 발생한다**

첫째, `new` 연산자를 사용할 수 있다. 즉 생성자 자격이 부여된다. 오직 함수만이 `new` 연산자를 사용할 수 있으며, 모든 객체는 함수를 사용해서 생성된 것이다.

둘째, 함수가 정의된 순간 그 함수와 연결된 prototype object가 생성된다. 

```javascript
function Child() {}

typeof Child.prototype 		// object
```

prototype object인 `Child.prototype`은 두 가지 속성을 가지고 있다:

* `constructor`: `function Child()`를 가리킨다.
* `__proto__`: prototype link로써 이후에 자세히 설명한다.

아직 감이 잡히지 않겠지만, `Child.prototype`이 `Child()`와 연결되어 있다는 점만 알아두고 다음 설명을 보자.

**객체의 속성을 읽을 때 prototype object를 활용한다**

```javascript
function Child() {}

var kidA = new Child();
var kidB = new Child();

console.log(kidA.innocent);			// undefined
console.log(kidB.innocent);			// undefined

Child.prototype.innocent = true;

console.log(kidA.innocent);			// true
console.log(kidB.innocent);			// true
```

prototype object에 추가한 속성이 객체의 속성에 그대로 상속되고 있음을 알 수 있다. `kidA`, `kidB` 모두 `Child()` 함수를 통해 생성되었기 때문에 `Child.prototype`을 그대로 참조할 수 있다.

**prototype link란 무엇인가**

위에서 `__proto__`를 prototype link라고 소개했다. 예제를 보자:

```javascript
kidA.__proto__ === Child.prototype		// true
```

`kidA`의 `__proto__`는 `kidA`를 생성한 `Child()` 함수의 prototype인 `Child.prototype`을 가리킨다.

```javascript
Child.prototype.__proto__ === Object.prototype		// true
Object.prototype.__proto__							// null
```

이제 더글라스 크락포드의 설명으로 넘어가보자.

---

생성자 함수는 모두 프로토타입을 갖고 있고, 생성자 함수로 생성된 객체는 생성자 함수의 프로토타입을 바라보고 있다. 그래서 객체의 특정 속성의 값을 읽으려고 하는데 해당 속성이 객체에 없는 경우 자바스크립트는 이 속성을 프로토타입 객체에서 찾으려고 한다. 이러한 시도는 프로토타입 체인(prototype chain)의 최상위에 있는 `Object.prototype`까지 계속해서 이어진다. 만약 찾으려는 속성이 프로토타입 체인 어디에도 존재하지 않는 경우 `undefined`를 반환한다. 이러한 일련의 내부 동작을 위임(delegation)이라고 한다.

프로토타입 관계는 동적 관계다. 만약 프로토타입에 새로운 속성이 추가되면, 해당 프로토타입을 근간으로 하는 객체들에는 즉각적으로 이 속성이 나타난다.

# Links

* [더글라스 크락포도의 자바스크립트 핵심 가이드](http://www.hanbit.co.kr/store/books/look.php?p_code=B7288500843)
* [Naver JavaScript Style Guide](https://github.com/naver/eslint-config-naver/blob/master/STYLE_GUIDE.md)
* [[Javascript] 프로토타입 이해하기](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)
