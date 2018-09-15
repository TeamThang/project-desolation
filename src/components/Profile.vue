<template>
  <el-container class="el-container-wrapper">
    <el-aside style="width: 200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
          <span slot="title">
            <router-link tag="div" to="/profile/ProfileHello">
              全接口自动测试
            </router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link tag="div" to="/profile/ProfileHello">
            Auth接口测试
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link tag="div" to="/api/api-ocr">
            Ocr接口测试
          </router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link tag="div" to="/api/api-liveness">
            活体接口测试
          </router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <router-link tag="div" to="/api/api-onevsone">
            1:1接口测试
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style>

</style>

<style scoped>
  .el-menu-item{
    padding: 0 !important;
  }
  .el-aside{
    border: 1px solid #ddd;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    border-radius: 4px;
  }
  .el-main{
    padding: 0 20px;
  }
  .el-container-wrapper{
    min-height: 800px;
  }
  .el-menu-vertical{
    height: 100%;
  }
</style>

<script>
  export default {
    name: 'Profile',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
