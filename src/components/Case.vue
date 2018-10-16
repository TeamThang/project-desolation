<template>
<div class="case_bg">
  <Head></Head>
  <router-view></router-view>
  <div class="case_wrap">
      <div class="case_content">
        <div class="case_top" v-loading="caseSearchloading">
          <p class="case_top_title">知识产权案件</p>
          <div class="case_search">
            <el-input  placeholder="请输入案情" v-model="caseInput" class="input-with-select">
              <el-select v-model="caseSelect" slot="prepend" placeholder="请选择">
                <el-option label="案件查询" value="1"></el-option>
                <el-option label="律师推荐" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="caseSearchFunc()"></el-button>
            </el-input>
          </div>
        </div>

        <ul class="case_result" v-show="caseSelect == 1 && caseResult">
          <li class="case_result_li" v-for="(item, index) in caseResult">
            <div class="case_item" >
              <div class="case_title">{{item.title}}<span>{{item.case_num}}</span></div>
              <div class="case_left">
                <div class="case_cont">受理法院：{{item.court}}</div>
                <div class="case_cont">判决时间：{{item.judgement_date}}</div>
                <div class="case_cont">审理阶段：{{item.judicial_procedure}}</div>
              </div>
              <div class="case_right">
                <div class="case_cont">判决状态：{{item.judge_type}}</div>
                <div class="case_cont">发布时间：{{item.publish_date}}</div>
                <div class="case_cont">文书ID: <a href="#" @click="openUrl(item.source_url)">{{item.wenshu_id}}</a></div>
              </div>
            </div>
          </li>
        </ul>

        <ul class="case_result" v-show="caseSelect == 2 && lawyerResult">
          <li class="case_result_li" v-for="(item, index) in lawyerResult">
            <div class="case_item case_cursor" @click="openUrl('http://47.97.197.176/components/lawyerDetail.html?lawyer_name=' + item.num + '&lawyer_location=' + item.location)">
              <div class="case_title">{{item.name}}</div>
                <div class="case_cont">律师事务所：{{item.location}}</div>
                <div class="case_cont">案件数量:{{item.num}}</div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</div>
</template>

<script>
import Head from '@/components/head';
import Config from './../lib/config';
import Ajax from './../lib/ajax';
export default {
  name: "Case",
  components:{
    Head: Head
  },
  data() {
    return {
        caseSearchloading: false,
        caseInput: '',
        caseSelect: '',
        caseResult: null,
        activeName: '1',
        lawyerResult: null
    };
  },
  methods: {
    openUrl(url){
      window.open(url)
    },
    caseSearchFunc(){
      var that = this;
      if(!that.caseSelect){
        that.$alert('请选择类型', '', {
         confirmButtonText: '确定',
          showClose: false
        })
      }else if(!that.caseInput){
        that.$alert('请输入内容', '', {
          confirmButtonText: '确定',
          showClose: false
        })
      }else{  //案件查询
        that.caseSearchloading = true;
        that.caseResult = null
        Ajax(Config.CaseUrl + '/case_type_reason2',{
          text: that.caseInput,
          reason2: "知识产权与竞争纠纷"
        },function(data){
          that.caseSearchloading = false;
          console.log('data', data)
          if(data.code == 0){
            if(that.caseSelect == 1){//案件查询
              let reason = {
                reason_2: "知识产权与竞争纠纷"
              }
              reason['reason_' + data.data[0].sub_reason_class] =  data.data[0].reason
              Ajax(Config.AjaxUrl + '/query/case/case_list',{
                'reason': reason,
                'page_count': 20,
                'page_num': 1 
              },function(result){
                that.caseSearchloading = false;
                console.log('result', result)
                if(result.code == 0){
                  that.caseResult = result.data
                }else{
                  that.$alert('未查询到相关结果', '', {
                    confirmButtonText: '确定',
                    showClose: false
                  })
                }
              },function(){
                that.caseSearchloading = false;
                that.$alert('查询服务维护中，请稍后再试', '', {
                  confirmButtonText: '确定',
                  showClose: false
                })
              })
            }else {//律师查询
              that.caseSearchloading = true;
              that.lawyerResult = null
              let reason = {}
              reason['reason_' + data.data[0].sub_reason_class] =  data.data[0].reason
              Ajax(Config.AjaxUrl + '/query/lawyer/lawyer_list',{
                'reason': reason,
                'page_count': 20,
                'page_num': 1 
              },function(result){
                that.caseSearchloading = false;
                console.log('result', result)
                if(result.code == 0){
                  that.lawyerResult = result.data
                }else{
                  that.$alert('未查询到相关结果', '', {
                    confirmButtonText: '确定',
                    showClose: false
                  })
                }
              },function(){
                that.caseSearchloading = false;
                that.$alert('查询服务维护中，请稍后再试', '', {
                  confirmButtonText: '确定',
                  showClose: false
                })
              })
            }
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
        },function(){
          that.caseSearchloading = false;
          that.$alert('查询服务维护中，请稍后再试', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        })
      }
    }
  }
};
</script>

<style>
  .case_bg{
    padding-bottom: 20px;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .case_wrap{
    overflow: hidden;
    width: 1280px;
    margin: 10px auto 40px;
    border-radius: 4px;
  }
  .case_content{
    width: 100%;
  }
  .case_top{
    width: 100%;
    height: 300px;
    background: url('./../assets/img/bg/bg21.jpg') center center no-repeat;
    background-size: cover;
    padding: 30px;
    text-align: center;
  }
  .case_top_title{
    color: #fafafa;
    font-size: 0.45rem;

  }
  .case_search{
    width: 800px;
    margin: 0 auto;
  }
  .case_wrap .el-select .el-input {
    width: 130px;
  }
  .case_result{
    width: 980px;
    margin: 10px auto 40px;
    padding: 0;
  }
  .case_result .case_result_li{
    list-style: none;
    margin-bottom: 30px;
  }
  .case_item{
    height: 150px;
    border: 1px solid #e1e2e5;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.14);
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    padding: 11px;
    border-radius: 3px;
  }
  .case_result_li .case_title{
    font-size: 0.18rem;
    font-weight: 700;
  }
  .case_result_li .case_title span{
    font-size: 0.16rem;
    font-weight: 400;
    color:#00a1d7;
    padding: 0 0 0 10px;
  }
  .case_result_li .case_left{
    width: 50%;
    float: left;
  }
  .case_result_li .case_cont{
    font-size: 0.15rem;
    margin: 10px 0;
  }
  .case_result_li .case_right{
    width: 50%;
    float: right;
  }
  .case_result_li .case_cursor{
    cursor: pointer;
  }
</style>
