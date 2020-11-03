---
layout: post
title: "vim-easy-align 플러그인 사용 예시"
date: 2019-09-07 19:09:23 +0900
update: 2019-09-07 20:01:08 +0900
categories: ['vim']
---

* TOC
{:toc}

# 목적

vim에서 마크다운 테이블을 쉽게 그리는 방법이 있는지 궁금해서 구글링을 했다. 정렬 플러그인을 발견했다. 처음에는 마크다운 테이블의 가독성이 좋아져서 편리함을 느꼈다. 그런데 마크다운에서 코드블락을 작성할 때 코멘트의 간격이 맞춰지는 것을 보고 크게 감탄했다. 앞으로도 자주 사용할 수밖에 없는 기능이지만 당분간은 어떻게 사용해야 하는지 머릿속에 바로 떠오르지 않을 것 같아 기록해둔다.

# 설치

`Vundle`을 사용할 경우 아래 내용을 `.vimrc`에 추가한다:

```vim
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" Easy Align
Plugin 'junegunn/vim-easy-align'

call vundle#end()            " required
```

플러그인 설치를 위해 아래 명령어를 입력한다:

```vim
:PluginInstall
```

# 단축키 설정

`.vimrc`에 다음 내용을 붙여넣는다:

```vim
"--- vim-easy-align
" Start interactive EasyAlign in visual mode (e.g. vipga)
xmap ga <Plug>(EasyAlign)

" Start interactive EasyAlign for a motion/text object (e.g. gaip)
nmap ga <Plug>(EasyAlign)
```

이제 비주얼 모드, 선택 모드, 노멀 모드에서 `ga`를 입력하면 EasyAlign 플러그인이 실행된다.

# 사용 예시

## 마크다운 테이블 정렬

**실험 텍스트**:

```markdown
| 변수명 | obj | obj2 | - |
| --- | --- | --- | --- |
| 주소 | @413 | @414 | - |
```

**명령어 입력**:

* 비주얼모드로 텍스트 선택 후 `ga` 명령어 입력
* `*|` 입력 후 엔터

**결과**:

```markdown
| 변수명 | obj  | obj2 | -   |
| ---    | ---  | ---  | --- |
| 주소   | @413 | @414 | -   |
```

[정렬 전](/assets/vim-easy-align-before.png) vs [정렬 후](/assets/vim-easy-align-after.png)

> 에디터에서는 정렬 효과가 눈으로 보이지만, 블로그 마크다운 렌더링에서는 정렬의 효과가 나타나지 않는다. 눈으로 확인할 수 있게 이미지를 첨부한다.

### 번외

위 명령어를 단축키로 설정할 수 있다.

`.vimrc`에 추가:

```vim
au FileType markdown vmap <Leader><Bslash> :EasyAlign*<Bar><Enter>
```

> "파일 타입이 마크다운일 때, 비주얼 모드에서 `\\`를 누르면, EasyAlign 플러그인을 실행해서 `|` 기준으로 정렬한다".
> * `<Leader>`: `\`(backslash)를 의미한다.
> * `au`: vim 자동 실행 명령어를 추가한다.
> * `vmap`: 비주얼 모드와 셀렉트 모드에 대한 단축키 설정
> * `xmap`: 비주얼 모드에 대한 단축키 설정

## 코드 인라인 주석 정렬

**실험 텍스트**:

```javascript
console.log(obj2.a); //=> 10
console.log(obj.a); //=> 10
obj === obj2; //=> true
```

정렬 기준 구분자는 `//=>`이다. 플러그인이 기본으로 제공하는 구분자가 아니기 때문에 정규표현식을 사용해야 한다.

**명령어 입력**:

* 비주얼모드로 텍스트 선택 후 `ga` 명령어 입력
* `CTRL + X` 입력해서 정규표현식 생성
* `\/\/=>` 입력후 엔터

**결과**:

```javascript
console.log(obj2.a); //=> 10
console.log(obj.a);  //=> 10
obj === obj2;        //=> true
```

[주석 정렬 전](/assets/vim-easy-align-before-comment.png) vs. [주석 정렬 후](/assets/vim-easy-align-after-comment.png)

# Links

* [vim-easy-align](https://github.com/junegunn/vim-easy-align)
* [Align GitHub-Flavored Markdown Tables in Vim](https://thoughtbot.com/blog/align-github-flavored-markdown-tables-in-vim)
