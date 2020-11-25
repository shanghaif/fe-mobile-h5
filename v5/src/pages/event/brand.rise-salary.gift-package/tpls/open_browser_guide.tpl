<template name="main">
  <style>
    .open-browser-dialog {
      position: relative;
      color: #fff;
      font-size: 16px;
      line-height: 22.5px;
      padding-top: 83.5px;
      text-align: center;
    }
    .open-browser-dialog:before {
      content: "";
      position: absolute;
      top: 0;
      right: 20px;
      width: 75.5px;
      height: 87px;
      background: url(../images/icon-arrow.png) no-repeat center / 100% 100%;
      transform: rotateX(30deg);
    }
    .open-browser-dialog p:nth-child(2) {
      font-weight: bold;
    }
  </style>
  <div id="$ROOT">
    <div class="open-browser-dialog">
      <p>点击屏幕右上角「···」</p>
      <p>分享给微信群或微信好友</p>
    </div>
  </div>
  <script>

  </script>
</template>