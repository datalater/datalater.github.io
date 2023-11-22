# Guide

> 블로그 사용법에 대해서 알게 된 점을 정리합니다.

- [포스트 작성하기](#포스트-작성하기)
- [환경 설정](#환경-설정)
- [모르겠는 점](#모르겠는-점)

## 포스트 작성하기

code block에서 filename을 표시하려면 파일 확장자가 `.mdx`여야 합니다.

````md
# ✅ hello.mdx

```js filename="dynamic_code.js"
function hello() {
  const x = 2 + 3;
  console.log(1);
}
```
````

````md
# ❌ hello.md

```js filename="dynamic_code.js"
function hello() {
  const x = 2 + 3;
  console.log(1);
}
```
````

## 환경 설정

## 모르겠는 점

- 문서에서 인터랙티브하게 code block을 수정하는 [dynamic content 예제](https://nextra.site/docs/guide/syntax-highlighting#with-dynamic-content)를 그대로 복사해도 동작하지 않습니다.
