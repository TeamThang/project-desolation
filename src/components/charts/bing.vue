<template>
  <div>
    <div :id="'highchartsContainer' + ind"></div>
    <div v-if="zhu.length > 0">
      <div v-for="items in zhu">
        <Zhu :options='items'></Zhu>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Zhu from '@/components/charts/zhu';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  props: ['options', 'ind', 'styles'],
  name: 'highcharts',
  components:{
    Zhu: Zhu
  },
  data() {
    return {
      chart: null,
      zhu: []
    }
  },
  mounted() {
    this.initChart();
    console.log('this.ind', this.ind)
  },
  methods: {
    initChart() {
      var that = this;
      var series = []
      var zhuData = []
      console.log('this.options.total', that.ind, that.options.total)
      for(var key in this.options.total) {
        if(that.options.total[key] != 0) {
          series.push({
            name: key,
            y: that.options.total[key]
          })
          /* 
          授权阶段_信息变更:0
          授权阶段_失效:0
          授权阶段_授权:70
          授权阶段_无效:0
          授权阶段_许可:0
          申请阶段_在审:0
          申请阶段_撤回:0
          申请阶段_驳回:0 */
          that.zhu.push({
            name: key,
            data: [
              {
                name: '申请阶段_在审',
                data: [this.options[key]['申请阶段_在审'], 0]
              },
              {
                name: '申请阶段_撤回',
                data: [this.options[key]['申请阶段_撤回'], 0]
              },
              {
                name: '申请阶段_驳回',
                data: [this.options[key]['申请阶段_驳回'], 0]
              },
              {
                name: '授权阶段_信息变更',
                data: [0, this.options[key]['授权阶段_信息变更']]
              },
              {
                name: '授权阶段_失效',
                data: [0, this.options[key]['授权阶段_失效']]
              },
              {
                name: '授权阶段_授权',
                data: [0, this.options[key]['授权阶段_授权']]
              },
              {
                name: '授权阶段_无效',
                data: [0, this.options[key]['授权阶段_无效']]
              },
              {
                name: '授权阶段_许可',
                data: [0, this.options[key]['授权阶段_许可']]
              }
            ]
            // data: [
            //   ['授权阶段_信息变更',this.options[key]['授权阶段_信息变更']],
            //   ['授权阶段_失效',this.options[key]['授权阶段_失效']],
            //   ['授权阶段_授权',this.options[key]['授权阶段_授权']],
            //   ['授权阶段_无效',this.options[key]['授权阶段_无效']],
            //   ['授权阶段_许可',this.options[key]['授权阶段_许可']],
            //   ['申请阶段_在审',this.options[key]['申请阶段_在审']],
            //   ['申请阶段_撤回',this.options[key]['申请阶段_撤回']],
            //   ['申请阶段_驳回',this.options[key]['申请阶段_驳回']]]
          })
        }
      }
      console.log('series', series)
      that.chart = new Highcharts.Chart('highchartsContainer'+ that.ind, {
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
          text: '案件分布'
        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.y}件</b>'
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
    width: 940px;
    height: 300px;
  }
  .highcharts-credits{
    display: none;
  }
</style>