---
layout: post
title: "소프트웨어에 버전을 부여하는 방법"
date: 2019-07-28 18:30:05 +0900
update: 2019-07-28 18:30:10 +0900
categories: retrospective book-meeting
---

* TOC
{:toc}

# 소프트웨어 버전 관리란 무엇인가

소프트웨어의 고유한 상태에 대해 고유한 이름 또는 번호를 할당하는 프로세스를 소프트웨어 버전 관리(software versioning 또는 software upgrade versioning)라고 한다.

# 번호 부여 방법의 종류

버전 번호 지정 체계([version numbering scheme](https://en.wikipedia.org/wiki/Software_versioning#Schemes))는 다양하다. 소프트웨어를 배포할 때마다 숫자나 문자를 부여하는 시퀀스 기반 식별자([sequence-based identifiers](https://en.wikipedia.org/wiki/Software_versioning#Sequence-based_identifiers))를 사용할 수도 있고, 배포 날짜([date of release](https://en.wikipedia.org/wiki/Software_versioning#Date_of_release)) 등을 사용할 수도 있다. 본 글에서는 시퀀스 기반 식별자에 대해 설명한다.

# 시퀀스 기반 식별자

시퀀스란 순서가 있는 흐름을 뜻한다. 시퀀스를 기반으로 식별자를 부여한다는 말은 흐름을 구성하는 각각의 요소에 고유한 식별자를 할당한다는 뜻이다. 

소프트웨어는 생명주기 동안 지속적으로 기능 추가나 버그 수정 등의 변화를 거치는데 각각의 상태가 배포될 때마다 고유한 식별자를 할당할 수 있다.

## 식별자 부여 방법

일반적으로 다음과 같이 식별자를 부여한다:

```javascript
major.minor[.maintenance[.build]]

or

major.minor[.build[.revision]]
```

각 용어는 변화의 정도([change siginificance](https://en.wikipedia.org/wiki/Software_versioning#Change_significance))를 의미한다:

* **major** release number
* **minor** release number
* **maintenance** release number

일반적으로 대폭적인 변화가 있는 경우 `major` 번호를 증가시키고, 큰 틀 안에서 작은 변화가 있는 경우 `minor` 번호를 증가시킨다. 그리고 `maintenance` 번호는 보통 버그가 수정될 때마다 증가시키며 `minor` 번호에 종속된다. 

> `major`, `minor`, `maintenance`, `build`, `revision`의 의미 또한 번호를 부여하는 담당자에 따라 주관적일 수 있다. 예를 들어, 소프트웨어 A가 사용하는 API 버전이 `2.1.5`이고, `major` 번호에 호환성([degree of compatibility](https://en.wikipedia.org/wiki/Software_versioning#Degree_of_compatibility))이 내포되어 있는 경우 A 소프트웨어는 `2.2.3` 버전의 API와는 호환이 되더라도 `3.2.4` 버전의 API와는 호환이 안 될 수도 있다. 

# Links

* [Software versioning](https://en.wikipedia.org/wiki/Software_versioning)
