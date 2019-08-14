---
layout: post
title: "Chart.js로 구현한 차트를 Apps Script에서 이미지로 가져오기"
date: 2019-08-12 10:55:43 +0900
update: 2019-08-14 13:46:51 +0900
categories: [tutorial, javascript, chartjs]
---

* TOC
{:toc}

# 목적

Chart.js로 구현한 차트를 구글 앱스스크립트에서 이미지로 가져온다.

# 구현

## 차트의 이미지 URL 구하기

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-piechart-outlabels" ></script>
<div id="chart-wrapper">
    <canvas id="outlabeledChart"></canvas>
</div>
<script id="script-construct">
    var inputLabels = [
        '59m²', 
        '84m²', 
        '115m²', 
        '117m²', 
        '135m²', 
        '136m²', 
        '168m²', 
        '169m²', 
        '198m²', 
        '222m²'
    ];
    var inputData = [
        512, 
        955,
        56, 
        74, 
        182, 
        28, 
        109, 
        122, 
        224, 
        10
    ];
    var chart = new Chart('outlabeledChart', {
        type: 'outlabeledDoughnut',
        data: {
            labels: inputLabels,
            datasets: [{
                backgroundColor: [
                    '#FF3784',
                    '#36A2EB',
                    '#4BC0C0',
                    '#F77825',
                    '#9966FF',
                    '#00A8C6',
                    '#379F7A',
                    '#CC2738',
                    '#8B628A',
                    '#8FBE00'
                ],
                data: inputData
            }]
        },
        options: {
            animation: false,
            title: {
                display: true,
                text: '단지내 전용면적 별 세대수 (총 ' + formatNumber(sum(inputData)) + '세대)',
                position: 'top',
                fontSize: 40,
                fontColor: '#000'
            },
            zoomOutPercentage: 30, // makes chart 55% smaller (50% by default, if the preoprty is undefined)
            plugins: {
                legend: false,
                outlabels: {
                    text: '%l \n%v세대',
                    color: 'white',
                    stretch: 45,
                    font: {
                        resizable: true,
                        minSize: 20,
                        maxSize: 30
                    }
                }
            }
        }
    });

    /*
     * 천 단위 콤마 표시
     */
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    function sum(nums) {
        return nums.reduce((a, b) => a + b, 0);
    }

    /*
     * 이미지 URL이 담긴 이미지 태그 생성하기
     */
    var canvas = document.getElementById('outlabeledChart');
    var imageUrl = canvas.toDataURL('image/png');
    document.write('<img id="chartImage" src="'+imageUrl+'" />');

    /*
     * HTML 렌더링 후 로컬에 자동으로 파일 다운로드
     */
    var fileName = 'fileName';
    document.write('<a id="imageDownload" href="'+ imageUrl+'" download="'+fileName+'">이미지 파일 다운로드</a>');
    var imageDownload = document.getElementById('imageDownload');
    imageDownload.click();
</script>
```

* [파이차트 html 코드](/assets/outlabels-with-image.html)
* [파이차트 이미지](/assets/outlabels.png)

위 코드로 만든 HTML 파일을 서버에 요청하면, 응답이 오는 동시에 로컬에 차트 이미지가 다운로드 된다.

## 앱스 스크립트로 이미지 삽입하기

```javascript
function insertImageOnSpreadsheet() {
  var spreadsheetId = 'spreadsheet_id_in_url';
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName('getChartImage');
  
  /*
   * 이미지 URL로 이미지 binary 가져오기
   */
  var reportName = 'outlabels.png';
  var imageUrl = 'https://datalater.github.io/assets/' + reportName;
  var response = UrlFetchApp.fetch(imageUrl);
  var binaryData = response.getContent();
  
  // Insert the image in cell A1.
  var blob = Utilities.newBlob(binaryData, 'image/png', 'MyImageName');
  sheet.insertImage(blob, 1, 1);
}
```

`https://datalater.github.io` 서버에 저장된 `outlabels.png`를 가져와서 구글 스프레드시트에 삽입한다.

# 아직 구현되지 않은 로직

현재 생각하고 있는 전체 로직은 다음과 같다.

* step1:  Apss Script API가 차트 이미지를 생성하는 nodeJS API에게 면적별 세대수 데이터를 넘겨주면서 "차트 이미지 만들어줘"라고 요청을 한다.
* step2: nodeJS API는 요청을 받고 차트 이미지가 담긴 URL이나 차트 이미지 바이너리 데이터를 Apps Script API에게 반환한다.
* step3: 차트 이미지를 받은 Apps Script API는 스프레드시트에 이미지를 삽입한다.

구현 여부는 다음과 같다.

* step1: TODO.
* step2: In Progress. nodeJS API가 차트를 만드는 로직은 [차트의 이미지 URL 구하기](#차트의-이미지-url-구하기)를 참고하면 되는데, nodeJS로 요청 파라미터를 받고 이미지 URL을 응답 파라미터로 반환하는 기능은 만들어야 한다.
* step3: DONE. [앱스 스크립트로 이미지 삽입하기](#앱스-스크립트로-이미지-삽입하기) 참고. 

# Links

* [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
* [Capture HTML Canvas as png](https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf)
* [insert image into spreadsheet](https://stackoverflow.com/questions/41020598/insert-image-into-spresheet-cell-from-drive-using-google-apps-script)
