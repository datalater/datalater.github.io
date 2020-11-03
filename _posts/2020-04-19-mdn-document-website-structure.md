---
layout: post
title: "MDN - 문서와 웹사이트 구조"
date: 2020-04-19 21:21:16 +0900
update: 2020-04-19 21:21:16 +0900
categories: ['html', 'mdn']
---

* TOC
{:toc}

# Reference

[MDN - Document and website structure](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)

# 2W1H

## Q1. navigation bar를 header에 포함시켜도 되는가?

현장에서 많은 웹 디자이너들은 네비게이션 바를 헤더에 포함되는 일부분으로 생각한다. 필수는 아니다.

## Q2. 왜 semantic mark up을 해야 하는가?

1. 브라우저가 어떤 콘텐츠가 제목이고 단락인지 구분하지 못한다. 그렇게 되면 웹 페이지도 질서 있게 렌더링되지 않고 이를 보는 유저도 혼란스러운 느낌을 준다.
2. 검색 엔진에 검색이 잘 되려면 heading을 잘 써야 한다. heading 같은 sematic mark up을 잘 하지 않으면 검색이 잘 안 된다.
3. 시각 장애인들은 웹 페이지를 스크린 리더라는 프로그램으로 듣는다. 이때 스크린 리더는 heading 같은 semantic mark up을 읽어서 문서의 개요를 제공한다. semantic mark up이 잘 되어 있지 않으면 스크린 리더는 문서의 개요를 알 수 없어서 모든 내용을 통째로 읽게 되어 있다. 그렇게 되면 시각 장애인들은 빠른 정보 습득을 할 수 없다.
4. CSS로 스타일링 하거나 JavaScript로 인터랙팅을 할 때, 콘텐트와 엘리먼트가 서로 연관성이 높아야 CSS나 Javascript로 쉽게 타겟팅할 수 있다.
5. 신호등의 빨간 불은 stop을 의미하고 녹색 불은 go를 의미하는 것과 같다. semantic이 잘못 적용되면 개발할 때 많은 것들이 까다로워진다.

reference: [why do we need structures](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals#Why_do_we_need_structure)

## Q3. semantic mark up을 위해서 HTML이 제공하는 태그는 무엇이 있는가?

- `<main>` : 페이지에 딱 한번 쓰인다. 그 페이지에 유니크한 콘텐트를 마크업한다.
- `<article>` : 하나의 블로그 포스트처럼 하나의 글 단위를 마크업한다.
- `<section>` : article과 비슷한데 section은 그룹핑하는 목적이 더 강하다. 각 section은 heading으로 시작하는 게 베스트 프랙티스이다.
- `<aside>` : 메인 콘텐트는 아니고 간접적으로 연관된 정보를 제공한다. 작가 소개, 관련 링크 등.
- `<header>` : 큰 제목이나 로고가 달려 있고 웹 페이지를 이동해도 남아 있는 부분이다.
- `<nav>` : 사이트의 메인 섹션을 각각 연결해주는 링크를 담고 있다. 말 그대로 네비게이션 기능을 한다.
- `<footer>` : copyright 같은 페이지의 end content를 그룹핑한다.

## Q4. HTML sectioning element는 무엇인가?

Q3에 있는 태그로 감싸진 요소를 뜻한다. 페이지의 레이아웃을 구성한다.

## Q5. div와 span은 언제, 왜 사용하는가?

요약:

더 나은 semantic element가 없고, 어떤 의미를 추가하고 싶지 않을 때, CSS 규칙을 여러 요소에 일괄적으로 적용하고 싶을 때 사용한다. 

설명:

어떤 항목들을 그룹핑하거나 특정 콘텐트를 감쌀 때 적절한 semantic element가 없을 때 사용한다. CSS나 JavaScript로 여러 엘리먼트에 한번에 적용하고 싶을 뿐이지 어떤 의미를 추가하는 건 아닐 때도 사용한다. 이때는 적용하고 싶은 엘리먼트가 쉽게 타겟팅 되도록  `class` 속성을 사용하는 게 가장 좋다.

inline non-semantic 요소를 대상으로 할 때는 span을 사용하고, block level none-semantic 요소를 대상으로 할 때는 div를 사용한다.

## Q6. div와 span을 사용할 때는 왜 class 속성을 사용하는 것이 베스트인가?

쉽게 타겟팅 하기 위해서는 타겟팅 대상에 레이블을 붙여야 하는데 그 역할을 하는 게 class이기 때문이다.

## Q7. section과 div의 차이점은 무엇인가?

웹 페이지의 메인 콘텐트의 일부일 때는 section을 사용하면 된다. 그러나 적절한 semantic element도 없고 메인 콘텐트의 일부도 아니라면 section 대신 div를 사용한다.

# 추가 읽기

- [Why do we need structure?](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals#Why_do_we_need_structure)
- [Test your knowledge of web page structure](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content)
- [More of semantic sectioning elements: Using HTML sections and outlines](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines)

