# NTUEE_Plus_website

## Run

- get true .env from [here](https://drive.google.com/drive/folders/1sIbHwgsVmo1IHE-nc3OvVdYd3-haUc5N?usp=sharing)

```bash
# whenever new package is used.
yarn local-install

yarn dev
# 進入http://localhost:1993
```

## Contribution

please read [How to Contribute](https://github.com/NTUEE-PLUS/EndOfWeb/blob/main/doc/contribution.md) first.

## 前端 coding style 規則

> https://www.notion.so/Tidy-Up-Coding-style-de130c77c8654b61ba0e45c941b55ed4

## 後端/api 使用方法

> https://github.com/NTUEE-PLUS/EndOfWeb/tree/main/backend/routes

## EE+ MD

> https://hackmd.io/CSNbja7XTYCYquYxgq4Xow

## 會議記錄

> https://hackmd.io/7RZ9XyL7Qa-7aFXaZSfw_w

## Heroku

- visit the [website](https://eeplus.herokuapp.com/)

### env setting

- In heroku/settings, modify config vars

![image](https://github.com/Claude0311/EndOfWeb/blob/NTUEEPLUS-152/screenshot/heroku-arg.png)

## GCP

- visit the [website](https://eeplus-jflswz6uxq-de.a.run.app/#/contact)

### manual deploy

```bash
# in cloud shell
$ gcloud builds submit
```

- This will take 5~15 mins, depends on whether package.json was changed. If package wasn't changed, cache will be used; Otherwise, yarn install will take a lot of time.

### auto deploy (with secret .env)

1. set **trigger** in cloud build and add arg fields

   ![image](https://github.com/Claude0311/EndOfWeb/blob/NTUEEPLUS-152/screenshot/gcp-arg-step1.png)

2. In cloudbuild.yaml, use **--build-arg** to read args

   ![image](https://github.com/Claude0311/EndOfWeb/blob/NTUEEPLUS-152/screenshot/gcp-arg-step2.png)

3. In Dockerfile, use **ARG** and **ENV** to set env

   ![image](https://github.com/Claude0311/EndOfWeb/blob/NTUEEPLUS-152/screenshot/gcp-arg-step3.png)

4. If want to use .env in frontend, set **pulgin** in webpack.config.js

   ![image](https://github.com/Claude0311/EndOfWeb/blob/NTUEEPLUS-152/screenshot/gcp-arg-step4.png)
