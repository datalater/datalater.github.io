---
layout: post
title: "docker 명령어 모음"
date: 2019-07-30 16:41:49 +0900
update: 2019-07-30 16:41:54 +0900
categories: docker cheatsheet
---

# 기본 명령어

**unbuntu 이미지 찾기**

```bash
$ docker search ubuntu
```

**이미지 다운로드**

```bash
$ docker pull ubuntu
```

**이미지 목록**

```bash
$ docker images
``` 

**ubuntu 이미지를 컨테이너로 띄우기 + ubuntu 컨테이너에 있는 bash 쉘 실행**

```bash
$ docker run -i -t --name CONTAINER_NAME ubuntu /bin/bash
```

> 컨테이너 이름을 지정하지 않을 경우 도커가 임의로 지정하는데 이럴 경우 관리가 불편해진다.

**활성화된 컨테이너 확인**

```bash
$ docker ps
```

**컨테이너 빠져나오기 (컨테이너 비활성화)**

```bash
$ exit
```

**메모리에 존재하는 컨테이너 확인**

```bash
$ docker ps -a
```

> 비활성화된 컨테이너도 메모리에는 여전히 존재한다.

**컨테이너 재실행**

```bash
$ docker restart CONTAINER_NAME
```

**컨테이너 접속하기**

```bash
$ docker attach CONTAINER_NAME
```

**컨테이너 활성화로 빠져나오기**

```bash
$ ctrl + p 또는 ctrl + q
```

**컨테이너 비활성화**

```bash
$ docker stop CONTAINER_NAME
```

**컨테이너를 메모리에서 삭제**

```bash
$ docker rm CONTAINER_NAME
```

**ubuntu 이미지 지우기**

```bash
$ docker rmi ubuntu
```

