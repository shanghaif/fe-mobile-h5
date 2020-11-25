<template name="main">
  <style type="text/css">
  .download-center-box {
    position: relative;
    margin-top: 26%;
    text-align: center;
  }
  .download-center-box .index-banner {
    width: 100%;
  }
  .download-center-box .index-banner-close {
    position: absolute;
    top: -4%;
    right: 8%;
    min-width: 30px;
    width: 7%;
    z-index: 10;
  }
  </style>
  <div id="$ROOT">
    <div class="download-center-box">
      <img class="index-banner" src="../images/company-download-img.png">
      <img data-nick="index_banner_close" class="index-banner-close" src="../images/index-download-close.png">
    </div>
  </div>
  <script type="text/javascript">
    const domain = require('@liepin/native-domain-fe').default;

    const $ROOT = $(ROOT); // eslint-disable-line
    // 点击banner打开下载链接
    $('.index-banner', $ROOT).on('click', function () {
      LT.Cookie.set('app-banner', 'yes');
      $.dialog.focus.close();
      window.tlog.push('s:S000013562');
      window.location.href = `${domain('m-c')}/tdown?imscid=R000013521`;
    });
    $('.index-banner-close', $ROOT).on('click', function () {
      LT.Cookie.set('app-banner', 'yes', 1);
      $.dialog.focus.close();
    });
  </script>
</template>
