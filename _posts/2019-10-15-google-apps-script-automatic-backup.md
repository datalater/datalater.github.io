---
layout: post
title: "구글 앱스스크립트로 폴더 자동 정리하기"
date: 2019-10-15 10:34:31 +0900
update: 2019-10-15 11:39:42 +0900
categories: ['appsscript']
---

* TOC
{:toc}

# 목적

구글 드라이브 폴더에 파일이 1000개 이상 쌓이면 해당 폴더를 사용하는 앱스스크립트 코드의 속도가 느려진다는 말을 들었다. 따라서 다음과 같은 과정을 거쳐서 속도 저하 현상을 해결한다.

* 한 폴더에 파일이 일정 개수 이상 쌓이면 가득 찬 것으로 간주한다.
* 가득 찰 경우 백업 폴더를 만들고 그곳으로 이동시킨다. 
* 위 모든 과정을 자동화한다.

# 폴더가 가득 찼는지 확인하는 함수

**실패하는 test 함수를 먼저 만든다**

```javascript
function testFolderIsFull() {
  var folderId = 'YOUR_TEST_FOLDER_ID'; // 파일이 5개 이상인 폴더의 ID를 적는다.
  var folder = DriveApp.getFolderById(folderId);
  var limit = 5;
  
  var actual = isFolderFull(folder, limit)
  var expected = true;
  
  assertSame('testFolderIsFull', expected, actual);
}
```

> assertSame() 함수는 직접 만들어서 사용했다. 참고 [GitHub](https://github.com/datalater/apps-script-auto-cleaner)

위 테스트 함수는 지정한 폴더에 파일이 5개 이상일 것이기 때문에 가득 찬 것으로 나오기를 기대한다.

테스트 함수를 실행시키면 당연히 fail한다. 이제 테스트 함수를 통과시키는 함수를 작성한다.


**test 함수를 통과시키는 함수를 만든다**

```javascript
function isFolderFull(folder, limit) {
  if (limit > 300) {
    limit = 300;
  }
  
  var files = folder.getFiles();
  var fileCount = 0;
  while (files.hasNext() && fileCount < limit) {
    var file = files.next();
    fileCount++;
  }
  
  return fileCount >= limit;
}
```

> 참고로 limit의 맥스값을 300으로 잡은 이유는, 한 폴더에 파일이 300개 이상이 되면, 파일의 개수를 세는 데에만 시간이 5초 이상 걸리기 때문이다. 300개일 경우 위 함수는 3초 이내에 완료된다.

테스트 함수를 실행하고 로거를 확인(`alt` + `enter`)하면 다음과 같다:

```text
[19-10-15 10:49:08:293 JST] TEST SUCCESS
[19-10-15 10:49:08:293 JST] Name: 		testFolderIsFull
[19-10-15 10:49:08:294 JST] Expected: 	true
[19-10-15 10:49:08:294 JST] Actual: 		true
[19-10-15 10:49:08:295 JST] ==========EOT==========
```

# 넘치는 파일을 백업 폴더로 이동시키는 함수

```javascript
function backupOverflowFiles(sourceFolder, limit) {
  var backupFolder = makeBackupFolder(); 
  moveFileInFolder(sourceFolder, limit, backupFolder);
}

function makeBackupFolder() {
  var preservationId = 'YOUR_BACKUP_ROOT_FOLDER_ID';
  var preservationFolder = DriveApp.getFolderById(preservationId);
  var folderName = now();
  return preservationFolder.createFolder(folderName);
}

function moveFileInFolder(sourceFolder, limit, targetFolder) {
  var files = sourceFolder.getFiles();
  
  var fileCount = 0;
  while (files.hasNext() && fileCount < limit) {
    var file = files.next();
    moveFile(file, targetFolder);
    fileCount++;
  }
}

function moveFile(sourceFile, targetFolder) {
  targetFolder.addFile(sourceFile);
  sourceFile.getParents().next().removeFile(sourceFile);
}
```

# 클리너 함수

위 두 가지 함수를 결합한다.

```javascript
function runCleaner() {
  var folderId = 'YOUR_FOLDER_ID';
  var folder = DriveApp.getFolderById(folderId);
  var limit = 5;
  
  if (isFolderFull(folder, limit)) {
    backupOverflowFiles(folder, limit)
  }
}
```

# 자동화

폴더에 파일이 n개 이상 쌓이는 것을 특정 날짜에 주기적으로 청소하도록 `runCleaner`함수를 실행시키는 트리거를 만든다.

```javascript
function createTimeDrivenTriggers() {
  // Trigger every Monday at 09:00.
  ScriptApp.newTrigger('runCleaner')
  .timeBased()
  .onWeekDay(ScriptApp.WeekDay.MONDAY)
  .atHour(9)
  .create();
}
```

위 함수를 실행시키면 트리거가 설치된다. 설치된 트리거는 [My Triggers](https://script.google.com/home/triggers)에서 확인 및 수정 가능하다.


# 전체 코드

[https://github.com/datalater/apps-script-auto-cleaner](https://github.com/datalater/apps-script-auto-cleaner)

# Links

* [DriveApp API](https://developers.google.com/apps-script/reference/drive/drive-app)
* [How to install trigger](https://developers.google.com/apps-script/guides/triggers/installable)
* [getScriptTimezone()](https://developers.google.com/apps-script/reference/base/session)
