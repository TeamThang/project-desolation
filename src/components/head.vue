<template>
<el-row>
  <el-col :span="4"><div class="grid-content bg-purple-dark"></div></el-col>
  <el-col :span="16">
  <div class="grid-content bg-purple-dark">
    
    <el-header style="text-align: right;">
      <el-dropdown>
        <span class="el-dropdown-link font-white">
          USER<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
</template>

<script>
  export default {
  name: "head"
  }
</script>

<style>
  .el-row {
    margin-bottom: 0.8rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
  }
  .bg-purple-dark {
    background: #277ce1;
  }
  .grid-content {
    min-height: 0.8rem;
  }
  .el-header {
    color: #fff;
    line-height: 0.8rem;
  }
  .font-white {
    color: white;
  }
  .el-dropdown-link {
    outline: none;
    font-size: 0.2rem;
  }
</style>