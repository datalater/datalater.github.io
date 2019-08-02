---
layout: post
title: "구글 앱스 스크립트로 차트 만들기"
date: 2019-08-02 15:39:46 +0900
update: 2019-08-02 15:39:54 +0900
categories: retrospective book-meeting
---


# 목표

보고서 용도로 사용할 구글 스프레드시트에 차트를 넣고 조작하는 방법을 익힌다.

# 앱스 스크립트에서 차트를 만드는 방법

google에 `apps script insert chart`로 검색하니 여러 가지 방법이 나왔다. 그 중에 구글 스프레드시트에 적용할 수 있는 방법을 정리하면 다음과 같다.

* `Script Services > Chart Service`: [Script Services](https://developers.google.com/apps-script/reference/)에 속하는 [차트 서비스](https://developers.google.com/apps-script/reference/charts/)를 사용하면 차트를 만들 수 있다. 생성한 차트를 [blob](https://developers.google.com/apps-script/reference/base/blob)(data interchange object)이나 이미지(static image)로 전환하여 사용할 수 있다.
* `G Suite Services > Spreadsheet > Sheet > newChart()`: sheet 객체의 메소드 [newChart()](https://developers.google.com/apps-script/reference/spreadsheet/sheet#newChart())를 사용하면 차트를 생성할 수 있다.

스프레드시트 전용인 두 번째 방법으로 진행한다.

# 구현

> `newChart()`는 `EmbeddedChartBuilder` 객체를 생성한다. 따라서 차트 조작법을 익히기 위해 [EmbbdedChartBuilder에 대한 API 문서](https://developers.google.com/apps-script/reference/spreadsheet/embedded-chart-builder)를 찾아봤다.

## 공통

```javascript
var chart = sheet.newChart()
  .addRange(sheet.getRange("A10:B19"))
  .setPosition(1, 1, 0, 0)
  .setChartType(Charts.ChartType.BAR)
  .build();

sheet.insertChart(chart);
``` 

* `addRange(range)`: 차트 데이터 지정
* `setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)`: 차트 위치 지정
* `setChartType(type)`: 차트 종류 지정
    > [Enum ChartType](https://developers.google.com/apps-script/reference/charts/chart-type)

## 옵션

차트 유형에 따라 변경할 수 있는 옵션이 다르다. 일례로 [파이 차트](https://developers.google.com/chart/interactive/docs/gallery/piechart)에 옵션을 추가해서 구현해보겠다.

```javascript
var title = 'Chart Title';
var titleTextStyle = {
  color: 'black',
  fontSize: 30
};
var pieSliceTextStyle = {
  color: 'black',
};

var chart = sheet.newChart()
  .addRange(sheet.getRange("A10:C20"))
  .setChartType(Charts.ChartType.PIE)
  .setPosition(1, 1, 50, 50)
  .setOption('title', title)
  .setOption('titleTextStyle', titleTextStyle)
  .setOption('pieSliceTextStyle', pieSliceTextStyle)
  .setOption('pieHole', 0.4)
  .setOption('pieSliceText', 'label')
  .setOption('fontSize', 24)
  .setOption('height', 600)
  .setOption('width', 1000)
  .build();

sheet.insertChart(chart);
```

# Links

* [Chart Gallery](https://developers.google.com/chart/interactive/docs/gallery)
* [Addtional Charts Gallery](https://developers.google.com/chart/interactive/docs/more_charts)
* [Code Examples Google Charts](https://developers.google.com/chart/interactive/docs/examples)
* [treemap chart in google sheets](https://infoinspired.com/google-docs/spreadsheet/tree-map-chart-in-google-sheets/)
