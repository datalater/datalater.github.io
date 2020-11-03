---
layout: post
title: "MDN - Images in HTML"
date: 2020-04-26 20:45:52 +0900
update: 2020-04-26 20:45:52 +0900
categories: ['html', 'mdn']
---

* TOC
{:toc}

# Reference

[https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)

# 1회독

Q1. 현재 HTML 파일과 같은 위치에 있는 이미지 파일 dinosaur.jpg를 임베드하는 방법은 무엇인가?

Q2. 현재 HTML 파일과 같은 위치에 있는 폴더 `images` 안에 있는 이미지 파일 dinosaur.jpg를 임베드하는 방법은 무엇인가?

Q3. 다른 사람이 운영하는 웹 사이트에 있는 이미지를 그대로 가져오는 것을 뭐라고 하는가?

Q4. 핫링킹은 왜 좋지 않은가?

- 저작권 위반 가능성이 있다.
- 도메인 주소로 링크된 이미지를 가져오려면 IP 주소를 얻기 위해 DNS server를 거쳐야 하므로 비효율적이다
- 누군가가 소유한 대역폭(1초에 보낼 수 있는 정보의 양)을 훔치는 것은 불법이다.

Q5. alt 속성은 왜 사용하는가?

- 시각 장애인을 위해서 (접근성 accessibility)
- 이미지 경로가 잘못되는 경우를 대비해서
- 검색 엔진에 잘 검색되기 위해서
- 인터넷 속도가 느리거나 제한이 있는 국가를 고려해서

Q6. 이미지의 alt 텍스트를 볼 수 있는 가장 쉬운 테스트 방법은 무엇인가?

Q7. figure와 figurecaption 태그는 왜 만들어졌는가?

# 2W1H

## Q1. 현재 HTML 파일과 같은 위치에 있는 이미지 파일 dinosaur.jpg를 임베드하는 방법은 무엇인가?

```html
<img src="dinosaur.jpg">
```

## Q2. 현재 HTML 파일과 같은 위치에 있는 폴더 `images` 안에 있는 이미지 파일 dinosaur.jpg를 임베드하는 방법은 무엇인가?

```html
<img src="images/dinosaur.jpg">
```

## Q3. 다른 사람이 운영하는 웹 사이트에 있는 이미지를 그대로 가져오는 것을 뭐라고 하는가?

핫링킹(hotlinking)이라고 한다.

## Q4. 핫링킹은 왜 좋지 않은가?

- 저작권 위반 가능성이 있다.
- 도메인 주소로 링크된 이미지를 가져오려면 IP 주소를 얻기 위해 DNS server를 거쳐야 하므로 비효율적이다
- 누군가가 소유한 대역폭(1초에 보낼 수 있는 정보의 양)을 훔치는 것은 불법이다.

## Q5. alt 속성은 왜 사용하는가?

- 시각 장애인을 위해서 (접근성 accessibility)
- 이미지 경로가 잘못되는 경우를 대비해서
- 검색 엔진에 잘 검색되기 위해서
- 인터넷 속도가 느리거나 제한이 있는 국가를 고려해서

## Q6. 이미지의 alt 텍스트를 볼 수 있는 가장 쉬운 테스트 방법은 무엇인가?

이미지 경로에 오타를 낸다.

```html
<img src="dinosaur123.jpg">
```

## Q7. figure와 figurecaption 태그는 왜 만들어졌는가?

**요약**:

이미지와 그 이미지의 캡션을 semantic하게 연결하는 목적으로 만들어졌다.

**설명:**

이미지에 대한 보조 설명으로 캡션을 달 때 p 태그를 달아도 된다. 하지만 이렇게 될 경우 시각 장애인들을 위해 스크린 리더가 문서 내용을 읽을 때 어느 캡션이 어느 그림에 대한 건지 헷갈릴 수 있다.

그래서 이미지와 그 이미지의 캡션을 semantic하게 연결하는 목적으로 만들어진 것이 figure와 figurecaption 태그이다.
