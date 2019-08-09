---
layout: post
title: "Chart.js를 사용해서 파이차트 구현하기 Part 2"
date: 2019-08-09 16:51:25 +0900
update: 2019-08-09 18:28:47 +0900
categories: [tutorial, javascript, chartjs]
---

* TOC
{:toc}

# 목적

지난 1편으로 완성한 파이차트에서 문제점이 발견되었다. 슬라이스의 값이 전체 파이에서 매우 작을 경우 레이블이 표시는 되지만, 무엇을 가리키는지 한 눈에 들어오지 않아 가독성이 떨어진다는 점이다. 그래서 레이블과 슬라이스를 연결하는 선이 있으면 좋겠다는 요청을 받았다. 다행히 관련된 플러그인을 찾았고, 해결 코드를 문서로 남긴다.

# 관련 플러그인

[chartjs-plugin-piechart-outlabels](https://www.jsdelivr.com/package/npm/chartjs-plugin-piechart-outlabels)를 사용하면 슬라이스와 레이블을 선으로 이어준다.

샘플은 [여기](https://piechart-outlabels.netlify.com/sample/)에서 확인할 수 있다.

# 구현

* [outlabels.html](/assets/outlabels.html)


# Links

* [CDN \| chartjs-plugin-piechart-outlabels](https://www.jsdelivr.com/package/npm/chartjs-plugin-piechart-outlabels)
* [GitHub \| chartjs-plugin-piechart-outlabels](https://github.com/Neckster/chartjs-plugin-piechart-outlabels)
* [Sample \| chartjs-plugin-piechart-outlabels](https://piechart-outlabels.netlify.com/sample/)
