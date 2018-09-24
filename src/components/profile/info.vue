<template>
  <div>
    <div class="basic_info">
      <h1>基本信息：</h1>
      <el-row>
        <el-col :span="12">
          <div class="basic_content">账号：{{info.account}}</div>
          <div class="basic_content">注册时间：{{info.create_time}}</div>
          <div class="basic_content">账号等级：{{info.level}}类账号</div>
        </el-col>
        <el-col :span="12">
          <div class="basic_content">姓名：{{info.name}}</div>
          <div class="basic_content">上次登录时间：{{info.login_time}}</div>
        </el-col>
      </el-row>
    </div>
    <div class="basic_safe">
      <h1>账号安全：</h1>
      <el-row>
        <el-col :span="12">
          <div class="basic_security_content">
            <div class="basic_safe_icon email"></div>
            <div class="basic_safe_msg" v-show="info.email && info.email_verify">
              <div class="basic_safe_tit">我的邮箱: {{info.email}}</div>
              <div class="basic_safe_sub">绑定过邮箱后即可使用邮箱登录</div>
              <span class="basic_safe_btn">
                <span class="basic_safe_btn_disable" disabled>已验证</span>
                <span class="basic_safe_btn_config" @click="toEmail()">更改邮箱></span>
              </span>
            </div>
            <div class="basic_safe_msg" v-show="!info.email">
              <div class="basic_safe_tit">还未绑定邮箱</div>
              <div class="basic_safe_sub">绑定邮箱后即可使用邮箱登录</div>
              <span class="basic_safe_btn" v-show="!info.email">
                <span class="basic_safe_btn_able" type="primary" @click="toEmail()">去绑定</span>
              </span>
            </div>
            <div class="basic_safe_msg" v-show="info.email && !info.email_verify">
              <div class="basic_safe_tit">我的邮箱: {{info.email}}</div>
              <div class="basic_safe_sub">您还未验证邮箱</div>
              <span class="basic_safe_btn">
                <span class="basic_safe_btn_able" type="primary" @click="toEmail()">去验证</span>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="basic_security_content">
            <div class="basic_safe_icon phone"></div>
            <div class="basic_safe_msg">
              <div class="basic_safe_tit">我的手机</div>
              <div class="basic_safe_sub">绑定邮箱后即可使用手机号登录</div>
              <span class="basic_safe_btn" v-show="info.mobile">
                <span class="basic_btn_disable" disabled>已绑定</span>
                <span class="basic_safe_btn_config" @click="bindMobile()">更改手机号></span>
              </span>
              <span class="basic_safe_btn" v-show="!info.mobile">
                <span class="basic_safe_btn_able" type="primary" @click="bindMobile()">去绑定</span>
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Ajax from "./../../lib/ajax";
  import Config from "./../../lib/config";
  export default {
  name: "info",
  props:['info'],
  data() {
    return {
      email_active: this.info.email ? true : false,
      phone_active: this.info.mobile ? true : false
    }
  },
  methods: {
    bindMobile(){
      this.$router.push({ name: "Profile_modifyPhone"});
    },
    toEmail(){
      this.$router.push({ name: "profile_modifyEmail"});
    }
  },
  watch:{
  },
  created: function() {
    console.log(this.info)
    //this.info = {}
  }
  }
</script>

<style>
  .basic_info {
    padding: 22px 0;
    border-bottom: 1px solid #e5e9ef;
    position: relative;
  }
  .basic_safe {
    padding: 22px 0;
    position: relative;
  }
  .basic_content{
    font-size: 0.16rem;
    margin-bottom: 22px;
  }
  .basic_content .basic_content_activing {
    font-size: 0.14rem;
    display: inline-block;
    height: 24px;
    line-height: 24px;
    color: #00a1d6;
    margin-left: 10px;
    cursor: pointer;
  }
  .basic_security_content{
    margin: 24px 22px 10px 0;
  }
  .basic_security_content .basic_safe_icon{
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background: url(https://s1.hdslb.com/bfs/static/account-fe/static/img/icons_m_2.57e5263.png) no-repeat;
    display: inline-block;
  }
  .basic_safe_icon.email{
    background-position: -386px -2px;
  }
  .basic_safe_icon.phone {
    background-position: -386px -130px;
  }
  .basic_safe_msg{
    margin-left: 16px;
    display: inline-block;
    vertical-align: top;
  }
  .basic_safe_tit{
    font-size: 0.16rem;
    color: #222;
    margin-bottom: 8px;
  }
  .basic_safe_sub {
    font-size: 0.14rem;
    color: #99a2aa;
    margin-bottom: 8px;
  }
  .basic_safe_btn span {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    color: #00a1d6;
    margin-left: 10px;
  }
  .basic_safe_btn .basic_safe_btn_disable {
    cursor: default;
    background-color: #e5e9ef;
    color: #abb4c1;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    width: 70px;
    height: 24px;
    line-height: 24px;
  }
  .basic_safe_btn .basic_safe_btn_able {
    cursor: pointer;
    background-color: #22a1d6;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    width: 70px;
    height: 24px;
    line-height: 24px;
  }
  .basic_safe_btn .basic_safe_btn_config{
    display: inline-block;
    height: 24px;
    line-height: 24px;
    color: #00a1d6;
    margin-left: 10px;
    cursor: pointer;
  }
</style>

