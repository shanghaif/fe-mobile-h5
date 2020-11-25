/* eslint-disable no-new */
import Swiper from '@liepin/newswiper';
import share, { share4App } from '@liepin/share';
import shareImg from './images/share.jpg';
import './index.less';

const { isTd } = Apps;
// 排行数据
const rankingList = [{
  title: '数据架构',
  data: 44.941,
}, {
  title: '数据科学家',
  data: 43.584,
}, {
  title: '深度学习',
  data: 33.822,
}, {
  title: '图像识别',
  data: 33.205,
}, {
  title: '推荐算法',
  data: 32.439,
}, {
  title: '机器学习',
  data: 31.355,
}, {
  title: '语音识别',
  data: 31.355,
}, {
  title: '自然语音处理',
  data: 30.355,
}, {
  title: '搜索算法',
  data: 30.03,
}, {
  title: '算法研究',
  data: 28.282,
}];
// 大厂数据
const bigList = [{
  title: '深兰科技(上海)有限公司',
  tags: ['五险一金', '年底双薪', '技能培训', '扁平管理'],
  desc: '深兰科技由归国博士团队创立于2014年，是快速崛起的人工智能梯队重要企业，致力于人工智能基础研究和应用开发，上海高新科技企业，院士工作站。',
  id: '9496603',
  logo: '5b232d558e50f134ce6e221804a.jpg',
  jobs: [{
    id: '20160697',
    title: '智能硬件产品经理',
    dq: '上海',
    degree: '统招本科',
    salary: '20-39万',
  }, {
    id: '18546149',
    title: 'C++开发工程师',
    dq: '上海',
    degree: '统招本科',
    salary: '18-36万',
  }, {
    id: '18830353',
    title: '孵化器运营总监',
    dq: '上海',
    degree: '统招本科',
    salary: '18-36万',
  }],
}, {
  title: '科大讯飞股份有限公司',
  tags: ['生育补贴', '岗位晋升', '弹性工作', '五险一金'],
  desc: '科大讯飞是一家专业从事智能语音及语言技术研究、软件及芯片产品开发、语音信息服务及电子政务系统集成的国家级骨干软件企业，其智能语音核心技术代表了世界的先进水平。',
  id: '4454894',
  logo: '54d1e9c4712eb4f6b84cf69202c.png',
  jobs: [{
    id: '19641379',
    title: '市场研究高级经理',
    dq: '北京',
    degree: '统招本科',
    salary: '24-36万',
  }, {
    id: '16356251',
    title: '用户体验经理UEC',
    dq: '北京',
    degree: '本科及以上',
    salary: '24-36万',
  }, {
    id: '21002305',
    title: '高级品牌策划经理',
    dq: '北京',
    degree: '统招本科',
    salary: '28-49万',
  }],
}, {
  title: '旷视科技有限公司',
  tags: ['技能培训', '带薪年假', '年度旅游', '岗位晋升'],
  desc: '旷视(Face++)成立于2011年，是为行业型和个人型用户提供全方位的智能解决方案和智能数据服务的人工智能企业。',
  id: '7858396',
  logo: '5c3e9ae123c8e0b98aec273002u.jpg',
  jobs: [{
    id: '20256021',
    title: '产品经理（美颜/互娱）',
    dq: '北京',
    degree: '统招本科',
    salary: '28-49万',
  }, {
    id: '19511791',
    title: '影像产品经理',
    dq: '北京',
    degree: '统招本科',
    salary: '24-48万',
  }, {
    id: '18929685',
    title: '技术支持工程师（python）',
    dq: '北京',
    degree: '本科及以上',
    salary: '18-24万',
  }],
}, {
  title: '商汤科技开发有限公司',
  tags: ['股票期权', '提供宿舍', '午餐补助', '绩效奖金'],
  desc: '致力于引领人工智能核心“深度学习”技术突破，构建人工智能、大数据分析行业解决方案。',
  id: '8349238',
  logo: '5bfea48b74719d2aa34cbe8303a.png',
  jobs: [{
    id: '15800019',
    title: '应用软件工程师',
    dq: '北京',
    degree: '统招本科',
    salary: '30-60万',
  }, {
    id: '20716321',
    title: '商务拓展BD经理',
    dq: '北京',
    degree: '本科及以上',
    salary: '30-53万',
  }, {
    id: '20078927',
    title: '资深Android系统工程师',
    dq: '北京',
    degree: '统招本科',
    salary: '38-68万',
  }],
}, {
  title: '地平线机器人科技有限公司',
  tags: ['股票期权', '绩效奖金', '技术大牛', '弹性工作'],
  desc: '地平线 (Horizon Robotics)致力于成为边缘人工智能计算平台全球带头者，以“赋能万物，让每个人的生活更安全、更美好”为使命。',
  id: '8871522',
  logo: '5bb06e388e50fb8f558af35e04a.jpg',
  jobs: [{
    id: '15159457',
    title: '前端开发工程师',
    dq: '北京',
    degree: '统招本科',
    salary: '49-70万',
  }, {
    id: '19253013',
    degree: '学历不限',
    title: '数据开发工程师',
    dq: '北京',
    salary: '30-48万',
  }, {
    id: '18980939',
    degree: '本科及以上',
    title: 'AI芯片解决方案产品经理',
    dq: '北京',
    salary: '42-60万',
  }],
}];
// 黑马数据
const blackList = [{
  title: '优必选',
  id: '8095160',
  logo: '5cb571d1e5a8a6695f35eb8c03u.jpg',
}, {
  title: '同盾科技',
  id: '8166029',
  logo: '5954d342703287e466d0644605a.jpg',
}, {
  title: '零氪科技',
  id: '8004941',
  logo: '5bfea28374719d2aa34c5d4403a.png',
}, {
  title: '小马智行',
  id: '9382502',
  logo: '5bfe916674719d35745ad27403a.png',
}, {
  title: '禾赛科技',
  id: '8399607',
  logo: '598bf78870323878a3bbaa6004a.jpg',
}, {
  title: '小视科技',
  id: '8735113',
  logo: '598ac63670323878a3bb40aa04a.jpg',
}, {
  title: '追一科技',
  id: '8848920',
  logo: '5bfb61648e503dd2ab1b3f1604a.png',
}, {
  title: '云拿科技',
  id: '9281045',
  logo: '5987d13a70323878a3b9f55c04a.png',
}, {
  title: '竹间科技',
  id: '8608119',
  logo: '59687369703221ef708aa5aa06a.png',
}, {
  title: '驰声科技',
  id: '8977251',
  logo: '5bfe91a774719d35745adf4703a.png',
}];
// 热招数据
const hotList = [{
  id: '16220047',
  title: 'C++后端开发工程师（AI方向）',
  dq: '北京',
  degree: '统招本科',
  companyName: '快手科技',
  salary: '36-60万',
}, {
  id: '16924105',
  title: '人工智能算法工程师',
  dq: '成都',
  degree: '硕士及以上',
  companyName: '爱奇艺',
  salary: '24-48万',
}, {
  id: '19095425',
  title: 'AI技术总监',
  dq: '北京',
  degree: '学历不限',
  companyName: '完美世界',
  salary: '48-72万',
}, {
  id: '19380535',
  title: 'AI策略产品经理(J190422011)',
  dq: '北京',
  degree: '本科及以上',
  companyName: '滴滴',
  salary: '30-60万',
}, {
  id: '20803259',
  title: '智能数据产品经理',
  dq: '上海',
  degree: '本科及以上',
  companyName: 'NIO蔚来',
  salary: '面议',
}, {
  id: '20910245',
  title: '高级产品经理-智能客服方向 (MJ003642)',
  dq: '北京',
  degree: '本科及以上',
  companyName: '去哪儿',
  salary: '29-58万',
}, {
  id: '16533817',
  title: '人工智能高级产品运营（用户增长方向）',
  dq: '北京',
  degree: '本科及以上',
  companyName: '今日头条',
  salary: '34-66万',
}, {
  id: '19779951',
  title: '车联网事业部_资深AI产品经理',
  dq: '北京',
  degree: '统招本科',
  companyName: '百度',
  salary: '36-60万',
}, {
  id: '19462067',
  title: '30361-移动端AI软件工程师',
  dq: '上海',
  degree: '学历不限',
  companyName: '腾讯',
  salary: '面议',
}, {
  id: '17428911',
  title: '人工智能产品专家',
  dq: '杭州',
  degree: '本科及以上',
  companyName: '阿里巴巴',
  salary: '39-78万',
}, {
  id: '21024025',
  title: 'AI工程师',
  dq: '北京',
  degree: '本科及以上',
  companyName: '360',
  salary: '30-36万',
}, {
  id: '17630039',
  title: 'AI平台/工程技术负责人',
  dq: '北京',
  degree: '本科及以上',
  companyName: '美团点评',
  salary: '75-120万',
}];

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

const redirectToJob = (function () {
  if (isTd) {
    return function (jobId, index) {
      share4App({
        type: [9],
        jobKind: '2', // 职位类型
        jobId, // 职位ID
        asFrom: 'special_activity_2019_ai', // 跳转职位详情页来源
        selectIndex: index,
      });
    };
  }
  return function (jobId) {
    window.location.href = `/job/19${jobId}.shtml`;
  };
}());


const rankMax = rankingList[0].data;
const rankTitleMaxLen = Math.max.apply(null, rankingList.map((item) => item.title.length));
const rankDataMaxLen = Math.max.apply(null, rankingList.map((item) => `${item.data}`.length));
// 填充排行内容
$('[data-selector="excel-wrap"]').html(rankingList.map(function (item) {
  return `<div class="excel-item"><div class="excel-title" style="width:${rankTitleMaxLen}em;">${item.title}</div><div class="excel-bar"><div class="bar-status" style="width:${item.data / rankMax * 100}%;"></div></div><div class="excel-data" style="width:${rankDataMaxLen}em;">${item.data}万</div></div>`;
}));
// 填充大厂内容
$('[data-selector="big-wrap"]').html(bigList.map(function (item) {
  return (
    `<div class="swiper-slide">
      <div class="comp-wrap">
        <div class="info-wrap">
          <p class="comp-name ellipsis-1">${item.title}</p>
          ${item.tags.reduce((t, l, i) => (t + (i % 2 ? `<li>${l}</li></ul>` : `<ul class="label-wrap clearfix"><li>${l}</li>`)), '')}
        </div>
        <div class="img-wrap">
          <img src="https://image0.lietou-static.com/huge_/${item.logo}" alt="" />
        </div>
      </div>
      <div class="comp-desc ellipsis-2">${item.desc}</div>
      <div class="job-list">
        ${item.jobs.reduce((t, j) => (`${t}<li data-selector="job-card" data-id="${j.id}"><div class="job-title">${j.title}</div><div class="info-wrap"><div class="job-info-wrap"><div class="job-info ellipsis-1">${j.dq} | ${j.degree}</div></div><div class="job-salary">${j.salary}</div></div></li>`), '')}
      </div>
    </div>`
  );
}));
// 填充黑马内容
$('[data-selector="black-wrap"]').html(blackList.map(function (item) {
  return `<li><dl data-id="${item.id}" data-selector="company-card"><dt><img src="https://image0.lietou-static.com/huge_/${item.logo}" /></dt><dd><p class="company-name ellipsis-1">${item.title}</p><div class="allpy-btn">点击投递</div></dd></dl></li>`;
}));
// 填充热招内容
$('[data-selector="hot-wrap"]').html(hotList.map(function (item) {
  return `<li data-selector="job-card" data-id="${item.id}"><div class="job-title">${item.title}</div><div class="other-info"><div class="company-name">${item.companyName}</div><div class="job-info-wrap"><div class="job-info ellipsis-1">${item.dq} | ${item.degree}</div></div><div class="job-salary">${item.salary}</div></div></li>`;
}));
// 初始化大厂swiper
new Swiper('[data-selector="swiper-container"]', {
  autoplay: 3500,
  autoHeight: true,
  loop: true,
  pagination: '.swiper-pagination',
});

$('body').on('click', '[data-selector="company-card"]', function () {
  redirectToCompany($(this).attr('data-id'));
}).on('click', '[data-selector="job-card"]', function () {
  const $this = $(this);
  redirectToJob($this.attr('data-id'), $this.index());
});

// 分享设置
const shareData = {
  shareTitle: '2019人工智能行业招聘专场',
  url: window.location.href,
  img: `https:${shareImg}`,
  desc: '点击查看人工智能行业薪资排名',
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
