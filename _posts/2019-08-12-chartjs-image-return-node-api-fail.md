---
layout: post
title: "Chart.js로 만든 차트의 이미지 URL 리턴하는 node API 만들기 - 실패기"
date: 2019-08-12 14:05:25 +0900
update: 2019-08-14 11:36:43 +0900
categories: [tutorial, javascript, chartjs]
published: true
---

* TOC
{:toc}

# 목적

Chart.js로 만든 차트의 이미지 URL을 리턴하는 node API를 만든다.

# 구현

node는 처음 사용해보는 스택이기 때문에 설치 후 공식 문서에 있는 예제를 구현해 본 다음, 실전 프로젝트를 진행한다.

## node 설치

```bash
$ brew install node
```

## webserver 구현

`webserver.js` 파일을 만들고 아래 코드를 붙여 넣는다:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World. This is Jay.\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

웹 서버를 실행하기 위해 아래 명령어를 입력한다:

```bash
$ node webserver.js
```

브라우저를 열고 `http://127.0.0.1:3000/`으로 접속하면 `Hello World. This is Jay.`를 확인할 수 있다. 예제를 끝냈으니 실전으로 가보자.

## canvas 이슈로 난관 봉착

chart.js 라이브러리는 차트 생성 함수 콜을 할 때 canvas 객체를 필수 인자로 사용하도록 설계되어 있다.

canvas 객체를 제공하는 여러 라이브러리를 사용했지만, 모두 실패했다. 정리하면 다음과 같다.

* [node-canvas](https://www.npmjs.com/package/canvas#createcanvas):  라이브러리를 사용해서 canvas 객체를만든 다음, 차트 생성 함수의 필수 인자로 넣으면 `canvas.style.width` 같은 필수 속성이 존재하지 않는다는 `undefined` 오류가 발생한다. 이는 chart.js가 전적으로 브라우저용 라이브러리이고, 브라우저라면 당연히 제공하는 DOM 객체를 사용하도록 전제되어 있지만, node-canvas 라이브러리는 브라우저와 동일한 DOM 객체를 제공하지 않기 때문인 것 같다.
* [jsdom](https://www.npmjs.com/package/jsdom): jsdom 라이브러리를 사용하면 브라우저가 제공하는 것처럼 `canvas` 객체를 사용할 수 있고, 그외에도 chart.js가 필요로 하는 window나 document 같은 전역 DOM 객체도 변수로 할당해서 사용할 수 있다. 덕분에 chart.js로 짠 코드를 실행하는데 성공했으나, 차트 이미지가 보이지 않았다. 알고 보니 jsdom은 시각적 콘텐츠를 보여줄 능력이 없다는 내용이 [README](https://github.com/jsdom/jsdom#pretending-to-be-a-visual-browser)에 써있었다.
    > Note that jsdom still does not do any layout or rendering, so this is really just about pretending to be visual, not about implementing the parts of the platform a real, visual web browser would implement.

# 조언 구하기

자바스크립트가 익숙한 프론트 개발자 분에게 조언을 구해보니 [D3](https://D3js.org/)를 대안으로 알려주었다. 하지만 D3로 그래프를 그리려면 그래프에 있는 선이나 원과 같은 요소 하나 하나를 개발자가 직접 코드로 짜야 하기 때문에 개발 시간이 꽤 걸릴 수도 있다고 첨언해주었다. 

고민이 되었다. 1) chart.js에서 canvas 객체를 사용할 수 있는 다른 방법 찾기, 2) 시간이 걸리더라도 D3를 사용하기, 3) 제3의 대안 찾기. 어떤 방법을 선택해야 시간을 지체하지 않으면서 원하는 동작을 구현할 수 있을지 생각에 잠겼다. 좀 더 깊이 있는 논의가 필요했다.

목표 달성을 위해 내가 생각하고 있는 전체 로직을 설명하고 나에게 결국 필요한 것은 1) 고품질의 가독성 높은 차트 생성하기, 2) 생성한 차트 이미지를 파일 URL 또는 바이너리 URL로 전달할 수 있는 API라는 것을 말했다. 조언해주신 개발자 분이 [D3-node](https://github.com/D3-node/D3-node) 예제를 직접 구현해본 다음 결과물을 보여주었다. 가능성이 보였다. 세밀하게 차트를 그릴 수 있어 보였고 그린 차트를 PNG 파일로 변환할 수 있었다. D3로 선회하기로 결정했다.

# Links

* [Install Node.js via package manager in macOS](https://nodejs.org/en/download/package-manager/#macos)
* [node-canvas](https://www.npmjs.com/package/canvas)
* [Javascript Destructuring](https://exploringjs.com/es6/ch_destructuring.html)
* [Importing and destructuring](https://2ality.com/2017/03/es6-commonjs.html)
* [node-canvas](https://www.npmjs.com/package/canvas#createcanvas)
* [jsdom](https://www.npmjs.com/package/jsdom)
* [D3-node](https://github.com/D3-node/D3-node)
