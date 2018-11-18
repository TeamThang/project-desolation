<template>
  <div class="patent_bg">
  	<Head></Head>
    <router-view></router-view>
    <div class="patent_wrap">
      <el-tabs v-model="patent_nav_active_name" @tab-click="handleClick">
        <el-tab-pane class="patent_nav_title" label="专利信息查询" name="first"></el-tab-pane>
        <el-tab-pane class="patent_nav_title" label="专利涉诉查询" name="second"></el-tab-pane>
        <el-tab-pane class="patent_nav_title" label="专利复审信息查询" name="third"></el-tab-pane>
        <el-tab-pane class="patent_nav_title" label="专利无效宣告查询" name="fourth"></el-tab-pane>
      </el-tabs>
      <div class="patent_content">
        <div class="patent_top" v-loading="patentSearchloading">
          <p class="patent_top_title" v-show="patent_nav_active_name=='first'">专利信息查询</p>
          <p class="patent_top_title" v-show="patent_nav_active_name=='second'">专利涉诉查询</p>
          <p class="patent_top_title" v-show="patent_nav_active_name=='third'">复审信息查询</p>
          <p class="patent_top_title" v-show="patent_nav_active_name=='fourth'">无效宣告查询</p>
          <div class="patent_search">
            <el-input placeholder="请输入专利号,以ZL/CN开头, 例如CN201410061036.0" v-model="patentInput" class="input-with-select"></el-input>
            <el-button type="primary" class="patent_input_button" icon="el-icon-search" @click="patentSearchFunc()"></el-button>
          </div>
        </div>
        
        <ul class="patent_result" v-show="patentResult!==null">
          <li class="patent_result_li" v-for="(item, index) in patentResult">
            <div class="patent_item">
              <div class="patent_name">{{item.dev_name}}</div>
              <div class="patent_img_wrap" v-if="item.imgslisturl">
                <img class="patent_image" :src="item.imgslisturl" alt="">
              </div>
              <div class="patent_spec"><span>申请日期：</span>{{item.apply_date}}</div>
              <div class="patent_spec"><span>主分类号：</span>{{item.classify_no}}</div>
              <div class="patent_spec"><span>专利类型：</span>{{item.patent_type}}</div>
              <div class="patent_spec"><span>申请（专利权）人：</span>{{item.apply_person}}</div>
              <div class="patent_spec"><span>发明（设计）人：</span>{{item.dev_person}}</div>
              <div class="patent_spec"><span>公开（公告）号：</span>{{item.public_no}}</div>
              <div class="patent_spec"><span>申请号/专利号：</span>{{item.patent_no}}</div>
              <div class="patent_spec"><span>地址：</span>{{item.address}}</div>
              <div class="patent_spec"><span>审查情况：</span>{{item.lawstatus}}</div>
              <div class="patent_spec"><span>当前状态：</span>{{item.potencedesc}}</div>
              <p class="patent_abstract">{{item.abstract}}</p>
            </div>
          </li>
        </ul>

        <ul class="patent_result" v-show="shesuResult!==null">
          <li class="patent_result_li" v-for="(item, index) in shesuResult">
            <div class="patent_item">
              <!-- <div class="patent_spec"><span>分类号：</span>{{item.ipc}}</div>
              <div class="patent_spec"><span>文书ID：</span><a @click="openUrl('http://wenshu.court.gov.cn/content/content?DocID=' + item.wenshu_id)">{{item.wenshu_id}}</a></div>
              <div class="patent_spec"><span>涉诉案件概况：</span></div>   -->
              <div v-if="shesuanjian[0] && shesuanjian[0][item.wenshu_id]">
                 <div class="case_title">{{shesuanjian[0][item.wenshu_id].title}}<span>{{shesuanjian[0][item.wenshu_id].case_num}}</span></div>
                 <div class="case_spec"><span>受理法院：</span>{{shesuanjian[0][item.wenshu_id].court}}</div>
                 <div class="case_spec"><span>受理阶段：</span>{{shesuanjian[0][item.wenshu_id].judicial_procedure2?shesuanjian[0][item.wenshu_id].judicial_procedure2:shesuanjian[0][item.wenshu_id].judicial_procedure1}}</div>
                 <div class="case_spec"><span>审理时间：</span>{{shesuanjian[0][item.wenshu_id].judgement_date}}</div>
                 <div class="case_spec"><span>审理状态：</span>{{shesuanjian[0][item.wenshu_id].judge_type}}</div>
                 <div class="case_spec"><span>代理人：</span>{{shesuanjian[0][item.wenshu_id].party_info}}</div>
                 <div class="case_spec"><span>审判员：</span>{{shesuanjian[0][item.wenshu_id].judge_person}}</div>
                 <div class="case_spec"><span>案情简介：</span>{{shesuanjian[0][item.wenshu_id].trail_flow}}</div>
                 <div class="case_spec"><span>原告观点：</span>{{shesuanjian[0][item.wenshu_id].plaintiff_point}}</div>
                 <div class="case_spec"><span>被告观点：</span>{{shesuanjian[0][item.wenshu_id].defendant_point}}</div>
                 <div class="case_spec"><span>法院核实：</span>{{shesuanjian[0][item.wenshu_id].court_verification}}</div>
                 <div class="case_spec"><span>法院观点：</span>{{shesuanjian[0][item.wenshu_id].court_point}}</div>
                 <div class="case_spec"><span>审判结果：</span>{{shesuanjian[0][item.wenshu_id].judge_result}}</div>
              </div>
              <div v-else>全力搜索中，请稍等。</div>
            </div>
          </li>
        </ul>

         <ul class="patent_result" v-if="patentReCheckResult">
            <div class="patent_item">
               <div class="case_title">{{patentReCheckResult.dev_name}}</div>
               <div class="case_spec_left">
                 <div class="case_spec"><span>决定号：</span>{{patentReCheckResult.decision_id}}</div>
                 <div class="case_spec"><span>委内编号：</span>{{patentReCheckResult.detail.weinei_no}}</div>
                 <div class="case_spec"><span>申请（专利）号：</span>{{patentReCheckResult.detail.patent_no}}</div>
                 <div class="case_spec"><span>复审请求人：</span>{{patentReCheckResult.detail.recheck_apply_person}}</div>
                 <div class="case_spec"><span>授权公告日：</span>{{patentReCheckResult.detail.auth_public_date}}</div>
                 <div class="case_spec"><span>专利权人：</span>{{patentReCheckResult.detail.apply_person}}</div>
                 <div class="case_spec"><span>合议组组长：</span>{{patentReCheckResult.detail.discussion_team_leader}}</div>
                 <div class="case_spec"><span>国际分类号：</span>{{patentReCheckResult.detail.classify_no}}</div>
               </div>
               <div class="case_spec_right">
                 <div class="case_spec"><span>决定日：</span>{{patentReCheckResult.decision_date}}</div>
                 <div class="case_spec"><span>优先权日：</span>{{patentReCheckResult.detail.priority_date}}</div>
                 <div class="case_spec"><span>申请日：</span>{{patentReCheckResult.detail.apply_date }}</div>
                 <div class="case_spec"><span>无效请求人：</span>{{patentReCheckResult.detail.invalid_apply_person}}</div>
                 <div class="case_spec"><span>审定公告日：</span>{{patentReCheckResult.detail.check_public_date}}</div>
                 <div class="case_spec"><span>主审员：</span>{{patentReCheckResult.detail.chief}}</div>
                 <div class="case_spec"><span>参审员：</span>{{patentReCheckResult.detail.participation}}</div>
                 <div class="case_spec"><span>外观设计分类号：</span>{{patentReCheckResult.detail.facade_classify_no}}</div>
               </div>
               <div class="case_spec"><span>法律依据：</span>{{patentReCheckResult.detail.lawyer_according}}</div>
               <div class="case_spec"><span>决定要点：</span></div>
               <div class="case_spec">{{patentReCheckResult.doc ? patentReCheckResult.doc.point : '暂无数据'}}</div>
               <div class="case_spec"><span>全文：</span></div>
               <div class="case_spec">{{patentReCheckResult.doc ? patentReCheckResult.doc.full_text : '暂无数据'}}</div>
            </div>
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
  name: 'patent',
  components:{
    Head: Head
  },
  data () {
    return {
      patent_nav_active_name:'first',
      patentInput: '',
      patentSearchloading: false,
      patentResult: null,
      patent_name: '',
      tableData: [],
      patentType: [],
      allType: [],
      activeName: '1',
      shesuResult: null,
      shesuanjian:[],
      patentReCheckResult: null
    }
  },
  methods: {
    openUrl(url){
      window.open(url)
    },
    handleClick(){
      this.patentResult = null;
      this.shesuResult = null;
      this.patentReCheckResult = null
    },
    patentSearchFunc(){
      var that = this;
      if(!that.patentInput){
        that.$alert('请输入专利号', '', {
          confirmButtonText: '确定',
          showClose: false
        })
      } else if(that.patentInput.search('CN') === -1 && that.patentInput.search('ZL') === -1){
        that.$alert('请输入正确的专利号', '', {
            confirmButtonText: '确定',
            showClose: false
          })
      } else if(that.patent_nav_active_name == 'first') {  //专利类型搜索
        that.patentSearchloading = true;
        Ajax(Config.PatentUrl + '/patent_info',{
          patent_no: that.patentInput
        },function(data){
          that.patentSearchloading = false;
          if(data.code == 0 && data.data.length !== 0){
            that.patentResult = data.data
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
        },function(){
          that.$alert('查询服务维护中，请稍后再试', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        })
      } else if(that.patent_nav_active_name == 'second'){ //涉诉查询
        that.patentSearchloading = true;
        Ajax(Config.PatentUrl + '/patent_wenshu',{
          patent_no: that.patentInput
        },function(data){
          that.patentSearchloading = false;
          if(data.code == 0 && data.data.length !== 0){
            that.shesuResult = data.data
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
        },function(){
          that.$alert('查询服务维护中，请稍后再试', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        })
      }else if(that.patent_nav_active_name == 'third' || that.patent_nav_active_name == 'fourth'){ //复审查询
        that.patentSearchloading = true;
        Ajax(Config.PatentUrl + '/check_decision',{
          patent_no: that.patentInput
        },function(data){
          that.patentSearchloading = false;
          if(data.code == 0 && data.data.length !== 0){
            that.patentReCheckResult = data.data
            if(!data.data.detail)that.patentReCheckResult.detail = {}
          }else{
            that.$alert('未查询到相关结果', '', {
              confirmButtonText: '确定',
              showClose: false
            })
          }
        },function(){
          that.$alert('查询服务维护中，请稍后再试', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        })
      }
      // } else {//标题搜索
      //   that.patentSearchloading = true;
      //   Ajax(Config.AjaxUrl + '/feature_query/patent_classify',{
      //     text: that.patentInput
      //   },function(data){
      //     that.patentSearchloading = false;
      //     if(data.code == 0){
      //       that.patent_name = that.patentInput
      //       that.patentManResult = []
      //       for(var i in data.data){
      //         that.tableData.piush({
      //           inde: i + 1,
      //           patent_no: data.data[i][0],
      //           classify_no: data.data[i][1]
      //         })
      //       }
      //       that.patentContentResult = data.data
      //     }else{
      //       that.$alert('未查询到相关结果', '', {
      //         confirmButtonText: '确定',
      //         showClose: false
      //       })
      //     }
      //     console.log('data',data)
      //   },function(){
      //     that.$alert('查询服务维护中，请稍后再试', '', {
      //       confirmButtonText: '确定',
      //       showClose: false
      //     })
      //   })
      // }
    }
  },
  mounted(){
    var that = this;
    //获取专利类型信息
    Ajax(Config.AjaxUrl + '/query/patent/all_classify',{},function(data){
      if(data.code == 0){
        var type = {
          A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[]
        }
        that.allType = data.data
        for (var i in data.data){
          console.log
          type[data.data[i].classify_no.substr(0,1)].push({classify_no: data.data[i].classify_no, classify_info: data.data[i].classify_info}) 
        }
        that.patentType = type
      }
    },function(){
    })
  },
  watch: {
    shesuResult(val){
      var that = this;
      var rspdata = {};
      if(val && val.length > 0){
        for(var i in val){
          Ajax(Config.AjaxUrl + '/query/case/case_doc',{
            'reason': {
               'reason_2': '知识产权与竞争纠纷'
            },
            'wenshu_id': val[i].wenshu_id
          },function(data){
            if(data.code == 0){
              console.log('wenshu_id', data.data.wenshu_id)
              rspdata[data.data.wenshu_id] = data.data
              that.shesuanjian.push(rspdata)
            }
          },function(){
          })
        }
      }
    }
  }
}
</script>

<style >
  .patent_bg{
    padding-bottom: 20px;
    position: relative;
    width: 100%;
    height: 100%;
  }
	.patent_wrap{
    overflow: hidden;
    width: 1280px;
    margin: 10px auto 40px;
    border-radius: 4px;
  }
  .patent_content{
    width: 100%;
  }
  .patent_top{
    width: 100%;
    height: 300px;
    background: url('./../assets/img/bg/bg21.jpg') center center no-repeat;
    background-size: cover;
    padding: 30px;
    text-align: center;
  }
  .patent_top_title{
    color: #fafafa;
    font-size: 0.3rem;
  }
  .el-tabs__item{
    font-size: 0.17rem !important;
    font-weight: 700 !important;
  }
  .patent_input_button{
    margin-top: 0.3rem !important; 
  }
  .patent_search{
    width: 800px;
    margin: 0 auto;
  }
  .patent_result{
    width: 980px;
    margin: 10px auto 40px;
    padding: 0;
  }
  .patent_result .patent_result_li{
    list-style: none;
    margin-bottom: 30px;
  }
  .patent_item{
    border: 1px solid #e1e2e5;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.14);
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    padding: 10px 50px;
    border-radius: 3px;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
  }
  .patent_item .patent_img_wrap{
    width: 100%;
    text-align: center;
    padding: 20px 0;
  }
  .patent_item .patent_image{
    width: 400px;
  }
  .patent_item .patent_name{
    font-size: 0.3rem;
    padding: 20px 0;
    height: 84px;
    text-align: center;
  }
  .patent_item .patent_spec{
    padding: 10px 0;
    height: 42px;
    font-size: 0.16rem;
  }
  .patent_item .patent_spec span{
    color:#00a1d7;
    padding: 10px 0;
    height: 42px;
    font-size: 0.16rem;
  }
  .patent_item .patent_abstract{
    font-size: 0.16rem;
    text-indent: 2em;
    line-height: 35px;
  }
  .patent_item .case_title{
    font-size: 0.2rem;
    font-weight: 700;
    text-align: center;
    margin: 10px 0;
  }
  .patent_item .case_title span{
    font-size: 0.16rem;
    font-weight: 400;
    color:#00a1d7;
    padding: 0 0 0 10px;
  }
  .patent_item .case_spec_left{
    width: 439px;
    float: left;
  }
  .patent_item .case_spec_right{
    width: 439px;
    float: left;
  }
  .patent_item .case_spec{
    padding: 10px 0;
    font-size: 0.16rem;
  }
  .patent_item .case_spec span{
    color:#00a1d7;
    padding: 10px 0;
    height: 42px;
    font-size: 0.16rem;
  }
  .patent_company_item{
    width: 980px;
    padding: 20px;
    border: 1px solid #e1e2e5;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.14);
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
  }
  .patent_wrap .noneLi{
    list-style: none;
  }
  .patent_wrap .input-select-type {
    width: 300px;
    float: left;
    margin-right: 10px; 
  }
  .patent_wrap .input-with-select .el-input-group{
    width: 500px;
  }
  .patent_wrap .input-with-select{
    width: 500px;
  }
  .patent_item .patent_spec a{
    cursor: pointer;
    text-decoration: underline;
  }
</style>