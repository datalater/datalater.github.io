---
layout: post
title: "구글 앱스스크립트 트리거 사용방법"
date: 2019-10-15 10:19:58 +0900
update: 2019-10-15 11:22:13 +0900
categories: ['appsscript']
---

* TOC
{:toc}

# 목적

구글 앱스스크립트 트리거 사용방법을 정리한다.

# 사전 과정

구글 드라이브에서 앱스스크립트 파일을 만든다.

# 트리거로 호출될 함수 작성

* 파일명: `cleaner.gs`

```javascript
function runCleaner() {
  var folderId = 'YOUR_FOLDER_ID';
  var folder = DriveApp.getFolderById(folderId);
  var limit = 100;
  
  if (isFolderFull(folder, limit)) {
    backupOverflowFiles(folder, limit)
  }
}
```

> runCleaner(): 한 폴더에 100개 이상의 파일이 있으면 100개의 파일을 백업 폴더로 이동시키는 함수이다. 코드 전체는 다른 포스트에서 설명한다.

# 트리거 작성

* 파일명: `trigger.gs`

```javascript
function createTimeDrivenTriggers() {
  // Trigger every Monday at 09:00.
  ScriptApp.newTrigger('runCleaner')
  .timeBased()
  .onWeekDay(ScriptApp.WeekDay.MONDAY)
  .atHour(9)
  .create();
}

function getTimezone() {
  var timeZone = Session.getScriptTimeZone();
  Logger.log(timeZone);
}

```

이제 `createTimeDrivenTriggers()`를 앱스스크립트 에디터에서 실행(`cmd` + `r`)시키면 트리거가 설치된다. 설치된 트리거는 [My Triggers](https://script.google.com/home/triggers)에서 확인 및 수정할 수 있다.

참고로 트리거가 설정되는 타임존은 `getTimezone()` 함수를 통해 확인할 수 있다.

# Links

* [Installable Triggers \| Google Apps Script](https://developers.google.com/apps-script/guides/triggers/installable)
* [trigger sample code \| Github](https://github.com/gsuitedevs/apps-script-samples/blob/master/triggers/triggers.gs)
