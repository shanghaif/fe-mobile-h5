// tab切换数据填充

function generateHtml(jsonData) {
  let contentHtml = '';
  jsonData.forEach((val) => {
    contentHtml += '<div class="tab-content" data-selector="tab-content">';
    contentHtml += '<div class="flexbox items">';
    val.data.forEach((dataVal, ind) => {
      contentHtml += `
      <a href="javascript:;" class="flex-1" title="${dataVal[0]}" data-jobId="${dataVal[4]}">
        <img src="${dataVal[1]}" class="company-logo">
        <div class="company-info">
          <p class="job-name">${dataVal[2]}</p>
          <p class="job-salary">${dataVal[3]}</p>
        </div>
      </a>
    `;
      if (ind === 1) {
        contentHtml += '</div>';
        contentHtml += '<div class="flexbox items">';
      } else if (ind === 3) {
        contentHtml += '</div>';
        contentHtml += '<div class="flexbox items">';
      } else if (ind === 5) {
        contentHtml += '</div>';
        contentHtml += '<div class="flexbox items">';
      } else if (ind === 7) {
        contentHtml += '</div>';
        contentHtml += '<div class="flexbox items">';
      } else if (ind === 9) {
        contentHtml += '</div>';
        contentHtml += '</div>';
      }
    });
  });
  contentHtml += '</div>';
  return contentHtml;
}

export default data => $('[data-selector="content-box"]').html(generateHtml(data));
