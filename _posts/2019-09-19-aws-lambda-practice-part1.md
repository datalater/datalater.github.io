---
layout: post
title: "AWS Lambda 실습 Part.1 Setting up AWS and serverless framework"
date: 2019-09-19 16:41:06 +0900
update: 2019-09-19 17:07:41 +0900
categories: ['aws', 'serverless']
published: false
---

* TOC
{:toc}

# Reference

[Udemy AWS Lambda Serverless](https://www.udemy.com/aws-lambda-serverless)

# Installing Serverless

1. Install dependencies (node & AWS CLI)
2. Install the serverless framework
3. Setting up AWS for the `serverless-admin` user
4. Download credentials on your machine
5. Setup Serverless to use these credentials

## Install node

[Download node](https://nodejs.org/en/)

## Install the serverless framework

```bash
$ npm install -g serverless
```

## Setting up AWS & Download credentials & Setup Serverless to use the credentials

1. go to `aws.amazon.com`
2. go to `Services > IAM > Users > Add user`
3. Set user details
    * User name: serverless-admin
    * Access type: check `Programmatic access`
    * Click `Next`
4. Set permissions
    * Click `Attach existing policies directly`
    * Check `AdministratorAccess`
    * Click `Next`
5. Review
    * Click `Create user`
6. Complete
    * Click `Download.csv`
    * Copy `Access key ID` and `Secret access key`

Go to terminal.

```bash
$ serverless config credentials --provider aws ---key [Access key ID] --secret [Secret access key] --profile serverless-admin
Serverless: Setting up AWS...
```

Done.
