---
layout: post
title: "SSH로 자주 접속하는 IP address 등록하는 법"
date: 2019-07-16 13:19:05 +0900
update: 2019-07-26 23:34:40 +0900
categories: tutorial ssh config
---

# 문제 상황

자주 사용하는 IP address가 `aaa.bbb.ccc.ddd`라고 해보자. 해당 IP에 SSH 접속하려면 다음과 같이 한다:

```bash
$ ssh user@aaa.bbb.ccc.ddd
```

하지만 사용하는 IP address가 여러 개라면 각 주소를 일일이 외워야 한다.

# 목표

내가 자주 사용하는 IP address의 숫자를 일일이 외우지 않고, SSH 접속하고자 한다.

# 해결책

**1. SSH config 파일을 연다**:

```bash
$ vi ~/.ssh/config
```

**2. 경우에 따라 다음과 같이 원하는 서버 정보를 등록한다**:

```bash
# 비밀번호를 사용하는 경우
Host api-server
    HostName aaa.bbb.ccc.ddd
    User USER_NAME
```

```bash
# pem 키를 사용하는 경우
Host api-server
    HostName aaa.bbb.ccc.ddd
    User USER_NAME
    IdentityFile /PATH_WHERE_YOUR_PEM_FILE_IS_LOCATED
```

**3. 터미널에서 다음과 같이 SSH에 접속할 수 있다**:

```bash
$ ssh api-server
```
