/**
 * 链接地址：https://m.liepin.com/salaryanalysis/editexp/
 */
import '@liepin/zepto-valid';
import domain from '@liepin/native-domain-fe';
import datepicker from '@liepin/zepto-datepicker';
import eduLevel from '@liepin/dict-collect-h5/edu-level';
import jobTitleValid from '../../components/business/job-title-valid';
import './index.css';

const $form = $('[data-selector="form"]');
const $edulevel = $('[data-selector="edulevel"]', $form);
const $schoolTime = $('[data-selector="scholl-time"]', $form);
const $workTime = $('[data-selector="work-time"]', $form);
const $user = $('[data-selector="user-email"]', $form);
const $countdown = $('[data-selector="countdown"]', $form).addClass('suggest-main');
const $industry = $('[data-selector="industry"]', $form);
const $industryInput = $('input', $industry);
const $job = $('[data-selector="job"]', $form);
const $jobInput = $('input', $job);

$(() => {
  // 是否同步简历
  $('.update em', $form).on('click', function () {
    const $update = $('.update', $form);
    const $updateYes = $('[data-selector="update-yes"]', $update);
    const $updateNo = $('[data-selector="update-no"]', $update);
    const $this = $(this);
    if ($this.hasClass('active')) {
      $this.removeClass('active').siblings('em').addClass('active');
    } else {
      $this.addClass('active').siblings('em').removeClass('active');
    }
    const activeText = $('em.active', $update).html();
    if (activeText === '是') {
      $updateYes.attr('checked', 'checked').siblings('[name="isUpdateResume"]').removeAttr('checked');
    } else {
      $updateNo.attr('checked', 'checked').siblings('[name="isUpdateResume"]').removeAttr('checked');
    }
  });
  // 点击联想词
  $countdown.on('click', 'li', function () {
    const thisText = $(this).data('name');
    $user.val(thisText);
    setTimeout(function () {
      $countdown.hide();
    }, 320);
  });
  // 初始默认值
  {
    const endDateVal = $('[name="jobEndDate"]', $form).val();
    const endDateText = endDateVal === '9999-99' ? '至今' : endDateVal;
    $('.work-start-date', $form).html($('[name="jobStartDate"]', $form).val());
    $('.work-end-date', $form).html(endDateText);
  }
  // 行业
  const IndustrySelect = localdata($industry, {
    name: 'industry',
    all: false,
    init() {
      if ($industryInput.val()) {
        const { selectedVal } = this;
        $industry.find('em').html(selectedVal.sub.length ? selectedVal.sub[1] : selectedVal.main[1]).removeClass('placeholder');
      }
    },
    selected(value, text) {
      $industry.find('em').html(text);
      $industryInput.val(value);
      setTimeout(() => {
        IndustrySelect.hide();
      }, 160);
    },
    defaultValue: $industryInput.val(),
  });
  $industry.on('click', function () {
    IndustrySelect.show();
  });
  // 职能
  const Job = localdata($job, {
    name: 'job',
    all: false,
    init() {
      if ($jobInput.val()) {
        const { selectedVal } = this;
        $job.find('em').html(selectedVal.sub.length ? selectedVal.sub[1] : selectedVal.main[1]).removeClass('placeholder');
      }
    },
    selected(value, text) {
      $job.find('em').html(text);
      $jobInput.val(value);
      setTimeout(() => {
        Job.hide();
      }, 160);
    },
    defaultValue: $jobInput.val(),
  });
  $job.on('click', function () {
    Job.show();
  });
  // 工作经历起止时间
  $('[data-selector="work-start-date"]', $form).on('click', function () {
    const date = new Date();
    const curYear = date.getFullYear();
    const curMonth = date.getMonth() + 1;
    const startTime = $('.work-start-date', $form).html();
    const startT = startTime || `${curYear - 3}-${curMonth}`;
    datepicker.open({
      dateFormat: 'YYYY-MM',
      defaultValue: startT,
      tonow: false,
      success(result) {
        $('[name="jobStartDate"]', $form).val(result.value);
        $('.work-start-date', $workTime).html(result.value).removeClass('placeholder');
        if (!$('.work-end-date', $form).html()) {
          $('[name="jobEndDate"]', $form).val('9999-99');
          $('.work-end-date', $form).html('至今').removeClass('placeholder');
        }
      },
    });
  });
  $('[data-selector="work-end-date"]', $form).on('click', function () {
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth() + 1;
    const endTime = $('.work-end-date', $form).html();
    const endT = !endTime ? `${curYear - 3}-${curMonth}` : endTime === '至今' ? `${curYear}-${curMonth}` : endTime;
    datepicker.open({
      dateFormat: 'YYYY-MM',
      defaultValue: endT,
      tonow: true,
      success(result) {
        const showTime = result.value === '9999-99' ? '至今' : result.value;
        $('[name="endDate"]', $workTime).val(result.value);
        $('.work-end-date', $workTime).html(showTime).removeClass('placeholder');
      },
    });
  });
  // 初始默认值
  $(function () {
    const endDateVal = $('[name="eduEndDate"]', $form).val();
    const endDateText = endDateVal === '9999-99' ? '至今' : endDateVal;
    $('.edu-start-date', $form).html($('[name="eduStartDate"]', $form).val());
    $('.edu-end-date', $form).html(endDateText);
  });
  /*
   * 教育经历-----------
   * 教育起止时间
   */
  const workYear = $('[data-selector="work-year"]', $form).val();
  $('.edu-start-date', $form).on('click', function () {
    // var curYear = new Date().getFullYear();
    const startTime = $('.edu-start-date', $form).html();
    const startT = startTime || `${workYear - 4}-09`;
    datepicker.open({
      dateFormat: 'YYYY-MM',
      defaultValue: startT,
      tonow: false,
      success(result) {
        $('[name="eduStartDate"]', $form).val(result.value);
        $('.edu-start-date', $schoolTime).html(result.value).removeClass('placeholder');
      },
    });
  });
  $('.edu-end-date', $form).on('click', function () {
    const endTime = $('.edu-end-date', $form).html();
    const endT = endTime || `${workYear}-07`;
    datepicker.open({
      dateFormat: 'YYYY-MM',
      defaultValue: endT,
      tonow: true,
      success(result) {
        const showTime = result.value === '9999-99' ? '至今' : result.value;
        $('[name="eduEndDate"]', $form).val(result.value);
        $('.edu-end-date', $form).html(showTime).removeClass('placeholder');
      },
    });
  });
  // 学历
  const eduResult = $('[data-selector="edulevel"]', $form).find('.select-result');
  if (!(eduResult.text() === '请选择')) {
    eduResult.removeClass('placeholder');
  }
  function educationChange() {
    const eduSelVal = $('[name="eduLevel"]', $form).val();
    let startDate = '';
    let endDate = '';
    const birthYear = parseInt($('[name="birthYear"]', $form).val(), 10);
    const nowYear = new Date().getFullYear();
    switch (eduSelVal) {
      case '005':
        startDate = `${birthYear + 30}-09`;
        endDate = `${birthYear + 32}-07`;
        break;

      case '010':
        startDate = `${birthYear + 25}-09`;
        endDate = `${birthYear + 30}-07`;
        break;

      case '020':
      case '030':
        startDate = `${birthYear + 22}-09`;
        endDate = `${birthYear + 25}-07`;
        break;

      case '040':
        startDate = `${birthYear + 18}-09`;
        endDate = `${birthYear + 22}-07`;
        break;

      case '050':
        startDate = `${birthYear + 18}-09`;
        endDate = `${birthYear + 21}-07`;
        break;

      case '060':
      case '070':
      case '080':
        startDate = `${birthYear + 15}-09`;
        endDate = `${birthYear + 18}-07`;
        break;

      case '090':
        startDate = `${birthYear + 12}-09`;
        endDate = `${birthYear + 15}-07`;
        break;
      default:
        break;
    }
    const $startDate = $('[name="eduStartDate"]', $schoolTime);
    const $endDate = $('[name="eduEndDate"]', $schoolTime);
    if (startDate.slice(0, 4) < nowYear && $startDate.val() === '' && $endDate.val() === '') {
      const endDateFinal = new Date(endDate) > new Date() ? '9999-99' : endDate;
      const endDateText = endDateFinal === '9999-99' ? '至今' : endDateFinal;
      $startDate.val(startDate);
      $('.edu-start-date', $schoolTime).html(startDate);
      $endDate.val(endDateFinal);
      $('.edu-end-date', $schoolTime).html(endDateText);
    }
  }
  const ldEducation = localdata('[data-selector="edulevel"]', {
    bottom: '0',
    maskCss: { top: '49px' },
    all: false,
    extendData: eduLevel,
    event: 'click',
    hideEnd() {
      $('body').removeClass('body-100');
      educationChange();
    },
    selected(value, text) {
      setTimeout(function () {
        ldEducation.hide();
      }, 200);
      $('.select-result', $edulevel).html(text).removeClass('placeholder');
      $('[name="eduLevel"]', $edulevel).val(value);
      $edulevel.removeClass('opened');
    },
    defaultValue: $('[name="eduLevel"]', $edulevel).val() || '040',
  });
  $edulevel.on('click', function () {
    ldEducation.show();
    $(this).addClass('opened');
    window.scrollTo(0, 0);
    $('body').addClass('body-100');
  });
  // 下拉联想
  const compName = $('[name="company"]', $form);
  let xhrComp = null;
  let compTimer = null;
  compName.on('input', function () {
    $('[data-selector="suggest-company"]').remove();
    xhrComp && xhrComp.abort();
    const key = $(this).val().trim();
    clearTimeout(compTimer);
    if (key) {
      compTimer = setTimeout(function () {
        xhrComp = $.ajax({
          url: '/company/suggest.json',
          type: 'GET',
          data: `keyword=${key}`,
          dataType: 'jsonp',
          success(data) {
            if (data.flag === 1) {
              let html = '';
              data.data.slice(0, 7).forEach(function (val) {
                html += `<dd data-name="${val}"><span>+</span>${val}</dd>`;
              });
              if (html) {
                html = `<dl data-selector="suggest-company" class="suggest-main">${html}</dl>`;
                compName.parent().append(html);
              }
            }
          },
        });
      }, 160);
    }
  }).on('blur', function () {
    setTimeout(function () {
      $('[data-selector="suggest-company"]').remove();
    }, 320);
  });
  compName.parent().on('click', 'dd', function () {
    compName.val($(this).data('name'));
  });
  // 职位
  const jobName = $('[name="jobName"]', $form);
  let xhrJob = null;
  let jobTimer = null;
  jobName.on('input', function () {
    $('[data-selector="suggest-job"]').remove();
    xhrJob && xhrJob.abort();
    const key = $(this).val().trim();
    clearTimeout(jobTimer);
    if (key) {
      jobTimer = setTimeout(function () {
        xhrJob = $.ajax({
          url: `${domain('m-c')}/resume/matchtitle.json`,
          type: 'GET',
          data: `key=${key}`,
          dataType: 'jsonp',
          success(data) {
            if (data.flag === 1) {
              let html = '';
              data.data.list.slice(0, 7).forEach(function (val) {
                html += `<dd data-name="${val.titleName}"><span>+</span>${val.titleName}</dd>`;
              });
              if (html) {
                html = `<dl data-selector="suggest-job" class="suggest-main">${html}</dl>`;
                jobName.parent().append(html);
              }
            }
          },
        });
      }, 160);
    }
  }).on('blur', function () {
    setTimeout(function () {
      $('[data-selector="suggest-job"]').remove();
    }, 320);
  });
  jobName.parent().on('click', 'dd', function () {
    jobName.val($(this).data('name'));
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
      if ($('[name="startDate"]', $form).val() > $('[name="endDate"]', $form).val() || $('[name="startDate"]', $form).val() > $('[name="endDate"]', $form).val()) {
        $.dialog.toast('结束时间不能大于开始时间！');
        data.valid = false;
      }
      if ($('[name="startDate"]', $form).val() > $('[name="endDate"]', $form).val()) {
        $.dialog.toast('结束时间不能大于开始时间！');
        data.valid = false;
      }
    },
    success() {
      return true;
    },
  });
});
