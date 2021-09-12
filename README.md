# NTUEE_Plus_website

## Run

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

## GCP

```bash
# in the cloud shell
$ gcloud builds submit
```

> This will take 5~15 mins, depends on whether package.json was changed. If package wasn't changed, cache will be used; Otherwise, yarn install will take a lot of time.
> After deployment finish, open [website](https://eeplus-jflswz6uxq-de.a.run.app/#/contact)
