---
layout: post
title: "[WIP] MySQL Indexes 개념 정리"
date: 2019-08-22 11:42:36 +0900
update: 2019-08-22 18:19:11 +0900
categories: [database, mysql]
---

* TOC
{:toc}


# 목적

로우가 9천만 개인 새로운 DB 테이블을 생성했다. unique 키를 잡으려는데 `MySQL said: Specified key was too long; max key length is 3072 bytes` 오류가 발생했다. unique 키를 뒤로 하고, 조회 속도를 높이기 위해 인덱스를 잡으려는데, unique 키를 안 써도 되는지, 나아가서 다른 인덱스는 어떤 기능을 하고 왜 필요한지 알기 위해서 정리한다.

# 인덱스란 무엇인가

인덱스는 한글로 "색인(찾을 색, 인도할 인)"이다. 색인은 책 속의 내용 중에서 중요한 단어나, 항목, 인명 따위를 찾아보기 쉽게 일정한 순서로 나열한 목록을 가리킨다.


# 인덱스를 사용하는 일반적인 이유

인덱스는 특정 칼럼 값을 가진 로우를 빠르게 찾기 위해 사용한다. 인덱스가 없으면 처음 로우부터 시작해서 테이블에 있는 모든 로우를 검색해야 한다. 칼럼에 대한 인덱스가 있으면, 어느 위치부터 데이터를 찾아야 할지 빠르게 결정할 수 있다.

마치 영어 사전에서 magnolia를 찾을 때 처음부터 찾을 필요 없이 `m`부터 찾을 수 있는 것과 비슷하다.

> magnolia: 목련

# 인덱스가 저장되는 위치

`PRIMARY KEY`, `UNIQUE`, `INDEX`, `FULLTEXT` 같이 대부분의 MySQL 인덱스는 [B-trees](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_b_tree)에 저장된다.

# 인덱스를 사용하는 기능적인 이유

* `WHERE` 절에 일치하는 로우를 빠르게 찾기 위해서
* 고려해야 할 로우를 제외하기 위해서 
    > 인덱스가 여러 개(multiple indexes) 있고 그 중에서 선택할 수 있다면, 찾아야 할 로우 수가 가장 적은 인덱스를 사용한다.
* 색인화의 우선순위를 두기 위해서
    > 하나의 인덱스가 여러 개의 칼럼으로 구성된 다중열 인덱스(a multiple-column index)인 경우 가장 왼쪽에 있는 칼럼을 사용하여 로우를 검색한다. ex) 하나의 인덱스가 (col1, col2, col3) 3개의 칼럼으로 구성된 경우 (col1), (col1, col2), (col1, col2, col3)에 대한 검색 기능이 색인화된다. 더 자세한 내용은 [8.3.6 Multiple-Column Indexes](https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html) 참조
* 테이블을 조인할 때 다른 테이블의 로우를 읽기 위해서
    > 인덱스를 적용한 칼럼들이 데이터 타입이 같고 크기도 같으면 더욱 효율적으로 사용할 수 있다.
* 칼럼의 `MIN()`과 `MAX()` 값을 찾기 위해서

WIP

# 추가 공부

* [8.2.1.22 Avoiding Full Table Scans](https://dev.mysql.com/doc/refman/8.0/en/table-scan-avoidance.html)
* [8.2.1.1 WHERE Clause Optimizaztion](https://dev.mysql.com/doc/refman/8.0/en/where-optimization.html)

# Links

* [8.3.1 How MySQL Uses Indexes \| MySQL](https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html)


