<template>

  <div class="lgContain">
    <div class="lgDetail pull-right">
      <div class="bg">法宝贝</div>
      <p class="tips">{{tips}}</p>
      <input type="text" placeholder="请输入账号" v-model="account" class="userNameLg" />
      <input type="password" placeholder="请输入密码" v-model="password" class="passWordLg" />
      <input type="email" placeholder="请输入邮箱" v-model="email" class="emailLg" />
      <input type="name" placeholder="请输入姓名" v-model="name" class="nameLg" />
      <button id="agreeLg" pointer @click="register()">注册</button>
      <!-- <button id="agreeLg" >登录</button> -->
      <div class="reg"  text-right>
        <router-link to="/login">
          <a pointer>已注册，点击登录</a>
        </router-link>

      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import Ajax from "./../lib/ajax";
export default {
  name: "Register",
  data() {
    return {
      account: '',
      password: '',
      email: '',
      name: '',
      tips: ""
    };
  },
  methods: {
    register() {
      var that = this;
      console.log(that.account);
      console.log(that.password);
      if (!that.account) {
        that.tips = "请输入账号！";
        return;
      } else if (!that.password) {
        that.tips = "请输入密码！";
        return;
      }else {
         Ajax('http://47.92.38.167:8888/account/register',{
            account: that.account,
            password: that.password,
            email: that.email,
            name: that.name
        },function(data) {
          console.log(data.code,typeof data)
          if (data.code === 0) {
            //表示注册成功
            that.tips = "注册成功,请登录";
            setTimeout(function(){
              that.$router.push({ path: "/login" });
            },1000)
          } else {
            console.log(data.msg)
            that.tips = data.msg;
          }
        },function(data){
          that.tips = data.msg;
        });
      }
    }
  }
};
</script>

<style scoped>
.lgContain {
  position: relative;
  background: url('./../assets/img/bg/bg1.jpg') center center no-repeat;
  background-size: cover;
}
.lgDetail {
  width: 3.5rem;
  min-height: 4rem;
  border: 0.01rem solid #eee;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -1.75rem;
  margin-top: -2.2rem;
  padding: 0.2rem;
  background-color: #fefefe;
  border-radius: 0.05rem;
  box-shadow: 0 0.03rem 0.05rem rgba(0, 0, 0, 0.2);
}
.bg {
  height: 0.7rem;
  border-bottom: 0.01rem solid #ccc;
  width: 100%;
  line-height: 0.5rem;
  font-size: 0.4rem;
  font-weight: 700;
  color: #277ce1;
}
.tips {
  height: 0.2rem;
  display: block;
  line-height: 0.2rem;
  padding: 0;
  margin: 0;
  color: red;
  font-weight: bold;
  font-size: 0.12rem;
}
.lgDetail input {
  height: 0.4rem;
  width: 100%;
  border: 0.01rem solid #ddd;
  color: rgb(38, 38, 38);
  margin: 0.05rem 0;
  padding-left: 0.1rem;
  border-radius: 0.04rem;
  font-size: 0.14rem;
}

#agreeLg {
  margin: 0.15rem 0;
  height: 0.46rem;
  width: 100%;
  background-color: #277ce1;
  border-radius: 0.05rem;
  text-align: center;
  border: none;
  font-size: 0.18rem;
  color: white;
  font-weight: 900;
  letter-spacing: 0.1rem;
}
#agreeLg:focus {
  box-shadow: 0 0 0.05rem #5068a9;
  opacity: 0.7;
  filter: alpha(opacity=70);
  outline: none;
}
.reg {
  display: flex;
}
.reg > a {
  flex: 1;
  color: #888;
  text-align: center;
  text-decoration: none;
  color: #00a1d6;
}
</style>
