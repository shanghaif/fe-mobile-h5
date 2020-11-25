/**
 * 注册第三步 教育经历编辑
 * https://m.liepin.com/registerresume/toediteduexp/?res_id_encode=87fe8c81R98dc9ee6&imscid=R000000028&edmUrl=&mscid=
 */
import '@liepin/zepto-valid';
import navSet from '@liepin/zepto-nav';
import eduLevel from '@liepin/dict-collect-h5/edu-level';
import selectUi from '@liepin/selectui';
import domain from '@liepin/native-domain-fe';
import DatePicker from '../../components/business/react-datepicker-4ES';
import './index.css';

window.$CONFIG = window.$CONFIG || {};
const $form = $('[data-selector="form"]');
// const $edulevel = $('[data-selector="edulevel"]', $form);
const $schoolTime = $('[data-selector="scholl-time"]', $form);
const $inputResult = $('.select-result', $form);
// 解决history.go(-1)不刷新页面问题
const storage = window.sessionStorage;
const itemname = 'histotyBackBasic';

const $start = $schoolTime.find('[name="eduExpForm.startDate"]');
const $end = $schoolTime.find('[name="eduExpForm.endDate"]');
const $startResult = $schoolTime.find('.edu-start-date');
const $endResult = $schoolTime.find('.edu-end-date');

if (storage.getItem(itemname)) { // 如果本地有记录
  if (storage.getItem(itemname) === 'true') {
    storage.setItem(itemname, false);
    window.location.reload();
  }
}
// 导航左右图标
navSet({
  leftIcon: 'noicon',
  rightIcon: 'noicon',
});
$inputResult.each(function () {
  if (!$(this).text() === '请选择') {
    $(this).removeClass('placeholder');
  }
});
// 初始默认值
$(function () {
  const endDateVal = $end.val();
  const endDateText = endDateVal === '9999-99' ? '至今' : endDateVal;
  $startResult.html($start.val());
  $endResult.html(endDateText);

  const startComp = new DatePicker({
    title: '开始时间',
    defaultValue: $start.val() || `${$CONFIG.curYear - 4}-09`,
    format: 'yyyy-MM',
    onChange(val) {
      if (val) {
        $start.val(val);
        $startResult.html(val).removeClass('placeholder');
      } else {
        $start.val('');
        $startResult.html('').addClass('placeholder');
      }
    },
  });
  $startResult.on('click', () => {
    startComp.render({ visible: true });
  });

  const endComp = new DatePicker({
    title: '结束时间',
    defaultValue: $end.val() || `${$CONFIG.curYear}-07`,
    format: 'yyyy-MM',
    endYear: new Date().getFullYear() + 5,
    onChange(val) {
      if (val) {
        $end.val(val);
        $endResult.html(val === '9999-99' ? '至今' : val).removeClass('placeholder');
      } else {
        $end.val('');
        $endResult.html('').addClass('placeholder');
      }
    },
  });
  $endResult.on('click', () => {
    endComp.render({ visible: true });
  });
});

// 学历
const defaultText = '<i class="default-text">请选择</i>';
const $eduLevel = $('[data-selector="edulevel"]');
const $eduDegree = $('[name="eduExpForm.redDegree"]');
const eduDegreeText = selectUi.get(eduLevel, $eduDegree.val(), false) || defaultText;
$('.select-result', $eduLevel).html(eduDegreeText);
$eduLevel.on('click', () => {
  selectUi.open({
    options: eduLevel,
    selected: $eduDegree.val() || '040',
    en: false,
    success: (result) => {
      $('.select-result', $eduLevel).text(result.text).removeClass('placeholder');
      $eduDegree.val(result.value);
    },
  });
});

// 是否统招
const $recruitment = $('[data-selector="recruitment"]', $form);
$recruitment.on('click', function () {
  $('[type="radio"]', $recruitment).prop('checked', false);
  if ($recruitment.hasClass('secret-on')) {
    $recruitment.removeClass('secret-on').find('[value="0"]').prop('checked', true);
    $recruitment.find('span').text('统招');
  } else {
    $recruitment.addClass('secret-on').find('[value="1"]').prop('checked', true);
    $recruitment.find('span').text('统招');
  }
});
$('[data-selector="eduexp-close"]').on('click', function () {
  window.location.href = domain('m');
});
// 表单验证
$form.valid({
  scan(data) {
    if (!data.valid) {
      $.dialog.toast(data.firstError.customErrorMsg);
    }
    if ($('[name="eduExpForm.startDate"]', $form).val() > $('[name="eduExpForm.endDate"]', $form).val()) {
      $.dialog.toast('开始时间不能大于结束时间！');
      data.valid = false;
    }
  },
  success() {
    return true;
  },
});
