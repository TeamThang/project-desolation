<template>
<div>
  <Header></Header>
  <div class="info_content">
      <div class="info_left">
        <div class="info_title">个人中心</div>
        <ul>
          <li>
            <router-link :to="{ name: 'profile_info'}">
              <el-button>基本信息</el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'profile_modifyInfo'}">
              <el-button>修改资料</el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'profile_avatar'}">
              <el-button>我的头像</el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'profile_modifyEmail'}">
              <el-button>绑定邮箱</el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Profile_modifyPhone'}">
              <el-button>绑定手机号</el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'profile_password'}">
              <el-button>修改密码</el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'baoxianxinxi'}">
              <el-button>保险信息</el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'case_manage'}">
              <el-button>案件管理</el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'suqianfuwu'}">
              <el-button>诉前服务</el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'suzhongfuwu'}">
              <el-button>诉中服务</el-button>
            </router-link>
          </li>
          <li>
            <el-button>其他</el-button>
          </li>
        </ul>
      </div>
      <div class="info_right">
        <div class="index_right">
          <div class="index_info">
            <div class="index_user">
              <img src="./../assets/img/info/user.png" alt=""></div>  
            <div class="index_content">
              <div class="index_name">{{name}}</div>
            </div>
          </div> 
          <router-view :info = 'info'></router-view>
        </div>
      </div>
    </div>
</div>
  
</template>

<script>
  import Header from '@/components/head';
  import Ajax from "./../lib/ajax";
  import Config from "./../lib/config";
  export default {
    components:{
      Header: Header
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        name: '',
        info: {}
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getInfo(key, keyPath) {
        console.log('Config',Config)
        var that = this;
        Ajax(Config.AjaxUrl + '/account/query','get',function(data){
            if(data.code == 0){
              that.name = data.data.name || data.data.account;
              that.info = data.data
              that.$router.push({ name: "profile_info"});
            }else{
              that.$alert('您还未登录，请登录', '未登录', {
                confirmButtonText: '登录',
                callback: action => {
                  that.$router.push({ path: "/login" });
                }
              });
            }
        },function(){
          that.$alert('您还未登录，请登录', '未登录', {
            confirmButtonText: '登录',
            callback: action => {
              that.$router.push({ path: "/login" });
            }
          });
        })
      }
    },
    mounted: function() {
      this.getInfo()
    }
  }
</script>

<style>
ul,  li {
  list-style: none;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.bg-purple {
    background: #d3dce6;
  }
  .info_content{
    overflow: hidden;
    width: 980px;
    height: 100%;
    margin: 10px auto 100px;
    border: 1px solid #e1e2e5;
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    background: #fafafa;
    border-radius: 4px;
  }
  .info_left{
    float: left;
    width: 149px;
    height: 100%;
    overflow: hidden;
  }
  .info_right{
    float: left;
    width: 829px;
    border-left: 1px solid #ddd;
    background: #fff;
    min-height: 800px!important;
  }
  .info_title{
    display: block;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #99a2aa;
    cursor: default;
    border-bottom: 1px solid #e1e2e5;
  }
  .info_left ul{
    border-bottom: 1px solid #e1e2e5;
    padding: 0;
    margin: 0;
  }
  .info_left li {
    width: 150px;
    height: 48px;
    line-height: 48px;
  }
  .info_left .el-button {
    width: 100%;
    border: none;
    height: 100%;
    background: #fafafa;
    border-radius: 0;
  }
  .info_left .el-button:hover{
    background: #e1e4ea;
    cursor: pointer;
  }
  .index_info{
    border-bottom: 1px solid #e5e9ef;
    padding-bottom: 20px;
    position: relative;
  }
  .index_right{
    padding: 50px 40px 0;
    width: 789px;
  }
  .index_user {
    display: inline-block;
    vertical-align: top;
    position: relative;
    cursor: pointer;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
  }
  .index_user img{
    width: 100%;
    height: 100%;
  }
  .index_content{
    display: inline-block;
    margin-left: 60px;
    width: 524px;
  }
  .index_name{
    height: 120px;
    line-height: 120px;
    font-size: 0.3rem;  
  }
</style>
