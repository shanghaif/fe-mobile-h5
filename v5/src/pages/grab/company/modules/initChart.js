import chartColor from '../../../../components/ui/highcharts/color';

export default function () {
  const {
    salaryData,
  } = window.$CONFIG || {};
  /* 薪资待遇雪饼图开始 */
  if (window.echarts && salaryData && salaryData.length) {
    const $ele = document.getElementById('salary-chart');
    if ($ele) {
      const salaryChart = window.echarts.init($ele);
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
          right: 20,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          data: salaryData,
        },
        series: [{
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
              formatter: (d) => (`${parseInt(d.percent, 10)}%`),
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
    }
  }
}
