const Column_out = require('../../../../Schemas/column_outline')
const Column = require('../../../../Schemas/column')
toInsert = [
  {
    anno: ['羅韻瑢', '鄭謹譯', '李筠婕', '吳建翰', '余欣澄'],
    date: '2020/03/14 星期六',
    id: '2001',
    title: ['1999級 簡韶逸 (CEO/ Founder @ Ganzin Technology, Prof. @ NTUEE)'],
    exp: [
      '現任：CEO of Ganzin Technology',
      '現任：Associate professor at GIEE  (NTU)',
      '曾任：Research staff in Quanta Research Institute (廣達)  (2003~2004)',
    ],
    edu: ['博士：台灣大學電子工程學研究所  (2003)', '學士：台灣大學電機系 (1999)'],
    intro: [
      '簡韶逸教授任職於台大電子所長達16年，致力於多媒體訊號處理系統、多媒體積體電路設計、晶片系統設計方法的研究。 多年來，「媒體晶片系統實驗室」不斷研發出優異的技術。2016 年簡韶逸教授帶學生做出眼球追蹤技術的雛形時，他看好一定能應用在 AR/VR 上，於是決心創業。2018年1月時見臻科技(Ganzin Technology) 從台灣大學spin off。見臻科技提供整合性視線追蹤解決方案  (eye tracking solution)，包括視線追蹤模組  (eye tracking module) 及對應之軟體開發平台  (SDK)，解決目前市面上眼動儀成本高、功耗高、體積大、機構複雜的問題。',
      '見臻科技連兩年參加世界性消費電子展 (CES)，2018年獲選Taiwan Tech Star，是32家獲選的台灣新創公司之一，2019年更被路透社評選為Best of CES。',
    ],
  },
  {
    anno: ['李筠婕', '鄭謹譯', '莊永松', '吳建翰', '俞建琁', '王廷峻'],
    date: '2020/02/20 星期四',
    id: '1912',
    title: ['2008級 鄭恆之  (Technical Lead Manager @ Google Brain)'],
    exp: ['現任：Google Brain Technical Lead Manager'],
    edu: ['博士：CMU ECE (2013)', '學士：台灣大學電機系 (2008)'],
    intro: [
      '目前任職於 Google Brain 的團隊技術領導者和軟體主管工程師的鄭恆之，從事大規模機器學習的研究與軟體開發。在2013年加入 Googe 的實習生行列進行廣告排行的研究，僅僅花費不到三年的時間，就從實習生轉正職於 Google Research 的軟體工程師並且晉升 Google Brain 的技術領導與主管工程師，亮麗的職涯經歷背後是堅實的學術基礎與多篇國際期刊論文的支撐。',
      '熱愛音樂的鄭恆之學長在大學時期曾任台大合唱團公演指揮，並在陳宏銘教授的 Multimedia Processing and Communications Lab 時於ACM Multimedia 等論壇發表三篇論文，畢業後於 CMU ECE 攻讀博士且專注於機器學習與多媒體訊號處理。研究成果在進入博班後達到高峰，屢次在移動通訊、普及計算和行動電腦運算領域發表高度影響力的文章，並在該論壇得到最佳論文獎的殊榮。',
    ],
  },
  {
    anno: ['翁瑋襄', '鄭謹譯', '何俊緯', '周子庭', '謝承霖', '吳建翰', '余欣澄'],
    date: '2019/12/07 星期六',
    id: '1910',
    title: ['2016級 林奕辰  (Bravo AI 洽吧智能執行長)', '2014級 沈昇勳  (Bravo AI 洽吧智能技術長)'],
    exp: ['林奕辰 現任：Bravo AI 洽吧智能執行長', '沈昇勳 現任：Bravo AI 洽吧智能技術長'],
    edu: [
      '林奕辰 學士：台灣大學電機系 (2016)',
      '沈昇勳 碩士：台灣大學電信所',
      '沈昇勳 學士：台灣大學電機系 (2014)',
    ],
    intro: [
      '創立於2017年的BravoAI  (洽吧智能)是一間AI公司，專注於研發、提供金融機構廣泛的軟體服務。運用其電腦視覺、自然語言處理、深度學習等AI專長，BravoAI協助人壽與保險公司研發核保、理賠等流程自動化的方案，不僅替客戶節省大量行政成本，也為公司打出了知名度。目前為止，BravoAI以達成台灣壽險市佔率第一，更計畫邁向國際化。',
      'BravoAI主要由創辦人趙式隆、執行長林奕辰與技術長沈昇勳帶領，團隊著重於技術基礎研究與應用技術解決實際問題。',
    ],
  },
  {
    anno: ['李筠婕', '鄭謹譯', '莊永松', '吳建翰', '余欣澄'],
    date: '2019/11/24 星期日',
    id: '1909',
    title: ['2012級 李昀樵  (技術副總 @ 17直播)'],
    exp: ['現任：Harvard MBA 學生', '曾任：17直播產品技術副總裁'],
    edu: ['碩士：台灣大學電機所 (2014)', '學士：台灣大學電機系 (2012)'],
    intro: [
      '李昀樵曾是李琳山教授語音實驗室的研究生，研究所時期除了研究外，更有進行小型創業，開發出新聞摘要軟件及搜尋公共腳踏車的APP，前者以兩萬元售出，後者成為該領域當時市占率最高的APP。之後，李昀樵加入17直播，監管每年五百萬的IT預算，帶領團隊從5人成長到107人，更將17 Media的首屏載入速度從4秒縮減到0.3秒，成為同業中最快速的。李昀樵在新創領域有豐富經驗，現更到Harvard MBA進修。',
    ],
  },
  {
    anno: ['鄭謹譯', '施彥宇', '王德宇', '曾晴', '劉桓桓'],
    date: '2019/09/17 星期二',
    id: '1908',
    title: ['2008級 方劭云 (當屆最年輕升遷副教授)'],
    exp: ['現任：國立臺灣科技大學電機系 副教授', '聯絡方式：syfang@mail.ntust.edu.tw'],
    edu: ['博士：台灣大學電子所  (2013)', '學士：台灣大學電機系  (2008)'],
    intro: [
      '2008畢業於台大電機，目前任職於臺灣科技大學的方劭云教授，僅僅不到十年的時間內已經取得了副教授的頭銜，能有這樣的榮譽，是背後無數國際期刊論文與比賽獲獎的支撐。方教授於IEEE/ACM網絡學報屢次發布論文，二度獲得該學報最佳論文獎的榮譽。自2016起更帶領台科大團隊於CAD Contest at ICCAD比賽中四度獲獎，為臺灣在EDA領域中頗具地位的人才。目前授課項目包括VLSI、邏輯設計、演算法、奈米積體電路實體設計，並持續於EDA、奈米積體電路實體設計、製造可行性/可靠性設計、ML設計最佳化等領域中深造。',
    ],
  },
  {
    anno: ['鄭謹譯', '李筠婕', '莊永松', '戴慕潔', '吳建翰', '毛弘仁'],
    date: '2019/08/28 星期三',
    id: '1907',
    title: ['2012級 王易如  (行動貝果共同創辦人)'],
    exp: ['現任：MoBagel 共同創辦人，任職營運長', '聯絡方式：iruwang@mobagel.com'],
    edu: [
      '碩士：Computer Science/Computer Hardware , Stanford University',
      '學士：台灣大學電機系  (2012)',
    ],
    intro: [
      '王易如於史丹佛大學取得碩士學位後，經由世界最大黑克松Salesforce $1Million Hackathon籌組MoBagel (行動貝果)，目前任職該新創的營運長。MoBagel 致力於讓機器學習落地，目標讓人工智慧普及化，主要方向為APU  (Advanced Preprocessing Unit)，根據AI的應用類別來進行資料前處理，增加預測準確度，目前已經與台灣許多產業龍頭合作。',
    ],
  },
  {
    anno: ['毛弘仁', '吳兩原', '林芃廷', '王廷峻', '李筠婕', '陳培鳴', '莊永松'],
    date: '2018/10/13 星期六',
    id: '1808',
    title: ['1994級 陳維超  (Skywatch Inc. Co-founder)'],
    exp: ['現任：Skywatch Inc. Co-founder'],
    edu: ['學士：台灣大學電機系 (1994)'],
    intro: [
      '陳維超學長在2002年於北卡羅萊納大學教堂山分校取得博士學位，專攻電腦繪圖運算技術。學長的產業界及學界歷練皆相當豐富，在業界，學長曾任美國NVIDIA 3D Graphics 架構師、Nokia Research Palo Alto 資深研究員等高技術職位，更在近年與大學同學 楊吉評學長共同創立Skywatch Inc.，提供高規格的雲端監視系統服務、同時也擔任英業達  (Inventec) 公司的 Head of AI Center、以及台灣人工智慧學校的理事；在學界，學長也曾擔任過台大資工系的教授，開設多年熱門課程：圖形處理器程式設計，同時也擔任過眾多國際學術會議的committee、member或者reviewer，如ACM SIGGRAPH、ISMAR、CVPR、ICCV、ACCV等等，是國內繪圖運算技術領域的翹楚。',
    ],
  },
  {
    anno: ['莊永松', '莊鎧爾', '琉琉', '何驊凌', '蔡易霖'],
    date: '2018/9/10 星期一',
    id: '1807',
    title: ['2006級 楊奕軒  (研究員/教授 @ 中研院資創中心)'],
    exp: ['現任：研究員/教授 @ 中研院資創中心'],
    edu: ['學士：台灣大學電機系 (2006)'],
    intro: [
      '楊奕軒學長是國內少數專攻音樂資訊領域的學者，研究論文產量十分豐厚。電機系畢業後直攻電信所的博士，過去曾在美國Columbia University、西班牙Universitat Pompeu Fabra擔任訪問學者。目前是中研院資創中心的副研究員，也是清大與成大的合聘教授，同時也擔任過許多conference的editer、chair以及眾多journal、conference的reviewer等等。',
    ],
  },
  {
    anno: ['楊程皓', '吳奕萱', '毛弘仁'],
    date: '2018/8/18 星期六',
    id: '1806',
    title: ['2000級 陳俊仰  (Grindr President & CTO)'],
    exp: ['現任：Grindr President & CTO'],
    edu: [
      '博士：Electrical Engineering  (Digital Signal Processing Group), Caltech  (2004-2009)',
      '碩士：臺灣大學電信工程學研究所  (2000-2002)',
      '學士：臺灣大學電機工程學系  (1996-2000)',
    ],
    intro: [
      '陳俊仰學長在從台大電信所 (通訊組)畢業後，在 Caltech 唸了五年 PhD，研究領域是通訊和雷達的信號處理。從 Caltech 畢業後進入一流的軟體公司 Facebook 工作，目前則在世界最大的同志交友平台 Grindr 擔任總裁兼技術長。',
    ],
  },
  {
    anno: ['鍾興寰', '陳威成', '孫凡耕', '蘇柏元'],
    date: '2018/7/15 星期日',
    id: '1805',
    title: ['2014級 黃柏源 (Princeton EE PhD)'],
    exp: ['Security Research Intern, Intel Coporation', 'Design Automation Intern, TSMC'],
    edu: ['博士：EE, Princeton University', '學士：台大電機系 (2014)'],
    intro: [
      '黃柏源學長是目前受訪者中最年輕的一位，大學時拿過多次書卷獎，電機系畢業後前往Princeton攻讀EE PhD，專攻EDA領域，大學時就曾擔任IEEE 通訊 paper reviewer，也曾在TSMC及Intel實習過，學界業界經歷皆相當豐富。',
    ],
  },
  {
    anno: ['鍾興寰', 'Paulsu Su', '陳威成', '孫凡耕'],
    date: '2017/4/13 星期四',
    id: '1606',
    title: ['2007級 謝沛倫 (Ambidio Inc. 共同創辦人)'],
    exp: ['Co-Founder of Ambidio Inc.'],
    edu: [
      '碩士：Columbia University, Fu Foundation School of Engineering and Applied Science Electrical Engineering',
    ],
    intro: [
      '「想像一下，打開電腦或是手機觀看影片或玩電動，就能感受到360度逼真的立體音效，彷彿賽車就從身旁呼嘯而過、恐龍就從眼前磅礡踩過的震撼聲音。」系學會很榮幸邀請到 2007級 謝沛倫系友參加本次skype專訪。創辦於2014年，LA based的 startup ─ Ambidio，希望能創造「大腦與耳朵重新連結的Ambidio時代」，快點進文章，聽一聽謝沛倫學長為我們帶來的分享吧!',
    ],
  },
  {
    anno: ['劉衡謙', '賴明緯', '潘彥銘', '葉加祈', 'Sasa Chen'],
    date: '2017/6/9 星期五',
    id: 'HungMingJiun',
    title: ['2014級 洪銘駿 (RobotArt 國際機器人藝術大賽首獎)'],
    exp: ['JTCF Novel Technology Paper Award for Amusement Culture'],
    edu: ['碩士：台大電機所控制組'],
    intro: [
      '系學會很榮幸邀請到2014級 洪銘駿 系友參加本次影片專訪。學長將本身在藝術方面的興趣和科技做結合，在RobotArt機器人藝術比賽上奪得首獎！youtube上面也有學長設計的機器人畫Albert Einstein的影片呢！這次的籌備團隊非常用心，特別製作了一份圖文並茂、以故事方式呈現訪談過程的文章 (https://goo.gl/0ZH42K)希望能讓大家對於洪銘駿學長有更完整的認識！快點進文章或觀賞我們精心剪輯的影片，聽一聽 洪銘駿 學長為我們帶來的分享吧 :-)',
    ],
  },
  {
    anno: ['蔡忠紘', '林怡廷', '陳鴻智', '蔡承佑'],
    date: '2017/4/28 星期五',
    id: '1605',
    title: ['2006級 高奕豪 (Quantitative Researcher @Two Sigma Investments)'],
    exp: ['Quantitative Researcher, Two Sigma Investments'],
    edu: ['博士：Stanford University Information Systems Lab, EE PhD (2012)'],
    intro: [
      '系學會很榮幸邀請到 2006級 高奕豪 系友參加本次skype專訪，感謝 2006級 I-Hsiang Wang 教授的推薦。學長的經歷非常豐富，在Stanford University取得EE的PhD後，進入Wall Street 的 hedge fund，在數學、軟硬體、計量金融...等領域，都有很多人生故事願意和我們分享。快點進文章，看一看高奕豪學長為我們帶來的分享吧!',
    ],
  },
  {
    anno: ['吳奕萱', '楊程皓', '毛弘仁', '江庭瑋', '蘇峯廣'],
    date: '2017/3/30 星期四',
    id: '1604',
    title: ['2000級 胡一天 (源鉑資本Kyber Capital執行長，專業投資人與金融觀察家)'],
    exp: [
      'Founder, Chairman & CEO @ Kyber Capital 源鉑資本',
      'Co-Founder/Managing Partner at Infinite Studio',
    ],
    edu: [
      '碩士：Financial Engineering, Columbia University  (2003-2006)',
      '臺灣大學電機工程學系、法律系財經法學組  (1996-2001)',
    ],
    intro: [
      '系學會很榮幸邀請到 2000級 胡一天系友參加本次專訪，感謝 2000級 陳和麟教授的大力幫忙。學長對於金融的洞見非常令人欽佩，而且樂於與學弟妹分享自己的故事、願意撥冗直接參與編修這篇文章 (超熱心！)現在就點擊連結、一起認識學長的心路歷程吧!',
    ],
  },
  {
    anno: ['許秉鈞', '袁培傑', '劉禹辰', '曾耕森'],
    date: '2017/2/27 星期一',
    id: '1603',
    title: ['2008級 趙式隆 (台灣矽谷創業家協會理事長)'],
    exp: ['台灣矽谷創業家協會理事長', '學悅科技Zuvio創辦人'],
    edu: ['博士：台大電機博士 (D97)'],
    intro: [
      '系學會很榮幸邀請到2008級 趙式隆 學長擔任首po系友專訪，為我們介紹他的簡歷以及NTUEE在他心中的定位！',
    ],
  },
  {
    anno: ['藍珮瑜', 'Steven Huang', '林昱嘉', '陳柏瑞'],
    date: '2017/5/12 星期五',
    id: '1602',
    title: ['1992級 梁維仁 (元大證券香港區總經理、花旗環球證券臺灣區總經理)'],
    exp: ['元大證券香港區總經理、花旗環球證券臺灣區總經理'],
    edu: [
      '碩士：Carnegie Mellon University master of science Computational Finance, Industrial administration.',
    ],
    intro: [
      '系學會很榮幸邀請到 1992級 梁維仁 系友參加本次skype專訪！學長不但在金融工程領域闖出一片天，退休後投入音樂藝術相關工作，還擅長登山滑雪等休閒活動，人生經歷非常豐富，我們快來看看梁維仁學長的經驗分享吧！',
    ],
  },
  {
    anno: ['廖宜倫', '黃暐倫', '楊耀程', '孫裕修', '林恆陞'],
    date: '2017/3/13 星期一',
    id: '1601',
    title: ['1995級 徐瑞廷 (BCG 波士頓顧問公司董事總經理)'],
    exp: ['BCG波士頓顧問公司台北辦公室負責人、合夥人暨董事總經理'],
    edu: ['史丹福大學電子工程學碩士', '聖塔克拉拉大學MBA'],
    intro: [
      '系學會很榮幸邀請到 1995級 徐瑞廷系友參加本次專訪，感謝 1995級林哲立系友 與 1995級丁建均教授的大力幫忙。現在就點擊文章，讓我們一起看看徐瑞廷學長的分享與心路歷程吧!',
    ],
  },
]

const main = async () => {
  toInsert.forEach(async (obj) => {
    const column_out = new Column_out(obj)
    const { columnImg } = await Column.findOne({ filename: obj.id })
    column_out.columnImg = columnImg
    try {
      await column_out.save()
      console.log(obj.id, 'success')
    } catch {
      console.log(obj.id, 'fail')
    }
  })
}
main()
