---
layout: post
title: "git ssh timed out"
date: 2019-07-07 16:06:05 +0900
update: 2019-07-07 22:56:58 +0900
categories: git ssh troubleshooting
---

* TOC
{:toc}

# 문제 상황

카페에 가서 공부하던 중 다음과 같은 명령어를 입력했더니 에러가 발생했다:

```bash
$ git pull --rebase
ssh: connect to host github.com port 22: Operation timed out
fatal: 리모트 저장소에서 읽을 수 없습니다

올바른 접근 권한이 있는지, 그리고 저장소가 있는지
확인하십시오.
```

# 문제 원인

다음 명령어를 입력해도 같은 결과가 나오는지 확인해보자:

```bash
$ ssh -T git@github.com
```

같은 오류가 발생한다면 특정 네트워크의 방화벽이 일부 포트를 차단하고 있을 가능성이 높다.

# 해결책

**ssh 설정 파일을 연다**:

```bash
$ vim ~/.ssh/config
```

**다음과 같이 내용을 붙여넣는다**:

```bash
Host github.com
    HostName ssh.github.com
    Port 443
```

위 내용은 HTTPS port로 SSH 커넥션을 만든 것이다. 대부분의 방화벽은 HTTPS port를 사용한 SSH 커넥션을 허용한다고 한다.

> Sometimes, firewalls refuse to allow SSH connections entirely. If using HTTPS cloning with credential caching is not an option, you can attempt to clone using an SSH connection made over the HTTPS port. Most firewall rules should allow this, but proxy servers may interfere. ([링크 참조](#links))

# Links

* [stackoverflow-ssh-connect-to-host-github-com-port-22-connection-timed-out](https://stackoverflow.com/questions/15589682/ssh-connect-to-host-github-com-port-22-connection-timed-out)

