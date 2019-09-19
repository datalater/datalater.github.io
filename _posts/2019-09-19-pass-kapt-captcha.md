---
layout: post
title: "한국감정원 IP 밴 풀기"
date: 2019-09-19 11:34:23 +0900
update: 2019-09-19 13:19:00 +0900
categories: ['crawling', 'puppeteer']
published: false
---

* TOC
{:toc}

# 목적

동료가 한국감정원 홈페이지에 있는 단지정보를 크롤링하다가 IP 밴을 당했다. IP 밴을 풀려면 captcha 이미지에 있는 글자를 입력해야 했다. 그런데 서버가 사용하고 있는 RHEL(Red Hat Enterprise Linux)이 GUI 환경이 아니다 보니 captcha 이미지를 확인할 수 없는 것이 문제였다. 추후 비슷한 문제를 겪을 경우를 대비해서 해결 방법을 상세히 기록한다.

# 해결 방법 요약

* headless chrome을 사용해서 캡차 이미지와 해당 캡차가 생성되었을 때 사용된 쿠키값을 얻는다.
* 캡차 이미지의 글자값을 쿼리 스트링으로 넣고, 쿠키값을 헤더로 넣어서 캡차를 통과시킨다.
* IP 밴이 풀린다.

> 캡차 이미지는 해당 캡차가 생성되었을 때 사용된 쿠키값과 일대일 매칭된다. 캡차 이미지에 있는 글자를 넣어도 헤더에 있는 쿠키값이 매칭되지 않으면 캡차는 통과되지 않는다.

# 구체적인 해결 방법

## RHEL 서버에 brew 설치

> 내장 패키지 매니저를 사용해서 `yum install node`을 먼저 시도했지만 `npm`이 깔리지 않아 `brew`를 설치했다.

[Hombrew on Linux](https://docs.brew.sh/Homebrew-on-Linux)를 참고해서 순서대로 실행한다.

**Linux/WSL Requirements**

```bash
$ sudo yum groupinstall 'Development Tools'
$ sudo yum install curl file git
$ sudo yum install libxcrypt-compat # needed by Fedora 30 and up
```

**Alternative Installation**

> 문서에 있는 Install 방식대로 했지만 제대로 되지 않아 Alternative Installation으로 설치했다.

```bash
$ git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew
$ mkdir ~/.linuxbrew/bin
$ ln -s ../Homebrew/bin/brew ~/.linuxbrew/bin
$ eval $(~/.linuxbrew/bin/brew shellenv)
```

**설치 확인**

```bash
$ brew install hello
```

## node 및 npm 설치

> node 패키지 `puppeteer`를 사용하기 위해 설치한다.

```bash
$ brew install node
```

**설치 확인**

```bash
$ node -v
```

```bash
$ npm -v
```

명령어를 입력했을 때 설치 버전이 나오면 성공이다.

**node 명령어 안 될 경우**

> `brew`로 `node` 설치 이후 `node` 명령어를 찾을 수 없다는 메시지가 나왔다. 원인을 생각해 보니, 처음에 `yum install node`하고, `npm`이 제대로 설치되지 않아 `node`를 지우기 위해 스택오버플로우에 있는 답변인 `rm -r bin/node bin/node-waf include/node lib/node lib/pkgconfig/nodejs.pc share/man/man1/node.1` 명령어를 실행했다. 위 명령어로 `/usr/bin/node`이 삭제되었고 `brew install node`를 했을 때 `/usr/bin/node`가 생성되지 않은 것으로 보였다.

먼저 node 명령어가 참조하는 경로를 얻는다.

```bash
$ which node
~/.linuxbrew/bin/node
```

bash에서 명령어로 사용할 수 있게 심볼릭 링크를 만든다.

```bash
$ sudo ln -s ~/.linuxbrew/bin/node /usr/bin/node
```

## IP 밴 재확인 및 캡차 입력값 전송 URL 얻기

```bash
$ curl 'http://www.k-apt.go.kr/kaptinfo/getKaptList.do' --data 'bjd_code=11650101&search_date=201906' --compressed --insecure -L
```

위 명령어를 실행했을 때, IP가 밴 당한 상태라면 "귀 아이피는 해당페이지를 자주 호출하여 이를 방지하기 위해 자동입력방지 문자를 확인합니다."가 담긴 HTML 코드가 리턴된다.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>공동주택관리정보시스템 K-apt</title>
    <script type="text/javascript" src="/js/jquery-1.9.0.min.js"></script>
    <script type="text/javascript" src="/js/placeholders.min.js"></script>
    <style type="text/css">
      div {
        display: block;
      }
      #header,
      #container {
        width: 468px;
        margin: 0 auto;
      }
      .input_row {
        position: relative;
        border: solid 1px #dadada;
        padding: 10px 35px 10px 15px;
        margin: 0 0 14px;
        background: #fff;
        height: 29px;
      }
      .input_box {
        display: block;
        overflow: hidden;
      }
      .lbl {
        display: block;
        position: absolute;
        top: 16px;
        left: 15px;
        z-index: 8;
        font-size: 15px;
        color: #999;
        line-height: 16px;
      }
      label {
        cursor: pointer;
      }
      .int {
        position: relative;
        width: 100%;
        padding: 7px 0 6px;
        height: 16px;
        z-index: 9;
        border: none;
        background: #fff;
        font-size: 15px;
        color: #000;
        line-height: 16px;
        -webkit-appearance: none;
      }
      .captcha {
        padding: 9px 0 0;
      }
      .captcha .captcha_txt {
        font-size: 12px;
        line-height: 16px;
      }
      .captcha_box {
        display: block;
        position: relative;
        margin-bottom: 10px;
        border: 1px solid #d9d9d9;
        background: #fff;
      }
      .captcha_box > a {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 157px;
        height: 49px;
        font-size: 15px;
        color: #979797;
        text-decoration: none;
      }
      .captcha_box > a.btn_refresh span {
        background: url(/images/btn_refresh.png) no-repeat;
      }
      .captcha_box > a span {
        display: block;
        height: 15px;
        margin: 17px 0 0 12px;
        padding-left: 22px;
        line-height: 15px;
      }
      .btn_captcha:hover,
      .btn_captcha:active,
      .btn_captcha:link {
        color: #fff;
        text-decoration: none;
      }
      .btn_captcha {
        font-size: 20px;
      }
      .btn_captcha {
        display: block;
        font-weight: bold;
        height: 61px;
        width: 100%;
        margin: 30px 0 13px;
        padding-top: 2px;
        font-size: 20px;
        color: #fff;
        background-color: #3d9cf3;
        border: none;
        -webkit-appearance: none;
        line-height: 61px;
        text-align: center;
        cursor: pointer;
        border-radius: 0;
      }
    </style>
    <script>
      $(window).ready(function() {});
      function refresh() {
        $("#captchaImg").attr("src", "/captchaImg.do");
      }
    </script>
  </head>
  <body>
    <div id="wrap">
      <div id="header">
        <!-- 로고 -->
        <h1>
          <a href="/" class="sp h_logo" tabindex="1">
            <img
              src="/images/top/logo.png"
              alt="국토교통부 공동주택관리정보시스템 K-apt"
            />
          </a>
        </h1>
      </div>
      <!-- //header -->
      <!-- container -->
      <div id="container">
        <form action="/login/checkPageCount.do" method="get">
          <input
            type="hidden"
            name="url"
            value="/kaptinfo/getKaptInfo_detail.do&amp;kapt_code=A10027800"
          />
          <!-- content -->
          <div id="content">
            <div class="title">
              <p>
                귀 아이피는 해당페이지를 자주 호출하여 이를 방지하기 위해
                자동입력방지 문자를 확인합니다.
              </p>
            </div>
            <div class="captcha">
              <p class="captcha_txt" id="captcha_info">
                아래 이미지를 보이는 대로 입력해주세요.
              </p>
              <div class="captcha_box">
                <img src="/captchaImg.do" id="captchaImg" />
                <a
                  href="javascript:refresh()"
                  id="view_image"
                  class="btn_refresh"
                  tabindex="9"
                  ><span class="sp">새로고침</span></a
                >
              </div>
            </div>
            <div class="input_row" id="chptcha_area">
              <span class="input_box">
                <input
                  type="text"
                  id="chptcha"
                  name="chptcha_num"
                  tabindex="9"
                  placeholder="자동입력 방지문자"
                  class="int"
                />
              </span>
            </div>
            <input
              type="submit"
              title="자동입력 방지 확인"
              alt="자동입력 방지 확인"
              tabindex="12"
              value="자동입력 방지 확인"
              class="btn_captcha"
              onclick=""
            />
          </div>
          <!-- //content -->
        </form>
      </div>
      <!-- //container -->
      <!-- footer -->
      <div id="footer"></div>
      <!-- //footer -->
    </div>
  </body>
</html>
```

위 HTML 파일을 브라우저로 열면 캡차 입력 페이지가 렌더링된다. 그리고 크롬 개발자 도구를 켠 후 Network 탭을 연 상태에서 캡차 값을 누르고 submit 버튼을 누르면 캡차를 전송하는 HTTP 요청 및 응답 메시지를 확인할 수 있다.

HTML 파일에 있는 것처럼, URL은 다음과 같다.

```html
<form action="/login/checkPageCount.do" method="get">
```

base URL을 붙이면 `https://k-apt.go.kr/login/checkPageCount.do?url=%2Fkaptinfo%2FgetKaptList.do%26bjd_code%3D11650101%26search_date%3D201906`와 같은 형태가 된다.

쿼리스트링으로 붙은 `url`을 포함한 값들은 캡차가 통과한 후 리다이렉트되는 URL을 의미한다.

## 캡차 이미지 스크린샷 얻기

**npm 프로젝트 생성**

```bash
$ npm init -y
```

**puppetter 패키지 설치**

```bash
$ npm install puppeteer
```

**캡차 이미지와 쿠키값 얻는 코드 작성**

파일 이름을 `captcha.js`로 했다.

```javascript
const puppeteer = require("puppeteer");

const chromeOptions = {
  headless: true,
  defaultViewport: null,
  slowMo: 10,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};

(async function main() {
  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();
  await page.goto(
    "https://k-apt.go.kr/login/checkPageCount.do?url=%2Fkaptinfo%2FgetKaptList.do%26bjd_code%3D11650101%26search_date%3D201906"
  );
  await page.screenshot({ path: "screenshot.png" });
  const cookies = await page.cookies();
  console.log(cookies);
})();
```

**코드 실행**

```bash
$ node captcha.js
(node:20617) UnhandledPromiseRejectionWarning: Error: Failed to launch chrome!
/home/choiwanjae/headless/node_modules/puppeteer/.local-chromium/linux-686378/chrome-linux/chrome: error while loading shared libraries: libXcursor.so.1: cannot open shared object file: No such file or directory
```

크롬을 실행할 수 없다는 에러 메시지가 발생했다.

**크롬 실행 에러 해결**

> [이슈 참조](https://github.com/GoogleChrome/puppeteer/issues/765)

```bash
# Run this once to install Google Chrome.
$ curl https://intoli.com/install-google-chrome.sh | bash

# Invoke your script with `LD_LIBRARY_PATH` set.
$ LD_LIBRARY_PATH=/opt/google/chrome/lib/:${LD_LIBRARY_PATH} node your-script.js
```

`your-script.js`를 `captcha.js`로 대체해서 실행한다.

```bash
$ LD_LIBRARY_PATH=/opt/google/chrome/lib/:${LD_LIBRARY_PATH} node captcha.js
[
  {
    name: 'ROUTEID',
    value: '.HTTP1',
    domain: 'k-apt.go.kr',
    path: '/',
    expires: -1,
    size: 13,
    httpOnly: false,
    secure: false,
    session: true
  },
  {
    name: 'JSESSIONID',
    value: '0001-37xtYsv6Hb_iN8E5BlKdcQ:-E2171E',
    domain: 'k-apt.go.kr',
    path: '/',
    expires: -1,
    size: 45,
    httpOnly: true,
    secure: false,
    session: true
  },
  {
    name: 'WMONID',
    value: '5akDWIQLsvk',
    domain: 'k-apt.go.kr',
    path: '/',
    expires: 1600396102.359212,
    size: 17,
    httpOnly: false,
    secure: false,
    session: false
  }
]
```

쿠키값이 정상적으로 출력된다. 또한 현재 디렉토리에 `screenshot.png`가 저장되어 있다.

참고로 `expires:1600396102.359212`에 있는 타임스탬프 값은 쿠키의 유효기간을 뜻한다. [Unix Timestamp Conversion tool](https://www.epochconverter.com/)에 입력해보면,

```text
Assuming that this timestamp is in seconds:
GMT: 2020년 September 18일 Friday AM 2:28:22.359
Your time zone: 2020년 9월 18일 금요일 오전 11:28:22.359 GMT+09:00
Relative: In a year
```

라고 나온다. 무려 1년이나 유효하다.

**스크린샷 파일을 로컬로 다운 받기**

서버에서는 이미지 파일을 렌더링된 상태로 볼 수 없어서 로컬로 다운받는다. 아래 명령어는 로컬 터미널에서 실행한다.

```bash
scp ssh-alias:/home/usr/headless/screenshot.png .
```

`ssh-alias`는 `~/.ssh/config`에 등록된 서버 별칭을 뜻한다. `/home/usr/headless/screenshot.png`는 `screenshot.png`가 저장된 경로로 대체하면 된다.

스크린샷을 확인해 보니 captcha 값이 `m48g5`였다고 해보자.

**쿠키 값과 캡차 값을 넣어서 IP 밴 풀기**

```bash
$ curl 'https://k-apt.go.kr/login/checkPageCount.do?url=%2Fkaptinfo%2FgetKaptList.do&chptcha_num=m48g5' --data 'bjd_code=11650101&search_date=201906' -H 'Cookie: WMONID=5akDWIQLsvk; JSESSIONID=0001-37xtYsv6Hb_iN8E5BlKdcQ:-E2171E; ROUTEID=.HTTP1' --compressed --insecure -L
{"resultList":null}
```

IP 밴 메시지가 나오지 않는다. 다음 명령어를 실행한다.

```bash
curl 'http://www.k-apt.go.kr/kaptinfo/getKaptList.do' --data 'bjd_code=11650101&search_date=201906' --compressed --insecure -L
{"resultList":[{"KAPT_USEDATE":"200412","BJD_CODE":"1165010100","KAPT_NAME":"래미안방배아트힐","OPEN_TERM":null,"KAPT_CODE":"A13785008","OCCU_FIRST_DATE":"200501","X":200384.395,"Y":441717.7955,"ENERGY_B_COUNT":0,"BJD_NAME":"서울특별시 서초구 방배동"},{"KAPT_USEDATE":"200312","BJD_CODE":"1165010100","KAPT_NAME":"방배1차이편한세상","OPEN_TERM":null,"KAPT_CODE":"A13784102","OCCU_FIRST_DATE":"200401","X":199841.685,"Y":442838.715,"ENERGY_B_COUNT":0,"BJD_NAME":"서울특별시 서초구 방배동"}, ....
```

위와 같이 IP 밴이 풀려서 정상적으로 응답 메시지를 받을 수 있다.


