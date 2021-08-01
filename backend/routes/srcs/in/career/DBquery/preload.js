const imgPath = '../../../../../client/src/images'
const fs =require('fs')
const Recruitment = require('../../../../Schemas/recruitment')
const toInsert = [
    {
        title:{
            title:'資深前端工程師職缺',
            company_name:'均一平台教育基金會',
            work_type:'資深前端工程師'
        },
        info:{
            salary:'月薪 70000元',
            experience:'無工作經驗限制',
            diploma:'NTUEE'
        },
        spec:{
            requirement:"熟悉 HTML, CSS, JavaScript 與 Browser API\n熟悉 RWD, SPA 開發\n熟悉前端開發工具如 Webpack, ESLint\n熟悉常見 Design Patterns\n熟悉 React 及其 ecosystem 例如 redux, react-router, styled-components\n具備 CSS Frameworks 使用經驗，例如 Bootstrap, Material-UI\n熟悉 Git 開發流程",
            description:'網站前端需求設計與開發\n與PM和Designer合作規劃新功能，迭代產品設計\n前端架構設計與優化，確保系統可維護性與擴展性\n提升團隊前端技術能力'
        },
        image:'eesa-icon'
    },
    {
        title:{
            title:'軟體工程師職缺',
            company_name:'均一平台教育基金會',
            work_type:'軟體工程師'
        },
        info:{
            salary:'月薪 50000元',
            experience:'無工作經驗限制',
            diploma:'NTUEE'
        },
        
        spec:{
            requirement:"熟悉 HTML, CSS, JavaScript\n熟悉 Python\n有 Git 開發流程經驗",
            description:'網站功能全端開發與維護\n根據 UI/UX 規格，開發產品網頁外觀與互動介面 設計與開發 API 與後端邏輯\n撰寫相關自動化測試，確保程式碼品質'
        },
        image:'eesa-icon'
    },
    {
        title:{
            title:'正職/實習職缺',
            company_name:'KRONOS 麒點科技',
            work_type:'C++ Developer'
        },
        info:{
            salary:'年薪 1M ~ 2.5M 元',
            experience:'無需工作經驗限制',
            diploma:'NTUEE'
        },
        spec:{
            requirement:"物理/資工/電機背景尤佳\n不排斥投資交易相關領域或研究\n對自己的C++ / Python能力有自信",
            description:'聽過WorldQuant & Point72 嗎?\n現在台灣也有類似的新創公司! – KRONOS\nKRONOS是專注於加密貨幣交易市場的FinTech公司。\n公司希望招募更多電資背景的人，只要您對計量/程式交易領域好奇或有興趣，都歡迎申請，薪水相當優渥!'
        },
        image:'kronos'
    },
    {
        title:{
            title:'徵軟體專案經理',
            company_name:'美商麥肯錫公司台北辦公室',
            work_type:'3~4個月 一週2天兼職軟體專案經理 視情況延長'
        },
        info:{
            salary:'誠徵 可議',
            experience:'無需工作經驗限制',
            diploma:''
        },
        spec:{
            requirement:"1) 具軟體業界實作經驗\n2) 懂computer vision與image processing\n3) 英文讀寫流利",
            description:'領導軟體工程師團隊，設計與實作電腦視覺解決方案。算法與代碼已具高度基礎，待最佳化'
        },
        image:'McKinsey'
    },
    {
        title:{
            title:'C++/Linux Software Engineer',
            company_name:'Riedel Communications GmbH & Co.',
            work_type:''
        },
        info:{
            salary:'誠徵 可議',
            experience:'無需工作經驗限制',
            diploma:''
        },
        spec:{
            requirement:"",
            description:'一個德國的工作機會推薦給大家，公司是全球 Top.1 的專業通訊公司 Riedel Communications GmbH & Co.，主要提供「即時溝通」的解決方案。曾經服務過世界盃足球賽、奧運、F1 方程式賽車等等．地點在德國的烏珀塔爾 (Wuppertal)，語言要求只需英文流利即可。德文為加分項目，但不必一定具備。德國稅負較高，如年薪 8萬歐元，稅率接近40%，可看作稅後 5萬歐元。5萬歐元以匯率計算，為180萬台幣。然而烏珀塔爾的物價與台北相仿，故消費力也相當於在台北的180萬元台幣。詳細職缺內容如連結 (另有 Frontend Engineer)，對這個職缺有興趣的請私訊我，我會直接幫你推薦!'
        },
        image:'Riedel'
    }
]

const path = require('path')

const main = async () => {
    toInsert.forEach((obj)=>{
        const rec = new Recruitment(obj)
        filePath = path.join(imgPath,obj.image+'.png')
        rec.img.data = fs.readFileSync(filePath)
        rec.img.contentType = 'image/png'
        console.log(rec)
        rec.save()
    })
}
main()