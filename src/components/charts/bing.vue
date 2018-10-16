<template>
  <schart :canvasId="canvasId"
    :type="type"
    :width="width"
    :height="height"
    :data="data"
    :options="options"
  ></schart>
</template>

<script>
import Schart from 'vue-schart';
  export default {
    name: "Bing",
    data() {
      return {
        canvasId: 'myCanvas',
        type: 'ring',
        width: 500,
        height: 600,
        data: [
                {name: '2014', value: 1342},
                {name: '2015', value: 2123},
                {name: '2016', value: 1654},
                {name: '2017', value: 1795},
            ],
        options: {
            title: 'Total sales of stores in recent years'
        }
      }
    },
    methods: {

    },
    components:{
        Schart
    },
    mounted(){
      console.log('charts')
    }
  }
</script>
