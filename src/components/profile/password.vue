<template>
  <div class="password_wrap">
    <div class="password_cont">请输入原密码:</div>
    <el-input v-model="inputOrigin" placeholder="请输入原密码"></el-input>
    <div class="password_cont">请输入新密码:</div>
    <el-input v-model="inputNew" placeholder="请输入新密码"></el-input>
    <div class="password_cont">再次输入新密码:</div>
    <el-input v-model="inputConfirm" placeholder="再次输入新密码"></el-input>
    <div class="password_btn">
      <el-button type="primary" @click='changePassword()'>修改密码</el-button>
    </div>
  </div>
</template>

<script>
import Ajax from "./../../lib/ajax";
import Config from "./../../lib/config";
export default {
  data() {
    return {
      inputOrigin: '',
      inputNew: '',
      inputConfirm: ''
    } 
  },
  methods: {
    changePassword(){
      var that = this
      if(!that.inputOrigin){
        this.$alert('请输入原密码', '', {
          confirmButtonText: '确定',
        })
      }else if(that.inputNew !== that.inputConfirm){
        this.$alert('两次输入的不一致', '', {
          confirmButtonText: '确定',
        })
      }else{
        Ajax(Config.AjaxUrl +  '/account/change_password', {
          old_password: that.inputNew,
          password: that.inputConfirm
        },function(data){
          console.log('verify_email', data)
          if(data.code == 0){
            that.$alert('修改成功', '', {
              confirmButtonText: '确定',
            })
          } else {
            that.$alert(data.msg, '', {
              confirmButtonText: '确定',
            })
          }
      },function(){
        that.$alert('修改失败', '', {
          confirmButtonText: '确定',
        })
      })
      }
    }
  }
}
</script>

<style>
.password_wrap{
  margin: 0 auto;
  width: 300px;
  padding: 40px 0;
}
.password_cont{
    margin: 20px 0;
    font-size: 0.16rem;
}
.password_wrap .password_btn{
  width: 100%;
  margin-top: 30px;
  text-align: center;
}
</style>

