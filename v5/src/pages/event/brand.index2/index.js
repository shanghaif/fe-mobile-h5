import share, { share4App } from '@liepin/share';
import shareImg from './images/share.jpg';
import './index.less';

const compList = [{
  title: '阿里巴巴',
  id: '1072424',
  value: '30329',
  industry: '电商',
  logo: '5bfe915474719d35745acf0903a.png',
}, {
  title: '腾讯控股',
  id: '7983148',
  value: '29531',
  industry: ' 游戏,社交广告',
  logo: '5bfe919474719d35745adb7903a.png',
}, {
  title: '工商银行',
  id: '2196131',
  value: '20992',
  industry: '银行',
  logo: '5bfe9f0774719d2aa34bb0ba03a.png',
}, {
  title: '建设银行',
  id: '9808291',
  value: '18601',
  industry: '银行',
  logo: '5cb4183de5a8a6695f310de507u.jpg',
}, {
  title: '中国平安',
  id: '8978693',
  value: '16198',
  industry: '保险',
  logo: '58dccaa17032bfe7c3ee62c605a.jpg',
}, {
  title: '中国移动',
  id: '9122701',
  value: '12815',
  industry: '通信',
  logo: '5c862b99261c45f047a76f7902u.jpg',
}, {
  title: '中国石油',
  id: '9429176',
  value: '12592',
  industry: '石油化工',
  logo: '5acb0d528e50555968c1491c03a.png',
}, {
  title: '贵州茅台',
  id: '8363153',
  value: '12361',
  industry: '贵州遵义',
  logo: '5bfea39d74719d2aa34c91fb03a.png',
}, {
  title: '中国银行',
  id: '9321317',
  value: '11010',
  industry: '银行',
  logo: '59bf8fc97032281fd436fbd904a.png',
}, {
  title: '招商银行',
  id: '6689288',
  value: '9074',
  industry: '银行',
  logo: '5bfe905974719d35745a9e9603a.png',
}, {
  title: '中国人寿',
  id: '9286056',
  value: '8005',
  industry: '保险',
  logo: '5bfe915a74719d35745ad02d03a.png',
}, {
  title: '中国石化',
  id: '9706616',
  value: '6623',
  industry: '石油化工',
  logo: '5d149d978e59fb1019a41daa03u.png',
}, {
  title: '中国海洋石油',
  id: '9266071',
  value: '5247',
  industry: '石油化工',
  logo: '5bfffa6274719da073f0b74703u.png',
}, {
  title: '交通银行',
  id: '7988633',
  value: '4545',
  industry: '银行',
  logo: '5b84c4e78e50a3257f30650804a.jpg',
}, {
  title: '中国人保',
  id: '8394710',
  value: '4197',
  industry: '保险',
  logo: '5bfe9b9c74719df0ac9a0e0c03a.png',
}, {
  title: '兴业银行',
  id: '8878122',
  value: '3800',
  industry: '银行',
  logo: '5bfe92a474719d9f609a75c203a.png',
}, {
  title: '美的集团',
  id: '1792495',
  value: '3595',
  industry: '家电',
  logo: '56178a2245ce3ca42ae589d004a.png',
}, {
  title: '美团点评',
  id: '2036768',
  value: '3470',
  industry: '外卖.电商',
  logo: '5d0732189fae687d43917cc504u.jpg',
}, {
  title: '浦发银行',
  id: '8559051',
  value: '3428',
  industry: '银行',
  logo: '5bfe918b74719d35745ad9bd03a.png',
}, {
  title: '格力电器',
  id: '865318',
  value: '3309',
  industry: '家电',
  logo: '5bfea59874719d2aa34ce69003a.png',
}, {
  title: '中国太保',
  id: '8361354',
  value: '3309',
  industry: '保险',
  logo: '5bfea43e74719d2aa34cb00703a.png',
}, {
  title: '邮储银行',
  id: '7925001',
  value: '3307',
  industry: '银行',
  logo: '5bfe9e4674719d2aa34b8abc03a.png"',
}, {
  title: '中国铁塔',
  id: '9645512',
  value: '3174',
  industry: '通信基建',
  logo: '5bfe8fcb74719d35745a821303a.png',
}, {
  title: '万科',
  id: '4817469',
  value: '3143',
  industry: '房地产',
  logo: '5bfe9ad974719df0ac99e94603a.png',
}, {
  title: '京东',
  id: '1663745',
  value: '3014',
  industry: '电商',
  logo: '5bfe9d0074719d2aa34b4d5b03a.png',
}, {
  title: '上汽集团',
  id: '8399212',
  value: '2979',
  industry: '汽车',
  logo: '5bfe914474719d35745acbfd03a.png',
}, {
  title: '中信银行',
  id: '8079957',
  value: '2921',
  industry: '银行',
  logo: '5bfe9e8174719d2aa34b968a03a.png',
}, {
  title: '恒瑞医药',
  id: '7868218',
  value: '2919',
  industry: '医药',
  logo: '5bfe974074719df0ac99307b03a.png',
}, {
  title: '中信证券',
  id: '982481',
  value: '2885',
  industry: '证券',
  logo: '59a92e3d70325ec22ee7d81905a.png',
}, {
  title: '中信股份',
  id: '8414463',
  value: '2881',
  industry: '金融.能源.制造',
  logo: '5c85d230509919c4f51864e201u.png',
}, {
  title: '海天味业',
  id: '8280653',
  value: '2835',
  industry: '调味品',
  logo: '5cf498aed3ced448646ad28903u.png',
}, {
  title: '百度',
  id: '884492',
  value: '2824',
  industry: '搜索.广告',
  logo: '5bfe93af74719d9f609aaaef03a.png',
}, {
  title: '中国电信',
  id: '8427098',
  value: '2798',
  industry: '通信',
  logo: '5bfea41f74719d2aa34caa7c03a.png',
}, {
  title: '民生银行',
  id: '3605021',
  value: '2780',
  industry: '银行',
  logo: '5bfe90ae74719d35745aaf2b03a.png',
}, {
  title: '中国海外发展',
  id: '8008752',
  value: '2776',
  industry: '房地产',
  logo: '5bfe9a6d74719df0ac99d3c203a.png',
}, {
  title: '海康威视',
  id: '1033486',
  value: '2578',
  industry: '安防',
  logo: '5bfe93c774719d9f609aafc803a.png',
}, {
  title: '中国恒大',
  id: '850378',
  value: '2529',
  industry: '房地产',
  logo: '5bfea23e74719d2aa34c508703a.png',
}, {
  title: '中国建筑',
  id: '8571478',
  value: '2414',
  industry: '建筑',
  logo: '5bfea44a74719d2aa34cb23f03a.png',
}, {
  title: '工业富联',
  id: '9580430',
  value: '2391',
  industry: '通信.云服务',
  logo: '5cb08c0ecedf906046adda3c07u.jpg',
}, {
  title: '平安银行',
  id: '7954197',
  value: '2366',
  industry: '银行',
  logo: '5bfea4bc74719d2aa34cc7a703a.png',
}, {
  title: '中国中车',
  id: '7901153',
  value: '2322',
  industry: '轨道交通建设',
  logo: '5bfea5b674719d2aa34ce95c03a.png',
}, {
  title: '碧桂园',
  id: '2485521',
  value: '2264',
  industry: '房地产',
  logo: '5bfe908f74719d35745aa94c03a.png',
}, {
  title: '网易',
  id: '5964833',
  value: '2250',
  industry: '游戏.电商',
  logo: '5bfe966d74719df0ac9905a303a.png',
}, {
  title: '海螺水泥',
  id: '7922079',
  value: '2199',
  industry: '水泥建材',
  logo: '5bfe8f2b74719d35745a62d703a.png',
}, {
  title: '小米集团',
  id: '2174886',
  value: '2115',
  industry: '手机家电',
  logo: '5bfe97c874719df0ac994cef03a.png',
}, {
  title: '华润置地',
  id: '8448634',
  value: '2097',
  industry: '房地产',
  logo: '5bfe97be74719df0ac994ac403a.png',
}, {
  title: '伊利股份',
  id: '883905',
  value: '2037',
  industry: '乳制品',
  logo: '5c74ced2261c45f04791163007u.png',
}, {
  title: '华泰证券',
  id: '8143143',
  value: '2026',
  industry: '证券',
  logo: '5bfe961874719df0ac98f4ad03a.png',
}, {
  title: '光大银行',
  id: '5763425',
  value: '2000',
  industry: '银行',
  logo: '5bfe951974719dc6ed740daf03a.png',
}, {
  title: '迈瑞医疗',
  id: '7898965',
  value: '1984',
  industry: '医疗器械',
  logo: '5bfe967974719df0ac99082703a.png',
}, {
  title: '中国联通',
  id: '2394583',
  value: '1912',
  industry: '通信',
  logo: '5bfe966c74719df0ac99058803a.png',
}, {
  title: '温氏股份',
  id: '9872275',
  value: '1905',
  industry: '畜牧',
  logo: '5ca19de787fd7dc0d35b4c3e05u.png',
}, {
  title: '洋河股份',
  id: '8546189',
  value: '1832',
  industry: '酒类',
  logo: '5cf6130c501544662c8da10808u.png',
}, {
  title: '中国交建',
  id: '9493047',
  value: '1831',
  industry: '交通基建',
  logo: '5cd54b589fae687d4362797a01u.jpg',
}, {
  title: '中国国旅',
  id: '6252394',
  value: '1731',
  industry: '旅游',
  logo: '5bd28a838e50a3257f76451004a.jpg',
}, {
  title: '新华保险',
  id: '1211630',
  value: '1717',
  industry: '保险',
  logo: '5bfe94af74719dc6ed73f83103a.png',
}, {
  title: '腾讯音乐',
  id: '9919803',
  value: '1685',
  industry: '音乐.社交娱乐',
  logo: '5c9cb1a4509919fa0e99cd3207u.png',
}, {
  title: '招商蛇口',
  id: '8787971',
  value: '1654',
  industry: '房地产',
  logo: '5bfe925e74719d9f609a695703a.png',
}, {
  title: '中国财险',
  id: '8595940',
  value: '1649',
  industry: '保险',
  logo: '5abb32dd8e504b50a498d67e05a.jpg',
}, {
  title: '拼多多',
  id: '8537928',
  value: '1649',
  industry: '电商',
  logo: '5bfea00c74719d2aa34be33603a.png',
}, {
  title: '国泰君安',
  id: '8376413',
  value: '1635',
  industry: '证券',
  logo: '5bfe989974719df0ac99775303a.png',
}, {
  title: '海通证券',
  id: '6657987',
  value: '1632',
  industry: '证券',
  logo: '54d1ea01712eb4f6b84d3f7901a.png',
}, {
  title: '中信建投',
  id: '8029798',
  value: '1612',
  industry: '证券',
  logo: '5bfe9bef74719df0ac9a1ded03a.png',
}, {
  title: '好未来',
  id: '922091',
  value: '1550',
  industry: '教育培训',
  logo: '5bfbc0988e503dd2ab1becf105a.jpg',
}, {
  title: '龙湖集团',
  id: '8364657',
  value: '1544',
  industry: '房地产',
  logo: '5bfe9bd974719df0ac9a198103a.png',
}, {
  title: '海底捞',
  id: '2411903',
  value: '1522',
  industry: '餐饮',
  logo: '5bfe952774719dc6ed74107003a.png',
}, {
  title: '保利地产',
  id: '1766564',
  value: '1518',
  industry: '房地产',
  logo: '5bebcf878e502d57860d32fc04a.jpg',
}, {
  title: '宁德时代',
  id: '8768998',
  value: '1512',
  industry: '新能源汽车动力电池',
  logo: '5bfea5fb74719d2aa34cef9403a.png',
}, {
  title: '顺丰控股',
  id: '866418',
  value: '1499',
  industry: '物流',
  logo: '5bfea53d74719d2aa34cde3703a.png',
}, {
  title: '融创中国',
  id: '858146',
  value: '1499',
  industry: '房地产',
  logo: '5bfea21b74719d2aa34c49f003a.png',
}, {
  title: '宝钢股份',
  id: '8660288',
  value: '1448',
  industry: '钢铁',
  logo: '5bfffb8c74719da073f1447303u.png',
}, {
  title: '三六零',
  id: '6429309',
  value: '1446',
  industry: '软件安防',
  logo: '5bfe96cf74719df0ac99199603a.png',
}, {
  title: '申洲国际',
  id: '8270675',
  value: '1420',
  industry: '服装加工',
  logo: '5bfea26874719d2aa34c585e03a.png',
}, {
  title: '携程',
  id: '182339',
  value: '1404',
  industry: '旅游',
  logo: '5bfe95c474719df0ac98e4cd03a.png',
}, {
  title: '中国国航',
  id: '9805693',
  value: '1390',
  industry: '民航',
  logo: '5cf6130c501544662c8da10808u.png',
}, {
  title: '比亚迪',
  id: '434237',
  value: '1384',
  industry: '汽车',
  logo: '5bfea07674719d2aa34bf7ef03a.png',
}, {
  title: '中兴通讯',
  id: '540933',
  value: '1364',
  industry: '通信',
  logo: '5bfe9f8674719d2aa34bc99a03a.png',
}, {
  title: '中国铁建',
  id: '2232100',
  value: '1351',
  industry: '建筑工程',
  logo: '5bfe95f074719df0ac98ed6903a.png',
}, {
  title: '万华化学',
  id: '7963270',
  value: '1343',
  industry: '化工',
  logo: '5cf6130c501544662c8da10808u.png',
}, {
  title: '上海银行',
  id: '7989653',
  value: '1259',
  industry: '银行',
  logo: '5ab1ea1b8e50ab980b86f9ab05a.jpg',
}, {
  title: '中国重工',
  id: '9360582',
  value: '1272',
  industry: '船舶制造',
  logo: '5cf6130c501544662c8da10808u.png',
}, {
  title: '安踏体育',
  id: '7991541',
  value: '1267',
  industry: '体育用品',
  logo: '5bfe98ea74719df0ac9987d403a.png',
}, {
  title: '宁波银行',
  value: '1263',
  industry: '银行',
  id: '5447539',
  logo: '54d1e9ff712eb4f6b84d34c202c.png',
}, {
  title: '申万宏源',
  value: '1255',
  industry: '证券',
  id: '9086883',
  logo: '5d131b0e2557c0239459d63e08u.jpg',
}, {
  title: '北京银行',
  value: '1250',
  industry: '银行',
  id: '9662729',
  logo: '5c62798687fd7d585851477905u.jpg',
}, {
  title: '中国银河',
  value: '1242',
  industry: '证券',
  id: '8311662',
  logo: '5bfe9f7574719d2aa34bc62d03a.png',
}, {
  title: '牧原股份',
  value: '1226',
  industry: '畜牧',
  id: '8130825',
  logo: '5bfe966974719df0ac9904fe03a.png',
}, {
  title: '京东方',
  value: '1197',
  industry: '显示器件',
  id: '886895',
  logo: '5bfe8f9f74719d35745a796c03a.png',
}, {
  title: '泸州老窖',
  value: '1184',
  industry: '酒类',
  id: '2105374',
  logo: '5bfffb9574719da073f1497703u.png',
}, {
  title: '招商证券',
  value: '1145',
  industry: '证券',
  id: '8194401',
  logo: '5bfe964274719df0ac98fcd803a.png',
}];

const { isTd } = Apps;
const redirectToCompany = (function () {
  if (isTd) {
    return function (cid) {
      share4App({
        type: [12],
        entityId: '',
        cid,
      });
    };
  }
  return function (id) {
    window.location.href = `/company/${id}/`;
  };
}());

$('[data-selector="comp-list-wrap"]').html(compList.map(function (item) {
  return `<li><dl data-selector="company-card" data-id="${item.id}"><dt><img src="https://image0.lietou-static.com/huge_/${item.logo}" alt=""></dt><dd><p class="comp-name ellipsis-1">${item.title}</p><p class="comp-industry ellipsis-1">${item.industry}</p><p class="comp-value ellipsis-1">${item.value}亿</p><p class="comp-btn">查看职位</p></dd></dl></li>`;
}).join('')).on('click', '[data-selector="company-card"]', function () {
  redirectToCompany($(this).attr('data-id'));
});

// 分享设置
const shareData = {
  shareTitle: '中国上市公司TOP100招聘专场',
  url: window.location.href,
  img: `https:${shareImg}`,
  desc: '快来看看中国最有钱的公司都招什么样的人',
  mediaType: 0,
};

if (Apps.isTd) {
  share4App({
    type: [17, 16],
    showshare: true,
    title: shareData.shareTitle,
    shareTitle: shareData.shareTitle,
    imgUrl: shareData.img,
    shareUrl: shareData.url,
    desc: shareData.desc,
    mediaType: shareData.mediaType,
    thumburl: shareData.img,
  });
} else if (Apps.isWx) {
  share({
    title: shareData.shareTitle,
    link: shareData.url,
    msgImg: shareData.img,
    desc: shareData.desc,
  });
}
