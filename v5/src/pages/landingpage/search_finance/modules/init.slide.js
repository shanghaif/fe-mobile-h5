// tab切换数据填充

function generateHtml(jsonData) {
  let conentHtml = '';
  jsonData.forEach((val) => {
    conentHtml += '<div class="tab-content" data-selector="tab-content">';
    conentHtml += '<div class="flexbox items">';
    val.data.forEach((dataVal, ind) => {
      conentHtml += `
      <a href="javascript:;" class="flex-1" title="${dataVal[0]}" data-jobId="${dataVal[4]}">
        <img src="${dataVal[1]}" class="company-logo">
        <div class="company-info">
          <p class="job-name">${dataVal[2]}</p>
          <p class="job-salary">${dataVal[3]}</p>
        </div>
      </a>
    `;
      if (ind === 1) {
        conentHtml += '</div>';
        conentHtml += '<div class="flexbox items">';
      } else if (ind === 3) {
        conentHtml += '</div>';
        conentHtml += '<div class="flexbox items">';
      } else if (ind === 5) {
        conentHtml += '</div>';
        conentHtml += '<div class="flexbox items">';
      } else if (ind === 7) {
        conentHtml += '</div>';
        conentHtml += '<div class="flexbox items">';
      } else if (ind === 9) {
        conentHtml += '</div>';
        conentHtml += '</div>';
      }
    });
  });
  conentHtml += '</div>';
  return conentHtml;
}

export default data => $('[data-selector="content-box"]').html(generateHtml(data));
