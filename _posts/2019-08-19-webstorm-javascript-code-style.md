---
layout: post
title: "WebStorm JavaScript 코딩 스타일 설정"
date: 2019-08-19 16:35:14 +0900
update: 2019-08-19 17:15:53 +0900
categories: 
---

* TOC
{:toc}

# ESLint 적용

## npm 설치

```bash
$ npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
```

`.eslintrc` 파일에 다음 코드를 붙여 넣는다.

```json
{
  "extends": "standard"
}
```

## 활성화

`Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint` 이동 후 `Manual ESLint Configuration` 선택한다.

## WebStorm 적용

`Preferences | Editor | Code Style | Javascript` 이동한 다음 `Set From...` 클릭 후 `JavaScript Standard Style` 선택한다.

# require() 함수 unresolved 해결

`Preferences | Languages & Frameworks | Node.js and NPM` 이동한 다음 `Coding assistance for Node.js` 체크 표시한다.

# express get() 함수 unresolved 해결

`const express = require('express')`에서 `express`에 커서를 두고 `Alt+Enter` 누른 후 `Install Typescript definitions for better type information` 클릭한다.

# Links

* [ESLint \| JetBrain](https://www.jetbrains.com/help/webstorm/eslint.html)
* [eslint-config-standard \| Github](https://github.com/standard/eslint-config-standard)
* [Using JavaScript Standard Style \| JetBrain](https://blog.jetbrains.com/webstorm/2017/04/using-javascript-standard-style/)
* [How to stop NodeJS require() being flagged as unresolved \| JetBrain](https://intellij-support.jetbrains.com/hc/en-us/community/posts/360001718840-How-to-stop-NodeJS-require-being-flagged-as-unresolved-)
* [Nodejs\/Express: Unresolved function or method \| JetBrain](https://intellij-support.jetbrains.com/hc/en-us/community/posts/360001875360--Solved-Nodejs-Express-Unresolved-function-or-method)
