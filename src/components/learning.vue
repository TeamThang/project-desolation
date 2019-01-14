<template>
  <div class="learning_bg">
  	<Head></Head>
    <router-view></router-view>
    <div class="learning_wrap">
      <el-tabs v-model="learning_nav_active_name" @tab-click="handleClick">
        <el-tab-pane class="learning_nav_title" label="专利法规" name="first"></el-tab-pane>
        <el-tab-pane class="learning_nav_title" label="商标法规" name="second"></el-tab-pane>
        <el-tab-pane class="learning_nav_title" label="版权法规" name="third"></el-tab-pane>
      </el-tabs>
      <div class="learning_content" v-show="learning_nav_active_name=='first'" v-loading="learningSearchloading">
        <div class="learning_leftwrap">
          <div v-for="(item,index) in learning_zhuanli_list" :key="index" class="learning_menu" @click="changelearning(index)" v-bind:class="{learning_menu_active:index==learning_select}">
            {{item}}
          </div>
        </div>
        <ul class="learning_rightwrap" v-if="contentList[learning_select] && contentList[learning_select].length>0 && currContent==''">
          <li class="learning_li" v-for="(item,index) in contentList[learning_select]" :key="index">
            <a href="#" @click="currContent=item.doc">{{item.title}}</a>
          </li>
        </ul>
        <ul class="learning_rightwrap" v-else-if="currContent!==''">
          <el-button  type="text" @click="learningReturn()"><<<返回列表</el-button>
          <div v-html="currContent">
          </div>
        </ul>
        <ul class="learning_rightwrap" v-else-if="contentList[learning_select] && contentList[learning_select].length==0">
          暂无信息
        </ul>
      </div>
      <div class="learning_content" v-show="learning_nav_active_name=='second'" v-loading="learningSearchloading">
        <div class="learning_leftwrap">
          <div v-for="(item,index) in learning_shangbiao_list" :key="index" class="learning_menu" @click="changelearning(index)" v-bind:class="{learning_menu_active:index==learning_select}">
            {{item}}
          </div>
        </div>
        <ul class="learning_rightwrap" v-loading="learningSearchloading" v-if="contentList[learning_select] && contentList[learning_select].length>0">
          <li class="learning_li" v-for="(item,index) in contentList[learning_select]" :key="index">
            <a href="#">{{item.title}}</a>
          </li>
        </ul>
        <ul class="learning_rightwrap" v-loading="learningSearchloading" v-if="contentList[learning_select] && contentList[learning_select].length==0">
          暂无信息
        </ul>
      </div>
      <div class="learning_content" v-show="learning_nav_active_name=='third'" v-loading="learningSearchloading">
        <div class="learning_leftwrap">
          <div v-for="(item,index) in learning_banquan_list" :key="index" class="learning_menu" @click="changelearning(index)" v-bind:class="{learning_menu_active:index==learning_select}">
            {{item}}
          </div>
        </div>
        <ul class="learning_rightwrap" v-loading="learningSearchloading" v-if="contentList[learning_select] && contentList[learning_select].length>0">
          <li class="learning_li" v-for="(item,index) in contentList[learning_select]" :key="index">
            <a href="#">{{item.title}}</a>
          </li>
        </ul>
        <ul class="learning_rightwrap" v-loading="learningSearchloading" v-if="contentList[learning_select] && contentList[learning_select].length==0">
          暂无信息
        </ul>
      </div>
    </div>

    <el-dialog
      title="诉讼程序"
      :visible.sync="dialogVisible"
      width="60%" class="program_dialog">
      <img src="./../assets/img/learning/program.png" alt="" width="100%" height="auto">
    </el-dialog>
  </div>
</template>

<script>
import Head from '@/components/head';
import Config from './../lib/config';
import Ajax from './../lib/ajax';
export default {
  name: 'learning',
  components:{
    Head: Head
  },
  data() {
    return {
      learningSearchloading: false,
      learning_nav_active_name: 'first',
      learning_zhuanli_list: ["· 法律", "· 行政法规", "· 部门规章",  "· 司法解释", "· 指导案件", "· 典型案件","· 诉讼程序"],
      learning_shangbiao_list: ["· 法律", "· 行政法规", "· 部门规章",  "· 司法解释", "· 指导案件", "· 典型案件","· 诉讼程序"],
      learning_banquan_list: ["· 法律", "· 行政法规", "· 部门规章",  "· 司法解释", "· 指导案件", "· 典型案件","· 诉讼程序"],
      contentList:[],
      currContent: '',
      learning_select: 0,
      dialogVisible: false
    }
  },
  methods: {
    learningReturn(){
      this.currContent = '';
    },
    handleClick(){
      var that = this;
      that.currContent = '';
      if(that.learning_nav_active_name == 'first'){
        that.learningSearchloading = true;
        that.learning_select = 0
        if (!that.contentList[that.learning_select]){
          Ajax(Config.NewAjaxUrl + '/intelprop/patent?cf=1.4.1.1.1', 'get', function(data){
            console.log('learningdata', data)
            that.learningSearchloading = false;
            that.contentList[0] = data;
          },function(){
            that.learningSearchloading = false;
            that.contentList[that.learning_select] = [];
          })
        } else {
          that.learningSearchloading = false;
        }
      }else{
        that.contentList[that.learning_select] = []
      }
    },
    changelearning(val){
      var that = this;
      that.currContent = '';
      that.learning_select = val;
      console.log('contentList', that.contentList[that.learning_select], that.learning_select)
      if(that.learning_nav_active_name == 'first') {
        that.learningSearchloading = true;
        var url = Config.NewAjaxUrl + '/intelprop/patent?cf=1.4.1.1.' + (val + 1)
        if(val == 6){
          that.dialogVisible = true;
          that.learningSearchloading = false;
          return
        }else if(val == 4) {
          url = Config.NewAjaxUrl + '/intelprop/patent?cf=1.4.2.1'
        }else if (val == 5) {
          url = Config.NewAjaxUrl + '/intelprop/patent?cf=1.4.2.2'
        }
        if(!that.contentList[that.learning_select]){
          Ajax(url, 'get', function(data){
            that.contentList[val] = data;
            console.log('contentList2', that.contentList[that.learning_select], val)
            that.$forceUpdate()
            that.learningSearchloading = false;
          },function(){
            that.learningSearchloading = false;
          })
        } else {
          that.learningSearchloading = false;
        }
      }
    }
  },
  mounted: function() {
    var that = this;
    that.learning_select = 0;
    that.learningSearchloading = true;
    Ajax(Config.NewAjaxUrl + '/intelprop/patent?cf=1.4.1.1.1', 'get', function(data){
      console.log('learningdata', data)
      that.learningSearchloading = false;
      that.contentList[0] = data || [];
      that.$forceUpdate()
    },function(){
      that.learningSearchloading = false;
      that.contentList[0]  = []
    })
  }
}
</script>
<style>
  .learning_bg{
    padding-bottom: 20px;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .el-tabs__item{
    font-size: 0.17rem !important;
    font-weight: 700 !important;
  }
	.learning_wrap{
    overflow: hidden;
    width: 1080px;
    margin: 10px auto 40px;
    border-radius: 4px;
  }
  .learning_content{
    width: 100%;
    margin-top: 30px;
  }
  .learning_content .learning_leftwrap{
    width: 250px;
    float: left;
    /* border-right: solid 1px #00a1d7; */
  }
  .learning_content .learning_menu{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    color: #606266;
    -webkit-appearance: none;
    text-align: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 30px;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 700;
    padding: 12px;
    font-size: 0.16rem;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .learning_content .learning_menu:hover{
    color: #409EFF;
    background-color: #ecf5ff;
  }
  .learning_content .learning_menu_active{
    color: #409EFF;
  }
  .learning_content .learning_rightwrap{
    max-width: 830px;
    word-break: break-all;
    float: left;
  }
  .learning_content .learning_rightwrap iframe{
    height: 0 !important;
  }
  .learning_li{
    list-style: none;
    margin-bottom: 30px;
  }
  /* .agent_li_item{
    height: 150px;
    border: 1px solid #e1e2e5;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.14);
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    padding: 11px;
    border-radius: 3px;
  } */
</style>