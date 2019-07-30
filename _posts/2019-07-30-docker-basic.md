---
layout: post
title: "docker 기본 개념 해설"
date: 2019-07-30 16:58:49 +0900
update: 2019-07-30 16:58:54 +0900
categories: docker explanation
published: false
---

# 원문

* 이재홍님의 [Docker 기본 사용법](http://pyrasis.com/Docker/Docker-HOWTO#docker)
* 이재홍님의 [가장 빨리 만나는 Docker](http://pyrasis.com/private/2014/11/30/publish-docker-for-the-really-impatient-book)

> 본 글은 원문을 재구성한 글임을 밝힙니다. 거의 모든 내용을 원문에서 그대로 가져왔으며, 스스로의 이해를 돕기 위해 개인 공부 목적으로 재구성한 글입니다.

# Docker와 immutable infrastructure

immutable infrastructure는 호스트 OS와 서비스 운영환경(서버 프로그램, 소스 코드, 컴파일된 바이너리)을 분리하고, 한 번 설정한 운영 환경은 변경하지 않는다(immutable)는 개념이다.

즉 서비스 운영 환경을 이미지로 생성한 뒤 서버에 배포하여 실행한다. 이때 서비스가 업데이트되면 운영 환경 자체를 변경하지 않고, 이미지를 새로 생성하여 배포한다. 클라우드 플랫폼에서 서버를 쓰고 버리는 것처럼, immutable infrastructure도 서비스 운영 환경 이미지를 한 번 쓰고 버린다.

Docker는 이러한 immutable infrastructure를 구현한 프로젝트다.

# 이미지와 컨테이너

* 이미지: 필요한 프로그램과 라이브러리, 소스를 설치한 뒤 파일로 만든 것.
* 컨테이너: 이미지를 실행한 상태.

운영체제로 보면 이미지는 실행 파일이고 컨테이너는 프로세스이다.



