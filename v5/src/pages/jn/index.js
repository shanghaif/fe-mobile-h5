/**
 * url: m.liepin.com/jn{技能词}/
 */
import navSet from '@liepin/zepto-nav';
import chartColor from '../../components/ui/highcharts/color';
import './index.less';

navSet();
const $CONFIG = window.$CONFIG || {};
const { recordData } = $CONFIG;
const recordChart = window.echarts.init(document.getElementById('echarts-record'));

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
    orient: 'vertical',
    top: 50,
    right: 20,
    itemWidth: 8,
    itemHeight: 8,
    icon: 'circle',
    data: recordData,
  },
  series: [
    {
      name: '薪资',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['30%', '50%'],
      labelLine: {
        normal: {
          show: false,
        },
      },
      label: {
        normal: {
          show: false,
          textStyle: {
            color: '#fff',
          },
          lineHeight: 20,
          padding: [0, -50],
        },
      },
      itemStyle: {
        normal: {
          borderColor: '#f2f2f2',
          borderWidth: 15,
          label: {
            show: true,
            position: 'outer',
          },
        },
      },
      data: recordData,
    },
    {
      name: '薪资',
      type: 'pie',
      radius: ['30%', '70%'],
      center: ['30%', '50%'],
      data: recordData,
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
            const val = parseInt(d.percent, 10);
            return `${val}%`;
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
recordChart.setOption(option);

$('[ data-selector="link-tab"] li').on('click', function () {
  const $this = $(this);
  const index = $this.index();
  $this.addClass('active').siblings().removeClass('active');
  $('.foot-container .link-content').eq(index).addClass('content-active').siblings()
    .removeClass('content-active');
});

$('[data-selector="skill-tab"] a').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active');
});
