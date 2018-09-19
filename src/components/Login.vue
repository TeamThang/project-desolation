<template>

	<div class="lgContain">
		<div class="lgDetail pull-right">
			<div class="bg">法宝贝</div>
      <p class="tips">{{tips}} </p>
			<input type="text" v-model="account" placeholder="请输入用户名或者邮箱" class="userNameLg" />
			<input type="password" v-model="password" placeholder="请输入密码" class="passWordLg" />
      <div class="imgContain" v-cloak v-if="img">
         <!-- <img v-bind:src="imgUrl" alt="">  -->
         <p @click="getPictureResult">{{img}}</p>
         <input type="text"  class="imgResult" v-model="imgInputResult" placeholder="请输入验证码"> 
         </div>

				<button id="agreeLg" pointer @click="login()">登录</button>

			<!-- <button id="agreeLg" >登录</button> -->
			<div class="reg" text-right>
				<router-link to="/register">
					<a pointer>没有账号？请注册</a>
				</router-link>
			</div>
		</div>
	</div>

</template>

<script>
import axios from "axios";
// ajax 对象 
 function ajaxObject() { 
 var xmlHttp; 
 try { 
 // Firefox, Opera 8.0+, Safari 
 xmlHttp = new XMLHttpRequest(); 
 } 
 catch (e) { 
 // Internet Explorer 
 try { 
 xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); 
 } catch (e) { 
 try { 
 xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 
 } catch (e) { 
 alert("您的浏览器不支持AJAX！"); 
 return false; 
 } 
 } 
 } 
 return xmlHttp; 
 } 
// ajax post请求： 
  function ajaxPost ( url , data , fnSucceed , fnFail , fnLoading ) { 
    var ajax = ajaxObject(); 
    ajax.open( "post" , url , true ); 
    ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" ); 
    ajax.onreadystatechange = function () { 
    if( ajax.readyState == 4 ) { 
    if( ajax.status == 200 ) { 
    fnSucceed( ajax.responseText ); 
    } 
    else { 
    fnFail( "HTTP请求错误！错误码："+ajax.status ); 
    } 
    } 
    else { 
    fnLoading(); 
    } 
    }; 
    ajax.send( data ); 
  } 
export default {
  name: "Login",
  data() {
    return {
      tips: "",
      account: "",
      password: "",
      code: "",
      img: "",
      imgUrl:
        "http://cpquery.sipo.gov.cn/freeze.main?txn-code=createImgServlet&freshStept=1&now=Wed%20Nov%2015%202017%2013:12:36%20GMT+0800%20(CST)",
      imgResult: "",
      imgInputResult: ""
    };
  },
  methods: {
    login() {
      var that = this;
      console.log(that.imgResult);
      console.log(that.imgInputResult);

      if (!that.account) {
        that.tips = "请输入账号！";
        return;
      } else if (!that.password) {
        that.tips = "请输入密码！";
        return;
      } else if (!that.imgInputResult) {
        that.tips = "请输入验证码结果！";
      } else if (that.imgResult != that.imgInputResult) {
        that.tips = "验证码结果错误！";
      } else {
        var Account = "",
          Email = "";
        if (that.account.indexOf("@") >= 0) {
          Email = that.account;
        } else {
          Account = that.account;
        }
        console.log(Email);
        console.log(Account);
        // axios.post('http://47.97.197.176:8888/auth/login',{
        //     account: Account,
        //     email: Email,
        //     password: that.password
        // }).then(function(response) {
        //   console.log(response);
        //   if (response.status == 200 && response.data.code == 0) {
        //     //表示登录成功
        //     this.$router.push({ path: "/home" });
        //   } else {
        //     that.tips = response.data.msg;
        //   }
        // });
        ajaxPost('http://47.97.197.176:8888/auth/login',JSON.stringify({
            account: Account,
            email: Email,
            password: that.password
        }),function(data){
          data = JSON.parse(data)
          console.log(typeof data)
          if(data.code == 0) {
            that.$router.push({ path: "/home" });
          }else{
            that.tips = data.msg
          }
        },function(error){
          that.tips = error
        },function(){})
      }
    },
    getPictureResult: function() {
      console.log("获取图片的结果函数");
      var that = this;
      var a = parseInt(Math.random()*50);
      var b = parseInt(Math.random()*50);
      that.img = a + '' + '+' + b +'';
      that.imgResult = a + b;
    }
  },
  mounted: function() {
    this.getPictureResult();
  }
};
</script>

<style scoped>
.imgContain {
  height: 0.4rem;
  width: 100%;
  border: 0.01rem solid #ddd;
  color: #666;
  margin: 0.05rem 0;
  border-radius: 0.04rem;
  font-size: 0.14rem;
}
.imgContain img {
  height: 100%;
  display: block;
  float: left;
  width: 30%;
}
.imgContain p {
  text-align: center;
  font-weight: bold;
  font-size: 0.2rem;
  padding: 0;
  margin: 0;
  height: 100%;
  line-height: 0.4rem;
  display: block;
  float: left;
  width: 25%;
}
.imgContain .imgResult {
  border: none;
  margin: 0;
  padding: 0;
  height: 100%;
  line-height: 0.3rem;
  padding-left: 5%;
  float: left;
  width: 70%;
  box-sizing: border-box;
  border-left: 0.01rem solid #ddd;
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
.lgContain {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('./../assets/img/bg/bg1.jpg') 100% no-repeat;
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
