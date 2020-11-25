export default function (info) {
  const {
    width,
  } = document.documentElement.getBoundingClientRect();
  return new Promise(function (resolve) {
    let html = `<div class="swiper-wrapper">
      <div class="swiper-slide flexbox slide-welcome">
        <i class="welcome-sky"></i>
        <i class="welcome-ground"></i>
        <i class="animate-train behind" data-trigger="true" style="bottom: ${Math.floor(width * 0.637)}px"></i>
        <i class="animate-train" data-trigger="true" style="bottom: ${Math.floor(width * 0.637)}px"></i>
        <div class="relative w100 flex-1" style="z-index: 2;">
          <ul class="text-wrap">
            <li class="fade-delay-2 fade-slide-down-2" data-trigger="true">都发生了什么吗</li>
            <li class="fade-delay-1 fade-slide-down-1" data-trigger="true">你的职场</li>
            <li class="fade-delay-0 fade-slide-down-0" data-trigger="true">还记得这几年</li>
          </ul>
          <div class="right-butterfly">
            <i class="butterfly-bg"></i>
            <i class="butterfly-light-bg"></i>
          </div>
          <div class="charactor-wrap">
            <i data-trigger="true"></i>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <i class="static-butterfly"></i>
          <i class="liepin-logo"></i>
        </div>
        <a href="javascript:;" class="big-btn btn-start" data-selector="btn-start">开启你的职场人生</a>
      </div>
      $logined

      <div class="swiper-slide flexbox slide-gift">
        <i class="gift-cloud"></i>
        <div class="w100 flexbox gift-wrap">
          <div class="top-text-wrap w100 fade-delay-0" data-trigger="true">送你<span class="text-warning">2020</span>涨薪大礼包
          </div>
          <div class="gift-list-wrap flex-1 w100 fade-delay-0" data-trigger="true" data-selector="stop-swiper">
            <ul>
              <dl class="flexbox">
                <dt>职业健康度测试1次</dt>
                <dd>
                  <a data-selector="gift-btn"
                    href="https://m-vas.liepin.com/view-diagnoses/cc-health?imscid=R000089872">免费领取</a>
                </dd>
              </dl>
              <dl class="flexbox">
                <dt>简历诊断1次</dt>
                <dd>
                  <a data-selector="gift-btn" href="https://m-vas.liepin.com/view-diagnosis?imscid=R000089799">免费领取</a>
                </dd>
              </dl>
              <dl class="flexbox">
                <dt>面试诊断1次</dt>
                <dd>
                  <a data-selector="gift-btn" href="https://m-vas.liepin.com/view-coachdiagnosis?imscid=R000089871">免费领取</a>
                </dd>
              </dl>
            </ul>
          </div>
          <div class="bot-text-wrap relative fade-delay-1" data-trigger="true">
            <p>Hello <span class="text-warning">2020</span></p>
            <p>期待更好的自己</p>
            <div class="right-loading-butterfly">
              <i class="butterfly-bg"></i>
              <i class="butterfly-light-bg"></i>
            </div>
            <div class="left-loading-butterfly">
              <i class="butterfly-bg"></i>
              <i class="butterfly-light-bg"></i>
            </div>
          </div>
          <a href="javascript:;" class="big-btn fade-delay-1" data-trigger="true" data-selector="btn-raise">去猎聘涨薪</a>
        </div>
      </div>
    </div>`;
    if (info) {
      const {
        registerDate,
        hunterViewCnt,
        firstViewHunterForm,
        durationShow,
        hunterPhotos,
        compCnt,
        compLogos,
        showDay,
        lastLoginDatetime,
        recommendJobForms,
      } = info;
      html = html.replace('$logined', `<div class="swiper-slide slide-meet">
      <i class="meet-cloud"></i>
      <div class="black-bg"><i class="meet-star"></i></div>
      <div class="right-butterfly">
        <i class="butterfly-bg"></i>
        <i class="butterfly-light-bg"></i>
      </div>
      <div class="meet-lamp">
        <i class="meet-lamp-light" data-trigger="true"></i>
      </div>
      <div class="meet-charactor">
        <div class="meet-gem" data-trigger="true">
          <i class="meet-gem-bg"></i>
          <i class="meet-gem-light-bg" data-trigger="true"></i>
        </div>
      </div>
      <div class="left-butterfly">
        <i class="butterfly-bg"></i>
        <i class="butterfly-light-bg"></i>
      </div>
      <div class="content-wrap">
        <div class="top-text-wrap fade-delay-0" data-trigger="true">
          <p class="text-warning">${registerDate}</p>
          <p>你<span class="text-warning">第一次</span>来到猎聘</p>
          <p>对未来，带着许多美好的憧憬</p>
        </div>
      </div>
    </div>
    ${hunterViewCnt > 5 ? `<div class="swiper-slide flexbox slide-hello">
    <div class="black-bg">
      <div class="bot-spread-decoration">
        <i data-trigger="true"></i>
      </div>
    </div>
    <i class="hello-bg"></i>
    <div class="content-wrap">
      <div class="top-text-wrap fade-delay-0" data-trigger="true">
        <p>还记得<span class="text-warning">第一个</span>和你打招呼的人</p>
        <p>是TA吗？</p>
      </div>
      <div class="hunter-display flexbox fade-delay-0" data-trigger="true">
        <img src="//image0.lietou-static.com/img/${firstViewHunterForm.photo}" />
        <div class="flex-1 hunter-info">
          <p class="hunter-name ellipsis-1">${firstViewHunterForm.name}</p>
          <p class="meet-date ellipsis-1">${firstViewHunterForm.viewDate}</p>
        </div>
      </div>
      <div class="top-text-wrap fade-delay-1" data-trigger="true">
        <p>${durationShow}，</p>
        <p>你一共得到了<span class="text-warning">${hunterViewCnt}位</span>猎头的青睐</p>
      </div>
      <div class="hunter-portrait-wrap fade-delay-1" data-trigger="true">
        ${hunterViewCnt > 10 ? `
        <div class="hunter-portrait-box" data-selector="stop-swiper">
          <div style="height: 140px;width: 100%; overflow: auto;  -webkit-overflow-scrolling:touch;">
            <div style="width: ${Math.ceil(hunterPhotos.length / 2) * 56}px;">${hunterPhotos.map((url) => `<img src="//image0.lietou-static.com/img/${url}"/>`).join('')}</div>
          </div>
        </div>
        <div class="text-icon icon-go-ahead"></div>
        ` : (`<div class="hunter-portrait-box">${hunterPhotos.map((url) => `<img src="//image0.lietou-static.com/img/${url}"/>`).join('')}</div>`)}
      </div>
      <div class="fade-delay-2 bot-text-wrap w100" data-trigger="true">你成长的越来越快，得到的也越来越多</div>
    </div>
  </div>` : ` <div class="swiper-slide flexbox slide-hello slide-hello-empty">
      <div class="black-bg"></div>
      <i class="hello-bg"></i>
      <div class="content-wrap">
        <div class="top-text-wrap fade-delay-0" data-trigger="true">
          <p>${durationShow}，</p>
          <p>你一共得到了<span class="text-warning">5位</span>猎头的青睐</p>
        </div>
        <div class="hunter-portrait-wrap fade-delay-0" data-trigger="true">
          ${hunterPhotos.map((url) => `<img src="//image0.lietou-static.com/img/${url}"/>`).join('')}
        </div>
        <div class="fade-delay-1 bot-text-wrap w100" data-trigger="true">你成长的越来越快，得到的也越来越多</div>
      </div>
      <div class="left-butterfly">
        <i class="butterfly-bg"></i>
        <i class="butterfly-light-bg"></i>
      </div>
      <div class="right-butterfly higher-butterfly">
        <i class="butterfly-bg"></i>
        <i class="butterfly-light-bg"></i>
      </div>
      <div class="right-butterfly lower-butterfly">
        <i class="butterfly-bg"></i>
        <i class="butterfly-light-bg"></i>
      </div>
      <i class="hello-fly-out-item" data-trigger="true"></i>
      <i class="hello-charactor"></i>
    </div>`}
    ${compCnt ? `<div class="swiper-slide flexbox slide-company">
    <div class="black-bg">
      <div class="bot-spread-decoration">
        <i data-trigger="true"></i>
      </div>
    </div>
    <i class="company-cloud"></i>

    <div class="w100 content-wrap">
      <div class="top-text-wrap w100">
        <p>你的能力日渐提升，</p>
        <p>有<span class="text-warning">${compCnt}</span>个企业HR关注过你</p>
      </div>
      <div class="company-list-wrap" data-selector="stop-swiper">
        <ul data-trigger="true">
          ${compLogos.map((url) => `<li style="background-image:url('//image0.lietou-static.com/img/${url}');"></li>`).join('')}
        </ul>
      </div>
      <div class="bot-text-wrap">
        <p>恭喜你已经从当初的职场新人</p>
        <p>成长为炙手可热的明星员工</p>
      </div>
    </div>
  </div>` : `<div class="swiper-slide slide-company slide-company-empty">
    <i class="company-cloud"></i>
    <i class="company-flying-cloud" data-trigger="true"></i>
    <div class="content-wrap">
      <div class="top-text-wrap w100 fade-delay-0" data-trigger="true">
        <p>目前</p>
        <p>还没有企业HR关注过您</p>
      </div>
      <div class="bot-text-wrap fade-delay-1" data-trigger="true">
        <p>记得时常更新简历</p>
        <p>增加个人曝光</p>
      </div>
    </div>
    <div class="company-charactor">
      <i class="company-left-spray" data-trigger="true" style="width: ${Math.ceil(width * 0.2226)}px; height: ${Math.ceil(width * 0.086666)}px; left: ${Math.ceil(width * 0.28)}px; bottom: ${Math.ceil(width * 0.16266)}px;"></i>
      <i class="company-right-spray" data-trigger="true" style="width: ${Math.ceil(width * 0.176)}px; height: ${Math.ceil(width * 0.0733)}px; right: ${Math.ceil(width * 0.15)}px; bottom: ${Math.ceil(width * 0.14)}px;"></i>
    </div>
    <div class="left-butterfly">
      <i class="butterfly-bg"></i>
      <i class="butterfly-light-bg"></i>
    </div>
    <div class="right-butterfly">
      <i class="butterfly-bg"></i>
      <i class="butterfly-light-bg"></i>
    </div>
  </div>`}
  ${showDay ? `<div class="swiper-slide slide-last-day">
  <div class="content-wrap">
    <div class="top-text-wrap fade-delay-0" data-trigger="true">
      <p class="text-warning">${lastLoginDatetime}</p>
      <p>你最后一次打开猎聘</p>
      <p>寻觅新的机遇</p>
    </div>
    <div class="bot-text-wrap fade-delay-1" data-trigger="true">
      <p>找工作如同找对象</p>
      <p>适合自己的才是更好的</p>
    </div>
  </div>
  <i class="last-day-door-bg" style="bottom: ${Math.ceil(width / 4)}px;"></i>
  <i class="last-day-door-cloud" data-trigger="true"></i>
  <i class="last-day-door-light" data-trigger="true" style="width: ${width * 0.555}px; height: ${width * 0.972}px; right: ${Math.ceil(width * 0.027)}px; bottom: ${Math.ceil(width * 0.185)}px;"></i>
  <i class="last-day-bg"></i>
  <i class="last-day-star"></i>
  <i class="last-day-decoration"></i>

  <div class="right-butterfly bigger">
    <i class="butterfly-bg"></i>
    <i class="butterfly-light-bg"></i>
  </div>

  <div class="right-butterfly smaller">
    <i class="butterfly-bg"></i>
    <i class="butterfly-light-bg"></i>
  </div>
</div>` : `<div class="swiper-slide slide-last-night">
  <div class="black-bg">
    <i class="decoration-star"></i>
    <i class="decoration-briefcase"></i>
  </div>
  <i class="last-night-bg"></i>
  <i class="last-night-cloud"></i>
  <i class="last-night-shadow" data-trigger="true"></i>
  <i class="last-night-charactor" data-trigger="true"></i>
  <i class="last-night-light" data-trigger="true"></i>
  <i class="last-night-circle" data-trigger="true"></i>
  <div class="right-butterfly bigger">
    <i class="butterfly-light-bg"></i>
    <i class="butterfly-bg"></i>
  </div>
  <div class="right-butterfly smaller">
    <i class="butterfly-light-bg"></i>
    <i class="butterfly-bg"></i>
  </div>
  <div class="text-right" style="padding-right: 38px;">
    <div class="top-text-wrap w100 fade-delay-0" data-trigger="true">
      <p class="text-warning">${lastLoginDatetime}</p>
      <p>你最后一次打开猎聘</p>
      <p>寻觅新的机遇</p>
    </div>
    <div class="bot-text-wrap fade-delay-1" data-trigger="true">
      <p>找工作如同找对象</p>
      <p>适合自己的才是更好的</p>
    </div>
  </div>
</div>`}
    <div class="swiper-slide flexbox slide-job">
      <div class="black-bg">
        <div class="bot-spread-decoration">
          <i data-trigger="true"></i>
        </div>
      </div>
      <i class="job-cloud"></i>
      <div class="w100 flexbox gift-wrap">
        <div class="top-text-wrap w100">
          <p>现在的你呢，</p>
          <p>找到自己<span class="text-warning">心仪的工作</span>了吗？</p>
        </div>
        <div class="job-list-wrap flex-1 w100">
          <div class="job-list-content">
            <h5>近期这些企业发布了  和你匹配的高薪职位</h5>
            <ul class="job-list-scroller" data-trigger="true" data-selector="stop-swiper">
              ${recommendJobForms.map((job) => `<dl>
              <dt class="flexbox" data-selector="job-card" data-id="${job.id}">
                <span class="flex-1 ellipsis-1 job-name">${job.title}</span>
                <span class="job-salary text-warning">${job.salaryShow}</span>
              </dt>
              <dd class="ellipsis-1">${job.compName}</dd>
            </dl>`).join('')}
            </ul>
          </div>
        </div>
        <div class="bot-text-wrap w100">
          你的每一分努力，都将带你走向更好的未来
        </div>
      </div>
    </div>`);
    } else {
      html = html.replace('$logined', '');
    }
    $('[data-selector="swiper"]').html(html);
    resolve();
  });
}
