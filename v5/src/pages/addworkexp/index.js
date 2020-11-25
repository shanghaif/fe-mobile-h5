/**
 * https://m.liepin.com/user/editworkexp/
 * 完善工作经历, 从应聘完善简历进入
 * 12911628964 测试账号可以进入
 */

import '@liepin/zepto-valid';
import datepicker from '@liepin/zepto-datepicker';
import './index.css';

$(() => {
  const $root = $('body');
  const $form = $('[data-selector="form"]', $root);
  const $workTime = $('[data-selector="work-time"]', $form);
  const $iconClose = $('[data-selector="icon-close"]', $root);
  const $updateDate = $('[data-selector="update-date"]', $root);
  const $updateDateInput = $('[name="isUpdatePreEndDate"]', $root);
  const $cityLabel = $('[data-selector="current-city"]', $form);
  const $inputResult = $('.select-result', $form);
  // 如果selectui结果不为空，清除placeholder样式
  $inputResult.each(function () {
    const $this = $(this);
    if (!$this.text() === '请选择') {
      $this.removeClass('placeholder');
    }
  });
  // 页面关闭按钮（回退上个页面）
  $iconClose.on('click', () => {
    window.history.go(-1);
  });
  // 工作经历起止时间
  $('[data-selector="work-start-date"]', $form).on('click', function () {
    const curYear = new Date().getFullYear();
    datepicker.open({
      dateFormat: 'YYYY-MM',
      defaultValue: `${curYear}-1`,
      tonow: false,
      success(result) {
        $('[name="startDate"]', $form).val(result.value);
        $('.work-start-date', $workTime).html(result.value).removeClass('placeholder');
        if (!$('.work-end-date', $form).html()) {
          $('[name="endDate"]', $form).val('9999-99');
          $('.work-end-date', $form).html('至今').removeClass('placeholder');
        }
        if (window.$CONFIG.latestWorkEndDateIsToday) {
          $updateDate.show();
        }
      },
    });
  });
  $('[data-selector="work-end-date"]', $form).on('click', () => {
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth() + 1;
    const endTime = $('.work-end-date', $form).html();
    const endT = !endTime ? `${curYear}-${curMonth}` : '9999-99';
    datepicker.open({
      dateFormat: 'YYYY-MM',
      defaultValue: endT,
      tonow: true,
      success(result) {
        const showTime = result.value === '9999-99' ? '至今' : result.value;
        $('[name="endDate"]', $workTime).val(result.value);
        $('.work-end-date', $workTime).html(showTime).removeClass('placeholder');
        if (window.$CONFIG.latestWorkEndDateIsToday && showTime === '至今') {
          $updateDate.show();
        } else {
          $updateDate.hide();
        }
      },
    });
  });
  // 是否同时修改上一段工作经历
  $updateDateInput.on('change', function () {
    $updateDateInput.val() === '0' ? $updateDateInput.val('1') : $updateDateInput.val('0');
  });
  // 薪资保密
  const $secret = $('[data-selector="secret-salary"]', $form);
  $secret.on('click', function () {
    $('[type="radio"]', $secret).prop('checked', false);
    if ($secret.hasClass('secret-on')) {
      $secret.removeClass('secret-on').find('[value="1"]').prop('checked', true);
      $secret.find('span').text('显示');
    } else {
      $secret.addClass('secret-on').find('[value="0"]').prop('checked', true);
      $secret.find('span').text('保密');
    }
  });
  // 选择城市 有容器才初始化组件
  if ($cityLabel.size()) {
    // 结果显示元素
    const $cityResult = $('.select-result', $cityLabel);
    // 值的隐藏域
    const $cityCode = $('[name="dqCode"]');
    const cityValue = $cityCode.val();
    // 若初始值为空显示placeholder: 工作地点
    if (cityValue === '') {
      $cityResult.html('工作地点').addClass('placeholder');
    }
    import(/* webpackChunkName: "city-async" */'@liepin/react-city-h5/src/City4Native').then(function ({ default: City4Native }) {
      const cityComp = new City4Native({
        max: 1,
        value: cityValue ? [cityValue] : [],
        onChange(vals, result) {
          const newVal = vals ? vals[0] : '';
          const oldValue = $cityCode.val();
          if (oldValue === newVal) {
            return;
          }
          if (newVal) {
            $cityCode.val(newVal);
            result[0] && $cityResult.html(result[0].name).removeClass('placeholder');
          } else {
            $cityCode.val(newVal);
            $cityResult.html('工作地点').addClass('placeholder');
          }
          cityComp.hide();
        },
      });
      $cityLabel.on('click', () => cityComp.show());
    });
  }
  function saveFn() {
    $.ajax({
      url: $form.attr('action'),
      type: 'post',
      dataType: 'json',
      data: $form.serializeArray(),
      success(data) {
        if (data.flag === 1) {
          LT.Cookie.set('work_add', 1, 180, '/', window.location.hostname);
          window.history.go(-1);
        } else {
          $.dialog.toast(data.msg);
        }
      },
    });
  }
  // 表单验证
  $form.valid({
    scan(data) {
      if (!data.valid) {
        $.dialog.toast(data.firstError.customErrorMsg);
      }
      if ($('[name="workExpForm.startDate"]', $form).val() > $('[name="workExpForm.endDate"]', $form).val()) {
        $.dialog.toast('结束时间不能大于开始时间！');
        data.valid = false;
      }
    },
    success() {
      if ($('.work-end-date', $workTime).html() === '至今') {
        window.$CONFIG.syncNameCard = true;
      }
      if (window.$CONFIG.syncNameCard && window.$CONFIG.isShowSyncNameCard) {
        $.dialog({
          content: '保存新的经历 将同步修改名片中的公司名称，从而导致您 <span style="color:#ff7101">当前已验证的身份信息（名片、工牌等）失效</span>，您确定要保存修改吗？',
          closeIcon: true,
          width: '80%',
          button: [{
            name: '取消保存',
            className: 'btn-cancel',
            callback() {
              $.dialog.closeAll();
            },
          }, {
            name: '确认修改',
            className: 'btn-normal',
            callback() {
              saveFn();
            },
          }],
        });
      } else {
        saveFn();
      }
      return false;
    },
  });
});
