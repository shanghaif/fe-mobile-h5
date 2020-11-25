/**
 * 职位搜索页
 * https://m.liepin.com/bj/zhaopin/
 * 职位搜索:
 * https://m.liepin.com/zp${职位名全拼}/
 * 如: java网站项目
 * https://m.liepin.com/zpjavawangzhanxiangmu/
 */
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 将用户搜索记录存入历史,
 * 获取url中的keyword参数, 不为空就计入历史
 */
import './modules/record-history';
import noRealhotLinkInit from '../../components/ui/hotlink/tab.hotlink'; // 非真实的底部热链
import hotLinkInit from '../../components/ui/real-hotlink/hotlink'; // 真实的底部热链
import '../../components/ui/profile-card/profile-card.less';
import '../../components/ui/job-card/job-card.less';
import './modules/fire.card';
import Header from './components/JobFilter';
import './index.css';


const $industryWrap = $('.so-job-filter-industry');
const $jobWrap = $('.so-job-filter-job');
const $companyWrap = $('.so-job-filter-company');
const $pubtimeWrap = $('.so-job-filter-pubtime');

window.$CONFIG = window.$CONFIG || {};

const controller = {};
$(() => {
  ReactDOM.render(
    <Header controller={ controller }/>,
    document.querySelector('.nav-container')
  );

  $industryWrap.on('click', () => {
    controller.showIndustry();
  });
  $jobWrap.on('click', () => controller.showJob());
  $companyWrap.on('click', () => controller.showCompany());
  $pubtimeWrap.on('click', () => controller.showOrder());

  // 底部热链
  hotLinkInit();
  noRealhotLinkInit();
});

