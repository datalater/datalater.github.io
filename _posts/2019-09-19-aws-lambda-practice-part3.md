---
layout: post
title: "AWS Lambda 실습 Part.3 Deploy function or entire stack"
date: 2019-09-19 17:38:20 +0900
update: 2019-09-19 18:03:08 +0900
categories: ['aws', 'serverless']
published: false
---

* TOC
{:toc}

# Reference

[Udemy AWS Lambda Serverless](https://www.udemy.com/aws-lambda-serverless)

# Run the function from CLI

```bash
$ sls invoke -f hello -l
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v1.0! Your function executed successfully!\",\n  \"input\": {}\n}"
}
--------------------------------------------------------------------
START RequestId: 5ba3ade5-545e-46f4-af5e-060c262ad81b Version: $LATEST
2019-09-19 17:45:38.972 (+09:00)	5ba3ade5-545e-46f4-af5e-060c262ad81b	INFO	I am datalater.
END RequestId: 5ba3ade5-545e-46f4-af5e-060c262ad81b
REPORT RequestId: 5ba3ade5-545e-46f4-af5e-060c262ad81b	Duration: 8.07 ms	Billed Duration: 100 ms	Memory Size: 1024 MB	Max Memory Used: 76 MB	Init Duration: 161.29 ms

XRAY TraceId: 1-5d834032-83ac2bc8de6fbba4897883b4	SegmentId: 1d243d3e092ea172	Sampled: false
```

`-l` means getting logs.

# Update the function

1. Change the function content
2. Deploy the stack
3. Change the function again
4. Deploy the function without deploying the entire stack

## Change the function content

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
        message: 'First update.',
        input: event,
      },
      null,
      2
    ),
  };
};
```

Return message is changed to `First update`.

## Deploy the stack

```bash
$ sls deploy -v
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service hello-world-nodejs.zip file to S3 (314 B)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
...
```

It took about a minute.

Now we're gonna invoke the function.

```bash
$ sls invoke -f hello -l
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"First update.\",\n  \"input\": {}\n}"
}
--------------------------------------------------------------------
START RequestId: 8101dee5-ac06-4a07-b532-6afa3ede24eb Version: $LATEST
2019-09-19 17:53:22.966 (+09:00)	8101dee5-ac06-4a07-b532-6afa3ede24eb	INFO	I am datalater.
END RequestId: 8101dee5-ac06-4a07-b532-6afa3ede24eb
REPORT RequestId: 8101dee5-ac06-4a07-b532-6afa3ede24eb	Duration: 8.03 ms	Billed Duration: 100 ms	Memory Size: 1024 MB	Max Memory Used: 75 MB	Init Duration: 163.69 ms

XRAY TraceId: 1-5d834202-761ce1f66feedf41831bd276	SegmentId: 62ed604526bc0c1b	Sampled: false
```

You can see the message saying `First update`.

## Change the function again

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
        message: 'Second update.',
        input: event,
      },
      null,
      2
    ),
  };
};
``` 

## Deploy the function alone

```bash
$ sls deploy function -f hello
Serverless: Packaging function: hello...
Serverless: Excluding development dependencies...
Serverless: Uploading function: hello (314 B)...
Serverless: Successfully deployed function: hello
Serverless: Successfully updated function: hello
```

It took about 2 seconds.

We'll gonna invoke the function.

```bash
$ sls invoke -f hello -l
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Second update.\",\n  \"input\": {}\n}"
}
--------------------------------------------------------------------
START RequestId: 5b369716-dfb7-49ad-afa1-c31a72a1e38d Version: $LATEST
2019-09-19 17:57:44.541 (+09:00)	5b369716-dfb7-49ad-afa1-c31a72a1e38d	INFO	I am datalater.
END RequestId: 5b369716-dfb7-49ad-afa1-c31a72a1e38d
REPORT RequestId: 5b369716-dfb7-49ad-afa1-c31a72a1e38d	Duration: 8.47 ms	Billed Duration: 100 ms	Memory Size: 1024 MB	Max Memory Used: 75 MB	Init Duration: 173.03 ms

XRAY TraceId: 1-5d834308-b083a873656bec96d9a90d41	SegmentId: 493db5d8187cb43d	Sampled: false
```

You can confirm `Second update`.

When you first create the first stack, you have to deploy the entire stack. Then you can only deploy the function, unless you change your stack.


