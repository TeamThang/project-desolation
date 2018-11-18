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
      <div class="learning_content" v-show="learning_nav_active_name=='first'">
        <div class="learning_leftwrap">
          <div v-for="(item,index) in learning_zhuanli_list" :key="index" class="learning_menu" @click="changelearning(index)" v-bind:class="{learning_menu_active:index==learning_select}">
            {{item}}
          </div>
        </div>
        <ul class="learning_rightwrap" v-loading="learningSearchloading" v-if="contentList.length>0 && currContent==''">
          <li class="learning_li" v-for="(item,index) in contentList" :key="index">
            <a href="#" @click="currContent=item.doc">{{item.title}}</a>
          </li>
        </ul>
        <ul class="learning_rightwrap" v-else-if="currContent!==''">
          <el-button  type="text" @click="learningReturn()"><<<返回列表</el-button>
          <div v-html="currContent">
          </div>
        </ul>
        <ul class="learning_rightwrap" v-else-if="contentList.length==0">
          暂无信息
        </ul>
      </div>
      <div class="learning_content" v-show="learning_nav_active_name=='second'">
        <div class="learning_leftwrap">
          <div v-for="(item,index) in learning_shangbiao_list" :key="index" class="learning_menu" @click="changelearning(index)" v-bind:class="{learning_menu_active:index==learning_select}">
            {{item}}
          </div>
        </div>
        <ul class="learning_rightwrap" v-loading="learningSearchloading" v-if="contentList.length>0">
          <li class="learning_li" v-for="(item,index) in contentList" :key="index">
            <a href="#">{{item.title}}</a>
          </li>
        </ul>
        <ul class="learning_rightwrap" v-loading="learningSearchloading" v-if="contentList.length==0">
          暂无信息
        </ul>
      </div>
      <div class="learning_content" v-show="learning_nav_active_name=='third'">
        <div class="learning_leftwrap">
          <div v-for="(item,index) in learning_banquan_list" :key="index" class="learning_menu" @click="changelearning(index)" v-bind:class="{learning_menu_active:index==learning_select}">
            {{item}}
          </div>
        </div>
        <ul class="learning_rightwrap" v-loading="learningSearchloading" v-if="contentList.length>0">
          <li class="learning_li" v-for="(item,index) in contentList" :key="index">
            <a href="#">{{item.title}}</a>
          </li>
        </ul>
        <ul class="learning_rightwrap" v-loading="learningSearchloading" v-if="contentList.length==0">
          暂无信息
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
  name: 'learning',
  components:{
    Head: Head
  },
  data() {
    return {
      learningSearchloading: false,
      learning_nav_active_name: 'first',
      learning_zhuanli_list: ["· 法律", "· 行政法规", "· 部门规章",  "· 司法解释"],
      learning_shangbiao_list: ["· 法律", "· 行政法规", "· 部门规章",  "· 司法解释"],
      learning_banquan_list: ["· 法律", "· 行政法规", "· 部门规章",  "· 司法解释"],
      contentList:[],
      currContent: '',
      learning_select: 0
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
        Ajax(Config.NewAjaxUrl + '/intelprop/patent?cf=1.4.1.1.1', 'get', function(data){
          console.log('learningdata', data)
          that.learningSearchloading = false;
          that.contentList = data;
        },function(){
          that.learningSearchloading = false;
          that.contentList = [];
        })
      }else{
        that.contentList = []
      }
    },
    changelearning(val){
      var that = this;
      that.currContent = '';
      that.learning_select = val;
      if(that.learning_nav_active_name == 'first') {
        that.learningSearchloading = true;
        var url = Config.NewAjaxUrl + '/intelprop/patent?cf=1.4.1.1.' + (val + 1)
        Ajax(url, 'get', function(data){
          that.learningSearchloading = false;
          console.log('learningdata', data)
          that.contentList = data;
        },function(){
          that.learningSearchloading = false;
        })
      }
    }
  },
  mounted: function() {
    var that = this;
    that.learningSearchloading = true;
    Ajax(Config.NewAjaxUrl + '/intelprop/patent?cf=1.4.1.1.1', 'get', function(data){
      console.log('learningdata', data)
      that.learningSearchloading = false;
      that.contentList = data || [];
    },function(){
      that.learningSearchloading = false;
      that.contentList = []
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
    width: 1280px;
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
    width: 1000px;
    float: right;
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