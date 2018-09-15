<template>

  <div class="lgContain">
    <div class="lgDetail pull-right">
      <div class="bg"></div>
      <input type="text" placeholder="请输入用户名或者邮箱" v-model="account" class="userNameLg" />
      <input type="password" placeholder="请输入密码" v-model="password" class="passWordLg" />
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
export default {
  name: "Register",
  data() {
    return {
      account: '',
      password: '',
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
         axios({
          method: "post",
          data: {
            account: that.account,
            password: that.password
          },
          url: "http://47.97.197.176:8888/account/regist",
          responseType: "json"
        }).then(function(response) {
          console.log(response);
          if (response.status == 200 && response.data.code == 0) {
            //表示注册成功
            this.$router.push({ path: "/home" });
          } else {
            that.tips = response.data.msg;
          }
        });
      }



  
    }
  }
};
</script>

<style scoped>
.lgContain {
  width: 100%;
  height: 100%;
  position: relative;
}
.lgDetail {
  width: 3.5rem;
  height: 4.4rem;
  border: 0.01rem solid #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -1.75rem;
  margin-top: -2.2rem;
  padding: 0.2rem;
}
.bg {
  height: 1.6rem;
  border-bottom: 0.01rem solid #ccc;
  margin: 0.2rem -0.2rem;
}

.lgDetail input {
  height: 0.4rem;
  width: 100%;
  border: 0.01rem solid #ccc;
  margin: 0.05rem 0;
  padding-left: 0.1rem;
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
}
</style>
