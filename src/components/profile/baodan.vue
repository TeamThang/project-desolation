<template>
  <div class="casemanage_wrap">
    <div class="casemanage_info">
      <el-tabs v-model="baodanfuwu_nav_active_name" @tab-click="handleClick">
        <el-tab-pane class="baodanfuwu_nav_title" label="录入保单信息" name="first"></el-tab-pane>
        <el-tab-pane class="baodanfuwu_nav_title" label="保单状态查看" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="baodan_apply" v-show="baodanfuwu_nav_active_name=='first'">
      <h3 class="baodan_title">请上传保单：</h3>
      <el-upload
        class="upload-demo"
        action="http://47.92.38.167:8901/file/upload"
        :limit="1"
        :name="$store.state.user + '::baodan'"
        :on-success="uploadSuccess.bind(uploadSuccess, 'baodan')"
        :file-list="baodan_input.uploadList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="baodan_apply_cont">保单号:</div>
      <el-input v-model="baodan_input.num" placeholder="请输入保单号 "></el-input>
      <div class="baodan_apply_cont">被保险人:</div>
      <el-input v-model="baodan_input.insurant" placeholder="请输入被保险人 "></el-input>
      <div class="baodan_apply_cont">保险起期:</div>
      <el-date-picker
      v-model="baodan_input.start_date"
      type="date"
      placeholder="选择日期">
      </el-date-picker>
      <div class="baodan_apply_cont">保险止期:</div>
      <el-date-picker
      v-model="baodan_input.stop_date"
      type="date"
      placeholder="选择日期">
      </el-date-picker>
      <div class="baodan_apply_cont">是否有效:</div>
      <el-radio v-model="baodan_input.is_valid" label=1>有效</el-radio>
      <el-radio v-model="baodan_input.is_valid" label=0>无效</el-radio>
      <!-- <el-input v-model="baodan_input.is_valid" placeholder="请输入是或者不是"></el-input> -->
      <div class="baodan_apply_confirm">
        <el-button class="baodan_apply_button" type="primary" @click="baodanApplyFunc()">确认提交</el-button>
      </div>  
    </div>
    <div class="baodan_apply" v-show="baodanfuwu_nav_active_name=='third'">
      <div v-if="apply_list.length > 0">
        <li v-for="item in apply_list">
          <el-card class="apply_list_card">
            <div class="clearfix">
              <span>ID：</span>{{item.id}}
              <span>是否有效：</span>{{item.is_valid === 1 ? '有效': '无效'}}
            </div>
            <div class="clearfix">
              <span>保单号：</span>{{item.num}}
              <span>被保险人：</span>{{item.insurant}}
            </div>
            <div class="clearfix">
              <span>保险起期：</span>{{item.start_date}}
              <span>保险止期：</span>{{item.stop_date}}
            </div>
            
            <div class="baodan_apply_btn">
              <el-button size="small" type="danger" @click="baodanApplyDelete(item.id)">删除保单信息</el-button>
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
  name: "baodanfuwu",
  data() {
    return {
      baodanfuwu_nav_active_name: 'first',
      baodan_input: {},
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
    baodanApplyDetail(id){
      var that = this;
      that.dialogVisible = true;
    },
    baodanApplyDelete(id){
      var that = this;
      Ajax(Config.NewAjaxUrl + '/insurance/delete', {id: id}, function(data){
        if(data.code == 0){
          that.$alert('取消成功！', '', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              that.handleClick()
            }
          })
        } else {
          that.$alert('删除失败，请重试', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        }
      }, function(data){
        that.$alert('删除失败，请重试', '', {
          confirmButtonText: '确定',
          showClose: false
        })
      })
    },
    uploadSuccess(key, response, file, fileList){
      this.uploadList = response[this.$store.state.user + '::' + key][0].id
      console.log('uploadList', this.uploadList)
    },
    handleClick(val){
      var that = this;
      if(that.baodanfuwu_nav_active_name === 'third'){
        Ajax(Config.NewAjaxUrl + '/insurance/list', 'get', function(data){
          if(data.code == 0){
            that.apply_list = data.data;
          }
        }, function(data){
        })
      }
    },
    baodanApplyFunc(){
      var that = this;
      var reqData = Object.assign({}, that.baodan_input)
      reqData.file_id = that.uploadList
      reqData.is_valid === '0' ? reqData.is_valid = false : reqData.is_valid = true
      Ajax(Config.NewAjaxUrl + '/insurance/submit', reqData, function(data){
        if (data.code === 0) {
          that.$alert('提交成功！', '', {
            confirmButtonText: '确定',
            showClose: false
          });
        } else {
          that.$alert('提交失败，请检查提交项是否完整', '', {
            confirmButtonText: '确定',
            showClose: false
          })
        }
      }, function(data){
        that.$alert('提交失败，请重试', '', {
          confirmButtonText: '确定',
          showClose: false
        })
      })

    }
  },
  watch:{
    baodanfuwu_nav_active_name(val){
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
  .baodan_apply_cont{
    margin: 10px 0;
    font-size: 0.16rem;
    color: rgb(29, 72, 114);
  }
  .baodan_apply_confirm{
    margin: 20px 0;
    text-align: center
  }
  .baodan_apply .baodan_title{
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
  .apply_list_card .baodan_apply_btn{
    margin-top: 10px;
    text-align: center;
  }
  .apply_list_card .baodan_apply_btn button{
    display: inline;
  }
</style>

