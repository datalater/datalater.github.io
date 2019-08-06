---
layout: post
title: "구글 앱스 스크립트로 차트 만들기"
date: 2019-08-02 15:39:46 +0900
update: 2019-08-06 18:11:38 +0900
categories: [tutorial, appsscript, chart]
---

* TOC
{:toc}

# 목표

보고서 용도로 사용할 구글 스프레드시트에 차트를 넣고 조작하는 방법을 익힌다.

# 앱스 스크립트에서 차트를 만드는 방법

google에 `apps script insert chart`로 검색하니 여러 가지 방법이 나왔다. 그 중에 구글 스프레드시트에 적용할 수 있는 방법을 정리하면 다음과 같다.

* `Script Services > Chart Service`: [Script Services](https://developers.google.com/apps-script/reference/)에 속하는 [차트 서비스](https://developers.google.com/apps-script/reference/charts/)를 사용하면 차트를 만들 수 있다. 생성한 차트를 [blob](https://developers.google.com/apps-script/reference/base/blob)(data interchange object)이나 이미지(static image)로 전환하여 사용할 수 있다.
* `G Suite Services > Spreadsheet > Sheet > newChart()`: sheet 객체의 메소드 [newChart()](https://developers.google.com/apps-script/reference/spreadsheet/sheet#newChart())를 사용하면 차트를 생성할 수 있다.

스프레드시트 전용인 두 번째 방법으로 진행한다.

# 어떤 차트를 만들 것인가

구글 앱스 스크립트가 제공하는 차트의 종류는 20가지나 된다. 어떤 차트를 그려야 할까.

> [Enum ChartType](https://developers.google.com/apps-script/reference/charts/chart-type) 및 [Google Chart Gallery](https://developers.google.com/chart/interactive/docs/gallery) 참조

이는 [데이터 시각화](https://searchbusinessanalytics.techtarget.com/definition/data-visualization) 분야에서 전문적으로 다룬다. `data visualization how to choose right charts` 로 검색하면 유용한 결과를 얻을 수 있다.

> [How to Choose the Right Chart for Your Data](https://infogram.com/page/choose-the-right-chart-data-visualization)

내가 본 샘플은 아파트 단지 내 면적별 세대수를 표현하고 있었다. [5 Data Visualization Best Practices](https://www.gooddata.com/blog/5-data-visualization-best-practices-0)를 보니 전체의 구성요소를 표현할 때는 파이 차트가 적당해 보인다.

# 구현

> `newChart()`는 `EmbeddedChartBuilder` 객체를 생성한다. 따라서 차트 조작법을 익히기 위해 [EmbbdedChartBuilder에 대한 API 문서](https://developers.google.com/apps-script/reference/spreadsheet/embedded-chart-builder)를 찾아봤다.

## 공통 메서드

```javascript
function makeBarChart(sheet) {
  var chart = sheet.newChart()
  .addRange(sheet.getRange("A10:B20"))
  .setNumHeaders(1)
  .setPosition(1, 1, 0, 0)
  .setChartType(Charts.ChartType.BAR)
  .build();

  sheet.insertChart(chart);
}
``` 

* `addRange(range)`: 차트 데이터 지정
* `setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)`: 차트 위치 지정
* `setChartType(type)`: 차트 종류 지정
    > [Enum ChartType](https://developers.google.com/apps-script/reference/charts/chart-type)

스크립트를 실행하면 [파이 차트](/assets/piechart-default-options.png){:target="_blank"}가 생성된다.

## 옵션 메서드

차트 유형에 따라 변경할 수 있는 옵션이 다르다. 일례로 [파이 차트](https://developers.google.com/chart/interactive/docs/gallery/piechart)에 옵션을 추가해서 구현해보겠다.

```javascript
function makePieChart(sheet) {
  var title = '면적별 세대수'; 
  var titleTextStyle = {
    color: 'black',
    fontSize: 36,
    bold: true,
    alignment: 'center'
  };
  var backgroundColor = {
    fill: 'white'
  };
  var pieSliceTextStyle = {
    fontSize: 16,
    bold: true
  };
  var legend = {
    position: 'right',
    textStyle: {
      fontSize: 24,
      bold: true,
      color: 'black'
    }
  };
  var pieHole = 0.5;
  var height = 660;
  var width = 780;
  
  var chart = sheet.newChart()
  .addRange(sheet.getRange("A10:C20"))
  .setNumHeaders(1)
  .setChartType(Charts.ChartType.PIE)
  .setPosition(1, 1, 50, 50)
  .setOption('backgroundColor', backgroundColor)
  .setOption('title', title)
  .setOption('titleTextStyle', titleTextStyle)
  .setOption('legend', legend)
  .setOption('is3D', true)
  .setOption('pieHole', pieHole)
  .setOption('pieSliceText', 'value')
  .setOption('pieSliceTextStyle', pieSliceTextStyle)
  .setOption('height', height)
  .setOption('width', width)
  .build();
  
  sheet.insertChart(chart)
}
```

스크립트를 실행하면 [옵션을 적용한 파이 차트](/assets/piechart-advanced-options.png){:target="_blank"}가 생성된다.

# Links

* [5 Data Visualization Best Practices](https://www.gooddata.com/blog/5-data-visualization-best-practices-0)
* [How to Choose the Right Chart for Your Data](https://infogram.com/page/choose-the-right-chart-data-visualization) 
* [Data Visualization 101: How to Choose the Right Chart or Graph for Your Data](https://blog.hubspot.com/marketing/types-of-graphs-for-data-visualization)
* [Choosing the Right Chart](https://extremepresentation.typepad.com/files/choosing-a-good-chart-09.pdf)
* [Google Chart Gallery](https://developers.google.com/chart/interactive/docs/gallery)
* [Google Addtional Charts Gallery](https://developers.google.com/chart/interactive/docs/more_charts)
* [Code Examples Google Charts](https://developers.google.com/chart/interactive/docs/examples)
* [treemap chart in google sheets](https://infoinspired.com/google-docs/spreadsheet/tree-map-chart-in-google-sheets/)
* [How to get link to open in new tab in Kramdown](https://stackoverflow.com/questions/4425198/markdown-target-blank#answer-4705645)
