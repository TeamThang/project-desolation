<template>
  <div>
    <div class="baoxianxinxi_info">
      <h3>保单号：</h3>
      <div class="baoxianxinxi_cont">暂无信息</div>
      <h3>保单状态：</h3>
      <div class="baoxianxinxi_cont">暂无信息</div>
      <h3>服务状态：</h3>
      <div class="baoxianxinxi_cont">暂无信息</div>
    </div>
  </div>
</template>

<script>
  import Ajax from "./../../lib/ajax";
  import Config from "./../../lib/config";
  export default {
  name: "baoxianxinxi",
  props:['info'],
  data() {
    return {
    }
  },
  methods: {
  },
  watch:{
    handleClick(val){

    }
  },
  created: function() {
    console.log(this.info)
    //this.info = {}
  }
  }
</script>

<style>
  .baoxianxinxi_info {
    padding: 22px 0;
    border-bottom: 1px solid #e5e9ef;
    position: relative;
    padding: 0 20px;
  }
  .el-tabs__item{
    font-size: 0.17rem !important;
    font-weight: 700 !important;
  }
  .baoxianxinxi_cont{
    margin: 20px 0;
    font-size: 0.16rem;
  }
</style>

