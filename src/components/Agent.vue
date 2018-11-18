<template>
  <div class="agent_bg">
  	<Head></Head>
    <router-view></router-view>
    <div class="agent_wrap">
      <el-tabs v-model="agent_nav_active_name" @tab-click="handleClick">
        <el-tab-pane class="agent_nav_title" label="代理人查询" name="first"></el-tab-pane>
        <el-tab-pane class="agent_nav_title" label="代理机构查询" name="second"></el-tab-pane>
      </el-tabs>
      <div class="agent_content">
        <div class="agent_top" v-loading="agentSearchloading">
          <p class="agent_top_title" v-show="agent_nav_active_name=='first'">代理人查询</p>
          <p class="agent_top_title" v-show="agent_nav_active_name=='second'">代理机构查询</p>
          <div class="agent_search">
            <el-input placeholder="请输入内容" v-model="agentInput" class="input-with-select"></el-input>
            <el-button type="primary" class="agent_input_button" icon="el-icon-search" @click="agentSearchFunc()">立即搜索</el-button>
          </div>
        </div>
        
        <ul class="agent_result" v-if="agentManResult!=null" v-show="agent_nav_active_name == 'first'">
          <el-collapse v-model="activeName" accordion>
          <li class="agent_result_li" v-for="(item, index) in agentManResult" :key="index">
            <div class="agent_item" >
              <div class="agent_avatar" v-bind:class="{ female: item.gender == '女' }"></div>
              <div class="agent_left">
                <div class="agent_name">{{agent_name}}</div>
                <div class="agent_spec">证书号：{{item.certNo}}</div>
              </div>
              <div class="agent_right">
                <div class="agent_spec">性别：{{item.gender}}</div>
                <div class="agent_spec">专业：{{item.major}}</div>
                <div class="agent_spec">专利代理机构：<a @click="changeToCompany(item.cp_name)">{{item.cp_name}}</a></div>
              </div>
            </div>
            <el-collapse-item title="详细信息" :name=index @click="LoadingAgentChart(this, index)">
                <div class="agent_patent_count">专利数量：{{item.patent_data.count}}</div>
                <div class="agent_patent_count">专利分布:
                  <span v-if="item.patent_data.count==0 || !item.patent_data.statistic_info">暂无数据</span>
                </div>
                <div class="agent_charts" v-if="item.patent_data.count!=0 && item.patent_data.statistic_info">
                  <Bing :options='item.patent_data.statistic_info || []'></Bing>
                  <div class="agent_patent_count">专利列表:</div>
                  <ul class="agent_patent_caseul">
                    <li class="agent_patent_caseli" v-for="(caseitem, caseindex) in agentDetaillist[0]" :key='caseindex'>
                        <div class="agent_patent_caseli_title">{{caseitem.dev_name}}</div>
                        <div class="agent_patent_caseli_cont"><span>专利号：</span>{{caseitem.patent_no}}</div>
                        <div class="agent_patent_caseli_cont"><span>布日期：</span>{{caseitem.public_date}}</div>
                        <div class="agent_patent_caseli_cont"><span>专利类型：</span>{{caseitem.dev_name}}</div>
                        <div class="agent_patent_caseli_cont"><span>摘要：</span>{{caseitem.abstract}}</div>
                    </li>
                  </ul>
                </div>
            </el-collapse-item>
          </li>
          </el-collapse>
          <div class="agent_result_page">
            <el-pagination
              @current-change="handleAgentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="totalItems">
            </el-pagination>
          </div>
        </ul>
        <ul  class="agent_result" v-if="agentCompanyResult!=null" v-show="agent_nav_active_name == 'second'">
          <el-collapse  accordion>
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
                  <div class="agent_spec">专利代理人人数：{{agentCompanyResult.agentNum}}</div>
                  <div class="agent_spec">成立时间：{{agentCompanyResult.stablish}}</div>
                  <div class="agent_spec">网址：{{agentCompanyResult.website}}</div>
                </div>
              </div>
              <el-collapse-item title="人员详细信息" :name="1">
                  <ul class="agent_result">
                    <li class="agent_result_li" v-for="(a, i) in agentCompanyResult.agents" :key="i">
                      <div class="agent_item" >
                        <div class="agent_avatar" v-bind:class="{ female: a.gender == '女' }"></div>
                        <div class="agent_left">
                          <div class="agent_name"><a @click="changeToAgent(a.cp_name)">{{a.cp_name}}</a></div>
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
          <div class="agent_compant_result_page">
          </div>
        </ul>
        </div>
      </div>
  </div>
</template>

<script>
import Head from '@/components/head';
import Bing from '@/components/charts/bing';
import Config from './../lib/config';
import Ajax from './../lib/ajax';
export default {
  name: 'Agent',
  components:{
    Head: Head,
    Bing: Bing
  },
  data () {
    return {
      agent_nav_active_name: 'first',
      agentInput: '',
      agentSelect: '',
      agentSearchloading: false,
      agentManResult: null,
      agentTotalManResult: null,
      agentCompanyResult: null,
      agent_name: '',
      activeName: '1',
      activeCompany: '1',
      agentDetail:[],
      agentDetaillist: [],
      currentPage: 1,
      totalItems: 0
    }
  },
  methods: {
    handleAgentChange(val) {
      console.log(`当前页: ${val}`);
      agentManResult
      this.currentPage = val;
      this.agentManResult = [];
      this.agentManResult.push(this.agentTotalManResult.slice(val*10, val*10+10))
      // this.agentSearchFunc();
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    handleClick(){
      this.agentManResult = null;
      this.agentCompanyResult = null;
    },
    changeToAgent(name){
      this.agentInput = name;
      this.agent_nav_active_name = 'first';
      console.log('agentSelect', this.agentSelect)
      console.log('agentSelect.value', this.agentSelect.value)
      this.agentSearchFunc()
    },
    changeToCompany(name){
      this.agentInput = name;
      this.agent_nav_active_name = 'second';
      this.agentSearchFunc()
    },
    agentSearchFunc(){
      var that = this;
      that.agentManResult = null;
      that.agentCompanyResult = null;
      if(!that.agentInput){
        that.$alert('请输入内容', '', {
          confirmButtonText: '确定',
          showClose: false
        })
      }else if(that.agent_nav_active_name == 'first'){  //代理人搜索
        that.agentSearchloading = true;
        Ajax(Config.AgentUrl + '/agent_by_name',{
          name: that.agentInput
        },function(data){
          that.agentSearchloading = false;
          if(data.code == 0){
            that.agent_name = that.agentInput;
            that.agentTotalManResult = data.data;
            that.agentManResult = data.data.slice(0,10);
            that.totalItems = data.data.length || 0;
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
        },function(){
          that.agentSearchloading = false;
          that.$alert('查询服务维护中，请稍后再试', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        })
      } else if(that.agent_nav_active_name == 'second'){//代理机构搜索
        that.agentSearchloading = true;
        Ajax(Config.AgentUrl + '/agent_company',{
          name: that.agentInput
        },function(data){
          that.agentSearchloading = false;
          if(data.code == 0){
            that.agent_name = that.agentInput;
            that.agentCompanyResult = data.data;
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
        },function(){
          that.agentSearchloading = false;
          that.$alert('查询服务维护中，请稍后再试', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        })
      }
    }
  },
  watch: {
    activeName(val){
      var that = this;
      if(val !== '' && !that.agentDetail[val]){
        that.agentDetaillist = []
        Ajax(Config.AgentUrl + '/patent_by_agname',{
          name: that.agent_name,
          agency: that.agentManResult[val].cp_name
        },function(data){
          if(data.code == 0){
            that.agentDetail[val] = data.data ?  data.data.data : []
            that.agentDetaillist.push(that.agentDetail[val])
            console.log('agentDetail', that.agentDetaillist)
          }
        },function(){})
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
  .el-tabs__item{
    font-size: 0.17rem !important;
    font-weight: 700 !important;
  }
  .agent_top_title{
    color: #fafafa;
    font-size: 0.3rem;
  }
  .agent_input_button{
    margin-top: 0.3rem !important; 
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
  .agent_item .agent_name a{
    cursor: pointer;
    text-decoration: underline;
  }
  .agent_item .agent_spec{
    padding: 10px 0;
    height: 42px;
  }
  .agent_item .agent_spec a{
    cursor: pointer;
    text-decoration: underline;
  }
  .el-collapse{
    border-top: none;
    border-bottom: none;
  }
  .agent_result_li .el-collapse-item__header{
    height: 150px;
    width: 150px;
    float: right;
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
  .agent_result_li .agent_charts{
    width: 940px;
  }
  .agent_result_li  .agent_patent_caseul{
    width: 940px;
    height: 400px;
    overflow-y: auto;
  }
  .agent_result_li .agent_patent_caseli{
    list-style: none;
    width: 850px;
    padding: 10px;
    border: 1px solid #e1e2e5;
    margin-bottom: 10px;
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.14);
    box-shadow: 0 1px 2px rgba(0,0,0,.14);
  }
  .agent_result_li .agent_patent_caseli span{
    color:#00a1d7;
  }
  .agent_result_li .agent_patent_caseli .agent_patent_caseli_title{
    text-align: center;
    font-size: 0.16rem;
    font-weight: 700;
  }
  .agent_patent_count{
    font-size: 0.18rem;
  }
  .agent_patent_count span{
    font-size: 0.16rem;
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
  .agent_result .agent_result_page{
    text-align: center;
  }
</style>