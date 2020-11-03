---
layout: post
title: "AWS 웹 서버 구축 연습"
date: 2019-07-27 19:00:01 +0900
update: 2019-07-27 19:00:11 +0900
categories: practice aws webserver
published: false
---

* TOC
{:toc}

# 목표

AWS를 사용해서 웹 서버를 바닥부터 구축하고 간단한 웹 애플리케이션을 만들어본다.

# 예상 계획

* AWS EC2를 생성해서 웹 서버 프로그램인 apache나 nginx를 설치하면 될 것이다.
* 웹 서버 프로그램과 PHP, MySQL을 연동해야 한다.
* IP address로 접속해보고 기대하는 웹 페이지가 나오는지 확인한다.
* 도메인 설정을 해본다.

# 참고 자료

내가 참고할 수 있는 자료를 찾아봤다.

* [생활코딩 아마존 웹서비스 강의](https://opentutorials.org/course/2717)를 보고 따라해본다.
* 온라인에 공개된 자료 [아마존 웹 서비스를 다루는 기술](http://pyrasis.com/aws.html)을 참고한다.

이 두 가지 자료를 토대로 진행한다.

# 진행 과정

## AWS 프리 티어 계정 만들기

대학생 때 학교 메일로 가입한 계정이 있었다. 그때 당시에는 가입하고 나서 한두 차례 실습하고 더 이상 사용하지 않았기 때문에 아직 프리 티어 가용량이 남아 있을지도 모른다는 생각이 들었다. 알고 보니 프리 티어의 사용량은 프리 티어의 유효기간과 상관이 없었다. 가입 후 1년만 프리 티어 계정을 사용할 수 있다. 

프리 티어 기간이 시작된 날짜는 계정 관리 페이지에 들어가 청구서의 최초 날짜를 선택하면 알 수 있다. 나는 2016년에 가입했으므로 더 이상 프리 티어를 사용할 수 없었다. 그래서 새로운 이메일 주소로 계정을 만들었다.

## AWS EB vs EC2 무엇을 선택해야 하는가

가입 후 페이지가 리다이렉트되고 '10분 자습서로 AWS 사용해 보기' 버튼이 있었다. 나의 목표와 일치하는 '웹 애플리케이션 시작'을 눌렀다. 

그런데 EB(Elastic Beanstalk)를 사용한다고 써있었다. 나는 EC2(Elastic Compute Cloud)를 예상하고 있었기 때문에 두 개의 차이점이 궁금해졌다.

### Elastic Beanstalk란 무엇인가

[아마존 웹 서비스를 다루는 기술](http://pyrasis.com/book/TheArtOfAmazonWebServices/Chapter23)에서 찾아보니 Elastic Beanstalk는 [Heroku](https://www.heroku.com/what) 같이 웹 앱을 실행하고 배포할 수 있는 플랫폼을 제공하는 서비스(PaaS)다.

Elastic Beanstalk는 EC2 , ELB, S3, RDS 등과 같은 AWS 리소스를 조합하여 완성된 애플리케이션 플랫폼을 제공한다. Elastic Beanstalk 자체는 AWS 리소스가 아니기 때문에 사용 요금이 없다고 한다.

다만 단순히 배포만을 위한 서비스가 아니라 유연하게 운영할 수 있도록 추가 기능을 제공한다. Elastic Beanstalk에서 beanstalk(bean + stalk)는 콩나무 줄기를 뜻한다. 동화 "잭과 콩나무"에서 콩나무 줄기가 스스로 자라나듯이 Elastic Beanstalk는 자동으로 로드 밸런싱, 오토 스케일링 등을 조절해준다.

> 구체적으로는 EC2 인스턴스 유형을 변경하고, 오토 스케일링으로 EC2 인스턴스를 늘리고, ELB로 부하를 분산하며, 애플리케이션 배포까지 자동으로 해준다.

### EC2란 무엇인가

EC2(Elastic Compute Cloud)는 인터넷에 연결된 가상 서버다. 사용량만큼 요금을 지불하며 프리 티어일 경우 1년 동안 t2.micro 인스턴스를 매월 750시간 사용할 수 있다. EC2에서 생성한 가상 서버를 '인스턴스'라고 부른다. 가상 서버 각각을 하나의 객체로 보는 것이다.

> 매월 750시간 = 하루 24시간씩 31.25일. 그러니까 한 달 내내 무료인 정책을 1년 동안 사용할 수 있는 것이다.

정리하면, EB는 웹 애플리케이션을 배포하고 유연하게 운영하기 위해 사용하는 서비스고 EC2는 가상 서버 인스턴스를 만드는 서비스다.

결론적으로 내게 필요한 건 가상 서버이므로 EC2를 만들면 된다.

## EC2 생성

EC2 인스턴스는 다음과 같은 과정을 밟아서 생성한다.

### Step 1: Choose an Amazon Machine Image (AMI)

내가 만들 가상 서버 인스턴스의 운영체제를 고르는 과정이다.

크게 Linux와 Windows로 구분되는데 그 중 Amazon Linux는 Linux의 배포판 중에서 Amazon이 직접 수정해서 AWS에 최적화한 것이다.

나는 예전 개발 환경과 유사한 'Red Hat Enterprise Linux 8 (HVM)'을 골랐다.

### Step 2: Choose an Instance Type

인스턴스의 사양을 고르는 과정이다.

**WIP**: [EC2 가격정책](https://opentutorials.org/course/2717/11276)
