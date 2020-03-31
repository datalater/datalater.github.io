---
layout: post
title: "Git 주요 개체 이해하기"
date: 2020-03-31 15:49:58 +0900
update: 2020-03-31 17:55:52 +0900
categories: ['explanation', 'git']
---

* TOC
{:toc}

Git의 주요 개체는 blob, tree, commit 개체이다. Git은 이러한 개체를 생성해서 전부 `.git/objects` 디렉토리에 저장한다. 각 개체는 모두 고유 key 값을 갖기 때문에 Git은 해당 key로 언제든지 데이터를 다시 가져올 수 있다. 따라서 로컬 디렉토리의 내용이 변경되더라도 Git은 blob, tree, commit 개체를 이용해서 원하는 버전으로 자유롭게 되돌릴 수 있다.

# 요약

- blob 개체: 파일 내용만 저장한 개체
- tree 개체: staging area의 스냅샷을 나타내는 개체
- commit 개체: tree 개체에 대한 설명과 포인터를 가진 개체

# blob

파일 내용만 저장한 개체를 blob 개체라고 부른다.

> blob은 binary large object의 약자이다. [위키피디아](https://en.wikipedia.org/wiki/Binary_large_object)

## Exercise

새 저장소를 만든다:

```bash
$ git init test
Initialized empty Git repository in /tmp/test/.git/
$ cd test
```

Git 개체가 저장된 데이터베이스인 `.git/objects` 디렉토리가 비어 있는 것을 확인한다:

```bash
$ find .git/objects
.git/objects
.git/objects/info
.git/objects/pack
$ find .git/objects -type f
```

새 파일을 만들고 Git 저장소에 저장한다:

```bash
$ echo 'version 1' > test.txt
$ git hash-object -w test.txt
83baae61804e65cc73a7201a7252750c76066a30
```

`git hash-object` 명령에 데이터를 주면 `.git/objects` 디렉토리에 저장하고 그 데이터에 접근할 수 있는 key를 알려준다.

파일 내용을 확인한다:

```bash
$ git cat-file -p 83baae61804e65cc73a7201a7252750c76066a30
version 1
```

같은 파일을 수정하고 다시 저장한다:

```bash
$ echo 'version 2' > test.txt
$ git hash-object -w test.txt
1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
```

개체 데이터베이스에는 데이터가 두 가지 버전으로 저장되어 있다:

```bash
$ find .git/objects -type f
.git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a
.git/objects/83/baae61804e65cc73a7201a7252750c76066a30
.git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
```

이제 로컬 디렉토리의 `test.txt` 파일을 지우더라도 Git을 이용하여 `test.txt` 파일을 첫 번째 버전 내용으로 되돌릴 수 있다:

```bash
$ git cat-file -p 83baae61804e65cc73a7201a7252750c76066a30 > test.txt
$ cat test.txt
version 1
```

# tree

staging area의 스냅샷을 나타내는 것이 tree 개체이다.

파일의 내용은 blob 개체에 저장되고 해당 파일의 이름은 tree 개체에 저장된다. tree 개체 하나는 항목을 여러 개 가질 수 있다. 각 항목에는 blob 개체나 하위 tree 개체를 가리키는 SHA-1 포인터, 파일 모드, 개체 타입, 파일 이름이 들어 있다. 이러한 항목들이 모두 모여 staging area의 스냅샷을 나타낸다. 이미지 참조:

![https://git-scm.com/book/en/v2/images/data-model-1.png](https://git-scm.com/book/en/v2/images/data-model-1.png)

> Git의 파일시스템은 유닉스 파일시스템과 대응된다. tree는 유닉스의 디렉토리에 대응되고 blob은 inode나 일반 파일에 대응된다.

## Exercise

Git은 staging area 상태대로 tree 개체를 만들기 때문에 tree 개체를 만들려면 우선 staging area에 파일을 추가해서 index를 만들어야 한다:

```bash
$ git update-index --add --cacheinfo 100644 \
  83baae61804e65cc73a7201a7252750c76066a30 test.txt
```

`update-index` 명령으로 `test.txt` 파일만 들어 있는 index를 만든다. 아직 staging area에 없는 파일이므로 `--add` 옵션을 꼭 줘야 한다. 그리고 디렉토리에 있는 파일이 아니라 데이터베이스에 있는 파일을 추가하는 것이기 때문에 `--cacheinfo` 옵션이 필요하다. 파일모드는 보통의 파일을 나타내는 `10644` 로 지정했다.

staging area를 tree 개체로 저장한다:

```bash
$ git write-tree
d8329fc1cc938780ffdd9f94e0d364e0ea74f579
$ git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
100644 blob 83baae61804e65cc73a7201a7252750c76066a30      test.txt
```

이 개체가 tree 개체인 것을 확인한다:

```bash
$ git cat-file -t d8329fc1cc938780ffdd9f94e0d364e0ea74f579
tree
```

# commit

tree 개체에 대한 설명과 포인터를 가진 것이 commit 개체이다.

tree 개체들은 각각 서로 다른 스냅샷을 나타낸다. 아직 남은 어려운 점은 여전히 이 스냅샷을 불러오려면 SHA-1 값을 기억하고 있어야 한다는 점이다. 스냅샷을 누가, 언제, 왜 저장했는지에 대한 정보는 아예 없다. 이런 정보는 commit 개체에 저장된다.

## Exercise

commit 개체는 commit 개체에 대한 설명과 tree 개체의 SHA-1 값 한 개를 이용해서 만든다:

```bash
$ echo 'first commit' | git commit-tree d8329f
fdf4fc3344e67ab068f836878b6c4951e3b15f3d
```

물론 위의 명령을 실행한 시간이나 author 정보가 다르기 때문에 hash 값이 위 예제와 다를 것이다. 이어지는 내용에서 커밋과 태그에 사용하는 해시 값은 예제에 있는 해시가 아닌 독자가 실행해서 얻은 해시 값을 사용해야 한다.

commit 개체의 내용을 출력한다:

```bash
$ git cat-file -p fdf4fc3
tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
author Scott Chacon <schacon@gmail.com> 1243040974 -0700
committer Scott Chacon <schacon@gmail.com> 1243040974 -0700

first commit
```

commit 개체의 형식은 간단하다. 해당 스냅샷에서 최상단 tree를 하나 가리킨다. 그리고 `user.name` 과 `user.email` 설정에서 가져온 author/committer 정보, 시간 정보, 그리고 한 라인 띄운 다음 commit 메시지가 들어간다.

이제 commit 개체를 두 개 더 만들어 보자. 각 commit 개체는 이전 개체를 가리키도록 한다:

```bash
$ echo 'second commit' | git commit-tree 0155eb -p fdf4fc3
cac0cab538b970a37ea1e769cbbde608743bc96d
$ echo 'third commit'  | git commit-tree 3c4e9c -p cac0cab
1a410efbd13591db07496601ebc7a059dd55cfe9
```

세 commit 개체는 각각 해당 스냅샷을 나타내는 tree 개체를 하나씩 가리킨다.

마지막 commit 개체의 SHA-1 값을 주고 `git log` 명령을 실행한다:

```bash
$ git log --stat 1a410e
commit 1a410efbd13591db07496601ebc7a059dd55cfe9
Author: Scott Chacon <schacon@gmail.com>
Date:   Fri May 22 18:15:24 2009 -0700

    third commit

 bak/test.txt | 1 +
 1 file changed, 1 insertion(+)

commit cac0cab538b970a37ea1e769cbbde608743bc96d
Author: Scott Chacon <schacon@gmail.com>
Date:   Fri May 22 18:14:29 2009 -0700

    second commit

 new.txt  | 1 +
 test.txt | 2 +-
 2 files changed, 2 insertions(+), 1 deletion(-)

commit fdf4fc3344e67ab068f836878b6c4951e3b15f3d
Author: Scott Chacon <schacon@gmail.com>
Date:   Fri May 22 18:09:34 2009 -0700

    first commit

 test.txt | 1 +
 1 file changed, 1 insertion(+)
```

# 고수준 명령어 실행시 내부 동작

`git add` 와 `git commit` 명령을 실행했을 때 Git 내부에 일어나는 일은 다음과 같다:

- 변경된 파일을 blob 개체로 저장한다.
- 현재 index에 따라서 tree 개체를 만든다.
- 이전 커밋 개체와 최상위 tree 개체를 참고해서 commit 개체를 만든다.

# Links

- [https://git-scm.com/book/ko/v2/Git의-내부-Git-개체](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EB%82%B4%EB%B6%80-Git-%EA%B0%9C%EC%B2%B4)

