---
layout: post
title: "A re-introduction to JavaScript"
date: 2019-09-30 19:58:36 +0900
update: 2019-10-06 20:13:00 +0900
categories: ['javascript']
published: false
---

* TOC
{:toc}

# 참고한 글

[A re-introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

# 계기

리액트 튜토리얼을 하기 전에 자바스크립트에 대해 간단히 복습하기 위해 이 문서를 읽고 정리한다.

* 리액트가 무엇인지 궁금해서 공식 홈페이지에 들어갔다.
* 튜토리얼을 따라하기로 마음 먹었다.
* 튜토리얼에서 자바스크립트를 리뷰하고 싶은 사람에게 추천하는 가이드가 있었다.
* 그 가이드가 지금 정리하려는 이 문서이다.

> Prerequisites
> * If you need to review JavaScript, we recommend reading [this guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript).

# Overview

## Javascript types

* `Number`
* `String`
* `Boolean`
* `Symbol` (new in ES2015)
* `Object`
	* `Function`
	* `Array`
	* `Date`
	* `RegExp`
* `null`
* `undefined`

And there are some built-in `Error` types as well.

# Numbers

**Convert a string to an integer**

```javascript
parseInt('123', 10); // 123
+ `123`; // 123
```

```javascript
parseInt('123a', 10); // 123
+ `123a`; // NaN
```

**Infinity**

```javascript
1 / 0; // Infinity
-1 / 0; // -Infinity

isFinite(1 / 0); // false
isFinite(-Infinity); // false
isFinite(NaN); // false
```

## Control structures

```javascript
for (let value of array) {
  // do something with value
}
```

```javascript
for (let property in object) {
  // do something with object property
}
```

It's worth specifically labeling deliberate fallthrough with a comment if you really meant it to aid debugging:

```javascript
switch (a) {
  case 1: // fallthrough
  case 2:
    eatIt();
    break;
  default:
    doNothing();
}
```

You can have expressions in both the switch part and the cases if you like; comparisons take place between the two using the === operator:

```javascript
switch (1 + 3) {
  case 2 + 2:
    yay();
    break;
  default:
    neverhappens();
}
```

## Arrays

Note that array.length isn't necessarily the number of items in the array. Consider the following:

```javascript
var a = ['dog', 'cat', 'hen'];
a[100] = 'fox';
a.length; // 101
```

ES2015 introduced the more concise for...of loop for iterable objects such as arrays:

```javascript
for (const currentValue of a) {
  // Do something with currentValue
}
```

Another way of iterating over an array that was added with ECMAScript 5 is forEach():

```javascript
a.forEach(function(currentValue, index, array) {
	// Do something with currentValue or array[index]
    console.log('currentValue: ' + currentValue);
    console.log('index: ' + index);
    console.log('array: ' + array);
});
```

Returns a new array with the items added on to it:

```javascript
var a = ['dog' , 'cat', 'hen'];
var b = ['fox', 'wolf'];
var c = a.concat(b); // ["dog", "cat", "hen", "fox", "wolf"]
```

## Functions


