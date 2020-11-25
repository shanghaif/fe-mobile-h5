<template name="main">
  <style type="text/css">
    .btn-primary{
      background:#ff6644;
      color:#fff;
      border:0 none;
      border-radius:0;
      height:45px;
      line-height:45px;
    }
    .user-card-title{font-size:18px;margin-bottom: 15px; text-align:center;}
    .user-card-info{background: #F8F8F8; border:1px solid #E8E8E8; padding:10px; margin-bottom:20px;}
    .user-card-img{width:32px; height:32px; border-radius:50%; float:left;}
    .user-card-main{padding-left:42px; font-size:14px;color:#666;}
    .user-card-main .user-card-name{font-size:16px; color:#333;}
    .user-card-main .user-card-name span{color:#999; font-size:12px; margin-left:5px; font-weight:normal;}
    .edit-card a{text-align:center; font-size:12px; color:#666; display:block}
    .edit-card a i{font-size:18px; color:#ff6644;}
  </style>
  <div id="$ROOT">
    <h2 class="user-card-title">发送名片给猎头</h2>
    <div class="user-card-info">
      <img class="user-card-img" src="https://image0.lietou-static.com/tiny/<?=@photo?>" />
      <div class="user-card-main">
        <h2 class="user-card-name">
          <?=@name?><span><?=@companyName?></span>
        </h2>
        <p><?=@workName?> | <?=@workExp?> | <?=@eduLevel?> </p>
        <p><?=@email?></p>
        <p><?=@phoneNumber?></p>
      </div>
    </div>
    <div class="tool-bar flexbox">
      <div class="edit-card flex-1">
        <a href="javascript:;" data-selector="edit-card">
          <i class="text-icon icon-pencil"></i><br />修改名片
        </a>
      </div>
      <div class="flex-3">
        <a href="javascript:;" data-selector="send" class="btn btn-xlarge btn-primary">发送名片</a>
      </div>
    </div>
  </div>
  <script type="text/javascript">
    const $ROOT = $(ROOT);
    $('[data-selector="edit-card"]', $ROOT).on('click', function () {
      if ($DATA.completed) {
        $.dialog.sysmessage('请在猎聘APP里修改信息', 3, 'auto', { closeIcon: false });
      } else {
        window.location.href = $DATA.edit_url;
      }
    });
    // 发送
    $('[data-selector="send"]', $ROOT).on('click', function () {
      $.ajax({
        url: '/share/interested.json',
        type: 'POST',
        data: {
          hjobId: $CONFIG.job_id,
          parentOpenId: $CONFIG.parentOpenId,
          open_id: window.weixinAuthInfo.open_id,
        },
        dataType: 'json',
        success(data) {
          if (data.flag === 1) {
            $.dialog.sysmessage('您已将您的名片和意向发送给猎头，请等待对方的反馈', 3, 'auto', { closeIcon: false });
            $.dialog.focus.close();
          } else {
            $.dialog.toast(data.msg);
          }
        },
      });
    });
  </script>
</template>
