---
layout: post
title: "docker 명령어 모음"
date: 2019-07-30 16:41:49 +0900
update: 2019-07-30 16:41:54 +0900
categories: docker cheatsheet
---

* TOC
{:toc}

# 기본 명령어

## 이미지

**unbuntu 이미지 찾기**

```bash
$ docker search ubuntu
```

**이미지 다운로드**

```bash
$ docker pull ubuntu
```

**이미지 목록**

```bash
$ docker images
``` 

**ubuntu 이미지 지우기**

```bash
$ docker rmi ubuntu
```

## 컨테이너

**ubuntu 이미지를 컨테이너로 띄우기 + ubuntu 컨테이너에 있는 bash 쉘 실행**

```bash
$ docker run -i -t --name CONTAINER_NAME ubuntu /bin/bash
```

`-i`(interactive), `-t`(pseudo-tty) 옵션을 사용하면 실행된 bash shell에 입력 및 출력을 할 수 있다. `--name` 옵션으로 컨테이너의 이름을 지정할 수 있다.

> 컨테이너 이름을 지정하지 않을 경우 도커가 임의로 지정하는데 이럴 경우 관리가 불편해진다.

**(컨테이너 안에서 bash 쉘 실행 후) 컨테이너 정지하고 빠져나오기**

```bash
# previous
# $ docker run -i -t --name CONTAINER_NAME ubuntu /bin/bash
$ exit
```

**컨테이너를 정지하지 않고 빠져나오기**

```bash
$ ctrl + p, ctrl + q 차례대로 입력
```

**컨테이너 목록**

```bash
$ docker ps -a
```

`-a` 옵션을 사용하면 정지된 컨테이너까지 모두 출력하고, 옵션을 실행하지 않으면 실행 중인 컨테이너만 출력한다.

> 정지된 컨테이너도 메모리에는 여전히 존재한다.

**컨테이너 재실행**

```bash
$ docker restart CONTAINER_NAME
```

**컨테이너 접속**

```bash
$ docker attach CONTAINER_NAME
```

`/bin/bash`를 실행했을 경우 명령을 자유롭게 입력할 수 있지만, DB나 서버 애플리케이션을 실행하면 입력은 할 수 없고 출력만 보게 된다.

bash shell에서 `exit` 또는 `ctrl+d`를 입력하면 컨테이너가 정지된다. `ctrl+p`, `ctrl+q`를 차례대로 입력하면 컨테이너를 정지하지 않고 빠져나온다.

**(/bin/bash를 통하지 않고) 컨테이너 내부에 명령 실행**

```bash
$ docker exec CONTAINER_NAME echo "Hello World"
```

`docker exec <컨테이너 이름> <명령> <매개변수>` 형식이다. 컨테이너가 실행 중인 상태에서만 사용할 수 있으며 정지된 상태에서는 사용할 수 없다.

`docker exec` 명령은 이미 실행된 컨테이너에 `apt-get`, `yum` 명령으로 패키지를 설치하거나, 각종 데몬을 실행할 때 활용할 수 있다.

**컨테이너 정지**

```bash
$ docker stop CONTAINER_NAME
```

**컨테이너를 메모리에서 삭제**

```bash
$ docker rm CONTAINER_NAME
```

## Dockerfile

Dockerfile은 Docker 이미지를 생성할 때 사용하는 설정 파일이다. Dockerfile에 설정된 내용대로 이미지를 생성할 수 있다.

**ubuntu 14.04를 기반으로 nginx 서버를 설치한 Docker 이미지 생성하기**

```bash
FROM ubuntu:14.04
MAINTAINER Foo Bar <foo@bar.com>

RUN apt-get update
RUN apt-get install -y nginx
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

VOLUME ["/data", "/etc/nginx/site-enabled", "/var/log/nginx"]
기
WORKDIR /etc/nginx

CMD ["nginx"]

EXPOSE 80
EXPOSE 443
```

* **FROM**: 어떤 이미지를 기반으로 할지 적는다. `<이미지 이름>:<태그>` 형식으로 설정한다.
* **MAINTAINER**: 메인테이너 정보를 적는다.
* **RUN**: 실행할 shell 스크립트 혹은 명령을 적는다.
	* 이미지 생성 중에는 사용자 입력을 받을 수 없으므로 `apt-get install` 명령에서 `-y` 옵션을 사용한다(`yum install`도 마찬가지).
	* 나머지는 nginx 설정이다.
* **VOLUME**: 호스트와 공유할 디렉토리 목록을 적는다. 
* **CMD**: 컨테이너가 시작되었을 때 실행할 실행 파일 또는 스크립트를 적는다.
* **WORKDIR**: CMD에서 설정한 실행 파일이 실행될 디렉토리를 적는다.
* **EXPOSE**: 호스트와 연결할 포트 번호를 적는다.

**이미지 빌드**

작성한 Dockerfile로 이미지를 생성한다. 이미지 생성을 빌드라고 표현한다.

```bash
$ docker build --tag ubuntu-nginx:0.1 .
```

`docker build <옵션> <Dockerfile 경로>` 형식이다. 명령어를 실행하는 현재 폴더에 Dockerfile이 있기 때문에 `.`을 적었다. `--tag` 옵션에서 이미지 이름만 설정하면 태그는 `latest`로 설정된다.

잠시 뒤 이미지 파일이 생성된다. 이미지 목록을 확인해보자.

```bash
$ docker images
```

생성된 이미지를 실행해서 컨테이너를 띄워보자.

```bash
$ docker run --name ubuntu-nginx -d -p 80:80 -v /root/data:/data ubuntu-nginx:0.1
```

* `-d`: 컨테이너를 백그라운드로 실행한다.
* `-p 80:80`: 호스트의 80번 포트와 컨테이너의 80번 포트를 연결하고 외부에 노출한다. `http://<호스트IP>:80`에 접속하면 컨테이너의 80번 포트로 접속된다.
* `-v /root/data:/data`: 호스트의 `/root/data` 디렉토리를 컨테이너의 `/data` 디렉토리에 연결한다. 호스트의 `/root/data` 디렉토리에 파일을 넣으면 컨테이너에서 해당 파일을 읽을 수 있다.

실행 중인 컨테이너 목록을 출력한다.

```bash
$ docker ps
```

이름이 `ubuntu-nginx`인 컨테이너가 있으면, 웹 브라우저에서 `http://<호스트IP>:80`으로 접속한다. Welcome to nginx! 페이지가 표시될 것이다.

**이미지 히스토리 조회**

```bash
$ docker history <이미지 이름>:<태그>
```

Dockerfile에 설정한 대로 히스토리가 생성된다.

**컨테이너에서 파일 가져오기**

```bash
$ docker cp ubuntu-nginx:/etc/nginx/nginx/conf ./
```

`docker cp <컨테이너 이름>:<경로> <호스트 경로>` 형식이다. 현재 디렉토리에 `nginx.conf` 파일이 복사된다.

**컨테이너 변경사항을 이미지 파일로 생성하기**

```bash
$ docker commit -a "Foo Bar <foo@bar.com>" -m "Add hello.txt" ubuntu-nginx ubuntu-nginx:0.2
```

`docker commit <옵션> <컨테이너 이름> <생성할 이미지 이름>:<태그>` 형식이다.

`-a "Foo Bar <foo@bar.com>"` 과 `-m "Add hello.txt"` 옵션으로 커밋한 사용자(author)와 로그 메시지를 설정한다.

**WIP**: http://pyrasis.com/Docker/Docker-HOWTO#diff

# Links

* [도커(Docker) 튜토리얼 : 깐 김에 배포까지](https://blog.nacyot.com/articles/2014-01-27-easy-deploy-with-docker/)
* [Docker 기본 사용법](http://pyrasis.com/Docker/Docker-HOWTO)
