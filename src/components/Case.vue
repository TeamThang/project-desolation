<template>
<div class="case_bg">
  <Head></Head>
  <router-view></router-view>
  <el-tabs v-model="case_nav_active_aname" @tab-click="handleClick">
    <el-tab-pane label="案件推荐" name="first">案件推荐</el-tab-pane>
    <el-tab-pane label="律师推荐" name="second">律师推荐</el-tab-pane>
    <el-tab-pane label="案件查询" name="third">案件查询</el-tab-pane>
  </el-tabs>
  <div class="case_wrap">
      <div class="case_content">
        <div class="case_top" v-loading="caseSearchloading">
          <p class="case_top_title">知识产权案件</p>
          <div class="case_search">
            <el-select v-model="caseSelect" slot="prepend" placeholder="请选择">
                <el-option label="案件查询" value="1"></el-option>
                <el-option label="律师推荐" value="2"></el-option>
              </el-select>
            <el-input  placeholder="请输入案情" v-model="caseInput" class="input-with-select"  type="textarea">
              
              
            </el-input>
            <el-button slot="append" icon="el-icon-search" @click="caseSearchFunc()"></el-button>
          </div>
        </div>

        <ul class="case_result" v-show="caseSelect == 1 && caseResult">
          <li class="case_result_li" v-for="(item, index) in caseResult" :key="index">
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
                <div class="case_cont"><a href="#" @click="openUrl(item.source_url)">案件详细信息>></a></div>
              </div>
            </div>
          </li>
        </ul>

        <ul class="case_result" v-show="caseSelect == 2 && lawyerResult">
          <el-collapse v-model="activeName" accordion>
            <li class="case_result_li" v-for="(item, index) in lawyerResult" :key="index">
              <div class="case_item case_cursor" @click="openUrl('http://47.97.197.176/components/lawyerDetail.html?lawyer_name=' + item.name + '&lawyer_location=' + item.location)">
                <div class="case_left">
                  <div class="case_title">{{item.name}}</div>
                  <div class="case_cont">律师事务所：{{item.location}}</div>
                  <div class="case_cont">案件数量:{{item.num}}</div>
                </div>
              </div>
              <el-collapse-item title="详细信息" :name=index >
                <div class="lawyer_detail_case_count">
                  <ul class="lawyer_detail_ul" v-if="lawyerDetailList.length != 0">
                    <div class="lawyer_detail_cont"><span>性别：</span>{{lawyerDetailList[0].gender}}</div>
                    <div class="lawyer_detail_cont"><span>学位：</span>{{lawyerDetailList[0].degree || '暂无信息'}}</div>
                    <div class="lawyer_detail_cont"><span>执业证号：</span>{{lawyerDetailList[0].license_no || '暂无信息'}}</div>
                    <div class="lawyer_detail_cont"><span>执业年限：</span>{{lawyerDetailList[0].license_year || '暂无信息'}}</div>
                    <div class="lawyer_detail_cont"><span>执业状态：</span>{{lawyerDetailList[0].license_status || '暂无信息'}}</div> 
                    <div class="lawyer_detail_cont"><span>民族：</span>{{lawyerDetailList[0].nationality || '暂无信息'}}</div>
                    <div class="lawyer_detail_cont"><span>总案件数：</span>{{lawyerDetailList[0].total_count || '暂无信息'}}</div>
                    <div class="lawyer_detail_cont"><span>一审案件数：</span>{{lawyerDetailList[0].judge_count || '暂无信息'}}</div>
                    <CaseBing  v-if="lawyerDetailList[0].detail" :options='lawyerDetailList[0].detail || []'></CaseBing>
                     <div class="lawyer_detail_cont"  v-if="lawyerDetailList[0].detail">
                      <div><span>案件列表:</span></div>
                        <li v-for="(v, i) in lawyerDetailList[0].detail[0].doc" :key="i">
                          <a @click="openUrl('http://wenshu.court.gov.cn/content/content?DocID=' + v.wenshu_id)">{{v.title}}</a>
                        </li>
                     </div>
                     
                  </ul>
                  
                </div>
              </el-collapse-item>
            </li>
          </el-collapse>
        </ul>
      </div>
  </div>
  
  <el-dialog title="请选择详细案由" :visible.sync="reasonFormVisible">
    <el-form>
      <el-form-item label="三级案由" :label-width="formLabelWidth">
        <el-select v-model="reason3_input" placeholder="请选择三级案由">
          <el-option v-for="(item, index) in reasondata" :key="index" :label="index" :value="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="四级案由" :label-width="formLabelWidth">
        <el-select v-model="reason4_input" placeholder="请选择四级案由">
          <el-option v-for="(item, index) in reason3_input ? reasondata[reason3_input] : []" :key="index" :label="index" :value="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="五级案由" :label-width="formLabelWidth">
        <el-select v-model="reason5_input" placeholder="请选择五级案由">
          <el-option v-for="(item, index) in reason4_input ? reasondata[reason3_input][reason4_input] : []" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reasonFormVisible = false;reason3_input = '';reason4_input = '';reason5_input = '';">取 消</el-button>
      <el-button type="primary" @click="reasonFormVisible = false;searchDetail(1)">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import Head from '@/components/head';
import CaseBing from '@/components/charts/casebing';
import Config from './../lib/config';
import Ajax from './../lib/ajax';
import config from './../lib/config';
export default {
  name: "Case",
  components:{
    Head: Head,
    CaseBing: CaseBing
  },
  data() {
    return {
        caseSearchloading: false,
        caseInput: '',
        caseSelect: '',
        caseResult: null,
        activeName: '1',
        lawyerResult: null,
        reasonFormVisible: false,
        allreason: [],
        reason3_input:'',
        reason4_input:'',
        reason5_input:'',
        formLabelWidth: '180px',
        reasondata: {},
        lawyerDetail: [],
        lawyerDetailList: []
    };
  },
  methods: {
    handleClick(tab, event){
      console.log(tab, event);
    },
    searchDetail(type, data){
      var that = this;
      that.caseSearchloading = true;
      if(that.caseSelect == 1){//案件查询
        var reason = {
          reason_2: "知识产权与竞争纠纷"
        }
        if(type == 0){
          reason['reason_' + data.data[0].sub_reason_class] =  data.data[0].reason
        }else{
          if(that.reason5_input){
            reason.reason_5 = that.reason5_input
          }else if(that.reason4_input){
            reason.reason_4 = that.reason4_input
          }else if(that.reason3_input){
            reason.reason_3 = that.reason3_input
          }
        }
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
        var reason = {}
        if(type == 0){
          reason['reason_' + data.data[0].sub_reason_class] =  data.data[0].reason
        }else{
          if(that.reason5_input){
            reason.reason_5 = that.reason5_input
          }else if(that.reason4_input){
            reason.reason_4 = that.reason4_input
          }else if(that.reason3_input){
            reason.reason_3 = that.reason3_input
          }
        }
        Ajax(Config.AjaxUrl + '/query/lawyer/lawyer_list',{
          'reason': reason,
          'page_count': 20,
          'page_num': 1 
        },function(result){
          that.caseSearchloading = false;
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
      
    },
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
      }else if(that.caseInput.length <= 30){
        that.reasonFormVisible = true
      }else{  //案件查询
        that.caseSearchloading = true;
        that.caseResult = null
        Ajax(Config.CaseUrl + '/case_type_reason2',{
          text: that.caseInput,
          reason2: "知识产权与竞争纠纷"
        },function(data){
          if(data.code == 0){
            this.searchDetail(0,data)
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
    },
    LoadingLawyerInfo(index){
      
    }
  },
  mounted(){
    var that = this;
    var reasondata = {},reason3 = [], reason4 = {}, reason5 = {}
    Ajax(config.AjaxUrl + '/query/reason/ori_reason_tree','',function(data){
      if(data.code == 0){
        var reason1 = data.data
        for (var i in reason1){
          if(i == '知识产权与竞争纠纷'){
            that.reasondata = reason1[i]
          }
        }
      }
    },function(){
    })
  },
  watch:{
    reason3_input(){
      this.reason4_input = '';
      this.reason5_input = '';
    },
    reason4_input(){
      this.reason5_input = '';
    },
    activeName(val){
      var that = this;
      that.lawyerDetailList = []
      if(val === ''){

      }else if(that.lawyerDetail[val]) {
        that.lawyerDetailList.push(that.lawyerDetail[val])
      } else {
        Ajax(Config.AjaxUrl + '/query/lawyer/lawyer_info',{
          lawyer_name: that.lawyerResult[val].name,
          lawyer_location: that.lawyerResult[val].location,
          reason: {reason_2: "知识产权与竞争纠纷"}
        },function(data){
          if(data.code == 0){
            that.lawyerDetail[val] = data.data
            that.lawyerDetailList.push(that.lawyerDetail[val])
            console.log('律师信息', data.data)
          }
        },function(){})
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
    height: 170px;
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
    float: left;
    height: 148px;
    width: 400px;
    padding: 0 30px 0 0;
    font-size: 0.15rem;
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
  .el-collapse{
    border-top: none;
    border-bottom: none;
  }
  .case_result_li .el-collapse-item__header{
    height: 170px;
    margin-top: -170px;
    font-size: 0.15rem;
    line-height: 170px;
    position: relative;
    background: transparent;
  }
  .case_result_li .el-collapse-item__header .el-collapse-item__arrow{
    line-height: 170px;
    position: absolute;
    right: 0;
  }
  .case_result_li .el-collapse-item__content{
    background-color: #f8f8f8;
    padding: 20px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #e1e2e5;
    border-right: 1px solid #e1e2e5;
    border-left: 1px solid #e1e2e5;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.14);
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
  }
  .case_result_li  .lawyer_detail_ul{
    padding: 0;
    width: 940px;
    height: 400px;
    overflow-y: auto;
  }
  .case_result_li .lawyer_detail_cont{
    list-style: none;
    font-size: 0.16rem;
  }
  .case_result_li .lawyer_detail_cont a{
    cursor: pointer;
    text-decoration: underline;
  }
  .case_result_li .lawyer_detail_cont span{
    color:#00a1d7;
  }
</style>
