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
      console.log('this.options', this.options);
      var series = []
      console.log('series', series)
      this.chart = new Highcharts.Chart(this.$el, {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'column',
          backgroundColor: "#f8f8f8"
        },
        colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
        title: {
          text: this.options.name + '状态情况'
        },
        yAxis: {
      		min: 0,
      		title: {
      			text: '数量 (件)'
      		}
        },
        xAxis: {
      		type: 'category'
      	},
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y:.1f}件</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        series: [{
          name: '案件数量',
          data: this.options.data
        }]
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