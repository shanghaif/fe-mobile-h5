// tab切换数据填充
import jsonData from './data';

const $root = $('body');
let html = '';
jsonData.forEach((val) => {
  html += '<div class="tab-content" data-selector="tab-content">';
  html += '<div class="flexbox items">';
  val.data.forEach((dataVal, ind) => {
    html += `
      <div class="flex-1 items-company">
         <img src="${dataVal[2]}" class="company-logo">
        <p class="job-name">${dataVal[3]}</p>
        <p class="salary">${dataVal[4]}</p>
      </div>
    `;
    if (ind === 2) {
      html += '</div>';
      html += '<div class="flexbox items">';
    } else if (ind === 5) {
      html += '</div>';
      html += '<div class="flexbox items">';
      html += '</div>';
      html += '</div>';
    }
  });
});
html += '</div>';
$('[data-selector="content-box"]', $root).html(html);

const $tab = $('[data-selector="tab"] a', $root);
const $tabContent = $('[data-selector="tab-content"]', $root);
let index = -1;
let go = null;
let lock = true;
const time = 2000;

function roll() {
  $tab.removeClass('active');
  $tab.eq(index).addClass('active');
  $tabContent.css({
    opacity: 0,
    'z-index': 1,
  });
  $tabContent.eq(index).css({
    opacity: 1,
    'z-index': 2,
  });
}
function playRoll() {
  // var callee = arguments.callee;
  if (lock) {
    go = setTimeout(() => {
      index++;
      index > 5 && (index = 0);
      roll();
      // callee();
      playRoll();
    }, time);
  }
}
/*
 *轮播
 *$tab.eq(0).data('tab-index',1)
 */
playRoll();
$tab.on('tap', function () {
  index = $(this).index();
  if (lock) {
    clearTimeout(go);
    lock = false;
  }
  roll();
});
