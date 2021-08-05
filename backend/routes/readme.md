<a name="top"></a>

# EEplus website api v1.0.0

EE+ api 文件

- [In/abroadInfo](#inabroadinfo)
  - [刪除資料](#刪除資料)
  - [更新一筆 AbroadInfo 資料](#更新一筆abroadinfo資料)
  - [拿 AbroadInfo 資料](#拿abroadinfo資料)
  - [添加一筆 AbroadInfo 資料](#添加一筆abroadinfo資料)
- [In/account](#inaccount)
  - [重設密碼](#重設密碼)
  - [顯示帳號私人資訊](#顯示帳號私人資訊)
- [In/auth](#inauth)
  - [刪除用戶](#刪除用戶)
  - [身分驗證](#身分驗證)
  - [查看待核可帳號](#查看待核可帳號)
  - [新增、刪除管理員](#新增、刪除管理員)
  - [檢視用戶](#檢視用戶)
- [In/career](#incareer)
  - [刪除職缺](#刪除職缺)
  - [更新職缺](#更新職缺)
  - [尋找職缺](#尋找職缺)
  - [新增職缺](#新增職缺)
  - [顯示我建立的職缺](#顯示我建立的職缺)
  - [顯示所有職缺](#顯示所有職缺)
- [In/column](#incolumn)
  - [存 column 照片](#存column照片)
  - [拿 column 照片](#拿column照片)
  - [拿 Detail 資料](#拿detail資料)
  - [拿 Outline 資料](#拿outline資料)
  - [管理員新增文章](#管理員新增文章)
  - [hashtag 關鍵字查詢](#hashtag關鍵字查詢)
- [In/profile](#inprofile)
  - [更新 porfile](#更新porfile)
  - [搜尋 porfile](#搜尋porfile)
  - [顯示個人 profile](#顯示個人profile)
- [In/profile_new](#inprofile_new)
  - [更新 porfile](#更新porfile)
  - [搜尋 porfile(or)](<#搜尋porfile(or)>)
  - [顯示個人 profile](#顯示個人profile)
- [In/recommendation](#inrecommendation)
  - [刪除簡歷](#刪除簡歷)
  - [更新簡歷](#更新簡歷)
  - [搜尋簡歷](#搜尋簡歷)
  - [新增簡歷](#新增簡歷)
  - [顯示我建立的簡歷](#顯示我建立的簡歷)
- [In/study](#instudy)
  - [拿取本年表單連結](#拿取本年表單連結)
  - [配對](#配對)
  - [寄配對通知](#寄配對通知)
  - [新增本年表單連結](#新增本年表單連結)
- [Out/account](#outaccount)
  - [isLogin](#islogin)
  - [login](#login)
  - [loginFB](#loginfb)
  - [logout](#logout)
  - [register](#register)
  - [registerFB](#registerfb)
- [Out/forget](#outforget)
  - [activation](#activation)
  - [forget](#forget)
- [Test](#test)
  - [testClient](#testclient)
  - [testRoute](#testroute)

---

# In/abroadInfo

## 刪除資料

[Back to top](#top)

```
DELETE /deleteAbroadInfo
```

### Parameters - `Parameter`

| Name | Type     | Description |
| ---- | -------- | ----------- |
| \_id | `String` | 要刪除的    |

### Success response

#### Success response - `200`

| Name | Type | Description |
| ---- | ---- | ----------- |
| data |      | 刪除        |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 更新一筆 AbroadInfo 資料

[Back to top](#top)

```
POST /updateAbroadInfo
```

### Parameters - `Parameter`

| Name  | Type     | Description    |
| ----- | -------- | -------------- |
| title | `String` | 學校名稱       |
| info  | `String` | 學校資料超連結 |
| file  | `File`   | 學校校徽       |

### Success response

#### Success response - `200`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      |             |

### Error response

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料不存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 拿 AbroadInfo 資料

[Back to top](#top)

```
POST /getAbroadInfo
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[{
    iconSrc:string
    title:string
    info:string
}]
```

### Error response

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料不存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 添加一筆 AbroadInfo 資料

[Back to top](#top)

```
POST /addAbroadInfo
```

### Parameters - `Parameter`

| Name  | Type     | Description    |
| ----- | -------- | -------------- |
| title | `String` | 學校名稱       |
| info  | `String` | 學校資料超連結 |
| file  | `File`   | 學校校徽       |

### Success response

#### Success response - `201`

| Name  | Type     | Description   |
| ----- | -------- | ------------- |
| title | `String` | post 的 title |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# In/account

## 重設密碼

[Back to top](#top)

重設密碼

```
POST /chPassword
```

### Parameters - `Parameter`

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| oldPsw | `String` | 原本密碼    |
| newPsw | `String` | 新密碼      |

### Success response

#### Success response - `204`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      |             |

### Error response

#### Error response - `401`

| Name        | Type     | Description  |
| ----------- | -------- | ------------ |
| description | `String` | 原始密碼錯誤 |

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 帳號不存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 顯示帳號私人資訊

[Back to top](#top)

```
POST /showPersonal
```

### Success response

#### Success response - `201`

| Name     | Type | Description |
| -------- | ---- | ----------- |
| username |      | 使用者名字  |
| account  |      | 使用者學號  |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# In/auth

## 刪除用戶

[Back to top](#top)

刪除用戶

```
POST /delUser
```

### Parameters - `Parameter`

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| account | `String` | 帳號        |

### Success response

#### Success response - `200`

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| account | `String` | account     |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 身分驗證

[Back to top](#top)

身分驗證

```
POST /handlePending
```

### Parameters - `Parameter`

| Name       | Type      | Description    |
| ---------- | --------- | -------------- |
| account    | `String`  | 學號           |
| acceptUser | `Boolean` | 是否接受此用戶 |

### Success response

#### Success response - `204`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      |             |

### Error response

#### Error response - `404`

| Name        | Type     | Description    |
| ----------- | -------- | -------------- |
| description | `String` | user not found |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 查看待核可帳號

[Back to top](#top)

查看待核可帳號

```
POST /showPending
```

### Parameters - `Parameter`

| Name | Type | Description |
| ---- | ---- | ----------- |
| x    | `x`  | x           |

### Success response

#### Success response - `200`

| Name           | Type       | Description |
| -------------- | ---------- | ----------- |
| pendings       | `Object[]` | 各個帳號    |
| &ensp;username | `String`   | 名字        |
| &ensp;account  | `String`   | 學號        |
| &ensp;email    | `String`   | 信箱        |
| &ensp;imgSrc   | `String`   | 證件照      |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 新增、刪除管理員

[Back to top](#top)

新增、刪除管理員

```
POST /manageAuth
```

### Parameters - `Parameter`

| Name    | Type      | Description                                       |
| ------- | --------- | ------------------------------------------------- |
| account | `String`  | 學號                                              |
| setAuth | `Boolean` | true:加成管理員；false:從管理員移除(可以移除自己) |

### Success response

#### Success response - `204`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      |             |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 檢視用戶

[Back to top](#top)

檢視用戶

```
POST /showUser
```

### Parameters - `Parameter`

| Name    | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| account | `String` | 帳號(optional)，用 b0790xxxx 模糊搜尋 |

### Success response

#### Success response - `200`

| Name           | Type       | Description             |
| -------------- | ---------- | ----------------------- |
| users          | `Object[]` | 各個帳號                |
| &ensp;username | `String`   | 名字                    |
| &ensp;account  | `String`   | 學號                    |
| &ensp;email    | `String`   | 信箱                    |
| &ensp;imgSrc   | `String`   | 證件照                  |
| &ensp;\_id     | `String`   | 帳號 ID，暫不要顯示出來 |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# In/career

## 刪除職缺

[Back to top](#top)

```
DELETE /deleteRecruitment
```

### Parameters - `Parameter`

| Name | Type     | Description               |
| ---- | -------- | ------------------------- |
| \_id | `String` | 要刪除職缺的 mongodb \_id |

### Success response

#### Success response - `200`

| Name | Type | Description  |
| ---- | ---- | ------------ |
| data |      | 刪除職缺標題 |

### Error response

#### Error response - `403`

| Name        | Type     | Description                        |
| ----------- | -------- | ---------------------------------- |
| description | `String` | 沒有權限(僅建立者與管理員可以刪除) |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 更新職缺

[Back to top](#top)

```
PATCH /recruitment
```

### Header examples

header-config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name         | Type       | Description                   |
| ------------ | ---------- | ----------------------------- |
| \_id         | `String`   | 要更新職缺的 mongodb \_id     |
| title        | `String`   | 職缺標題(optional)            |
| company_name | `String`   | 公司名稱(optional)            |
| work_type    | `String`   | 職位(ex.前端工程師)(optional) |
| salary       | `String`   | 薪資(optional)                |
| experience   | `String[]` | 經驗要求(optional)            |
| diploma      | `String`   | 學系要求(optional)            |
| requirement  | `String[]` | 技能要求(optional)            |
| description  | `String[]` | 其他描述(optional)            |
| file         | `File`     | 照片(optional)                |

### Success response

#### Success response - `203`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      | <li></li>   |

### Error response

#### Error response - `403`

| Name        | Type     | Description                    |
| ----------- | -------- | ------------------------------ |
| description | `String` | unauthorized(僅建立者可以更新) |

#### Error response - `404`

| Name        | Type     | Description     |
| ----------- | -------- | --------------- |
| description | `String` | \_id not exists |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 尋找職缺

[Back to top](#top)

```
POST /searchRecruitment
```

### Parameters - `Parameter`

| Name         | Type     | Description         |
| ------------ | -------- | ------------------- |
| \_id         | `String` | \_id (optional)     |
| account      | `String` | 學號 (optional)     |
| title        | `String` | 職缺標題 (optional) |
| company_name | `String` | 公司名稱 (optional) |
| work_type    | `String` | 職位 (optional)     |
| salary       | `String` | 薪資 (optional)     |
| experience   | `String` | 經驗要求 (optional) |
| diploma      | `String` | 學系要求 (optional) |
| requirement  | `String` | 技能要求 (optional) |
| description  | `String` | 其他描述 (optional) |

### Success response example

#### Success response example - `Success-Response:`

```json
	HTTP/1.1 201 Created
	[{
     _id: String,
		title: {
         title: String,
         company_name: String,
         work_type: String
     },
     info: {
            salary: String,
            experience: String,
            diploma: String
     },
		spec: {
            requirement: String,
            description: String
     },
        image: String
	},...]
```

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 新增職缺

[Back to top](#top)

```
POST /addRecruitment
```

### Header examples

header-config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name         | Type       | Description         |
| ------------ | ---------- | ------------------- |
| title        | `String`   | 職缺標題            |
| company_name | `String`   | 公司名稱            |
| work_type    | `String`   | 職位(ex.前端工程師) |
| salary       | `String`   | 薪資                |
| experience   | `String[]` | 經驗要求            |
| diploma      | `String`   | 學系要求            |
| requirement  | `String[]` | 技能要求            |
| description  | `String[]` | 其他描述            |
| file         | `File`     | 照片                |

### Success response

#### Success response - `201`

| Name | Type | Description                         |
| ---- | ---- | ----------------------------------- |
| data |      | 職缺標題                            |
| \_id |      | 職缺\_id(用來 search,update,delete) |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 顯示我建立的職缺

[Back to top](#top)

```
GET /recruitment
```

### Success response

#### Success response - `201`

| Name                     | Type       | Description                                         |
| ------------------------ | ---------- | --------------------------------------------------- |
| -                        | `Object[]` | 職缺們                                              |
| &ensp;\_id               | `String`   | mongodb \_id(for delete)                            |
| &ensp;title              | `Object`   | 標題相關                                            |
| &ensp;&ensp;title        | `String`   | 標題                                                |
| &ensp;&ensp;company_name | `String`   | 公司名稱                                            |
| &ensp;&ensp;work_type    | `String`   | 職位(ex.前端工程師)                                 |
| &ensp;info               | `Object`   | 工作資訊                                            |
| &ensp;&ensp;salary       | `String`   | 薪資                                                |
| &ensp;&ensp;experience   | `String[]` | 經驗要求                                            |
| &ensp;&ensp;diploma      | `String`   | 學院要求                                            |
| &ensp;spec               | `Object`   | 詳細描述                                            |
| &ensp;&ensp;requirement  | `String[]` | 技能要求                                            |
| &ensp;&ensp;description  | `String[]` | 工作的其他描述                                      |
| &ensp;image              | `String`   | 公司頭像(Ex. <code>&lt;img src={image}/&gt;</code>) |

### Error response

#### Error response - `403`

| Name | Type     | Description |
| ---- | -------- | ----------- |
| -    | `String` | not login   |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 顯示所有職缺

[Back to top](#top)

```
POST /showRecruitment
```

### Success response

#### Success response - `201`

| Name                     | Type       | Description                                         |
| ------------------------ | ---------- | --------------------------------------------------- |
| -                        | `Object[]` | 職缺們                                              |
| &ensp;\_id               | `String`   | mongodb \_id(for delete)                            |
| &ensp;title              | `Object`   | 標題相關                                            |
| &ensp;&ensp;title        | `String`   | 標題                                                |
| &ensp;&ensp;company_name | `String`   | 公司名稱                                            |
| &ensp;&ensp;work_type    | `String`   | 職位(ex.前端工程師)                                 |
| &ensp;info               | `Object`   | 工作資訊                                            |
| &ensp;&ensp;salary       | `String`   | 薪資                                                |
| &ensp;&ensp;experience   | `String[]` | 經驗要求                                            |
| &ensp;&ensp;diploma      | `String`   | 學院要求                                            |
| &ensp;spec               | `Object`   | 詳細描述                                            |
| &ensp;&ensp;requirement  | `String[]` | 技能要求                                            |
| &ensp;&ensp;description  | `String[]` | 工作的其他描述                                      |
| &ensp;image              | `String`   | 公司頭像(Ex. <code>&lt;img src={image}/&gt;</code>) |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# In/column

## 存 column 照片

[Back to top](#top)

```
POST /addImg
```

### Header examples

config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| filename | `String` | 檔名        |
| file     | `String` | 照片檔      |

### Success response

#### Success response - `204`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      |             |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 拿 column 照片

[Back to top](#top)

```
POST /getImg
```

### Parameters - `Parameter`

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| filename | `String` | 檔名        |

### Success response

#### Success response - `201`

| Name | Type | Description                                       |
| ---- | ---- | ------------------------------------------------- |
| data |      | 照片 url(Ex. <code>&lt;img src={url}/&gt;</code>) |

### Error response

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 照片不存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 拿 Detail 資料

[Back to top](#top)

```
POST /getDetail
```

### Parameters - `Parameter`

| Name | Type     | Description |
| ---- | -------- | ----------- |
| id   | `String` | column_yymm |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	title:String
	hashtag:String
	sections:[{
		bigtitle:String,
		sections:[{
			title:String,
			section:String
		}]
	}]
	annotation:["特別感謝:...","撰寫:...","校稿:...",...]
	id:["column_yymm"]
}
```

### Error response

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 找不到資料  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 拿 Outline 資料

[Back to top](#top)

```
POST /getOutline
```

### Parameters - `Parameter`

| Name | Type                   | Description |
| ---- | ---------------------- | ----------- |
| -    | `<ul> <li></li> </ul>` | <li></li>   |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
	filename:["yymm"]
	anno:["作者1 作者2 作者3...","| yyyy/mm/dd 星期x"]
	title:["yyyy級 採訪者姓名 (目前職位)"...]
	exp:["採訪者姓名 現任:目前職位"...]
	edu:["採訪者姓名 學士/碩士/博士:....(畢業年分)",...]
	intro:["內文段落1","內文段落2"...]
	id:["Column_Block_yymm"]
}
```

### Error response

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 找不到資料  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 管理員新增文章

[Back to top](#top)

```
POST /addColumn
```

### Parameters - `Parameter`

| Name                | Type        | Description                                                                |
| ------------------- | ----------- | -------------------------------------------------------------------------- | ------------------- |
| title               | `String[]`  | 文章標題 (xxxx 級 xxx (公司名稱與職位))                                    |
| detail_id           | `String`    | 文章在 column_details 的編號 (column_yymm)                                 |
| hashtags            | `String[]`  | 文章的 hashtag (文章類別，訪問者姓名、級別、工作、相關組織與企業)          |
| sections            | `Object[]`  |                                                                            |
| &ensp;bigtitle      | `String`    | (一、標題，二、求學階段...)                                                |
| &ensp;sections      | `Object[]`  |                                                                            |
| &ensp;&ensp;title   | `String`    | (各 bigtitle 的小主題)                                                     |
| &ensp;&ensp;section | `String`    | (文章內容)                                                                 |
| annotation          | `String[]`  | 參與人員 (工作:人員)                                                       |
| filename            | `String`    | (yymm)                                                                     |
| anno                | `String[2]` | ([所有採訪人員姓名,                                                        | yyyy/mm/dd 星期 x]) |
| exp                 | `String[]`  | 採訪者的姓名與現任職位                                                     |
| edu                 | `String[]`  | 採訪者的學歷 (學士:校系(畢業年分) 碩士:校系(畢業年分) 博士:校系(畢業年分)) |
| intro               | `String[]`  | 簡介 (1 個 element 是一段)                                                 |
| outline_id          | `String`    | 文章在 column_outlines 的 id (Column_Block_yymm)                           |

### Parameters examples

`js` - Input-Example:

```js
let input=new FormData()

input.append("file", 採訪合照)
input.append("title", "2008級 方劭云（當屆最年輕升遷副教授）")
input.append("detail_id", "column_yymm")
input.append("hashtags[0]", 關鍵字1)
input.append("hashtags[1]", 關鍵字2) ...
input.append("annotation[0]", "特別感謝:...")
input.append("annotation[1]", "撰寫:...") ...
input.append("anno[0]", "作者1 作者2 ...")
input.append("anno[1]", "| yyyy/mm/dd 星期x")
input.append("exp[0]", "現任：國立臺灣科技大學電機系 副教授") ...
input.append("edu[0]", "博士：台灣大學電子所  (2013)") ...
input.append("intro[0]", "2008畢業於台大電機，目前任職於臺灣科技大學的方劭云教授...") ...
input.append("outline_id", "Column_Block_yymm")

input.append("sections[0][bigtitle]", "一、我的大學生涯")
input.append("sections[0][sections][0][title]", "球隊與課業交織的辛苦大學生活")
input.append("sections[0][sections][0][section]", "因為我是排球校隊，沒能花很多時間在系上...")
input.append("sections[0][sections][1][title]", "求學生涯印象最深刻的事")
input.append("sections[0][sections][1][section]", "雖然有嘗試做過專題，但一直到大四要推甄的時候我還是很徬徨...")
input.append("sections[0][sections][2...][title/section]", ...)

input.append("sections[1][bigtitle]", "二、攻讀碩士博士")
input.append("sections[1][sections][0][title]", "漫長的研究所生涯")
input.append("sections[1][sections][0][section]", "我讀完一年碩士之後就直升攻讀博士，再花四年拿到博士學位...")
input.append("sections[1][sections][1...][title/section]", ...)
...

axios.post("/api/addColumn", input, {headers:{'content-type': 'multipart/form-data'}})
```

### Success response

#### Success response - `201`

| Name     | Type     | Description      |
| -------- | -------- | ---------------- |
| title    | `String` | post 的 title    |
| filename | `String` | post 的 filename |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## hashtag 關鍵字查詢

[Back to top](#top)

```
POST /column/search
```

### Parameters - `Parameter`

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| keyword | `String` |             |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[{
	title:String
	hashtag:String
	sections:[{
		bigtitle:String,
		sections:[{
			title:String,
			section:String
		}]
	}]
	annotation:["特別感謝:...","撰寫:...","校稿:...",...]
	id:["column_yymm"]
},...]
```

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# In/profile

## 更新 porfile

[Back to top](#top)

```
POST /chVisual
```

### Header examples

header-config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name               | Type       | Description                                     |
| ------------------ | ---------- | ----------------------------------------------- |
| userimage          | `File`     | 大頭貼                                          |
| account            | `Obejct`   | 學號(可以只有 show 或 data)                     |
| &ensp;data         | `String`   | 學號(或用'account.data')                        |
| &ensp;show         | `Boolean`  | 是否顯示學號(或用'account.show')                |
| username           | `Object`   | 名字 {show,data}                                |
| nickname           | `Object`   | 綽號 {show,data}                                |
| profile            | `Object`   | 自介 {show,data}                                |
| publicEmail        | `Object`   | 公開信相 {show,data}                            |
| office             | `Object`   | 公司電話 {show,data}                            |
| homephone          | `Object`   | 家裡電話 {show,data}                            |
| cellphone          | `Object`   | 手機 {show,data}                                |
| CC                 | `Object`   | city and country {show,data}                    |
| web                | `Object`   | 個人部落格 {show,data}                          |
| facebook           | `Object`   | facebook {show,data}                            |
| Linkedin           | `Object`   | Linkedin {show,data}                            |
| education          | `Object`   | 學位                                            |
| &ensp;major        | `Object`   | 主修                                            |
| &ensp;&ensp;show   | `Boolean`  | 是否顯示(或用'education.major.show')            |
| &ensp;&ensp;SD     | `String`   | school and department(或用'education.major.SD') |
| &ensp;&ensp;Note   | `String`   | 備註(或用'education.major.Note')                |
| &ensp;double_major | `Object`   | 雙主修 {show,SD,Note}                           |
| &ensp;minor        | `Object`   | 輔修 {show,SD,Note}                             |
| &ensp;master       | `Object`   | 碩士 {show,SD,Note}                             |
| &ensp;doctor       | `Object`   | 博士 {show,SD,Note}                             |
| Occupation         | `Object[]` | 工作(因為 array 運算複雜，請直接給我完整的覆蓋) |
| &ensp;show         | `Boolean`  | 是否顯示                                        |
| &ensp;C            | `String`   | 公司                                            |
| &ensp;O            | `String`   | 部門                                            |
| &ensp;P            | `String`   | 職位                                            |

### Success response

#### Success response - `204`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      |             |

### Error response

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 帳號不存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 搜尋 porfile

[Back to top](#top)

```
POST /searchVisual
```

### Parameters - `Parameter`

| Name               | Type     | Description                             |
| ------------------ | -------- | --------------------------------------- |
| account            | `String` | 學號(用'x'進行模糊搜尋, ex.'b079010xx') |
| username           | `String` | 名字                                    |
| nickname           | `String` | 綽號                                    |
| profile            | `String` | 自介                                    |
| publicEmail        | `String` | 公開信相                                |
| office             | `String` | 公司電話                                |
| homephone          | `String` | 家裡電話                                |
| cellphone          | `String` | 手機                                    |
| CC                 | `String` | city and country                        |
| web                | `String` | 個人部落格                              |
| facebook           | `String` | facebook                                |
| Linkedin           | `String` | Linkedin                                |
| education          | `Object` | 學位                                    |
| &ensp;major        | `String` | 主修(或者'education.major')             |
| &ensp;double_major | `String` | 雙主修(或者'education.double_major')    |
| &ensp;minor        | `String` | 輔修(或者'education.minor')             |
| &ensp;master       | `String` | 碩士(或者'education.master')            |
| &ensp;doctor       | `String` | 博士(或者'education.doctor')            |
| Occupation         | `Object` | 工作(COP3 個中也可以只填 1 個或 2 個)   |
| &ensp;C            | `String` | 公司                                    |
| &ensp;O            | `String` | 部門                                    |
| &ensp;P            | `String` | 職位                                    |

### Success response

#### Success response - `201`

| Name                     | Type       | Description                                           |
| ------------------------ | ---------- | ----------------------------------------------------- |
| data                     | `Object[]` | Visual 資料(請用 res.data.data 拿到)                  |
| &ensp;userimage          | `String`   | 大頭貼(使用<code>&lt;img src={userimage}/&gt;</code>) |
| &ensp;account            | `String`   | 學號                                                  |
| &ensp;username           | `String`   | 名字                                                  |
| &ensp;nickname           | `String`   | 綽號                                                  |
| &ensp;profile            | `String`   | 自介                                                  |
| &ensp;publicEmail        | `String`   | 公開信相                                              |
| &ensp;office             | `String`   | 公司電話                                              |
| &ensp;homephone          | `String`   | 家裡電話                                              |
| &ensp;cellphone          | `String`   | 手機                                                  |
| &ensp;CC                 | `String`   | city and country                                      |
| &ensp;web                | `String`   | 個人部落格                                            |
| &ensp;facebook           | `String`   | facebook                                              |
| &ensp;Linkedin           | `String`   | Linkedin                                              |
| &ensp;education          | `Object`   | 學位                                                  |
| &ensp;&ensp;major        | `Object`   | 學士                                                  |
| &ensp;&ensp;&ensp;SD     | `String`   | school and department 學校&amp;系                     |
| &ensp;&ensp;&ensp;Note   | `String`   | 備註, ex.在學、畢業                                   |
| &ensp;&ensp;double_major | `Object`   | 雙主修 {SD,Note}                                      |
| &ensp;&ensp;minor        | `Object`   | 輔系 {SD,Note}                                        |
| &ensp;&ensp;master       | `Object`   | 碩士 {SD,Note}                                        |
| &ensp;&ensp;doctor       | `Object`   | 博士 {SD,Note}                                        |
| &ensp;Occupation         | `Object[]` | 職業                                                  |
| &ensp;&ensp;C            | `String`   | 公司()                                                |
| &ensp;&ensp;O            | `String`   | 部門                                                  |
| &ensp;&ensp;P            | `String`   | 職稱                                                  |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 顯示個人 profile

[Back to top](#top)

```
POST /showVisual
```

### Success response

#### Success response - `201`

| Name                     | Type       | Description                                           |
| ------------------------ | ---------- | ----------------------------------------------------- |
| data                     | `Object`   | Visual 資料(請用 res.data.data 拿到)                  |
| &ensp;userimage          | `String`   | 大頭貼(使用<code>&lt;img src={userimage}/&gt;</code>) |
| &ensp;account            | `Object`   | 學號 {data,show}                                      |
| &ensp;username           | `Object`   | 名字 {data,show}                                      |
| &ensp;nickname           | `Object`   | 綽號 {data,show}                                      |
| &ensp;profile            | `Object`   | 自介 {data,show}                                      |
| &ensp;publicEmail        | `Object`   | 公開信相 {data,show}                                  |
| &ensp;office             | `Object`   | 公司電話 {data,show}                                  |
| &ensp;homephone          | `Object`   | 家裡電話 {data,show}                                  |
| &ensp;cellphone          | `Object`   | 手機 {data,show}                                      |
| &ensp;CC                 | `Object`   | city and country {data,show}                          |
| &ensp;web                | `Object`   | 個人部落格 {data,show}                                |
| &ensp;facebook           | `Object`   | facebook {data,show}                                  |
| &ensp;Linkedin           | `Object`   | Linkedin {data,show}                                  |
| &ensp;education          | `Object`   | 學位                                                  |
| &ensp;&ensp;major        | `Object`   | 學士                                                  |
| &ensp;&ensp;&ensp;show   | `Boolean`  | 是否公開                                              |
| &ensp;&ensp;&ensp;SD     | `String`   | school and department 學校&amp;系                     |
| &ensp;&ensp;&ensp;Note   | `String`   | 備註, ex.在學、畢業                                   |
| &ensp;&ensp;double_major | `Object`   | 雙主修 {show,SD,Note}                                 |
| &ensp;&ensp;minor        | `Object`   | 輔系 {show,SD,Note}                                   |
| &ensp;&ensp;master       | `Object`   | 碩士 {show,SD,Note}                                   |
| &ensp;&ensp;doctor       | `Object`   | 博士 {show,SD,Note}                                   |
| &ensp;Occupation         | `Object[]` | 職業                                                  |
| &ensp;&ensp;show         | `Boolean`  | 是否顯示                                              |
| &ensp;&ensp;C            | `String`   | 公司                                                  |
| &ensp;&ensp;O            | `String`   | 部門                                                  |
| &ensp;&ensp;P            | `String`   | 職稱                                                  |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# In/profile_new

## 更新 porfile

[Back to top](#top)

```
PATCH /profile
```

### Header examples

header-config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name         | Type       | Description                                     |
| ------------ | ---------- | ----------------------------------------------- |
| userimage    | `File`     | 大頭貼                                          |
| username     | `String`   | 名字//account 禁止修改                          |
| nickname     | `String`   | 綽號                                            |
| profile      | `String`   | 自介                                            |
| publicEmail  | `String`   | 公開信相                                        |
| cellphone    | `String`   | 手機                                            |
| CC           | `String`   | city and country                                |
| web          | `String`   | 個人部落格                                      |
| facebook     | `String`   | facebook                                        |
| Linkedin     | `String`   | Linkedin                                        |
| major        | `String`   | 主修                                            |
| double_major | `String`   | 雙主修                                          |
| minor        | `String`   | 輔修                                            |
| master       | `String`   | 碩士                                            |
| doctor       | `String`   | 博士                                            |
| Occupation   | `Object[]` | 工作(因為 array 運算複雜，請直接給我完整的覆蓋) |
| &ensp;C      | `String`   | 公司，append('Occupation[${index}][c]',vlaue)   |
| &ensp;O      | `String`   | 部門，append('Occupation[${index}][o]',vlaue)   |
| &ensp;P      | `String`   | 職位，append('Occupation[${index}][p]',vlaue)   |

### Success response

#### Success response - `204`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      |             |

### Error response

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 帳號不存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 搜尋 porfile(or)

[Back to top](#top)

```
POST /searchProfile
```

### Parameters - `Parameter`

| Name         | Type     | Description                                                                    |
| ------------ | -------- | ------------------------------------------------------------------------------ |
| account      | `String` | 學號(用'x'進行模糊搜尋, ex.'b079010xx')                                        |
| username     | `String` | 名字                                                                           |
| nickname     | `String` | 綽號                                                                           |
| profile      | `String` | 自介                                                                           |
| publicEmail  | `String` | 公開信相                                                                       |
| cellphone    | `String` | 手機                                                                           |
| CC           | `String` | city and country                                                               |
| web          | `String` | 個人部落格                                                                     |
| facebook     | `String` | facebook                                                                       |
| Linkedin     | `String` | Linkedin                                                                       |
| major        | `Object` | 主修                                                                           |
| double_major | `String` | 雙主修                                                                         |
| minor        | `String` | 輔修                                                                           |
| master       | `String` | 碩士                                                                           |
| doctor       | `String` | 博士                                                                           |
| Occupation   | `Object` | 工作(這裡是 obj 不是 array 喔，會用 and 搜尋)(COP3 個中也可以只填 1 個或 2 個) |
| &ensp;C      | `String` | 公司                                                                           |
| &ensp;O      | `String` | 部門                                                                           |
| &ensp;P      | `String` | 職位                                                                           |

### Success response

#### Success response - `201`

| Name         | Type       | Description                                           |
| ------------ | ---------- | ----------------------------------------------------- |
| userimage    | `String`   | 大頭貼(使用<code>&lt;img src={userimage}/&gt;</code>) |
| account      | `String`   | 學號                                                  |
| username     | `String`   | 名字                                                  |
| nickname     | `String`   | 綽號                                                  |
| profile      | `String`   | 自介                                                  |
| publicEmail  | `String`   | 公開信相                                              |
| cellphone    | `String`   | 手機                                                  |
| CC           | `String`   | city and country                                      |
| web          | `String`   | 個人部落格                                            |
| facebook     | `String`   | facebook                                              |
| Linkedin     | `String`   | Linkedin                                              |
| major        | `String`   | 學士                                                  |
| double_major | `String`   | 雙主修                                                |
| minor        | `String`   | 輔系                                                  |
| master       | `String`   | 碩士                                                  |
| doctor       | `String`   | 博士                                                  |
| Occupation   | `Object[]` | 職業                                                  |
| &ensp;C      | `String`   | 公司                                                  |
| &ensp;O      | `String`   | 部門                                                  |
| &ensp;P      | `String`   | 職稱                                                  |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 顯示個人 profile

[Back to top](#top)

```
GET /profile
```

### Success response

#### Success response - `201`

| Name         | Type       | Description                                           |
| ------------ | ---------- | ----------------------------------------------------- |
| userimage    | `String`   | 大頭貼(使用<code>&lt;img src={userimage}/&gt;</code>) |
| account      | `String`   | 學號                                                  |
| username     | `String`   | 名字                                                  |
| nickname     | `String`   | 綽號                                                  |
| profile      | `String`   | 自介                                                  |
| publicEmail  | `String`   | 公開信相                                              |
| cellphone    | `String`   | 手機                                                  |
| CC           | `String`   | city and country                                      |
| web          | `String`   | 個人部落格                                            |
| facebook     | `String`   | facebook                                              |
| Linkedin     | `String`   | Linkedin                                              |
| major        | `String`   | 學士                                                  |
| double_major | `String`   | 雙主修                                                |
| minor        | `String`   | 輔系                                                  |
| master       | `String`   | 碩士                                                  |
| doctor       | `String`   | 博士                                                  |
| Occupation   | `Object[]` | 職業                                                  |
| &ensp;C      | `String`   | 公司                                                  |
| &ensp;O      | `String`   | 部門                                                  |
| &ensp;P      | `String`   | 職稱                                                  |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# In/recommendation

## 刪除簡歷

[Back to top](#top)

```
DELETE /recommendation
```

### Parameters - `Parameter`

| Name | Type     | Description             |
| ---- | -------- | ----------------------- |
| \_id | `String` | get 或 add 時回傳的\_id |

### Success response

#### Success response - `200`

| Name  | Type | Description |
| ----- | ---- | ----------- |
| title |      | title       |

### Error response

#### Error response - `403`

| Name        | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
| description | `String` | not valid \_id or account not match |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 更新簡歷

[Back to top](#top)

```
PATCH /recommendation
```

### Header examples

header-config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name             | Type       | Description             |
| ---------------- | ---------- | ----------------------- |
| \_id             | `String`   | get 或 add 時回傳的\_id |
| title            | `String`   | 簡歷標題                |
| name             | `String`   | 姓名                    |
| desire_work_type | `String`   | 想要職位                |
| contact          | `String`   | 電話                    |
| email            | `String`   | 信箱                    |
| diploma          | `String`   | 學位                    |
| experience       | `String[]` | 經驗                    |
| speciality       | `String[]` | 專長                    |
| file             | `File`     | 照片                    |

### Success response

#### Success response - `203`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      | <li></li>   |

### Error response

#### Error response - `403`

| Name        | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
| description | `String` | not valid \_id or account not match |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 搜尋簡歷

[Back to top](#top)

```
GET /recommendation
```

### Parameters - `Parameter`

| Name             | Type     | Description |
| ---------------- | -------- | ----------- |
| \_id             | `String` | \_id        |
| account          | `String` | 學號        |
| title            | `String` | 簡歷標題    |
| name             | `String` | 姓名        |
| desire_work_type | `String` | 想要職位    |
| contact          | `String` | 電話        |
| email            | `String` | 信箱        |
| diploma          | `String` | 學位        |
| experience       | `String` | 經驗        |
| speciality       | `String` | 專長        |

### Success response

#### Success response - `201`

| Name                         | Type       | Description                                     |
| ---------------------------- | ---------- | ----------------------------------------------- |
| -                            | `Object[]` | 簡歷們                                          |
| &ensp;\_id                   | `String`   | mongodb \_id(for update,delete)                 |
| &ensp;title                  | `Object`   | 標題相關                                        |
| &ensp;&ensp;title            | `String`   | 標題                                            |
| &ensp;&ensp;name             | `String`   | 名字                                            |
| &ensp;&ensp;desire_work_type | `String`   | 想要職位                                        |
| &ensp;info                   | `Object`   | 工作資訊                                        |
| &ensp;&ensp;contact          | `String`   | 電話                                            |
| &ensp;&ensp;email            | `String[]` | 信箱                                            |
| &ensp;&ensp;diploma          | `String`   | 學院                                            |
| &ensp;spec                   | `Object`   | 詳細描述                                        |
| &ensp;&ensp;experience       | `String[]` | 經驗                                            |
| &ensp;&ensp;speciality       | `String[]` | 專長                                            |
| &ensp;image                  | `String`   | 頭像(Ex. <code>&lt;img src={image}/&gt;</code>) |

### Error response

#### Error response - `403`

| Name | Type     | Description |
| ---- | -------- | ----------- |
| -    | `String` | not login   |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 新增簡歷

[Back to top](#top)

```
POST /recommendation
```

### Header examples

header-config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name             | Type       | Description |
| ---------------- | ---------- | ----------- |
| title            | `String`   | 簡歷標題    |
| name             | `String`   | 姓名        |
| desire_work_type | `String`   | 想要職位    |
| contact          | `String`   | 電話        |
| email            | `String`   | 信箱        |
| diploma          | `String`   | 學位        |
| experience       | `String[]` | 經驗        |
| speciality       | `String[]` | 專長        |
| file             | `File`     | 照片        |

### Success response

#### Success response - `201`

| Name  | Type | Description    |
| ----- | ---- | -------------- |
| title |      | 簡歷標題       |
| \_id  |      | mongoDB 的\_id |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 顯示我建立的簡歷

[Back to top](#top)

```
GET /recommendation/mine
```

### Success response

#### Success response - `201`

| Name                         | Type       | Description                                     |
| ---------------------------- | ---------- | ----------------------------------------------- |
| -                            | `Object[]` | 簡歷們                                          |
| &ensp;\_id                   | `String`   | mongodb \_id(for update,delete)                 |
| &ensp;title                  | `Object`   | 標題相關                                        |
| &ensp;&ensp;title            | `String`   | 標題                                            |
| &ensp;&ensp;name             | `String`   | 名字                                            |
| &ensp;&ensp;desire_work_type | `String`   | 想要職位                                        |
| &ensp;info                   | `Object`   | 工作資訊                                        |
| &ensp;&ensp;contact          | `String`   | 電話                                            |
| &ensp;&ensp;email            | `String`   | 信箱                                            |
| &ensp;&ensp;diploma          | `String`   | 學院                                            |
| &ensp;spec                   | `Object`   | 詳細描述                                        |
| &ensp;&ensp;experience       | `String[]` | 經驗                                            |
| &ensp;&ensp;speciality       | `String[]` | 專長                                            |
| &ensp;image                  | `String`   | 頭像(Ex. <code>&lt;img src={image}/&gt;</code>) |

### Error response

#### Error response - `403`

| Name | Type     | Description |
| ---- | -------- | ----------- |
| -    | `String` | not login   |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# In/study

## 拿取本年表單連結

[Back to top](#top)

拿取本年表單連結

```
GET /study/links
```

### Success response

#### Success response - `201`

| Name   | Type     | Description    |
| ------ | -------- | -------------- |
| senior | `String` | 學長姊表單連結 |
| junior | `String` | 學弟妹表單連結 |
| note   | `String` | 備註           |

### Error response

#### Error response - `404`

| Name        | Type     | Description         |
| ----------- | -------- | ------------------- |
| description | `String` | server not open yet |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## 配對

[Back to top](#top)

給學長姊跟學弟妹留學配對的.xlsx 檔，幫他們配對

```
POST /study_matching
```

### Header examples

config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name   | Type   | Description          |
| ------ | ------ | -------------------- |
| senior | `File` | 學長姐的 senior.xlsx |
| junior | `File` | 學弟妹的 junior.xlsx |

### Success response

#### Success response - `200`

| Name | Type   | Description |
| ---- | ------ | ----------- |
| -    | `File` | output.xlsx |

## 寄配對通知

[Back to top](#top)

給/study/matching 拿到的 output.xlsx 檔，並寄信

```
POST /study/sendmail
```

### Header examples

config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name   | Type   | Description              |
| ------ | ------ | ------------------------ |
| result | `File` | /study/match 產生的.xlsx |

### Success response

#### Success response - `203`

| Name   | Type       | Description          |
| ------ | ---------- | -------------------- |
| errors | `String[]` | 發生錯誤的寄件者姓名 |

## 新增本年表單連結

[Back to top](#top)

設定本年表單

```
POST /study/addLink
```

### Parameters - `Parameter`

| Name   | Type     | Description          |
| ------ | -------- | -------------------- |
| senior | `String` | 學長姊表單連結       |
| junior | `String` | 學弟妹表單連結       |
| note   | `String` | 備註(截止時間之類的) |

### Success response

#### Success response - `201`

| Name | Type     | Description |
| ---- | -------- | ----------- |
| x    | `String` | data stored |

### Error response

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# Out/account

## isLogin

[Back to top](#top)

檢查是否有登入

```
POST /isLogin
```

### Success response

#### Success response - `201`

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| account | `String` | 登入者學號  |

### Error response

#### Error response - `403`

| Name        | Type     | Description        |
| ----------- | -------- | ------------------ |
| description | `String` | &quot;未登入&quot; |

## login

[Back to top](#top)

登入

```
POST /login
```

### Parameters - `Parameter`

| Name     | Type     | Description              |
| -------- | -------- | ------------------------ |
| account  | `String` | 學號                     |
| password | `String` | 密碼(以後建議在前端加密) |

### Success response

#### Success response - `201`

| Name     | Type      | Description  |
| -------- | --------- | ------------ |
| username | `String`  | 登入者名字   |
| account  | `String`  | 登入者學號   |
| isAuth   | `Boolean` | 是否是管理員 |

### Error response

#### Error response - `401`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 密碼錯誤    |

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 帳號不存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## loginFB

[Back to top](#top)

登入 by facebook

```
POST /loginFB
```

### Parameters - `Parameter`

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| facebookID | `String` | facebook ID |

### Success response

#### Success response - `201`

| Name     | Type      | Description  |
| -------- | --------- | ------------ |
| username | `String`  | 登入者名字   |
| account  | `String`  | 學號         |
| isAuth   | `Boolean` | 是否是管理員 |

### Error response

#### Error response - `404`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 帳號不存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## logout

[Back to top](#top)

登出

```
POST /logout
```

### Success response

#### Success response - `204`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      |             |

### Error response

#### Error response - `500`

| Name        | Type     | Description                      |
| ----------- | -------- | -------------------------------- |
| description | `String` | &quot;session destroy 失敗&quot; |

## register

[Back to top](#top)

註冊(by 學號 &amp; email)，.env 設定 newReg=true 使用新註冊規則

```
POST /register
```

### Header examples

config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name            | Type     | Description              |
| --------------- | -------- | ------------------------ |
| account         | `String` | 學號                     |
| password        | `String` | 密碼(以後建議在前端加密) |
| ConfirmPassword | `String` | 二次密碼                 |
| username        | `String` | 使用者名字               |
| Email           | `String` | 信箱                     |
| file            | `File`   | 身分證明的照片           |

### Success response

#### Success response - `201`

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| username | `String` | 使用者名字  |

### Error response

#### Error response - `400`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 請添加照片  |

#### Error response - `403`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 帳號已存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## registerFB

[Back to top](#top)

註冊(by facebook ID)

```
POST /registerFB
```

### Header examples

config

```json
{ "content-type": "multipart/form-data" }
```

### Parameters - `Parameter`

| Name       | Type     | Description                                                   |
| ---------- | -------- | ------------------------------------------------------------- |
| facebookID | `String` | facebookID                                                    |
| account    | `String` | 學號                                                          |
| username   | `String` | 使用者名字                                                    |
| file       | `File`   | 身分證明的照片(如果 newRule=true 管理員認證好像可以不用照片?) |
| Email      | `String` | Email(newRule=true 才需要)                                    |

### Success response

#### Success response - `201`

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| username | `String` | 使用者名字  |

### Error response

#### Error response - `400`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 請添加照片  |

#### Error response - `403`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 帳號已存在  |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

# Out/forget

## activation

[Back to top](#top)

檢查激活碼，忘記密碼重設

```
POST /activation
```

### Parameters - `Parameter`

| Name     | Type     | Description              |
| -------- | -------- | ------------------------ |
| account  | `String` | 學號                     |
| active   | `String` | 激活碼(附在信箱的連結裡) |
| password | `String` | 要重設的密碼             |

### Success response

#### Success response - `200`

| Name | Type | Description |
| ---- | ---- | ----------- |
| -    |      |             |

### Error response

#### Error response - `401`

| Name        | Type     | Description    |
| ----------- | -------- | -------------- |
| description | `String` | 驗證碼已不存在 |

#### Error response - `500`

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| description | `String` | 資料庫錯誤  |

## forget

[Back to top](#top)

忘記密碼，寄信

```
POST /forget
```

### Parameters - `Parameter`

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| account | `String` | 學號        |

### Success response

#### Success response - `200`

| Name  | Type     | Description                                                   |
| ----- | -------- | ------------------------------------------------------------- |
| email | `String` | <li>使用者填寫的 email</li> <li>&quot;您的私人信箱&quot;</li> |

### Error response

#### Error response - `404`

| Name        | Type     | Description                                           |
| ----------- | -------- | ----------------------------------------------------- |
| description | `String` | <li>帳號不存在</li> <li>未設定信箱，請聯絡管理員</li> |

#### Error response - `500`

| Name        | Type     | Description                                                     |
| ----------- | -------- | --------------------------------------------------------------- |
| description | `String` | <li>資料庫錯誤</li> <li>信件範本讀取失敗</li> <li>寄信失敗</li> |

# Test

## testClient

[Back to top](#top)

前端的測試頁面，建議改用 postman 測試

```
GET /testClient
```

### Success response

#### Success response - `Success 200`

| Name | Type   | Description |
| ---- | ------ | ----------- |
| -    | `file` | 測試頁面    |

## testRoute

[Back to top](#top)

給定 post，回傳一樣的內容

```
POST /testRoute
```

### Parameters - `Parameter`

| Name | Type  | Description |
| ---- | ----- | ----------- |
| -    | `any` | 任何東西    |

### Success response

#### Success response - `Success 200`

| Name | Type  | Description    |
| ---- | ----- | -------------- |
| -    | `any` | 回傳一樣的內容 |
