const domain = require('@liepin/native-domain-fe').default;

<template name="main">
<style type="text/css">
$ROOT{
  position: relative;
  border-radius: 4px;
  background-color: #fff;
}
$ROOT:before{
  content:'';
  width: 80px;
  height: 80px;
  position: absolute;
  top:-40px;
  left:50%;
  margin-left: -40px;
  background-color: #f8f8f8;
  border-radius: 50%;
  z-index:0;
}
.btn-close{
  position: absolute;
  left:50%;
  bottom:-68px;
  margin-left:-15px;
  width: 30px;
  height: 30px;
  background:url(../images/close.png) no-repeat;
  background-size: contain;
}
.title{
  position: relative;
  height: 25px;
  padding:23px 0 14px;
  text-align: center;
  background-color: #f8f8f8;
  z-index:1;
  border-radius: 4px 4px 0 0;
  color: #ff7351;
}
.title h3{
  font-weight: bold;
}
.title .text-icon{
  position: absolute;
  top: -18px;
  left: 50%;
  margin-left: -18px;
  font-size: 36px;
}
.main-box{
  position: relative;
  margin:10px 7% 26px;
  height: 232px;
  font-size: 14px;
  min-width: 232px;
}
.apply-privacy-box {
  height: 260px;
}
.main-box.swiper-box{
  margin:10px 0px 26px;
  height: 241px;
}
.height-box{
  height: 244px;
}
.main-box h4{
  text-align: center;
  margin-bottom: 2px;
  height: 25px;
}
.main-box h4 .text-icon{
  margin-right: 4px;
}
.main-box p{
  color: #555;
  line-height: 24px;
}
.main-box .img-box{
  text-align: center;
}
.main-box .img-box img{
  position: relative;
  width: 194px;
}
.main-box p .text-orange{
  color: #ff7351;
}
.main-box ul {
  list-style-type: disc;
  color: #555;
  margin-left: 12px;
}
.main-box ul li{
  list-style-type: disc;
}
.main-box .btn-action{
  position: absolute;
  bottom: 2px;
  width: 90%;
  background-color: #ff7351;
  border-radius: 20px;
  height: 40px;
  line-height: 40px;
  left:5%;
}
.main-box.swiper-box .btn-action{
    width: 228px;
    left: 42%;
    margin-left: -114px;
}
.main-box .bottom-tips{
  position: absolute;
  bottom:46px;
  width: 100%;
  color: #ff7351;
  left: 0;
  text-align: center;
}
.swiper-pagination{
  width: 100%;
}
.swiper-pagination-bullet{
  margin:10px 5px;
}
.swiper-pagination-bullet {
  background: #b2b2b2;
}
.swiper-pagination-bullet.swiper-pagination-bullet-active{
  background-color: #000;
}
.container-box{
  width: 78%;
  padding-left: 4%;
}
.swiper-container {
  height: 100%;
}
.swiper-pagination {
  position: absolute;
  bottom: 45px;
}
@media screen and (max-width:421px) {
  .main-box .img-box img{
    top:-6px;
  }
}
@media screen and (min-width:422px) {
  .main-box .img-box img{
    width: 215px;
    top:0px;
  }
}
</style>
<div id="$ROOT">
 <div class="box"></div>
 <a class="btn-close" href="javascript:;"></a>
</div>
<script type="text/javascript">
  const $ROOT = $(ROOT);
  $('.box', $ROOT).html(include($DATA.item));
  $('.btn-close', $ROOT).on('click', function () {
    $DATA.close && $DATA.close();
  });
</script>
</template>
<template name="improve-resume">
  <div id="$SUBROOT">
    <div class="title">
      <h3>求职·可以更加便捷高效</h3>
      <em class="text-icon icon-improve-resume"></em>
    </div>
    <div class="main-box">
      <h4>精准职位推荐：</h4>
      <p>职位页所展示的招聘信息，是根据您的简历内容及求职意向，通过猎聘大数据为您智能优选的职位，<span class="text-orange">简历越完善，推荐越精准，提高浏览效率！</span></p>
        <a class="btn btn-primary btn-large btn-action" href="javascript:;" data-selector="improve-resume">完善简历</a>
    </div>
  </div>
  <script type="text/javascript">
    window.tlog = window.tlog || [];
    window.tlog.push('s:S000010803');
    $('[data-selector="improve-resume"]', $(SUBROOT)).on('click', function () {
      window.tlog.push('c:C000010804');
      $DATA.improveResume && $DATA.improveResume();
    });
  </script>
</template>
<template name="search-job">
  <div id="$SUBROOT">
    <div class="title">
      <h3>求职·需要多一点主动</h3>
      <em class="text-icon icon-search-job"></em>
    </div>
    <div class="main-box">
      <h4>搜索职位技巧：</h4>
      <ul>
        <li>支持关键词搜索（职位/企业名称/地区 均可）</li>
        <li>根据您的搜索轨迹，推荐机制智能更新，推荐职位更加匹配！</li>
      </ul>
        <a class="btn btn-primary btn-large btn-action" href="javascript:;" data-selector="search-job">搜索职位</a>
    </div>
  </div>
  <script type="text/javascript">
    window.tlog = window.tlog || [];
    window.tlog.push('s:S000010805');
    $('[data-selector="search-job"]', $(SUBROOT)).on('click', function () {
      window.tlog.push('c:C000010806');
      $DATA.searchJob && $DATA.searchJob();
    });
  </script>
</template>
<template name="send-resume">
  <div id="$SUBROOT">
    <div class="title">
      <h3>求职·抓住每一个机遇</h3>
      <em class="text-icon icon-send-resume"></em>
    </div>
    <div class="main-box">
      <h4>投递简历:</h4>
      <ul>
        <li>支持中/英文简历投递</li>
        <li>支持简历预览，预览简历时可修改简历</li>
      </ul>
      <p class="bottom-tips">不投简历试试，怎么争取机会？</p>
        <a class="btn btn-primary btn-large btn-action" href="javascript:;" data-selector="send-resume">搜索职位</a>
    </div>
  </div>
  <script type="text/javascript">
    window.tlog = window.tlog || [];
    window.tlog.push('s:S000010807');
    $('[data-selector="send-resume"]', $(SUBROOT)).on('click', function () {
      window.tlog.push('c:C000010808');
      $DATA.searchJob && $DATA.searchJob();
    });
  </script>
</template>
<template name="apply-feedback">
  <div id="$SUBROOT">
    <div class="title">
      <h3>求职·不错过任何反馈</h3>
      <em class="text-icon icon-apply-feedback"></em>
    </div>
    <div class="main-box height-box">
      <h4><i class="text-icon icon-apply-recode"></i>应聘记录：</h4>
      <p>第一时间掌握求职进展简历已查看、已储备、面试邀约。</p>
      <h4><i class="text-icon icon-view"></i>谁看过我：</h4>
      <p>猎头顾问/企业HR来访记录更多关注，更多机遇。</p>
      <div class="img-box">
        <img src="//s.lietou-static.com/dev/c/h5/v3/static/images/pages/help/intro-img.png"/>
      </div>
    </div>
  </div>
  <script type="text/javascript">
    window.tlog = window.tlog || [];
    window.tlog.push('s:S000010830');
  </script>
</template>
<template name="personal-tailor">
  <div id="$SUBROOT">
    <div class="title">
      <h3>求职·为您推荐好工作</h3>
      <em class="text-icon icon-custom"></em>
    </div>
     <div class="main-box">
     <h4>私人订制:</h4>
      <p>我们将根据您的求职意向（行业、职能、地区、薪资等）精准匹配、智能推荐，助您快速找到满意的工作。</p>
      <? if (@isTd && @appVc >= '456'){ ?>
        <a class="btn btn-primary btn-large btn-action" href="javascript:;" data-selector="go-custom">立即订制</a>
      <?}?>
    </div>
  </div>
  <script>
    $('[data-selector="go-custom"]', $(SUBROOT)).on('click', function () {
      $DATA.tailor && $DATA.tailor();
    });
  </script>
</template>
<template name="server">
  <div id="$SUBROOT">
    <div class="title">
      <h3>求职·别忘了为自己增值</h3>
      <em class="text-icon icon-server"></em>
    </div>
    <div class="main-box swiper-box">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="container-box">
              <h4><i class="text-icon icon-credit"></i>职场信用：</h4>
              <p>尊享5项求职特权、3项认证特权。提升职场信用分、点亮认证标识，让更多HR/猎头看到您，快速收获青睐！</p>
            </div>
              <a class="btn btn-primary btn-large btn-action" href="<?=domain('m-c')?>/credit/my-page" data-selector="credit">了解更多</a>
          </div>
          <div class="swiper-slide">
            <div class="container-box">
              <h4><i class="text-icon icon-goldcard"></i>金卡会员：</h4>
              <p>开通金卡可享6大求职特权，实现简历快速曝光，让更多的猎头、HR看到自己，获得更多的面试机会！</p>
            </div>
              <a class="btn btn-primary btn-large btn-action" href="<?=domain('m-vap')?>/view-intro/?utm_source=jktdsca&imscid=R000014141" data-selector="golden-card">了解更多</a>
          </div>
          <? if(@isTd && Apps.isAndroid){ ?>
          <div class="swiper-slide">
            <div class="container-box">
              <h4><i class="text-icon icon-server"></i>简历顾问：</h4>
              <p>行业资深HR一对一优化简历，帮您挖掘个人优势，突出职业亮点，面试机会翻倍。</p>
            </div>
              <a class="btn btn-primary btn-large btn-action" href="<?=domain('m-vas')?>/view-intro" data-selector="adviser">了解更多</a>
          </div>
          <?}?>
        </div>
      </div>
      <div class="swiper-pagination"></div>

    </div>
  </div>
  <script type="text/javascript">
    require('@liepin/newswiper');

    window.tlog = window.tlog || [];
    window.tlog.push('s:S000010809');
    new Swiper('.swiper-container', { // eslint-disable-line
      pagination: '.swiper-pagination',
      effect: 'slide',
      grabCursor: true,
      loop: true,
      slideToClickedlide: true,
      centeredSlides: true,
      paginationClickable: true,
    });
  </script>
</template>
<template name="apply-privacy">
  <div id="$SUBROOT">
    <div class="title">
      <h3>求职·无需顾虑</h3>
      <em class="text-icon icon-apply-privacy"></em>
    </div>
     <div class="main-box apply-privacy-box">
      <h4>隐私设置：</h4>
      <ul>
        <li>手机隐私保护：可设置手机号码安全保护、来电漏接短信提醒、猎头来电语音提醒等，保护您的求职隐私。</li>
        <li>求职隐私：可自定义屏蔽企业、设置简历查看权限等。</li>
        <li>人脉隐私：可设置是否允许被他人搜索/推荐，通讯录是否开启等。</li>
      </ul>
        <a class="btn btn-primary btn-large btn-action" href="javascript:;" data-selector="apply-privacy">隐私设置</a>
    </div>
  </div>
  <script type="text/javascript">
    window.tlog = window.tlog || [];
    window.tlog.push('s:S000010811');
    $('[data-selector="apply-privacy"]', $(SUBROOT)).on('click', function () {
      window.tlog.push('c:C000010812');
      $DATA.setPrivacy && $DATA.setPrivacy();
    });
  </script>
</template>
<template name="feedback">
  <div id="$SUBROOT">
    <div class="title">
      <h3>您的意见帮助我们成长</h3>
      <em class="text-icon icon-feedback"></em>
    </div>
     <div class="main-box">
     <h4></h4>
      <p>如在使用过程中有任何疑问或建议，欢迎您随时留言。我们将结合意见反馈不断优化产品，为您提供更好的服务: ）</p>
        <a class="btn btn-primary btn-large btn-action" href="javascript:;" data-selector="feedback">意见反馈</a>
    </div>
  </div>
  <script type="text/javascript">
    window.tlog = window.tlog || [];
    window.tlog.push('s:S000010813');
    $('[data-selector="feedback"]', $(SUBROOT)).on('click', function () {
      window.tlog.push('c:C000010814');
      $DATA.feedback && $DATA.feedback();
    });
  </script>

</template>
