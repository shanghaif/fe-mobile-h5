import { get } from '../../../lib/ajax';

const $root = $('body');
const soJob4lp = get(`${LT.Env.mRoot}landingpage/sojob4lp.json`);

export default (selector, ganxingqu) => {
  const $keyword = $('[data-selector="keyword"]', $root);
  $keyword.on('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      $('[data-selector="btn-search"]', $root).trigger('click');
    }
  });

  $(selector).on('click', () => {
    $keyword.blur();
    const keyword = $keyword.val();
    $(window).scrollTop(0);
    if (!keyword) {
      return false;
    }
    soJob4lp({
      data: { keyword },
      cache: false,
      success(data) {
        let maskhtml = '';
        maskhtml += `
        <div class="login-mask">
          <div class="login-tips">
            <span class="job-name" data-selector="job-name">“<em class="result-word">${keyword}</em>”</span>搜索结果后面还有<span class="job-num" data-selector="job-num">${data.data.total_count ? data.data.total_count : '0'}</span>个，注册查看全部职位
          </div>
          <a class="btn-login" href="/register/?sfrom=landingpage">立即注册</a>
        </div>
      `;
        $('[data-selector="login-mask-box"]', $root).html(maskhtml);
        $('[data-selector="back-box"]', $root).show();
        if (data.flag === 1) {
          $(window).on('scroll', () => {
            const sTop = $(window).scrollTop();
            if (sTop > 30) {
              $('[data-selector="search-box"]', $root).addClass('search-box-fixed');
            } else if (sTop === 0) {
              $('[data-selector="search-box"]', $root).removeClass('search-box-fixed');
            }
          });
          if (data.data.job_list && data.data.job_list.length) {
            if (data.data.job_list.length < 10) {
              // 搜索结果小于10条时
              let jobItemHtml = '';
              jobItemHtml += '<div class="job-list" data-selector="job-list">';
              data.data.job_list.forEach((val) => {
                jobItemHtml += `
                <a href="/register/?sfrom=landingpage" data-value="${val.job_id}" class="list-item">
                  <h3 class="flexbox">
                    <span  class="job-name flex-2">${val.job_title}</span>
                    <span class="job-salary text-warning flex-1">${val.job_salary}</span>
                  </h3>
                  <p>${val.job_workyears_name} | ${val.job_edulevel_name}</p>
                  <p>${val.comp_name}</p>
                  ${val.job_kind === 2 ? '<span class="job-type-company">企</span>' : '<span class="job-type-h">猎</span>'}
                </a>
              `;
              });
              ganxingqu && ganxingqu.data.forEach((val) => {
                jobItemHtml += `
                <a href="/register/?sfrom=landingpage" class="list-item">
                  <h3 class="flexbox">
                    <span  class="job-name flex-2">${val[1]}</span>
                    <span class="job-salary text-warning flex-1">${val[5]}</span>
                  </h3>
                  <p>${val[2]} | ${val[3]}</p>
                  <p>${val[0]}</p>
                  <span class="job-type-company">企</span>
                </a>
              `;
              });
              jobItemHtml += `
              <div class="list-item">
                <p>现在加入猎聘，我们将基于您的求职意向及时为您推荐发布的
                  <a href="/register/?sfrom=landingpage" class="fat-salary">高薪职位</a>
                  <a href="/register/?sfrom=landingpage">
                    <span><i class="text-icon icon-go-ahead"></i></span>
                    <strong>立即注册</strong>
                  </a>
                </p>
              </div>
            `;
              jobItemHtml += '</div>';
              $('[data-selector="company-content"]', $root).hide();
              $('[data-selector="search-list"]', $root).html(jobItemHtml).show();
            } else {
              $('[data-selector="login-mask-box"]', $root).show();
              let jobItemHtml = '<div class="job-list" data-selector="job-list">';
              if (data.data.job_list && data.data.job_list) {
                data.data.job_list.forEach((val) => {
                  jobItemHtml += `
                  <a href="/register/?sfrom=landingpage" data-value="${val.job_id}" class="list-item">
                    <h3 class="flexbox">
                      <span  class="job-name flex-2">${val.job_title}</span>
                      <span class="job-salary text-warning flex-1">${val.job_salary}</span>
                    </h3>
                    <p>${val.job_workyears_name} | ${val.job_edulevel_name}</p>
                    <p>${val.comp_name}</p>
                    ${val.job_kind === 2 ? '<span class="job-type-company">企</span>' : '<span class="job-type-h">猎</span>'}
                  </a>
                `;
                });
              }
              $('[data-selector="company-content"]', $root).hide();
              $('[data-selector="search-list"]', $root).html(jobItemHtml).show();
            }
          } else {
            $('[data-selector="login-mask-box"]', $root).hide();
            let jobItemHtml = `
            <div class="result-none">
              <p class="tips">抱歉没有找到与"<span>${keyword}</span>"相关职位</p>
              <p class="commend-text">您可能感兴趣的工作:</p>
            </div>
            <div class="job-list" data-selector="job-list">
          `;
            ganxingqu && ganxingqu.data.forEach((val) => {
              jobItemHtml += `
              <a href="/register/?sfrom=landingpage" class="list-item">
                <h3 class="flexbox">
                  <span  class="job-name flex-2">${val[1]}</span>
                  <span class="job-salary text-warning flex-1">${val[5]}</span>
                </h3>
                <p>${val[2]} | ${val[3]}</p>
                <p>${val[0]}</p>
                <span class="job-type-company">企</span>
              </a>
            `;
            });
            jobItemHtml += `
              <div class="list-item">
                <p>现在加入猎聘，我们将基于您的求职意向及时为您推荐
                  <a href="/register/?sfrom=landingpage" class="fat-salary">高薪职位</a>
                  <a href="/register/?sfrom=landingpage">
                    <span><i class="text-icon icon-go-ahead"/></span>
                    <strong>立即注册</strong>
                  </a>
                </p>
              </div>
            </div>
          `;
            $('[data-selector="company-content"]', $root).hide();
            $('[data-selector="search-list"]', $root).html(jobItemHtml).show();
          }
        }
      },
    });
    return false;
  });
};
