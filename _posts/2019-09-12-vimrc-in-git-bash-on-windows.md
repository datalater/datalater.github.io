---
layout: post
title: "git bash on Windows에서 vimrc 적용하기"
date: 2019-09-12 12:58:37 +0900
update: 2019-09-12 14:48:31 +0900
categories: ['vim']
---

* TOC
{:toc}

# 목적

윈도우 노트북밖에 없는 환경에서 평소처럼 vim으로 작업할 수 있는 방법을 기록한다.

# git bash on Windows 기본 이해

## 경로

윈도우에서 git bash를 디폴트 옵션으로 설치하면 기본 경로는 다음과 같다:

* `C:\Program Files\Git`

> 위 경로에 git bash에 대한 모든 설정 파일이 담겨 있다.

git bash에서 위 기본 경로에 존재하는 파일을 보려면 다음과 같이 명령어를 입력한다:

```bash
$ ls /
LICENSE.txt        bin/  dev/  git-bash.exe*  mingw64/  tmp/          unins000.exe*  usr/
ReleaseNotes.html  cmd/  etc/  git-cmd.exe*   proc/     unins000.dat  unins000.msg
```

## 설정 파일

대부분의 설정 파일은 `/etc`에 있다.

```bash
$ ls /etc
DIR_COLORS        fstab                msystem   nsswitch.conf         profile     ssh/
bash.bash_logout  hosts                mtab@     package-versions.txt  profile.d/  tigrc
bash.bashrc       inputrc              nanorc    pkcs11/               protocols   vimrc
docx2txt.config   install-options.txt  networks  pki/                  services
```

## git bash profile

`/etc/profile.d`에 가면 `alias`, `prompt`, `bash_profile` 등을 확인할 수 있다.

```bash
$ ls /etc/profile.d/
aliases.sh  bash_profile.sh  env.sh  git-prompt.sh  lang.sh  perlbin.csh  perlbin.sh
```

## vim 설정파일 확인

```bash
$ vim --version
VIM - Vi IMproved 8.1 (2018 May 18, compiled Oct 30 2018 15:10:52)
...
...
   system vimrc file: "/etc/vimrc"
     user vimrc file: "$HOME/.vimrc"
 2nd user vimrc file: "~/.vim/vimrc"
      user exrc file: "$HOME/.exrc"
       defaults file: "$VIMRUNTIME/defaults.vim"
```

`vimrc` 파일은 여러 개 존재한다. 시스템 `vimrc`는 git bash 설치시 자동으로 적용되는 시스템 기본 옵션이다. 이 글에서는 사용자 vimrc 파일을 새로 생성하고 조작하는 법을 다룬다.

> 시스템 설정 파일은 대부분 읽기 전용이며 수정이 불가하다. 사용자 설정 파일이 존재할 경우 시스템 설정 파일보다 우선 적용된다.

# vimrc 설정

위에서 언급했듯이 system vimrc는 그대로 두고,  user vimrc를 만든다.

**vimrc 파일 생성**

```bash
$ vi ~/.vimrc
```

파일이 열리면 원하는 설정 코드를 입력한다.

**플러그인 관리자 설치**

Vundle을 사용할 경우:

```bash
$ git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

**vimrc에 등록한 플러그인 설치**

```vim
:PluginInstall
```

**템플릿 만들기**

> 템플릿을 사용하지 않는다면 건너뛰면 된다.

> 본 실습에서 적용할 `vimrc` 파일에는 템플릿을 사용하는 코드가 적혀 있다.해당 코드에는 지킬 블로그에 글을 쓸 때 `_posts` 폴더에 마크다운 파일이 생성되면 템플릿을 불러오도록 설정한다.

템플릿 폴더를 생성하고 적용할 템플릿 파일을 만든다.

```bash
$ mkdir ~/.vim/templates
$ vi post.md
```

다음 템플릿 코드를 붙여 넣는다.

```text
---
layout: post
title: ""
date:
update: 2019-08-04 11:19:06 +0900
categories:
---

* TOC
{:toc}
```

# MISC

컬러스킴은 default도 괜찮지만 darkblue를 추천한다:

```vim
:colorscheme darkblue
```


