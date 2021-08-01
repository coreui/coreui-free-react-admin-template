# NTUEE_Plus_website
## Run
首次執行
```bash
$ yarn install
$ yarn install-client
$ yarn dev
進入http://localhost:1993
```
前端人員(更改會透過webpack --watch自動重整)
```bash
$ yarn dev
```
後端人員
```bash
$ node index.js
或
$ yarn watch:server //nodemon即時更新
```
正式跑
```bash
$ yarn build-client
$ yarn start
```

## 前端coding style規則
> https://www.notion.so/Tidy-Up-Coding-style-de130c77c8654b61ba0e45c941b55ed4
## 後端/api 使用方法
> https://github.com/NTUEE-PLUS/NTUEE_Plus_website/tree/master/routes#top
## EE+ MD
> https://hackmd.io/CSNbja7XTYCYquYxgq4Xow

## 部員名單
(git練習請在此填入資料)
|姓名|組別|學號|git帳號|JS|react|bootstrap|express|mongoose|
|---|---|---|---|---|---|---|---|---|
|巫竑儒|---|b09901072|vwvwMM|X|X|X|X|X|
|王友廷|前端|b08901072|noidname01|V|V|V|X|X|
|陳君輔|後端|b07901029|Claude0311|V|X|X|V|V|
|葉星宏|-|b08901015|sab93667|X|X|X|X|X|
|崔翰清||b09901031|hackhaha1|V|X|X|X|X|
|郭宇誠|後端|b09901107|Yu-Cheng-Kuo|X|X|X|X|X|

### 1109 進度 by 沒什麼考試的君輔
* email使用template：jsDOM讀取html模板，並用jquery變更特定element，詳細可參考forget/mail
* 有空可以請前端的人刻responsive email模板
* 把file/validation/mail這些之後應該很常重複用到的東西都放到middleware，然後寫了點JS Documentation Standards

### 1026 進度 by 君輔
* searchVisual新增valid，驗證學號長度
* searchVisual的account允許模糊搜尋，輸入b079010xx可找到b07901029,b07901014,...，希望沒啥資安問題

### 1013 進度 by 維恩
* 將網頁上大的圖片從git刪掉（主要是人的照片），並用imgur存起來，client/src/images裡每個資料夾有一個json檔存有全部的連結（包括所有圖片）
* 修改前端使用到這些圖片的js檔（更改import的檔案及變數名稱）
* client/src/images裡有我用來抓取imgur api的js檔

### 0831 進度 by 君輔
* 發現前端用async會噴bug，因為webpack沒設定好的樣子(待更改)
* 改變forget方式
	1. 在forget頁面輸入學號會寄信到profile中設定的信箱
	2. 點擊連結進入改密碼頁面
	3. 改完密碼檢驗驗證碼、學號和資料庫是否吻合，吻合則覆蓋密碼

	* 待修正：
		* user login change
		* 修改密碼頁面
		
### 0919 進度 by 建琁
* column新增2001內容。

### 0827 進度 by 君輔
* 在branch webpack用webpack --watch打包前端檔案，npm run dev當檔案改動網頁會同步更新(要refresh)
* forget的mail改成'"台大電機系系學會EEPlus" <ntueeplus2020@gmail.com>'，且應該會正常顯示名字
* 發現一個嚴重的bug是只要知道學號，因為Q defalut是hello world，就能用forget改別人密碼(再改)
	* 解決方案：把login schemas裡的question default刪掉(當初好像是為了讓大家測試)，要設安全問題的必須登入後自己加

### 0824 進度 by 建琁
* 調整Support字體大小和margin top。

### 0817 進度 by 君輔
* 把Auth統一管理，master裡不判定(呼叫next)，beta裡會return{description:請登入}

### 0811 進度 by 君輔
* 新增beta branch

### 0803 進度 by 友廷
* Profile SlideBar 已套 Bootstrap
* 增加Edit按鈕

### 0801 進度 by 靖傑
* 簡化及修正 in/Column 頁面以及背後程式結構。
* 新增 source/Component/style/_global.css 管理主色調。

### 0801 進度 by 建琁
* 調整Forget的字體及行距大小。

### 0731 進度 by 建琁
* 壓縮contributors和history內的照片。

### 0716 進度 by 君輔
* https://eeplus.herokuapp.com/ 的資料庫網址更新，重新註冊後應該可以登入了

### 0624 進度 by 建琁
* column新增 洪銘駿

### 0531 進度 by 建琁
* column新增 1603、1602、1601

### 0517 進度 by 建琁
* column新增 1604、1605、1606

### 0514 進度 by 建翰 & 侃軒
* 修改 Facebook Login 與 Facebook Register
* 修改前端 register_in/register_account 認證 改回沒有 acc 的

### 0513 進度 By 友廷
* Search Block 完成(除外觀部分
* 跳轉至user Profile完成
* 剩餘問題為Search頁面需記得跳轉頁面前之狀態
* Recruitment Block已完成(除外觀部分

### 0430 進度 By 建琁
* column新增1606

### 0427 進度 By 謹譯
* History增加頁面
* Contributors 沿用舊的team，未修改

### 0427 進度 By 育楷
* search 改成新的版面

### 0426 進度 By 友廷
* 將column_block component化，現在需要多輸一項filename來表示在資料庫的圖片名稱
* 名稱格式我用年份加月份(ex.1912)
* 之後會做一頁上傳圖片的頁面，類似管理者帳號，會跟PrivateRoute一起出來(大概
* column圖片可能不能太高清，資料庫吃不進去XD

### 0425 進度 By 建琁
* 新增1909~1805的column

### 0408 進度 By 建翰 & 侃軒
* Facebook Login and Register 修改大致完成
* 剩下從註冊進入的按紐處理
* Login 頁面

### 0408 進度 By 育楷
* Forget password的New Password和Confirm Password輸入的type改成password
  (如果不能merge,先把client\src\out\Forget.js刪除)
### 0408 進度 By 君輔
* column的儲存照片(/api/saveImg)及讀取照片(/api/getImg)完成
* 呼叫columnImgFunc/saveImg(filename,img)回傳true(儲存成功)/false(儲存失敗)
* 呼叫columnImgFunc/getImg(filename)回傳圖片檔(用\<img src={回傳的東東}>可直接顯示)
* search新增select bar版本的post
* isLogin回傳true(登入中)或false(未登入)
* search變OR

### 0408 進度 By 建翰
* Add Facebook Login Button
* Usage!!! If error says facebook-login-react not found!
* npm install react react-dom react-facebook-login --save --force

### 0404 進度 By 友廷
* ScrollBar 樣式調整

### 0331 進度 By 友廷
* AppBar新增dropdown,且修正顯示問題

### 0328 進度 By 友廷
* Proifle => Slidebar 實現滑出功能
* 一些排版問題待修正

### 0327 進度 By 建琁
* Column 陳俊仰、黃柏源- 完成
* Column 新增default照片
* Column 新增 梁維仁、高奕豪、謝沛倫、胡一天、徐瑞廷、趙式隆學長

### 0326 進度 By 育楷 宗倫
* Recruit/Recommendation 頁面分成三欄
* 新增addJob後端

### 0325 進度 By 君輔
* search目前可用基本資料、系所進行搜尋(工作搜尋待新增
* 搜尋完的結果我只有console出來，怎麼render再交給前端負責
* 以免有些人還不知道，現在database變成線上的，在[這裡](https://www.mlab.com/databases/heroku_b6klgxdz#collections )(帳密都是ntuee2020

### 0321 進度 By 友廷
* Contact排版修復，加上buttom連到Team
* Team_member 組成 Team頁面，格式請看Team.js
* 待將AppBar加上hover list
* 美觀部份待工作
### 0319 進度 By 建琁
* Column 楊奕軒- 完成

### 0315 進度 By 謹譯 建琁 承樺
* Column內頁模板完成
* Column 1907- 完成
* Study Link 完成

### 0220工作分配 By謹譯 0309已閱
第一次部聚前希望可以完成
> **前端**
> * √ 友廷：繼續完成Profile部分，我會幫你一起弄
> * √ 承樺、建琁：完成Column各個訪問的內頁 （內頁加油）
> * √ 育楷：Recruit徵才頁面 
> * ? 明翰：看目前所有網站，提供所有設計的點子

> **後端**
> 抱歉我暫時會幫忙前端處理一下事情
> * √ 君輔：Merge東西，處理Profile
> * ? 維恩＆宗倫：研究搜尋的相關/Recruit頁面
> * √ 建翰＆侃軒：研究FB登入/研究安全相關

### 0309 進度 By 謹譯
* Career 內 Recommendation & Recruitment 已合
* 感謝育楷，但記得看一下Readme目前改的部分喔 
> * 每個方框可以縮小，以三欄方式呈現 (3n)

### 0303 進度 By 君輔
* 把profile.js的一些function丟到profileFunc/，管理上比較方便
	* profile.js中改成this.func = func.bind(this)

### 0303 進度 By 友廷
* 以column_1912做測試
* Column_text內新增Component資料夾，以便未來增加訪問內容時能以固定格式顯示
* 格式位於column_content當中，之後還會修正
* 美觀部分待處理
* Profile我之後應該會把它拆成部分，現在真的太長了= =

### 0302 進度 By 謹譯
* Recruit 改為 Career 內切割為 Recommendation & Recruitment 
* Recommendation 
> * 推薦區，求職方使用
* Recruitment 
> * 徵才區，供職方使用

### 0301 進度 By 謹譯&友廷
* 新增App Bar in 一按鈕 Study 原Recruit Study改為Recruit，頁面拆開，功能簡介如下
* Recruit
> * 為原本的Find Jobs進階，除了可發招募文，也可張貼業界資訊等
> * 育楷加油，我有空會幫你
* Study
> * 留學組的網頁
> * 自動配對網頁架設位置，留學組會生出配對系統
> * 放置他們整理出來的資料，公布升學相關資訊
> * 先閒置，等留學組資料
* Login
> * FB按鈕已排版，並加上icon
* Register Study分開

### 0228進度 By君輔
* chVisual中針對Ocupation新增三個傳送方法：
> * Occupation.Modify，傳遞單個須修改的欄位值(一樣""代表unset)
> * Occupation.Remove，傳遞待刪除的一整行資料(mongo中沒有有效移除array element的方法，只能用unset再pull null)
> * Occupation.Insert，push新的一行資料
* 此流程會出現的bug
> * 對於一行全部""是否(在後端)自動刪除？
> * 因為是按照work_X_${num}決定順序，傳遞一次後(因為array被刪除)序號就會對不上，前端更新的原則該是什麼?
> * 可能的解決方法：用array中每個obj獨有的_id進行追蹤，但這樣好像就失去array的意義
* 一些想改的東西
> * profile真的太冗了啦，感覺一些function可以提到外面去寫(???
> * 只要前端有改東西就要重新build一次才能跑，好像有點麻煩
	(p.s.不知道是不是大家都知道：如果只有後端有修正的話只要打npm start就可以了

### 0228 進度 By 友廷
* Profile
> * 新增expand在phone和social media上
> * 縮放排版初步工作，需要再調整
> * expand效果加強中

### 0227 進度 By 建翰
* Certification
> * 在 index.js 中增加 https 認證
> * 根目錄增加 certificate.crt 與 certificate.key
> * npm run local 完之後，網址輸入 https://localhost:1993

### 0225建議 By謹譯
* Profile
> * 電話類一個expand (home office mobile)
> * 社群網站一個expand (Facebook Linkedin Blog)
### 0225進度 By友廷
* Profile
> * 目前Occupation的部分可以自由新增或減少，資料傳遞部分可能要後端處理一下
> * 新增一些icon或動畫

### 0223進度 By謹譯
* 新增App Bar in 一按鈕 Recruit Study 與 Recruit Study 頁面，其功能簡介如下
* Recruit
> * 為原本的Find Jobs進階，除了可發招募文，也可張貼業界資訊等
> * 育楷加油，我有空會幫你
* Study
> * 留學組的網頁
> * 自動配對網頁架設位置，留學組會生出配對系統
> * 放置他們整理出來的資料，公布升學相關資訊
> * 先閒置，等留學組資料

### 0223進度 By君輔
* 新增route/src/in/readDB.js，管理obj和output/input的轉換，優化與profile的溝通
> * 如果回傳欄位是undefined就skip
> * 如果回傳資料是""就用update->$unset把它刪掉
> * 後端只會傳出除了""和undefined以外的資料減少網路流量消耗
> * 前端傳入資料用hasChanged讓被修改過的才傳回後端（包括變成""刪除資料庫）
> * profile圖片上傳的bug修正(原本按cancel會讓file變成undefined)
* 新增/api/test頁面可以充當前端
> * url代表目標網址
> * textarea寫post的data，\n區隔不同pair，一個pair用空格區分key/value
* 後端新增/api/searchVisual，依據除了工作以外的欄位可查詢其餘使用者
> * 該欄位必須使用者選擇show=true才會回傳
> * 先用/api/test玩
* 待修正/新增
> * occupation的資料傳輸(資料庫type用array希望讓使用者無限新增)
> * 研究mongo的ref，將jobID和findJob資料庫串聯

### 0222更新 By友廷&謹譯
> * Column
>> * 外觀改動
>> * 縮放時不會變動排版
>> * 新增column_app，包含router，要新增頁面請依照裡面範例，目前頁面已全數新增
>> * column 內頁設計需格式化，排版先以1910為主

### 0220更新 By友廷
> * Register
>> * 驗證問題輸入補上
>> * 新增FAQ欄及image preview section
>> * ID photo 的大小有新增限制，不會大幅改變排版

> * Forget
>> * NavBar已修正
>> * 按鈕樣式已改

> * Profile
>> * 已將ID photo去除
>> * 雙輔已改英文

> * Column
>> * 已在section上添加margin,不會被擋住
>> * Column圖片可以個別更改，改的方式請依照第一個範例
>> * 日期採訪人置右
>> * 字體修改
>> * 標題與box加陰影
>> * 新增read more

### 0220一驗 By謹譯
感謝君輔＆友廷寒假完成登入相關部分與個人資料的雛形，詳細問題如下述。我剛剛修正完Column外部頁面的大部分內容，後續仍有許多部分待大家努力。
* 新增新的進度請放在最上面，由上而下為時間由近而遠。
* Forget 設計怪怪的，太繁瑣，不過先不改

> **前端**

> * Register 已解決 0222
>> * 漏掉驗證問題的輸入
>> * ID 附註須有證件頭像與名字

> * Forget 已解決 0222
>> * Nav Bar 錯誤 ，應該為Out的 Nav
>> * 確認送出鈕顏色改透明藍底

> * Profile （需大改）
>> * 上傳的身分證照片不要顯示 已解決 0222
>> * Public 字跑掉
>> * 學歷展開後 Doctor 會被擋到
>> * 學歷輔雙改英文 已解決 0222
>> * 安全問題大修
>> * 縮放頁面跑掉

> * Column 已解決 0222
>> * Nav Bar 會擋到最新一篇的上半 
>> * 圖片需可以個別更換 
>> * 日期採訪人置右 
>> * 主標題顏色不明顯
>> * 新增 Read more 按鈕
>> * 圓弧角取代方框？

> * Find Job （沒看到）
> * 登入後首頁 暫時不處理 0222

> **後端**
> * Profile 個人資料實際操作需確定完全正確，我還沒測試
> * Register 目前註冊正確，可以嘗試加防呆註冊 
> * Find 嘗試研究如何搜尋與顯示人物

### 0206進度 By友廷
* expand欄位的bug修好(發現是transition與display的conflict,以及ReactDOM在onChange的時候會重新render)
> **補充**
> * DeepCopy在一堆obj包在一起的時候好像很吃效能，所以有人建議用[ImmutableJS](https://github.com/kdchang/reactjs101/blob/master/Ch06/react-immutable-introduction.md)，保持state的不變，而是每次都回傳新的state
> * 分開component再結合的dataflow好像用Flux或[Redux](https://github.com/kdchang/reactjs101/blob/master/Ch07/react-redux-introduction.md)的結構會比較好管理? 雖然我也不太會XD

### 0206進度 By君輔
* Profile頭像傳輸完成(因為user_visual資料量多，想直接回傳obj，但image先在後端預處理完會比較乾淨，然後我就被深拷貝坑了好久...)
> **一些話**
> * 預設頭像的部分要再研究，後端目前是如果不存在的話會回傳''，看是要哪裡做判斷(目前沒想到漂亮的方法
> * expand欄位的onChange有bug(一次refresh只能打一個字)，請前端人員修正(這個不是很急
> * profile.js現在檔案累積到有點大了，要不要各個div分開寫再render在一起?但這樣state的設置就得研究一下

### 0205進度 By友廷
* Profile新增上傳大頭照按鈕
* Register的照片上傳按鈕style修正
* Profile expand顯示優化


### 0204進度 By君輔
* 前端register新增照片上傳按鈕，可上傳證件證明
* 後端用multer解析照片，限制檔案大小與格式(jpg,jpeg,png)，並以Buffer儲存在Mongo裡
* 前端LoginChange.js新增顯示照片區(到時候應該是管理員授權註冊的頁面要顯示)，以src={this.state.img}顯示
* 後端用'data:image/png;base64,<buffer_data>'送出資料，可直接被前端img src使用
>  **一些話**
> * 預設照片的部分再請前端人員設定
> * 前端profile待新增上傳大頭照的按鈕，方法參照register；post的部分涉及檔案傳輸，要改成FormData(這部分可留給後端人員做，只是介面要先出來)

### 0203進度 By君輔
* 前端profile的div hr0、hr1訊息可以完整傳送，接下來會嘗試在onchange做修改，讓只有被修改過的欄位才會回傳，加速資料傳遞
* 後端依profile.js新增資料庫欄位(facebook,....)，接下來會加上validation

### 0203進度 By友廷
* Profile的name與id功用分離
* 前端新增App_in, pages_in, AppBar_in, Home_in
* 關於App 與 App_in 兩個路由之間的切換還在工作中
* Home_in 的排版完成, style細節再討論, 以及expand button的顯示優化工作中
* 測試Home_in 請先在Index.js內import App_in,然後將原本的App改成App_in

### 0202進度 By君輔
* 後端validation處理完成，只需修改validation.js的mat{}，即會運行對應的validate
* 後端新增/api/showVisual(init用)、/api/chVisual(儲存用，尚未完善)，由於/Schemas/user_visual.js格式有更動，資料傳輸內容須再討論(即post的data)
* Profile在Home下做測試
* 前端頁面改用value={this.state.\<id or name\>}(我也不知道為何範例code用.value)
* 前端id和name的意義可以統一一下，像是id拿來管理css、name管理this.state和post之類的(onchange中用target.id或target.name都可喔)

### 0201進度 By友廷
* 前端profile頁面處理中

### 0131進度 By君輔
* 前端接收到validation的訊息後會跳alert(統一當message===false時跳data.description中的內容)
* 後端validation架構改變，針對每一種欄位有獨自的檔案規定格式(/Name)，但ConfirmPassword要用到req會噴bug，還在修正中
> **一些話**
> * 前端趕快生登入後頁面給我啦

### 0130進度 By君輔
* 新增express-validation套件，在routes/validation下先檢驗傳入的資料是否合法再進入資料庫(/srcs)管理
* 若資料不合法則從(validation/controll.js)回傳422error，前端需再依error訊息顯示提醒

### 0126進度 By 君輔
* 新增.gitignore(拜託大大們不要再把node_module傳上來了，看了很難過)
* 架構我參考了https://github.com/rishipr/teams
* 後端一律在/api下工作，要新增功能請在routes/api.js中修改
* local端可在同一個port下工作(關鍵在於使用react bulid再用express static分析)
* 共同網頁版可到https://ntueeplus.herokuapp.com/ 測試
* clone完後執行方式：
>* npm install && cd client && npm install
>* 開啟mongodb server(詳細請看舊版github教學)
>* npm run local(=開mongodb server + build + start)
>* 或者npm run local_mac(=build + start)

> **一些話：**
>* question在HOME改比較好
>* fb登入交給大家研究了
>* 前後端的merge方法要討論一下，不然現在都是我重複把前端頁面clone下來貼進來心很累；找人研究submodule，然後前端有餘力的話看一下我的axios然後自己寫一下提交表單^^
>* 大家新年快樂~
