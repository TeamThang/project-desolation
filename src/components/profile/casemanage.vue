<template>
  <div>
    <div class="casemanage_info">
      <el-tabs v-model="casemanage_nav_active_name" @tab-click="handleClick">
        <el-tab-pane class="casemanage_nav_title" label="案件信息" name="first"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Ajax from "./../../lib/ajax";
  import Config from "./../../lib/config";
  export default {
  name: "casemanage",
  props:['info'],
  data() {
    return {
      casemanage_nav_active_name: 'first'
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
  .casemanage_info {
    padding: 22px 0;
    border-bottom: 1px solid #e5e9ef;
    position: relative;
  }
  .el-tabs__item{
    font-size: 0.17rem !important;
    font-weight: 700 !important;
  }
</style>

