const $root = $('body');
// tab切换数据填充
function generateHtml(jsonData) {
  let html = '';
  jsonData.forEach((val) => {
    html += '<div class="tab-content" data-selector="tab-content">';
    html += '<div class="flexbox items">';
    val.data.forEach((dataVal, ind) => {
      html += `
      <a href="javascript:;" class="flex-1" title="${dataVal[0]}" data-companyid="${dataVal[1]}">
        <img src="${dataVal[2]}" class="company-logo">
      </a>
    `;
      if (ind % 4 === 3 && ind !== 19) {
        html += '</div>';
        html += '<div class="flexbox items">';
      } else if (ind === 19) {
        html += '</div>';
        html += '</div>';
      }
    });
  });
  html += '</div>';
  return html;
}

export default data => {
  $('[data-selector="content-box"]', $root).html(generateHtml(data));
};
