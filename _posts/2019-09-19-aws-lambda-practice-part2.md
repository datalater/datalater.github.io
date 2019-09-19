---
layout: post
title: "AWS Lambda 실습 Part.2 Deploy Node.js hello world"
date: 2019-09-19 17:08:20 +0900
update: 2019-09-19 17:35:08 +0900
categories: ['aws', 'serverless']
---

* TOC
{:toc}

# Reference

[Udemy AWS Lambda Serverless](https://www.udemy.com/aws-lambda-serverless)

# Deploy your first function

## Make aws-nodejs template

> [serverless docs - aws](https://serverless.com/framework/docs/providers/aws/cli-reference/create/)

```bash
$ sls create --template aws-nodejs --path hello-world-nodejs
Serverless: Generating boilerplate...
Serverless: Generating boilerplate in "/Users/jay/datalater/aws-lambda-practice-nodejs/hello-world-nodejs"
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.52.0
 -------'

Serverless: Successfully generated boilerplate for template: "aws-nodejs"
```

Now you have a `hello-world-nodejs` directory. Go to the directory.

```bash
$ cd hello-world-nodejs
```

We'll gonna change the generated codes a bit.

```bash
$ vi handler.js
```

```javascript
'use strict';

module.exports.hello = async event => {
  console.log('I am datalater.');
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
```

```bash
$ vi serverless.yml
```

Add your IAM profile and your best region to `provider`.

```yml
provider:
  name: aws
  runtime: nodejs10.x
  profile: serverless-admin
  region: ap-northeast-2
```

## Deploy

```bash
$ sls deploy -v
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
...
```

The `serverless` framework does a lot of things automatically for you, such as uploading your codes, linking your codes, IAM roles for you, and so on.

## Check whether it actually works

* Go to `https://aws.amazon.com/ko/lambda/`.
* Click `hello-world-nodejs-dev-hello`.
    * You can see the codes you typed before.
* Click `Test` to make a test.
    * Event name: `helloDatalater` (whatever you like)
    * Click `save`
* Click `Test` to execute `helloDatalater` test.
    * See `Execution Results`

```text
Response:
{
  "statusCode": 200,
  "body": "{\n  \"message\": \"Go Serverless v1.0! Your function executed successfully!\",\n  \"input\": {\n    \"key1\": \"value1\",\n    \"key2\": \"value2\",\n    \"key3\": \"value3\"\n  }\n}"
}

Request ID:
"27d3f95b-1a41-42e7-9754-dbff650e50b5"

Function Logs:
START RequestId: 27d3f95b-1a41-42e7-9754-dbff650e50b5 Version: $LATEST
2019-09-19T08:31:48.072Z	27d3f95b-1a41-42e7-9754-dbff650e50b5	INFO	I am datalater.
END RequestId: 27d3f95b-1a41-42e7-9754-dbff650e50b5
REPORT RequestId: 27d3f95b-1a41-42e7-9754-dbff650e50b5	Duration: 1.72 ms	Billed Duration: 100 ms	Memory Size: 1024 MB	Max Memory Used: 76 MB	
XRAY TraceId: 1-5d833cf4-fdd91bf091f03dc36863e132	SegmentId: 1e50c44b1ce90f1f	Sampled: false	
```

So it's definitely working as expected.

Done.
