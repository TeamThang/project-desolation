<template>
  <div>
    <div id="highchartsContainer"></div>
    <div v-for="items in zhu" :key="items">
      <!-- <Zhu :options='items'></Zhu>  -->
    </div>
  </div>
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
  props: ['options', 'styles'],
  name: 'highcharts',
  data() {
    return {
      chart: null,
      zhu: []
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      var series = []
      for(var key in this.options.total) {
        if(this.options.total[key] != 0) {
          series.push({
            name: key,
            y: this.options.total[key]
          })
          this.zhu.push({
            name: key,
            data: this.options[key]
          })
        }
      }
      console.log('zhu',this.zhu)
      this.chart = new Highcharts.Chart('highchartsContainer', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: "#f8f8f8"
        },
        title: {
          text: '案件分布'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
          name: 'Brands',
				  colorByPoint: true,
          data: series
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
</style>