---
layout: post
title: "터미널에서 원하는 프로그램 실행하는 법"
date: 2019-07-07 15:38:05 +0900
update: 2019-07-25 22:06:48 +0900
categories: tutorial terminal shell
---

* TOC
{:toc}

# 예제

터미널에서 `chrome`으로 입력하면 크롬 브라우저가 실행되길 원한다.

# 배경지식

## 터미널에서 사용 가능한 실행 명령어 확인하기

터미널에서 사용할 수 있는 실행 명령어는 `/usr/bin/` 또는 `/usr/local/bin/` 폴더에 존재한다.

* `/usr/bin`: 운영체제에 포함되어 있거나 패키지 매니저로 설치한 실행 가능한 프로그램이 담겨 있다.
* `/usr/local/bin`: 로컬 사용자가 설치한 실행 가능한 프로그램이 담겨 있다.

## 응용 프로그램 이름 확인하기

응용 프로그램의 이름은 `/Applications`에서 확인할 수 있다.

# 해결책

## 실행 명령어 추가

`/usr/local/bin/` 폴더로 이동한다:

```bash
$ cd /usr/local/bin
```

`chrome` 파일을 만든다:

```bash
$ vi chrome
```

## 응용 프로그램 연결

다음과 같은 내용을 복사해서 붙여 넣는다:

```bash
#!/bin/bash
open /Applications/Google\ Chrome.app
```

## 명령어 실행

`chrome`을 입력해서 크롬 브라우저가 실행되는 것을 확인한다:

```bash
$ chrome
```
