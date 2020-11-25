export const successTpl = ({ desc, last }) => (
  `<div class="success-tpl-wrap">
    <div class="tpl-cnt-wrap">
      <div class="success-icon-img"></div>
      <div class="question-wrap">
        <div class="question-title">
          <i class="left-decoration"></i>
          <span>答对了</span>
          <i class="right-decoration"></i>
        </div>
        <div class="question-content text-center">
          <p class="question-cnt-desc">
            恭喜你，答对了！<br/>
            ${desc}
          </p>
        </div>
      </div>
      <a href="javascript:;" class="luck-draw-btn" data-selector="next-link-right">${last ? '去抽奖' : '下一题'}</a>
    </div>
  </div>`
);

export const failTpl = ({ first = false, lastQuestion = false }) => (
  `<div class="fail-tpl-wrap">
    <div class="tpl-cnt-wrap">
     <div class="fail-icon-img"></div>
     <div class="question-wrap">
       <div class="question-title">
         <i class="left-decoration"></i>
         <span>回答错误</span>
         <i class="right-decoration"></i>
       </div>
       <div class="question-content text-center">
         <div class="question-cnt-desc">
          <p>
            ${first ? '只剩下一次答错机会了哟~<br/>仔细审题，沉着应对！' : '再答错就没有抽奖资格了哟~'}
          </p> 
         </div>
       </div>
     </div>
     <a href="javascript:;" class="luck-draw-btn" data-selector="next-link-app">${lastQuestion ? '去抽奖' : '下一题'}</a>
    </div>
  </div>`
);
