/**
 * 人才网 --> 当前职位
 * https://m.liepin.com/job/${jobId}.shtml
 * 如:
 * https://m.liepin.com/job/2161181645.shtml
 */
import '@liepin/zepto-map';
import '@liepin/zepto-back-top';
import navSet from '@liepin/zepto-nav';
import domain from '@liepin/native-domain-fe';

import downloadGuide from '../../components/business/app/app.download.guide';
import recommendJobChange from '../../components/business/job/recommend.job.change';
import hotLinkInit from '../../components/ui/hotlink/tab.hotlink';
import './index.css';
import './style/alike-job-recommend.less';
import initReport from '../../components/business/report'; // 职位过期时相关职位推荐

window.$CONFIG = window.$CONFIG || {};
const talkDownImg = require('../../static/images/pages/job/talkDownload.jpg');

// 京东金融
if (LT.Cookie.get('__tlog') && LT.Cookie.get('__tlog').split('|').pop() === 'jd_rz_02' || LT.String.getQuery('mscid') === 's_o_m10') {
  $('[data-selector="register-look-more"]').remove();
}
navSet();

const $root = $('body');
// 下载引导弹层
downloadGuide({
  showCode: 'S000013558',
  rCode: 'R000013519',
});

// 透镜---拉新
const $mainTop = $('.job-detail-list', $root).offset().top;
const $currentScale = $('[data-selector="current-scale"]', $root);
const $arrowImg = $currentScale.find('img');
const $arrowTips = $('[data-selector="arrow-tips"]', $root);
const $tips = $('[data-selector="tips"]', $root);
const $fixedTab = $('[data-selector="fixed-tab"]', $root);
const $btnReg = $('[data-selector="btn-reg"]', $root);
$btnReg.on('tap', () => {
  const targetUrl = window.location.href;
  if (!LT.User.is_lp_user) {
    window.location.href = `/login/?imscid=R000012407&url=${encodeURIComponent(targetUrl)}`;
  } else {
    window.location.href = `/register/?imscid=R000012407&return_url=${encodeURIComponent(targetUrl)}`;
  }
});
if (!LT.User.isLogin) {
  $(window).on('load scroll', () => {
    if ($(window).scrollTop() > $mainTop) {
      $fixedTab.addClass('show');
      $currentScale.css({ width: '80%' });
      $arrowImg.show();
    } else if ($(window).scrollTop() === 0) {
      $fixedTab.removeClass('show');
    }
  });
} else {
  $(window).on('load scroll', () => {
    if ($(window).scrollTop() > $mainTop) {
      $fixedTab.addClass('show');
      $currentScale.css({ width: '50%' });
      $arrowImg.show();
    } else if ($(window).scrollTop() === 0) {
      $fixedTab.removeClass('show');
    }
  });
}
$arrowTips.on('click', () => {
  if (!$tips.is(':visible')) {
    $tips.fadeIn();
    let i = 3;
    const timer = setInterval(() => {
      if (i === 0) {
        $tips.fadeOut();
        clearInterval(timer);
      }
      i--;
    }, 1000);
  }
});

// 投递成功弹框，需要自适应
(function () {
  $('html').css({ 'font-size': 50 * parseInt(document.documentElement.clientWidth, 10) / 1080 });
}());

// 展示更多企业标签
const $welfareTags = $('[data-selector="welfare-tags"]', $root);
if ($welfareTags.height() > 44) {
  $welfareTags.addClass('tags-part');
  $welfareTags.after('<a href="javascript:;" class="btn btn-fold tags-more" data-selector="tags-more"><em class="text-icon icon-down"></em></a>');
  const $tagMore = $('[data-selector="tags-more"]', $root);
  $tagMore.on('click', () => {
    if ($welfareTags.hasClass('tags-part')) {
      $welfareTags.removeClass('tags-part').addClass('tags-all');
      $tagMore.addClass('btn-unfold');
    } else {
      $welfareTags.removeClass('tags-all').addClass('tags-part');
      $tagMore.removeClass('btn-unfold');
    }
  });
}

// 职位描述展开收起
function foldUnfold(ele) {
  const mainWord = ele.prev();
  if (mainWord.hasClass('height-part')) {
    mainWord.removeClass('height-part');
    ele.addClass('btn-unfold');
    $('[data-selector="part-all"]', ele.closest('a')).html('收起');
  } else {
    mainWord.addClass('height-part');
    ele.removeClass('btn-unfold');
    $('[data-selector="part-all"]', ele.closest('a')).html('查看全部');
  }
}
const jobDetailList = $('.job-detail-list', $root);
const aboutUs = $('[data-selector="about-us-main"]', jobDetailList);
// 如果用户登录则取消展开收起功能
if (aboutUs.height() >= 200 && !LT.User.isLogin) {
  aboutUs.addClass('height-part');
  aboutUs.after(' <a href="javascript:;" class="btn btn-fold"><span data-selector="part-all">查看全部</span><em class="text-icon icon-down"></em></a>');
  $('.btn-fold', jobDetailList).on('click', function () {
    foldUnfold($(this));
  });
} else {
  $('.btn-fold', jobDetailList).length && $('.btn-fold', jobDetailList).remove();
}
// 企业介绍展开收起
const companyDetail = $('.company-detail', $root);
const aboutCompany = $('[data-selector="about-company"]', companyDetail);
if (aboutCompany.height() >= 140) {
  aboutCompany.addClass('height-part');
  aboutCompany.after(' <a href="javascript:;" class="btn btn-fold"><span data-selector="part-all">查看全部</span><em class="text-icon icon-down"></em></a>');
  $('.btn-fold', companyDetail).on('click', function () {
    foldUnfold($(this));
  });
} else {
  $('.btn-fold', companyDetail).length && $('.btn-fold', companyDetail).remove();
}
// 百度地图
const gdMap = $('[data-selector="gdmap"]', $root);
if (gdMap && gdMap.length) {
  const compDq = $.trim(gdMap.attr('data-city'));
  const compAddress = $.trim(gdMap.attr('data-address'));
  if (compAddress && compAddress !== '') {
    gdMap.gdmap({
      address: compAddress,
      city: compDq,
      width: '100%',
      height: '20em',
    });
  }
}
// 地图默认隐藏
gdMap && gdMap.addClass('map-hidden');
// 点击地址，展现和关闭地图
const $lookMap = $('[data-selector="look-map"]', $root);
$lookMap.on('click', () => {
  const offT = $('.work-place').offset().top;
  $root.scrollTop(offT);
  gdMap.toggleClass('map-hidden');
});

// 卡片式点击特殊处理
$('[data-selector="card-link"]', $root).on('tap', function () {
  const link = $(this).find('.job-img').attr('href');
  const dataPromid = $(this).find('.job-name').attr('data-promid');
  window.location.href = `${link}?${dataPromid}`;
});
// 内链模块tab切换
hotLinkInit();

initReport($('[data-selector="report-btn"]'), {
  reportedJobKind: '2',
  reportedJobId: $CONFIG.job_id,
  type: 'job',
});

// 推荐职位, 换一换交互
recommendJobChange();
// 企业介绍
const $infoContent = $('[data-selector="info-content"]', $root);
$('[data-selector="more-business-info"]', $root).on('click', function () {
  const isMore = $infoContent.hasClass('short-info');
  const $this = $(this);
  if (isMore) {
    $infoContent.removeClass('short-info');
    $('.text-icon', $this).attr('class', 'text-icon icon-up');
    $this.find('span').text('收起');
  } else {
    $infoContent.addClass('short-info');
    $('.text-icon', $this).attr('class', 'text-icon icon-down');
    $this.find('span').text('查看全部');
  }
});
// 沟通下
$('.job-publisher', $root).on('click', () => {
  if (!LT.User.isLogin) {
    window.location.href = '/register/?imscid=R000011064';
  } else {
    $.dialog({
      width: '100%',
      title: false,
      top: '15%',
      maskTapClose: true,
      css: { background: 'transparent' },
      content: `<div class="text-center" style="padding:0 20px;">
                  <img data-selector="app-download-closebtn" style="position: absolute;right: 8%;width: 30px;top: 2%;height: 30px;" src="//s.lietou-static.com/dev/c/h5/v3/static/images/pages/job/index-download-close.png" alt="" />
                  <img style="width: 100%;" src="${talkDownImg}"/>
                  <a href="${domain('m-c')}/tdown" style="position: absolute;width: 66%;height: 12%;right: 0;left: 0;margin: auto;bottom: 8%;"/>
                </div>`,
      init() {
        const that = this;
        $('[data-selector="app-download-closebtn"]').on('click', () => {
          that.close();
        });
      },
    });
  }
});
$('[data-selector="btn-apply-job"]', $root).on('click', () => {
  if (!LT.User.isLogin) {
    const url = window.location.href;
    window.location.href = `/register/?imscid=R000011102&return_url=${encodeURIComponent(url)}`;
  }
});
// 批量应聘
const returnUrl = window.location.href;
$('[data-selector="batch-apply"]', $root).on('click', function () {
  if (!LT.User.isLogin) {
    const url = window.location.href;
    window.location.href = `/register/?imscid=R000011109&return_url=${encodeURIComponent(url)}`;
  } else {
    const listArr = [];
    const jobInfoArr = [];
    $('.job-card input', $root).each(function (index, v) {
      if ($(this).is(':checked')) {
        const obj = {
          jobId: $(v).attr('data-job-id'),
          jobKind: $(v).attr('data-job-kind'),
          jobIndex: $(v).attr('data-index'),
        };
        const connectJobInfo = `${obj.jobKind}_${obj.jobId}_${obj.jobIndex}`;
        jobInfoArr.push(connectJobInfo);
        listArr.push(obj);
      }
    });
    if (listArr.length === 0) {
      $.dialog.message('请选择您要投递的职位！', 1);
      return false;
    }
    $.ajax({
      url: `${domain('m-c')}/apply/applybatch.json`,
      type: 'post',
      dataType: 'jsonp',
      data: { jobInfo: JSON.stringify(listArr) },
      cache: false,
      success(data) {
        if (data.flag === 1) {
          $.dialog.message('投递成功！已添加到“个人中心”进行查看', 2);
        } else if (data.code === 70001 || data.code === '70001') {
          $.dialog({
            title: false,
            content: '<div class="resume-tips"><p>抱歉，您的简历还不完善<p></div>',
            button: [{
              name: '取消',
              callback() {
                this.close();
              },
              className: 'btn-normal',
            }, {
              name: '去完善简历',
              callback() {
                window.location.href = `/home/?url=${returnUrl}`;
              },
              className: 'btn-perfect',
            }],
          });
        } else {
          $.dialog.toast(data.msg || '应聘失败！');
        }
      },
    });
  }
});
// 拉新卡片
$('[data-selector="fire-card"]', $root).on('click', () => {
  if (!LT.User.isLogin) {
    window.location.href = '/register/?imscid=R000011063';
  }
});

// 初始化返回顶部
$root.backTop();
