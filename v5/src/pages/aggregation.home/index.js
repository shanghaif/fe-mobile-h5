/**
 * url: https://m.liepin.com/jobs${岗位名全拼}/
 * 如: 管理员维护工程师就业前景: https://m.liepin.com/jobsguanliyuanweihugongchengshi/
 * 2020-03-02重构, 主页，薪资页(aggregation.salary),岗位职责页(aggregation.gwzz)共用同一个js,css
 */
import navSet from '@liepin/zepto-nav';
import '@liepin/zepto-back-top';
import { Message } from '@liepin/react-violet-h5';
import './index.less';
import chartColor from '../../components/ui/highcharts/color';
import hotLinkInit from '../../components/ui/hotlink/tab.hotlink'; // 底部热链

navSet();
const $root = $('body');
const $CONFIG = window.$CONFIG || {};
const { nowSalaryInterval, salaryData, workYearData, eduData, pageSymbol, isLogined } = $CONFIG;
function appendLoginGuide() {
  const $salary = $('[data-selector="salary-show"]');
  const curSalary = $salary.html();
  if (curSalary) {
    $salary.html(`*${curSalary.slice(1)}`);
  }
  $('#echarts-salary').append(`
    <div class="login-guide-wrap">
      <dl>
        <dt>
          <p class="login-guide-title">无法查看薪资待遇</p>
          <p class="login-guide-desc">登录注册后查看更多信息</p>
        </dt>
        <dd>
          <a class="violet-btn violet-btn-medium violet-btn-primary" href="${`https://m.liepin.com/register/?return_url=${encodeURIComponent(window.location.href)}`}">登录/注册</a>
        </dd>
      </dl>
    </div>
  `);
}
const salaryChart = window.echarts.init(document.getElementById('echarts-salary'));
/* 薪资待遇雪饼图开始 */
if (salaryData && salaryData.length > 0) {
  if (!isLogined) {
    // 饼状图画完后再插入蒙层，否则会被覆盖
    salaryChart.on('finished', appendLoginGuide);
  }
  // 雪饼图
  const option = {
    tooltip: {
      show: false,
    },
    color: chartColor,
    stillShowZeroSum: false,
    animation: false,
    hoverAnimation: false,
    silent: true,
    legend: {
      selectedMode: false,
      orient: 'vertical',
      top: 50,
      right: isLogined ? 20 : 60,
      itemWidth: 8,
      itemHeight: 8,
      icon: 'circle',
      data: salaryData,
      formatter: (val) => {
        let name = isLogined ? val : 'xxxx';
        if (name === nowSalaryInterval) {
          name = `${name} (您在这)`;
        }
        return name;
      },
    },
    series: [
      {
        name: '薪资',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['30%', '50%'],
        itemStyle: {
          normal: {
            borderColor: '#f2f2f2',
            borderWidth: 15,
            label: {
              show: false,
              position: 'outer',
            },
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
            formatter: '{d}%',
          },
        },
        data: salaryData,
      },
      {
        name: '薪资',
        type: 'pie',
        radius: ['30%', '70%'],
        center: ['30%', '50%'],
        data: salaryData,
        label: {
          normal: {
            show: true,
            position: 'inner',
            textStyle: {
              fontSize: 12,
              color: '#fff',
              align: 'center',
            },
            formatter: (d) => {
              const val = isLogined ? `${parseInt(d.percent, 10)}%` : '';
              return val;
            },
          },
        },
        itemStyle: {
          borderColor: '#f2f2f2',
          borderWidth: 2,
        },
      },
    ],
  };
  salaryChart.setOption(option);
} else if (!isLogined) {
  appendLoginGuide();
}
// 薪资待遇页面的工作年限柱状图
function histogram(title, data, ele, barWidth) {
  const option = {
    title: {
      text: title,
      color: '#333',
      fontSize: '14px',
      fontWeight: 'bold',
      left: 'center',
    },
    stillShowZeroSum: false,
    animation: false,
    hoverAnimation: false,
    silent: true,
    grid: {
      height: 160,
    },
    xAxis: {
      show: true,
      type: 'category',
      data: data.map((item) => item.name),
      axisLabel: {
        interval: 0,
        lineStyle: {
          color: 'red',
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      show: true,
      type: 'value',
      axisLabel: {
        show: true,
        formatter(value) {
          if (value > 0) {
            // eslint-disable-next-line no-param-reassign
            value = `${parseInt(value / 1000, 10)}K`;
          }
          return value;
        },
      },
      axisTick: { // y轴刻度线
        show: false,
      },
      axisLine: { // y轴
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#eee'],
        },
      },
    },
    series: [{
      type: 'bar',
      itemStyle: {
        normal: { color(params) {
          // 给出颜色组
          return chartColor[params.dataIndex];
        } },
      },
      // 柱状图宽度
      barWidth,
      // 柱状图数值
      data,
    }],
  };
  ele.setOption(option);
}
if (pageSymbol === 'salary') {
  const barWidth = 20;
  // 工作柱状图
  if (workYearData && workYearData.length) {
    const workYearChart = window.echarts.init(document.getElementById('work-years-echarts'));
    histogram('按工作年限统计', workYearData, workYearChart, barWidth);
  }
  // 学历柱状图
  if (eduData && eduData.length) {
    const eduChart = window.echarts.init(document.getElementById('edu-echarts'));
    histogram('按学历统计', eduData, eduChart, barWidth);
  }
}

if (pageSymbol === 'gwzz') {
  const barWidth = 40;
  // 学历柱状图
  if (eduData && eduData.length && $('#edu-echarts').length) {
    const eduChart = window.echarts.init(document.getElementById('edu-echarts'));
    histogram('按学历统计', eduData, eduChart, barWidth);
  }
}
// 薪资分布说明
$('[data-selector="look-salary-info"]').on('click', () => {
  Message.toast('该数据通过统计企业招聘薪资所得，与行业实际标准略有偏差，仅供参考');
});
// 内链模块tab切换
hotLinkInit();
$root.backTop();
