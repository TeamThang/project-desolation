<template>
  <div class="patent_bg">
  	<Head></Head>
    <router-view></router-view>
    <div class="patent_wrap">
      <div class="patent_content">
        <div class="patent_top" v-loading="patentSearchloading">
          <p class="patent_top_title">专利查询</p>
          <div class="patent_search">
              <el-input placeholder="请输入专利号,以ZL/CN开头" v-model="patentInput" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="patentSearchFunc()"></el-button>
              </el-input>
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
      patentInput: '',
      patentSearchloading: false,
      patentResult: null,
      patent_name: '',
      tableData: [],
      patentType: [],
      allType: [],
      activeName: '1'
    }
  },
  methods: {
    patentSearchFunc(){
      var that = this;
      console.log('select',that.patentTypeSelect)
      if(!that.patentInput){
        that.$alert('请输入专利号', '', {
          confirmButtonText: '确定',
          showClose: false
        })
      } else {  //专利类型搜索
        that.patentSearchloading = true;
        if(that.patentInput.search('ZL') === -1 || that.patentInput.search('ZL') === -1){
          that.$alert('请输入正确的专利号', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        }
        // var p = that.patentInput.replace('ZL', 'CN')
        // if(p.search('.') === -1){
        //   p=p.substring(0,p.length-1) + '.' + p.charAt(p.length - 1)
        // }
        Ajax(Config.PatentUrl + '/patent_info',{
          classify_no: that.patentTypeSelect,
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
      console.log('data',type)
    },function(){
    })
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
    font-size: 0.45rem;

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
</style>