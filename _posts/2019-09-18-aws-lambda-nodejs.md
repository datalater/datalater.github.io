---
layout: post
title: "[WIP] AWS Lambda for Node.js 가이드 문서 정리"
date: 2019-09-18 13:37:06 +0900
update: 2019-09-19 13:41:20 +0900
categories: ['aws', 'serverless']
published: false
---

* TOC
{:toc}

# 목적

외부 라이브러리를 사용해서 Node.js API를 만들었다. AWS Lambda를 이용해서 서버리스 백엔드 API를 구축하기 위해 가이드 문서를 읽고 정리한다.

# 참고한 글

* [AWS Lambda 개발자 가이드](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/welcome.html)

# AWS Lambda란?

서버를 프로비저닝하거나 관리하지 않고도 코드를 실행할 수 있게 해주는 컴퓨팅 서비스다.

> 프로비저닝: 운영 가능한 서버를 준비하는 것. [참조](https://web-front-end.tistory.com/104)

사용한 컴퓨팅 시간만큼만 비용을 지불하고, 코드가 실행되지 않을 때는 요금이 부과되지 않는다.


사용자가 코드를 업로드하기만 하면, Lambda에서 코드 실행 및 확장에 필요한 모든 것을 처리한다.

# 시작하기

## AWS Lambda 개념

> [원문 보기](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/lambda-application-fundamentals.html)

* **함수(Function)**: AWS Lambda에서 실행되는 스크립트. 이벤트를 처리하고 응답을 반환한다.
* **런타임(Runtimes)**: 함수의 실행을 돕는 프로그램. Lambda 서비스와 함수 코드 사이에 위치하며 호출 이벤트, 컨텍스트 정보 및 이들 둘 사이의 응답을 각각 중계한다.
* **이벤트 소스(Event source)**: 함수를 트리거하고 함수의 로직을 실행하는 AWS 서비스 또는 사용자 지정 서비스.
* **다운스트림 리소스(Downstream resources)**: 트리거 시 Lambda 함수가 호출하는 DynamoDB 테이블이나 Amazon S3 버킷 같은 AWS 서비스.

# AWS Lambda 함수 관리

> [원문 보기](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/lambda-introduction-function.html)

AWS Lambda에서 코드를 실행하기 위해 호출하는 리소스를 함수라고 한다.

함수는 코드와 런타임을 가지고 있다. 코드는 이벤트를 처리하고, 런타임은 AWS Lambda와 함수 코드의 중간에서 요청과 응답을 전달한다.

사용자는 코드를 제공하며, 제공된 런타임을 사용하거나 직접 런타임을 생성할 수 있다.

모든 런타임은 코드와 런타임 코드 사이의 인터페이스를 정의하는 일반적인 프로그래밍 모델을 공유한다. 함수 구성에서 핸들러를 정의하여 런타임에게 어떤 메서드를 실행할지 알려주면, 런타임은 그 메서드를 실행한다. 런타임은 호출 이벤트와 컨텍스트(ex. 함수 이름, 요청 ID)를 포함하는 핸들러로 객체를 전달한다.

## 프로그래밍 모델

> [원문 보기](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/programming-model-v2.html)

함수 코드 작성에는 다음과 같은 공통된 패턴이 있다.

* **핸들러**: AWS Lambda가 Lambda 함수를 실행시키기 위해 호출하는 함수. Lambda 함수가 호출되면, AWS Lambda는 핸들러 함수를 호출하여 사용자가 업로드한 코드를 실행시킨다. AWS Lambda는 이벤트 데이터를 핸들러 함수에게 첫 번째 파라미터로 전달한다. 핸들러 함수는 전달 받은 이벤트 데이터를 처리해야 하며, 사용자 코드에 있는 다른 함수 또는 메서드를 호출할 수도 있다.
* **컨텍스트**: AWS Lambda는 컨텍스트 객체(context object)를 핸들러 함수에게 두 번째 파라미터로 전달한다. 컨텍스트 객체를 사용해서 사용자 코드가 AWS Lambda와 소통할 수 있다. 예를 들어, AWS Lambda가 Lambda 함수를 종료하기 전에 코드 실행 시간이 남아 있음을 알 수 있다. 뿐만 아니라, Node.js 같은 경우 콜백을 사용하는 비동기 플랫폼이 있다. 그리고 AWS Lambda는 컨텍스트 객체에 추가 메서드를 제공한다. 따라서, 컨텍스트 객체 메서드를 사용하면, AWS Lambda가 Lambda 함수를 종료하고 선택에 따라 호출자에게 값을 반환하라고 명령할 수 있다.
* **로깅**: Lambda 함수에 로깅 문을 포함시키면 AWS Lambda가 CloudWatch Logs에 로그를 기록한다.
* **동시성**: 인스턴스가 처리할 수 있는 것보다 함수의 호출이 더 빠르게 발생하면, AWS Lambda는 추가 인스턴스를 싱행하여 규모를 확장한다. 각각의 함수 인스턴스는 한 번에 요청 하나만 처리하므로 동기화를 염려할 필요가 없다. 그러나 이벤트 배치를 병렬 처리하기 위해 비동기 언어 기능을 사용할 수도 있다.

# AWS Lambda 권한

> 원문: [링크](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/lambda-permissions.html)

## IAM

AWS Identity and Access Management(IAM)을 사용하면 Lambda API 및 리소스(함수 및 계층 등)의 액세스 관리를 할 수 있다.

## Policy using Execution role

execution role을 사용하면 AWS 서비스 및 리소스에 대한 액세스 권한을 부여할 수 있다. 로그 스트리밍을 위해 Amazon CloudWatch Logs에 액세스하거나, 함수 추적을 위해 AWS X-Ray에 액세스하거나, AWS SDK를 통해 함수가 서비스에 액세스해야 할 경우, exeuction role에서 방금 언급한 AWS 서비스들을 호출할 수 있는 권한을 부여할 수 있다. 이벤트 소스 매핑을 사용하여 함수를 트리거할 경우 또한 마찬가지로 execution role에서 이벤트 소스를 읽을 수 있는 권한을 부여할 수 있다.

## Resource-based policy

다른 계정이나 AWS 서비스가 Lambda 리소스를 사용하게 하려면 리소스 기반 정책을 사용하면 된다. Lambda 리소스에는 함수, 버전, 별칭, 계층 버전이 포함된다. 각 리소스는 해당 리소스에 액세스할 수 있는 권한을 지정할 수 있다. 예를 들어, Amazon S3 같은 AWS 서비스가 Lambda 함수를 호출할 때 리소스 기반 정책을 통해서 액세스가 부여된다.

# Node.js를 사용하여 Lambda 함수 빌드

> [원문 보기(ENG)](https://docs.aws.amazon.com/lambda/latest/dg/programming-model.html)

Node.js를 사용한 자바스크립트 코드를 AWS Lambda에서 실행시킬 수 있다. Lambda는 Node.js로 작성된 코드가 이벤트를 처리할 수 있도록 런타임을 제공한다. 코드는 자바스크립트를 지원하는 AWS SDK가 포함된 환경에서 실행되며 AWS Identity and Access Management(IAM)의 자격 증명(credentials)을 사용한다.

## execution role을 만든다.

Lambda 함수는 execution role을 사용해서 Amazon CloudWatch Logs에 로그를 쓰고, 다른 서비스 및 리소스에 액세스할 수 있는 권한을 얻는다. 함수 개발에 필요한 execution role이 없다면 생성하자.

WIP
