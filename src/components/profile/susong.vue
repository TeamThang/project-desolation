<template>
  <div class="casemanage_wrap">
    <div class="casemanage_info">
      <el-tabs v-model="susongfuwu_nav_active_name" @tab-click="handleClick">
        <el-tab-pane class="susongfuwu_nav_title" label="录入保险报案信息" name="first"></el-tab-pane>
        <el-tab-pane class="susongfuwu_nav_title" label="查看保险报案清单" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="susong_apply" v-show="susongfuwu_nav_active_name=='first'">
      <h3 class="susong_title">请上传保单：</h3>
      <el-upload
        class="upload-demo"
        action="http://47.92.38.167:8901/file/upload"
        :limit="3"
        :name="$store.state.user + '::susong'"
        :on-success="uploadSuccess.bind(uploadSuccess, 'susong')"
        :file-list="susong_input.susong_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <div class="susong_apply_cont">保单号:</div>
      <el-input v-model="susong_input.num" placeholder="请输入保单号 "></el-input>
      <div class="susong_apply_cont">案号:</div>
      <el-input v-model="susong_input.case_num" placeholder="请输入案号 "></el-input>
      <div class="susong_apply_cont">原告名称:</div>
      <el-input v-model="susong_input.yuangao" placeholder="请输入原告名称 "></el-input>
      <div class="susong_apply_cont">被告名称:</div>
      <el-input v-model="susong_input.beigao" placeholder="请输入被告名称 "></el-input>
      <div class="susong_apply_cont">原告代理律师名称:</div>
      <el-input v-model="susong_input.yuangaolvshi" placeholder="请输入原告代理律师名称 "></el-input>
      <div class="susong_apply_cont">原告代理律师执业证号:</div>
      <el-input v-model="susong_input.yuangaolvshinum" placeholder="请输入原告代理律师执业证号"></el-input>
      <div class="susong_apply_cont">原告代理律师律所:</div>
      <el-input v-model="susong_input.yuangaolvshiloc" placeholder="请输入原告代理律师律所"></el-input>
      <div class="susong_apply_cont">起诉法院:</div>
      <el-input v-model="susong_input.qisufayuan" placeholder="请输入起诉法院"></el-input>
      <div class="susong_apply_cont">审判程序:</div>
      <el-input v-model="susong_input.shenpanchengxu" placeholder="请输入审判程序"></el-input>
      <div class="susong_apply_cont">裁判文书类型:</div>
      <el-input v-model="susong_input.wenshuleixing" placeholder="请输入裁判文书类型"></el-input>
      <div class="susong_apply_cont">起诉金额:</div>
      <el-input v-model="susong_input.qisujine" placeholder="请输入起诉金额"></el-input>
      <div class="susong_apply_cont">判决金额:</div>
      <el-input v-model="susong_input.panjuejine" placeholder="请输入判决金额"></el-input>
      <div class="susong_apply_cont">诉讼费用:</div>
      <el-input v-model="susong_input.susongfeiyong" placeholder="请输入诉讼费用"></el-input>
      <div class="susong_apply_cont">证案购买费用:</div>
      <el-input v-model="susong_input.goumaifeiyong" placeholder="请输入证案购买费用"></el-input>
      <div class="susong_apply_cont">被告是否发起无效宣告:</div>
      <el-radio v-model="susong_input.wuxiaoxuangao" label=1>是</el-radio>
      <el-radio v-model="susong_input.wuxiaoxuangao" label=0>否</el-radio>
      <div class="susong_apply_cont">是否参与无效宣告抗辩:</div>
      <el-radio v-model="susong_input.kangbian" label=1>是</el-radio>
      <el-radio v-model="susong_input.kangbian" label=0>否</el-radio>
      <div class="susong_apply_cont">无效宣告抗辩费用:</div>
      <el-input v-model="susong_input.kangbianfeiyong" placeholder="请输入无效宣告抗辩费用"></el-input>
      <div class="susong_apply_confirm">
        <el-button class="susong_apply_button" type="primary" @click="susongApplyFunc()">确认提交</el-button>
      </div>
    </div>
    <div class="susong_apply" v-show="susongfuwu_nav_active_name=='third'">
      <div v-if="apply_list.length > 0">
        <li v-for="item in apply_list">
          <el-card class="apply_list_card">
            <div class="clearfix">
              <span>服务ID：</span>{{item.id}}
              <span>保单号：</span>{{item.num}}
            </div>
            <div class="clearfix">
              <span>被保险人：</span>{{item.insurant}}
              <span>报案时间：</span>{{item.case_time}}
            </div>
            <div class="clearfix">
              <span>诉讼案件情况：</span>{{item.lawsuit_status}}
              <span>诉前服务情况：</span>{{item.pre_svr_status}}
              <span>诉中服务情况：</span>{{item.mid_svr_status}}
            </div>
            <div class="susong_apply_btn">
              <el-button size="small" type="danger" @click="susongApplyDelete(item.id)">取消申请</el-button>
            </div>
          </el-card>
        </li>
      </div>
      <div v-else>
        <h3 class="suzhong_title">暂无信息</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import Ajax from "./../../lib/ajax";
  import Config from "./../../lib/config";
  export default {
  name: "susongfuwu",
  data() {
    return {
      susongfuwu_nav_active_name: 'first',
      susong_input: {},
      uploadList: null,
      apply_list: [],
      apply_detail:[],
      dialogVisible: false
    }
  },
  methods: {
    downloadFile(url){
      window.open(url);
    },
    susongApplyDetail(id){
      var that = this;
      that.dialogVisible = true;
      Ajax(Config.NewAjaxUrl + '/pre/items', {id: id}, function(data){
          if(data.code == 0){
            that.apply_detail = data.data;
          }
        }, function(data){
      })
    },
    susongApplyDelete(id){
      var that = this;
      // Ajax(Config.NewAjaxUrl + '/process_svr/insurance_case/delete', {id: id}, function(data){
      //   if(data.code == 0){
      //     that.$alert('取消成功！', '', {
      //       confirmButtonText: '确定',
      //       showClose: false,
      //       callback: action => {
      //         that.handleClick()
      //       }
      //     })
      //   } else {
      //     that.$alert('删除失败，请重试', '', {
      //       confirmButtonText: '确定',
      //       showClose: false
      //     })
      //   }
      // }, function(data){
      //   that.$alert('删除失败，请重试', '', {
      //     confirmButtonText: '确定',
      //     showClose: false
      //   })
      // })
    },
    uploadSuccess(key, response, file, fileList){
      this.uploadList = response[this.$store.state.user + '::' + key][0].id
      console.log('uploadList', this.uploadList)
    },
    handleClick(val){
      var that = this;
      if(that.susongfuwu_nav_active_name === 'third'){
        // Ajax(Config.NewAjaxUrl + '/insurance_case/list', 'get', function(data){
        //   if(data.code == 0){
        //   that.apply_list = data.data;
        //   }
        // }, function(data){
        // })
      }
    },
    susongApplyFunc(){
      var that = this;
      console.log(Object.keys(that.uploadList))
      // if(Object.keys(that.uploadList).length < 22){
      //   that.$alert('信息未提交完整', '', {
      //     confirmButtonText: '确定',
      //     showClose: false
      //   })
      // }else {
        var reqData = Object.assign({}, that.susong_input)
        reqData.file_id = that.uploadList
        // Ajax(Config.NewAjaxUrl + '/insurance_case/submit', reqData, function(data){
        //   if (data.code === 0) {
        //   that.$alert('提交成功！', '', {
        //     confirmButtonText: '确定',
        //     showClose: false
        //   });
        // } else {
        //   that.$alert('提交失败，请检查提交项是否完整', '', {
        //     confirmButtonText: '确定',
        //     showClose: false
        //   })
        // }
        // }, function(data){
        //   that.$alert('提交失败，请重试', '', {
        //     confirmButtonText: '确定',
        //     showClose: false
        //   })
        // })
      //}

    }
  },
  watch:{
    susongfuwu_nav_active_name(val){
      this.suzhong_input = {};
      this.uploadList = null;
    }
  },
  created: function() {
    //this.info = {}
  }
  }
</script>

<style>
  .casemanage_wrap{
    overflow-y: auto;
    padding: 20px 0;
  }
  .el-tabs__item{
    font-size: 0.17rem !important;
    font-weight: 700 !important;
  }
  .susong_apply_cont{
    margin: 10px 0;
    font-size: 0.16rem;
    color: rgb(29, 72, 114);
  }
  .susong_apply_confirm{
    margin: 20px 0;
    text-align: center
  }
  .susong_apply .susong_title{
    font-size: 0.2rem;
    font-weight: 700;
  }
  .apply_list_card{
    font-size: 0.15rem;
    margin: 20px 0;
    font-weight: 700;
  }
  .apply_list_card .clearfix{
    margin: 10px 0;
  }
  .apply_list_card .clearfix span{
    color: #409EFF;
    font-weight: 500;
    margin-left: 10px;
  }
  .apply_list_card .susong_apply_btn{
    margin-top: 10px;
    text-align: center;
  }
  .apply_list_card .susong_apply_btn button{
    display: inline;
  }
</style>

