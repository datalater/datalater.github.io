---
layout: post
title: "JWT Introduction"
date: 2019-07-11 10:25:05 +0900
update: 2019-07-26 23:31:23 +0900
categories: guide auth jwt
---

* TOC
{:toc}

# JWT란 무엇인가

* JWT는 JSON Web Token의 약자이다.
* JWT는 서버가 요청을 보낸 클라이언트를 인증하기 위해 사용되는 토큰이다.
* 클라이언트는 JWT를 HTTP 헤더에 실어서 서버로 보낸다.
* JWT는 디지털로 서명된 JSON 객체이며 공개 표준([RFC 7519](https://tools.ietf.org/html/rfc7519))이다.

# JWT 인증 방식 예시

1. 클라이언트가 로그인을 한다.
2. 서버는 회원 DB를 통해 클라이언트의 계정 정보를 검증한다.
3. 검증을 통과하면 클라이언트에게 JWT를 발급한다.
    * 클라이언트에게 고유한 ID값을 부여한 후 기타 정보와 함께 페이로드에 넣는다.
    * JWT의 유효기간을 설정한다.
4. 클라이언트는 서버에게 전달받은 JWT를 저장해두고 서버에 요청할 때마다 HTTP 헤더에 해당 JWT를 실어서 전달한다.
5. 서버는 JWT를 검증하고 요청에 응답한다.

# JWT는 일반 토큰과 무엇이 다른가

JWT가 일반 토큰과 가장 다른 점은 일반 토큰은 특별한 정보가 없는 문자열인 반면 JWT는 정보를 담고 있다는 점이다.

**일반 토큰의 흐름**

* 서버는 클라이언트가 요청한 HTTP 헤더의 토큰을 가져온다.
* 서버는 토큰을 저장해놓은 DB 또는 캐시 서버를 조회한다.
* DB에 저장된 해당 토큰의 만료시간, 사용자 권한 등을 검사한다.
* 유효한 경우 액세스를 허용하고 요청에 응답한다.

**JWT의 흐름**

* 서버는 클라이언트가 요청한 HTTP 헤더의 JWT를 가져온다.
* 서버는 JWT의 서명을 보고 유효한지 검증한다.
* 유효한 경우 클레임셋을 디코딩해서 토큰에 담긴 데이터를 연다.
* 클레임셋에 담긴 해당 JWT의 만료시간, 사용자 권한 등을 검사한다.
* 유효한 경우 액세스를 허용하고 요청에 응답한다.

즉 일반 토큰과 다르게 JWT에는 토큰의 정보가 담겨 있기 때문에 데이터베이스나 캐시를 조회할 필요가 없다는 장점이 있다.

# JWT는 어떻게 생겼는가

다음은 JWT의 예입니다:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

`.`을 구분자로 하는 3가지 문자열로 되어 있으며 다음과 같은 구조를 가집니다:

```text
Header.Payload.Signature
```

* **Header**: 토큰의 타입과 해시 암호화 알고리즘 표기.
* **Payload**: 클레임(claim) 정보 표기. ex. userId, expire, scope 등
* **Signature**: secret key를 포함하여 암호화되어 있음.

## 헤더

헤더는 JWT의 서명이 계산되는 방법을 나타내며, 다음과 같이 두 가지 정보를 가지고 있습니다.

* `typ`: 토큰의 타입
* `alg`: 해싱 알고리즘

예시:

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

## 페이로드

페이로드에는 토큰에 담을 정보가 들어 있습니다. 가령 사용자 ID, 이름, 이메일과 같은 사용자 정보일 수 있습니다.
페이로드에 담는 정보의 한 조각을 클레임(claim)이라고 부릅니다.

예시:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

## 서명

서명은 인코딩된 헤더와 인코딩된 페이로드를 합친 후 주어진 비밀키로 해쉬를 하여 만들어진 값입니다.

서명을 만드는 pseudocode의 구조는 다음과 같습니다:

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

> [JWT 생성 예시](https://jwt.io/#debugger-io?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.wrJ__8Q_6BcB2ug9370TBuK5JoAjErqsQtYf7aLcFBk)

# 요약

JWT(JSON Web Token)는 디지털로 서명된 JSON 객체로서 서버와 클라이언트가 안전하게 정보를 전송하기 위해 보안 및 인증에서 사용되는 공개 표준([RFC 7519](https://tools.ietf.org/html/rfc7519))이다.

# Links

* [JWT introduction](https://jwt.io/introduction/)
* [JSON Web Token 소개 및 구조](https://velopert.com/2389)
* [REST API Authentication Example in PHP - JWT Tutorial](https://www.codeofaninja.com/2018/09/rest-api-authentication-example-php-jwt-tutorial.html)
* [Explain JWT like I'm five](https://dev.to/hemanth/explain-jwt-like-im-five)
* [JWT(JSON Web Token) 이란?](https://elfinlas.github.io/2018/08/12/whatisjwt-01/)
