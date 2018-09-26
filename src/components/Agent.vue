<template>
  <div class="agent_bg">
  	<Head></Head>
    <router-view></router-view>
    <div class="agent_wrap">
      <div class="agent_content">
        <div class="agent_top" v-loading="agentSearchloading">
          <p class="agent_top_title">代理人查询</p>
          <div class="agent_search">
            <el-input placeholder="请输入内容" v-model="agentInput" class="input-with-select">
              <el-select v-model="agentSelect" slot="prepend" placeholder="请选择">
                <el-option label="代理人" value="1"></el-option>
                <el-option label="代理机构" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="agentSearchFunc()"></el-button>
            </el-input>
          </div>
        </div>
        
        <ul class="agent_result">
          <li v-for="item in agentManResult">
            <div class="agent_item" v-show="agentSelect==1">
              <div class="agent_avatar" v-bind:class="{ famale: item.gender == '女' }"></div>
              <div class="agent_left">
                <div class="agent_name">{{agent_name}}</div>
                <div class="agent_spec">证书号：{{item.certNo}}</div>
              </div>
              <div class="agent_right">
                <div class="agent_spec">性别{{item.gender}}</div>
                <div class="agent_spec">证专业：{{item.major}}</div>
                <div class="agent_spec">律师事务所：{{item.cp_name}}</div>
              </div>
            </div>
          </li>
        </ul>
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/head';
import Config from './../lib/config';
import Ajax from './../lib/ajax';
export default {
  name: 'Agent',
  components:{
    Head: Head
  },
  data () {
    return {
      agentInput: '',
      agentSelect: '',
      agentSearchloading: false,
      agentManResult: [],
      agent_name: ''
    }
  },
  methods: {
    agentSearchFunc(){
      var that = this;
      console.log('select',that.agentSelect)
      if(!that.agentSelect){
        that.$alert('请选择类型', '', {
         confirmButtonText: '确定',
          showClose: false
        })
      }else if(!that.agentInput){
        that.$alert('请输入内容', '', {
          confirmButtonText: '确定',
          showClose: false
        })
      }else if(that.agentSelect == 1){  //代理人搜索
        that.agentSearchloading = true;
        Ajax(Config.AgentUrl + '/agent_by_name',{
          name: that.agentInput
        },function(data){
          that.agentSearchloading = false;
          if(data.code == 0){
            that.agent_name = that.agentInput
            that.agentManResult = data.data
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
          console.log('data',data)
        },function(){
          that.$alert('查询服务维护中，请稍后再试', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        })
      } else {//代理机构搜索
        that.agentSearchloading = true;
        Ajax(Config.AgentUrl + '/agent_company',{
          name: that.agentInput
        },function(data){
          that.agentSearchloading = false;
          if(data.code == 0){
            that.agent_name = that.agentInput
            that.agentManResult = data.data
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
          console.log('data',data)
        },function(){
          that.$alert('查询服务维护中，请稍后再试', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        })
      }
    }
  }
}
</script>

<style >
  .agent_bg{
    padding-bottom: 20px;
    position: relative;
    width: 100%;
    height: 100%;
  }
	.agent_wrap{
    overflow: hidden;
    width: 1280px;
    margin: 10px auto 40px;
    border-radius: 4px;
  }
  .agent_content{
    width: 100%;
  }
  .agent_top{
    width: 100%;
    height: 300px;
    background: url('./../assets/img/bg/bg21.jpg') center center no-repeat;
    background-size: cover;
    padding: 30px;
    text-align: center;
  }
  .agent_top_title{
    color: #fafafa;
    font-size: 0.45rem;

  }
  .agent_search{
    width: 800px;
    margin: 0 auto;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .agent_result{
    width: 980px;
    margin: 10px auto 40px;
  }
  .agent_result li{
    list-style: none;
    margin-top: 30px;
  }
  .agent_item{
    height: 150px;
    border: 1px solid #e1e2e5;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.14);
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    padding: 11px;
    border-radius: 3px;
  }
  .agent_item .agent_avatar{
    float: left;
    height: 128px;
    width: 128px;
    background: url('./../assets/img/info/male.png') center center no-repeat;
  }
  .agent_item .agent_avatar.female{
    background: url('./../assets/img/info/female.png') center center no-repeat;
  }
  .agent_item .content{

  }
  .agent_item .agent_left{
    float: left;
    height: 128px;
    width: 300px;
    padding: 0 30px;
    font-size: 0.15rem;
  }
  .agent_item .agent_right{
    float: left;
    height: 128px;
    width: 400px;
    padding: 0 30px 0 0;
    font-size: 0.15rem;
  }
  .agent_item .agent_name{
    font-size: 0.3rem;
    padding: 20px 0;
    height: 84px;
  }
  .agent_item .agent_spec{
    padding: 10px 0;
    height: 42px;
  }
</style>