const $conditionTitle = $('.condition-title');
const $linkArea = $('.link-area', $conditionTitle);
const linkAreaVal = $linkArea.attr('data-value');
const $linkIndustry = $('.link-industry', $conditionTitle);
const linkIndustryVal = $linkIndustry.attr('data-value');
const $linkNature = $('.link-nature', $conditionTitle);
const linkNatureVal = $linkNature.attr('data-value');
const $searchInput = $('[data-selector="search-input"]');
const searchInputVal = $searchInput.val();

const $companyList = $('[data-selector="company-list"]');
const companyListUrl = `/company/so.json?dqs=${linkAreaVal}&industrys=${linkIndustryVal}&ecomp_kinds=${linkNatureVal}&keyword=${encodeURIComponent(searchInputVal)}`;
const $pullUp = $('.pull-up');
const noMoreData = '<i class="text-icon icon-empty"/>没有更多数据了';

let curPage = 1;
function ecompTagsHtml(tags = []) {
  return tags.length ? `
    <div class="text-checkbox company-benefits">
      ${tags.reduce((html, item) => `${html}<span>${item}</span>`, '')}
    </div>
  ` : '';
}
// json数据拼接成html
function jsonToHtml(data) {
  return data.reduce(function (htmlStr, v) {
    const dqHtml = v.ecomp_dq_name ? `<span>${v.ecomp_dq_name}</span>` : '';
    const industryHtml = v.comp_industryName ? `<span class="industry-name ellipsis-1">${v.comp_industryName}</span>` : '';
    const scaleHtml = v.scale ? `<span>${v.scale}</span>` : '';
    const recentJob = v.job_cnt > 0 ? `<p>近期发布 <em class="text-warning">${v.job_cnt}</em> 个职位</p>` : '';
    return `
      ${htmlStr}
      <a href="${v.ecomp_url}" class="card clearfix" data-value="${v.ecomp_id}">
        <figure>
          <img src="${v.ecomp_fx_logo}" class="tinyLogo" alt="${v.ecomp_name}">
        </figure>
        <div class="company-information">
          <h3 class="ellipsis-1"> ${v.ecomp_name}</h3>
          <p class="company-mute">${dqHtml}${industryHtml}${scaleHtml}</p>
          ${recentJob || ecompTagsHtml(v.ecomp_tags)}
        </div>  
      </a>
    `;
  }, '');
}
// 上拉加载
function pullData(ajaxUrl) {
  $(window).off('scroll');
  let isLoading = false;
  $(window).on('scroll', function () {
    if (isLoading) {
      return;
    }
    const moreOffsetTop = $pullUp.offset().top;
    const scrollTop = $(window).scrollTop() + $(window).height() - $pullUp.height();
    if (scrollTop < moreOffsetTop) {
      return;
    }
    isLoading = true;
    $.ajax({
      type: 'POST',
      url: ajaxUrl,
      data: `curPage=${curPage}`,
      dataType: 'json',
      cache: false,
      beforeSend() {
        $pullUp.html('<i class="text-icon icon-loading"/> 加载中...');
      },
      success({ flag, data = [] }) {
        if (flag === 1) {
          if (data.length) {
            $companyList.append(jsonToHtml(data));
            curPage++;
            isLoading = false;
          } else {
            $pullUp.html(noMoreData);
            isLoading = true;
          }
        }
      },
    });
  });
}
// 超过25条记录 上拉加载更多
$('.card', $companyList).length >= 25 && pullData(companyListUrl);
