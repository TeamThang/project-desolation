<template>
  <div>
    <div id="highchartsContainer"></div>
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
  props: ['options', 'styles'],
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
  },
  methods: {
    initChart() {
      var series = []
      var zhuData = []
      for(var key in this.options.total) {
        if(this.options.total[key] != 0) {
          series.push({
            name: key,
            y: this.options.total[key]
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
          this.zhu.push({
            name: key,
            data: [
              ['授权阶段_信息变更',this.options[key]['授权阶段_信息变更']],
              ['授权阶段_失效',this.options[key]['授权阶段_失效']],
              ['授权阶段_授权',this.options[key]['授权阶段_授权']],
              ['授权阶段_无效',this.options[key]['授权阶段_无效']],
              ['授权阶段_许可',this.options[key]['授权阶段_许可']],
              ['申请阶段_在审',this.options[key]['申请阶段_在审']],
              ['申请阶段_撤回',this.options[key]['申请阶段_撤回']],
              ['申请阶段_驳回',this.options[key]['申请阶段_驳回']]]
          })
        }
      }
      this.chart = new Highcharts.Chart('highchartsContainer', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: "#f8f8f8"
        },
        colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
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
  .highcharts-credits{
    display: none;
  }
</style>