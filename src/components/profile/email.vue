<template>
  <div class="email_wrap">
    <div v-show="info.email && info.email_verify">
        <h3>您绑定的邮箱为：</h3>
        <div class="email_cont">{{info.email}}</div>
        <h3>修改邮箱：</h3>
        <div v-show="!changeEmailSend">
            <div class="email_cont">请输入需要更换的邮箱地址</div>
            <el-input v-model="changeEmail" placeholder="请输入邮箱地址"></el-input>
            <div class="email_btn">
                <el-button type="primary" @click='changeEmailFunc()'>发送验证码</el-button>
            </div>
        </div>
        <div v-show="changeEmailSend">
            <div class="email_cont">请输入验证码</div>
            <el-input v-model="changeEmailVerify" placeholder="请输入验证码"></el-input>
            <div class="email_btn">
                <el-button type="primary" @click='changeEmailVerifyFunc()'>修改邮箱</el-button>
            </div>
        </div>
    </div>
    <div v-show="info.email && !info.email_verify">
        <h3>您绑定的邮箱为：</h3>
        <div class="email_cont">{{info.email}}</div>
        <h3>您还未验证邮箱</h3>
        <div class="email_btn">
            <el-button type="primary" @click='verifyEmailFunc()'>立即验证</el-button>
        </div>
    </div>
    <div v-show="!info.email">
        <h3>您还未绑定邮箱</h3>
        <div class="email_cont">输入邮箱立即绑定:</div>
        <el-input v-model="bindEmail" placeholder="请输入邮箱地址"></el-input>
        <div class="email_btn">
            <el-button type="primary" @click='bindEmailFunc()'>发送验证</el-button>
        </div>
    </div>

    <el-dialog
      title=""
      :visible.sync="BindEmailDialog"
      :before-close="BindEmailCompleteFunc"
      width="20%"
      center>
      <span>{{BindEmailDialogMsg}}</span>
      <span slot="footer" class="dialog-footer" v-show="BindEmailComplete">
        <el-button type="primary" @click="BindEmailComplete = false;BindEmailDialog = false;">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Ajax from "./../../lib/ajax";
  import Config from "./../../lib/config";
  export default {
  name: "email",
  props:['info'],
  data() {
    return {
        bindEmail: "",
        changeEmail: "",
        changeEmailVerify:"",
        BindEmailDialog: false,
        BindEmailComplete: false,
        BindEmailDialogMsg: "",
        changeEmailSend: false
    }
  },
  methods: {
      bindEmailFunc(){
        var that = this;
        this.BindEmailDialogMsg = "正在发送邮件，请稍后..."
        this.BindEmailDialog = true
        Ajax(Config.AjaxUrl + '/account/change_email', {
            email: that.bindEmail
        },function(data){
            console.log('Bind_email', data)
            if(data.code == 0){
                that.BindEmailDialogMsg = data.msg || "发送成功，请前往邮箱进行下一步操作"
                that.BindEmailComplete = true
            } else {
                that.BindEmailDialogMsg = data.msg
                that.BindEmailComplete = false
            }
        },function(){
            that.BindEmailDialogMsg = "发送失败，请重试"
            that.BindEmailComplete = false
        })
    },
    verifyEmailFunc(){
        var that = this;
        this.BindEmailDialogMsg = "正在发送邮件，请稍后..."
        this.BindEmailDialog = true
        Ajax(Config.AjaxUrl + '/account/verify_email', 'get',function(data){
            console.log('Bind_email', data)
            if(data.code == 0){
                that.BindEmailDialogMsg = data.msg || "发送成功，请前往邮箱进行下一步操作"
                that.BindEmailComplete = true
            } else {
                that.BindEmailDialogMsg = data.msg
                that.BindEmailComplete = false
            }
        },function(){
            that.BindEmailDialogMsg = "发送失败，请重试"
            that.BindEmailComplete = false
        })
    },
    BindEmailCompleteFunc(done) {
        console.log('BindEmailComplete')
        this.BindEmailDialog = false;
        this.BindEmailComplete = false;
        done();
    },
    changeEmailFunc() {
        var that = this;
        if(!that.changeEmail) {
        this.$alert('请输入邮箱地址', '', {
          confirmButtonText: '确定',
          showClose: false
        })
        } else {
            //var action = that.$alert('正在发送验证码，请稍后...', '')
            Ajax(Config.AjaxUrl + '/account/change_email', {
                email: that.changeEmail
            },function(data){
                console.log('change_email', data)
                if(data.code == 0){
                    that.$alert(data.msg || '验证码已发送', '', {
                        confirmButtonText: '确定',
                        showClose: false,
                        callback: action => {
                            that.changeEmailSend = true
                        }
                    })
                } else {
                    that.$alert(data.msg || '验证码发送失败，请重试', '', {
                        confirmButtonText: '确定',
                        showClose: false
                    })
                }
            },function(){
                that.$alert('验证码发送失败，请重试', '', {
                    confirmButtonText: '确定',
                        showClose: false
                })
            })
        }
    },
    changeEmailVerifyFunc() {
      var that = this;
      if(!that.changeEmailVerify) {
        this.$alert('请输入验证码', '', {
          confirmButtonText: '确定',
           showClose: false
        })
      } else {
          Ajax(Config.AjaxUrl + '/account/change_email', {
              email: that.changeEmail,
              is_verify: true,
              code: that.changeEmailVerify
          },function(data){
            console.log('change_email', data)
            if(data.code == 0){
                that.$alert(data.msg || '邮箱修改成功', '', {
                    confirmButtonText: '确定',
                    showClose: false,
                    callback: action => {
                        location.reload()
                    }
                })
            } else {
                that.$alert(data.msg || '邮箱修改失败，请重试', '', {
                    confirmButtonText: '确定',
                    showClose: false
                })
            }
        },function(){
            that.$alert('邮箱修改失败，请重试', '', {
                confirmButtonText: '确定',
                showClose: false ,
                callback: action => {
                    that.changeEmailSend = false
                }
            })
        })
      }
    }
  }
  }
</script>

<style>
.email_wrap{
  margin: 0 auto;
  width: 300px;
  padding: 40px 0;
}
.email_cont{
    margin: 20px 0;
    font-size: 0.16rem;
}
.email_wrap .email_btn{
  width: 100%;
  margin-top: 30px;
  text-align: center;
}
</style>
