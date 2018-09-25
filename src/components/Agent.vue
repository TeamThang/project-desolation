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
        <div class="agentResult" v-show="agentManResult">
          
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
      agentManResult: null
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
    height: 100%;
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
</style>