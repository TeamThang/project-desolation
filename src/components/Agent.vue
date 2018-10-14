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
          <el-collapse v-model="activeName" accordion v-show="agentSelect==1">
          <li class="agent_result_li" v-for="(item, index) in agentManResult">
            <div class="agent_item" >
              <div class="agent_avatar" v-bind:class="{ female: item.gender == '女' }"></div>
              <div class="agent_left">
                <div class="agent_name">{{agent_name}}</div>
                <div class="agent_spec">证书号：{{item.certNo}}</div>
              </div>
              <div class="agent_right">
                <div class="agent_spec">性别{{item.gender}}</div>
                <div class="agent_spec">专业：{{item.major}}</div>
                <div class="agent_spec">律师事务所：{{item.cp_name}}</div>
              </div>
            </div>
            <el-collapse-item title="详细信息" :name=index>
                <div class="agent_patent_count">案件数量：{{item.patent_data.count}}</div>
                <div class="agent_patent_count">案件分布:</div>
                <ul class="agent_patent_ul">
                  <li class="agent_patent_li" v-for="(value, key) in item.patent_data.statistic_info.total">
                      <div>{{key}}：{{value}}</div>
                  </li>
                </ul>
            </el-collapse-item>
          </li>
          </el-collapse>

          <el-collapse v-model="activeCompany" accordion v-if="agentSelect==2 && agentCompanyResult">
            <div class="agent_company_item">
              <div class="agent_company_name">{{agentCompanyResult.name}}<span>所长: {{agentCompanyResult.leader}}</span> </div>
              <div class="agent_company_address">地址：{{agentCompanyResult.address}}</div>
              <div class="agent_company_cont">
                <div class="agen_company_left">
                  <div class="agent_spec">邮箱：{{agentCompanyResult.email}}</div>
                  <div class="agent_spec">传真：{{agentCompanyResult.fax}}</div>
                  <div class="agent_spec">电话：{{agentCompanyResult.phone}}</div>
                </div>
                <div class="agent_company_right">
                  <div class="agent_spec">律师数量：{{agentCompanyResult.agentNum}}</div>
                  <div class="agent_spec">成立时间：{{agentCompanyResult.stablish}}</div>
                  <div class="agent_spec">网址：{{agentCompanyResult.website}}</div>
                </div>
              </div>
              <el-collapse-item title="人员详细信息" :name="1">
                  <ul class="agent_result">
                    <li class="agent_result_li" v-for="(a, i) in agentCompanyResult.agents">
                      <div class="agent_item" >
                        <div class="agent_avatar" v-bind:class="{ female: a.gender == '女' }"></div>
                        <div class="agent_left">
                          <div class="agent_name">{{a.cp_name}}</div>
                          <div class="agent_spec">证书号：{{a.certNo}}</div>
                        </div>
                        <div class="agent_right">
                          <div class="agent_spec"></div>
                          <div class="agent_spec">性别：{{a.gender}}</div>
                          <div class="agent_spec">专业：{{a.major}}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
              </el-collapse-item>
            </div>
          </el-collapse>
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
      agentCompanyResult: null,
      agent_name: '',
      activeName: '1',
      activeCompany: '1'
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
            that.agentCompanyResult = null
            that.agentManResult = data.data
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
          console.log('data',data)
        },function(){
          that.agentSearchloading = false;
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
            that.agentManResult = []
            that.agentCompanyResult = data.data
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
          console.log('data',data)
        },function(){
          that.agentSearchloading = false;
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
  .agent_wrap .el-select .el-input {
    width: 130px;
  }
  .agent_wrap .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .agent_result{
    width: 980px;
    margin: 10px auto 40px;
    padding: 0;
  }
  .agent_result .agent_result_li{
    list-style: none;
    margin-bottom: 30px;
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
  .el-collapse{
    border-top: none;
    border-bottom: none;
  }
  .agent_result_li .el-collapse-item__header{
    height: 150px;
    margin-top: -150px;
    font-size: 0.15rem;
    line-height: 150px;
    position: relative;
    background: transparent;
  }
  .agent_result_li .el-collapse-item__header .el-collapse-item__arrow{
    line-height: 150px;
    position: absolute;
    right: 0;
  }
  .agent_result_li .el-collapse-item__content{
    background-color: #f8f8f8;
    padding: 20px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #e1e2e5;
    border-right: 1px solid #e1e2e5;
    border-left: 1px solid #e1e2e5;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.14);
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
  }
  .agent_patent_ul{
    list-style: none;
    padding: 0;
  }
  .agent_patent_li{
    list-style: none;
    display: block;
    padding: 0;
    font-size: 0.15rem;
  }
  .agent_patent_count{
    font-size: 0.18rem;
  }
  .agent_company_item{
    width: 980px;
    padding: 20px;
    border: 1px solid #e1e2e5;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.14);
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
  }
  .agent_company_item .agent_company_name{
    font-size: 0.3rem;
    padding: 15px 0;
    height: 84px;
  }
  .agent_company_item .agent_company_name span{
    font-size: 0.18rem;
    padding: 0 30px;
  }
  .agent_company_address{
    font-size: 0.18rem;
    margin-bottom: 20px;
  }
  .agent_company_item .agent_company_cont{
    width: 100%;
    height: 150px;
    font-size: 0.16rem;
  }
  .agent_company_item .agen_company_left{
    float: left;
    width: 50%;
  }
  .agent_company_item .agen_company_right{
    float: right;
    width: 50%;
  }
  .agent_company_item .agent_spec{
    padding: 10px 0;
  }
  .agent_company_item .el-collapse-item__header{
    text-align: center;
    font-size: 0.18rem;
    font-weight: 700;
  }
  .agent_company_item .el-collapse-item__wrap{
    border-bottom: none;
  }
  .agent_company_item .agent_result{
    width: 938px;
    margin: 10px auto 0;
  }
  .agent_company_item .el-collapse-item__content{
    padding-bottom: 0;
  }
</style>