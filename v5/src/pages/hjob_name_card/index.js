/**
 * 修改并发送名片给猎头
 * https://m.liepin.com/share/edit-name-card/?hjobId=10305475
 */
import selectUI from '@liepin/selectui';
import datepicker from '@liepin/zepto-datepicker';
import eduLevel from '@liepin/dict-collect-h5/edu-level';
import '@liepin/zepto-valid';
import './index.css';

$(() => {
  const $root = $('body');
  const $form = $('[data-selector="submit-form"]', $root);
  const $selectEdulevel = $('[data-selector="select-edulevel"]', $form);
  // 学历
  const eduDegree = $(':hidden', $selectEdulevel);
  const eduDegreeText = selectUI.get(eduLevel, eduDegree.val(), false);
  $('.select-result', $selectEdulevel).html(eduDegreeText);
  $selectEdulevel.on('click', () => {
    selectUI.open({
      options: eduLevel,
      selected: eduDegree.val() || '040',
      en: false,
      success(result) {
        $('.select-result', $selectEdulevel).text(result.text);
        eduDegree.val(result.value);
      },
    });
  });
  // 开始工作
  $('[data-selector="start-work"]', $form).on('click', function () {
    const $this = $(this);
    const workY = $this.find(':hidden').val().trim() || '2000';
    datepicker.open({
      dateFormat: 'YYYY',
      defaultValue: workY,
      tonow: false,
      success(result) {
        $this.find(':hidden').val(result.year);
        $('.select-result', $this).html(`${result.year}年`);
        $(document.body).css({ height: $(window).height() });
      },
    });
  });
  // from提交
  let submitFlag = false;
  $form.valid({
    scan(data) {
      if (!data.valid) {
        $.dialog.toast(data.firstError.customErrorMsg);
      }
    },
    success() {
      if (submitFlag) {
        return;
      }
      submitFlag = true;
      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: $form.serializeArray(),
        cache: false,
        dataType: 'json',
        success(data) {
          if (data.flag === 1) {
            window.history.back();
          } else {
            $.dialog.toast(data.msg);
          }
          submitFlag = false;
        },
        error() {
          submitFlag = false;
        },
      });
      return false;
    },
  });
  function submitForm(val) {
    return () => {
      $('[name="isInterested"]', $form).val(val);
      $form.submit();
    };
  }
  $('[data-selector="save-card"]', $form).on('click', submitForm(0));
  $('[data-selector="save-interested"]', $form).on('click', submitForm(1));
});
