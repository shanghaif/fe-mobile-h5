/**
 * 工作信息
 * https://m.liepin.com/registerresume/toeditworkexp/?res_id_encode=87fe8c81R98dc9ee6&imscid=R000000027&edmUrl=&mscid=
 */
import '@liepin/zepto-valid';
import navSet from '@liepin/zepto-nav';
import domain from '@liepin/native-domain-fe';
// import localdata from '@liepin/zepto-localdata';
import Indutry4ES from '@liepin/react-industry-h5/src/components/industry-es';
import jobTitleValid from '../../components/business/job-title-valid';
import DatePicker from '../../components/business/react-datepicker-4ES';
import Jobs4ES from '../../components/business/react-function-4ES';
import './index.less';

const $form = $('[data-selector="form"]');
const $workTime = $('[data-selector="work-time"]', $form);
const $job = $('[data-selector="job"]', $form);
const $jobInput = $('input', $job);
const $inputResult = $('.select-result', $form);
const $start = $workTime.find('[name="workExpForm.startDate"]');
const $end = $workTime.find('[name="workExpForm.endDate"]');
const $startResult = $workTime.find('.work-start-date');
const $endResult = $workTime.find('.work-end-date');
// 导航左右图标
navSet({
  leftIcon: 'noicon',
  rightIcon: 'noicon',
});

// 行业
const $industry = $('[data-selector="industry"]', $form);
const $industryInput = $('input', $industry);
// eslint-disable-next-line no-new
new Indutry4ES({
  $inputContainer: $industryInput,
  all: true,
  max: 1,
  deep: 3,
});

$inputResult.each(function () {
  if ($(this).text() !== '请选择') {
    $(this).removeClass('placeholder');
  }
});
// 初始默认值
$(function () {
  const endDateVal = $end.val();
  const endDateText = endDateVal === '9999-99' ? '至今' : endDateVal;
  $startResult.html($('[name="workExpForm.startDate"]', $form).val());
  $endResult.html(endDateText);

  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;
  const startT = $start.val() || `${curYear - 3}-${curMonth < 10 ? '0' : ''}${curMonth}`;
  const startComp = new DatePicker({
    title: '开始时间',
    defaultValue: startT,
    format: 'yyyy-MM',
    onChange(val) {
      if (val) {
        $start.val(val);
        $startResult.html(val).removeClass('placeholder');
        if ($end.val() === '') {
          $end.val('9999-99');
          $endResult.html('至今');
        }
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
    defaultValue: $end.val() || '9999-99',
    format: 'yyyy-MM',
    tonow: true,
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

const jobValue = $jobInput.val();
const jobsComp = new Jobs4ES({
  defaultValue: jobValue ? [jobValue] : [],
  onChange(codes = [], items = []) {
    const newVal = items[0] && items[0].name || '';
    const code = codes[0] || '';
    if (code) {
      $jobInput.val(code);
      $job.find('em').html(newVal).removeClass('placeholder');
    } else {
      $jobInput.val('');
      $job.find('em').html('请选择').addClass('placeholder');
    }
  },
});

// 职能
$job.on('click', function () {
  jobsComp.render({ visible: true });
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
$('[data-selector="workexp-close"]').on('click', function () {
  window.location.href = domain('m');
});
// 表单验证
$form.valid({
  dyncheck: {
    jobTitleValid,
  },
  scan(data) {
    if (!data.valid) {
      $.dialog.toast(data.firstError.customErrorMsg);
    }
    if ($('[name="workExpForm.startDate"]', $form).val() > $('[name="workExpForm.endDate"]', $form).val()) {
      $.dialog.toast('开始时间不能大于结束时间！');
      data.valid = false;
    }
  },
  success() {
    return true;
  },
});
