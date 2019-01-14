<template>
   <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  props: ['options'],
  name: 'highcharts',
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      var series = []
      this.chart = new Highcharts.Chart(this.$el, {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'column',
          backgroundColor: "#f8f8f8"
        },
        colors: Highcharts.map(['#6b93d3', '#5ac1cd', '#6dd5b4', '#a7e6a0', '#cbf2c5', '#f4e0ae', '#fcf39c'], function (color) {
            return {
                linearGradient: { x1:0, y1:0, x2:0, y2:1 },
                stops: [
                    [0, color], // darken
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')]
                ]
            };
        }),
        title: {
          text: this.options.name + '状态情况'
        },
        xAxis: {
          categories: ['申请阶段', '授权阶段']
        },
        yAxis: {
          min: 0,
          title: {
            text: '案件数量'
          },
          stackLabels: {  // 堆叠数据标签
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y} 件',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        series: this.options.data
      }, function(chart){
        console.log('chart', chart)
        chart.renderTo.addEventListener("click",function(e) {
          console.dir(e.target); 
        });
      });
    }
  }
}
</script>

<style>
  .highcharts-container {
    width: 940px;
    height: 300px;
  }
  .highcharts-credits{
    display: none;
  }
</style>