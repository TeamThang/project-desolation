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
  props: ['options', 'styles'],
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
      var data = this.options;
      var series = []
      for(var key in data) {
        var reasonname = ''
        for(var name in data[key]){
            if(name.search('reason') !== -1){
                reasonname = data[key][name]
            }
        }
        if(data[key].count != 0) {
            console.log('reasonname', reasonname, data[key].count)
          series.push({
            name: reasonname,
            y: data[key].count
          })
        }
      }
      console.log('series', series)
      this.chart = new Highcharts.Chart(this.$el, {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: "#f8f8f8"
        },
        colors: Highcharts.map(['#6b93d3', '#5ac1cd', '#6dd5b4', '#a7e6a0', '#cbf2c5', '#f4e0ae', '#fcf39c'], function (color) {
            return {
                radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                stops: [
                    [0, Highcharts.Color(color).brighten(+0.3).get('rgb')],
                    [1, color] // darken
                ]
            };
        }),
        title: {
          text: '案由分布'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{y}件</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {y}件',
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
    width: 900px;
    height: 300px;
  }
  .highcharts-credits{
    display: none;
  }
</style>