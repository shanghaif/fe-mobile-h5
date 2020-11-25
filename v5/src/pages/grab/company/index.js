/**
 * 企业黄页 --> 职位列表
 * https://m.liepin.com/company/gs6718/zhaopin/
 * 企业黄页 --> 评论
 * https://m.liepin.com/company/gs6718/pinglun/
 */
import navSet from '@liepin/zepto-nav';
import hotLinkInit from '../../../components/ui/hotlink/tab.hotlink';
import fixBottomLoginGude from '../../../components/business/fix-bottom-login-guide';

import initMap from './modules/initMap';
import initChart from './modules/initChart';
import initLogin from './modules/initLogin';
import initRefresh from './modules/initRefresh';
import initSpread from './modules/initSpread';
import initAttention from './modules/initAttention';
import initLoginMask from './modules/initLoginMask';

import '../../../components/ui/job-card/job-card.less';
import '../../../components/ui/company-card/company-card.less';
import '../../company/style/banner.less';
import '../../company/style/content.less';
import './index.less';

// 顶部导航
navSet();
// 内容登录引导
initLoginMask();
// 初始化薪资图标
initChart();
// 关注
initAttention();
// 初始化登录
initLogin();
// 展开全部
initSpread();
// 底部登录引导
fixBottomLoginGude();
// 换一换
initRefresh();
// 底部内链模块
hotLinkInit();
// 初始化地图
initMap();
