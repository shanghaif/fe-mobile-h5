<template name="main">
  <style type="text/css">
    $ROOT {
      background:transparent;
      padding:0 55px;
    }
    .share-img{
      margin-top:10px;
      text-align:right;
      margin-bottom:55px;
    }
    .share-img img{width:110px;}
    .back-btn{
      line-height: 36px;
      height: 36px;
      font-size: 15px;
      width: 70%;
    }
  </style>
  <div id="$ROOT">
    <div class="share-img">
      <img src="https://image0.lietou-static.com/img/5a5c92488e50e5cddb3c7eb304a.png" />
    </div>
    <p class="text-center">
      <a href="javascript:;" class="back-btn btn btn-xlarge btn-primary" data-selector="back">返回</a>
    </p>
  </div>
  <script type="text/javascript">
    const $ROOT = $(ROOT);
    $('[data-selector="back"]', $ROOT).on('click', () => {
      $.dialog.focus.close();
    });
  </script>
</template>