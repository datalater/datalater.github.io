---
layout: post
title: "Chart.js로 구현한 차트를 Apps Script에서 이미지로 가져오기"
date: 2019-08-12 10:55:43 +0900
update: 2019-08-14 13:11:28 +0900
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

    /**
     * 천 단위 콤마 표시
     */
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    function sum(nums) {
        return nums.reduce((a, b) => a + b, 0);
    }

    /*
     * 이미지 URL 구하기
     */
    var canvas = document.getElementById('outlabeledChart')
    var imageUrl = canvas.toDataURL('image/png');
    document.write('<img id="chartImage" src="'+imageUrl+'" />');
</script>
```

* [파이차트 html 코드](/assets/outlabels-with-image.html)
* [파이차트 이미지](/assets/outlabels.png)

## 앱스 스크립트로 이미지 삽입하기

```javascript
function insertImageOnSpreadsheet() {
  var spreadsheetId = '1OwR0lm_3CfC2Uoua7D4kwxo3Z1cGnzCE35GEWWU1nDU';
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName('getChartImage');
  
  /*
   * 이미지 URL로 이미지 binary 가져오기
   */
//  var reportName = 'outlabels.png';
//  var imageUrl = 'https://datalater.github.io/assets/' + reportName;
//  var response = UrlFetchApp.fetch(imageUrl);
  
  /*
   * HTML URL로 이미지 binary 가져오기
   */
  var htmlUrl = 'https://datalater.github.io/assets/outlabels-with-image.html';
  var response = UrlFetchApp.fetch(htmlUrl);
  var binaryData = response.getContent();

  // Insert the image in cell A1.
  var blob = Utilities.newBlob(binaryData, 'image/png', 'MyImageName');
  sheet.insertImage(blob, 1, 1);
}
```

# Links

* [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
* [Capture HTML Canvas as png](https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf)
* [insert image into spreadsheet](https://stackoverflow.com/questions/41020598/insert-image-into-spresheet-cell-from-drive-using-google-apps-script)
