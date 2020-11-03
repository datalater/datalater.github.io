---
layout: post
title: "AWS Lambda 실습 Part.4 Fetch logs"
date: 2019-09-19 18:02:20 +0900
update: 2019-09-19 18:26:52 +0900
categories: ['aws', 'serverless']
published: false
---

* TOC
{:toc}

# Reference

[Udemy AWS Lambda Serverless](https://www.udemy.com/aws-lambda-serverless)

# Fetching all logs of the function

* from AWS CloudWatch
* from CLI

## From AWS CloudWatch

* Go to `https://aws.amazon.com/cloudwatch/`.
* In sidebar, Go to `Logs`.
* Check any of `Log Streams`.

```text
2019-09-19
08:53:22
START RequestId: 8101dee5-ac06-4a07-b532-6afa3ede24eb Version: $LATEST
08:53:22
2019-09-19T08:53:22.966Z	8101dee5-ac06-4a07-b532-6afa3ede24eb	INFO	I am datalater.
08:53:22
END RequestId: 8101dee5-ac06-4a07-b532-6afa3ede24eb
08:53:22
REPORT RequestId: 8101dee5-ac06-4a07-b532-6afa3ede24eb	Duration: 8.03 ms	Billed Duration: 100 ms	Memory Size: 1024 MB	Max Memory Used: 75 MB	Init Duration: 163.69 ms	XRAY TraceId: 1-5d834202-761ce1f66feedf41831bd276	SegmentId: 62ed604526bc0c1b	Sampled: false
REPORT RequestId: 8101dee5-ac06-4a07-b532-6afa3ede24eb	Duration: 8.03 ms	Billed Duration: 100 ms	Memory Size: 1024 MB	Max Memory Used: 75 MB	Init Duration: 163.69 ms	
XRAY TraceId: 1-5d834202-761ce1f66feedf41831bd276	SegmentId: 62ed604526bc0c1b	Sampled: false	
```

You can see the log message `I am datalater` typed in the `handler.js`.

## From CLI

> [serverless docs - aws logs](https://serverless.com/framework/docs/providers/aws/cli-reference/logs/)

```bash
$ sls logs -f hello -t
```

`-t` means tail.

The lecturer showed the command is working, but, don't know why, it seems not working in my case. It does not output anyting but the command is in progress for a long time.

I found the solution from the issue [Tail on logs not working anymore](https://github.com/serverless/serverless/issues/5295).

```bash
$ sls logs -f hello -t --startTime 1h
```

`--startTime 1h` means logs for the last hour.

Now make a new tab in terminal and run the function. 

```bash
$ sls invoke -f hello -l
```

Then you can see a new log generated in the tab showing logs.
