<template>
  <div class="casemanage_wrap">
    <div class="casemanage_info">
      <el-tabs v-model="baoxianbaoanfuwu_nav_active_name" @tab-click="handleClick">
        <el-tab-pane class="baoxianbaoanfuwu_nav_title" label="录入保险报案信息" name="first"></el-tab-pane>
        <el-tab-pane class="baoxianbaoanfuwu_nav_title" label="查看保险报案清单" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="baoxianbaoan_apply" v-show="baoxianbaoanfuwu_nav_active_name=='first'">
      <h3 class="baoxianbaoan_title">请上传保单：</h3>
      <el-upload
        class="upload-demo"
        action="http://47.92.38.167:8901/file/upload"
        :limit="3"
        :name="$store.state.user + '::baoxianbaoan'"
        :on-success="uploadSuccess.bind(uploadSuccess, 'baoxianbaoan')"
        :file-list="baoxianbaoan_input.baoxianbaoan_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <div class="baoxianbaoan_apply_cont">保单号:</div>
      <el-input v-model="baoxianbaoan_input.num" placeholder="请输入保单号 "></el-input>
      <div class="baoxianbaoan_apply_cont">被保险人:</div>
      <el-input v-model="baoxianbaoan_input.insurant" placeholder="请输入被保险人 "></el-input>
      <div class="baoxianbaoan_apply_cont">报案时间:</div>
      <el-date-picker
      v-model="baoxianbaoan_input.case_time"
      type="date"
      placeholder="选择日期">
      </el-date-picker>
      <div class="baoxianbaoan_apply_cont">诉讼案件情况:</div>
      <el-radio v-model="baoxianbaoan_input.lawsuit_status" label='未立案'>未立案</el-radio>
      <el-radio v-model="baoxianbaoan_input.lawsuit_status" label='一审立案'>一审立案</el-radio>
      <el-radio v-model="baoxianbaoan_input.lawsuit_status" label='一审开庭'>一审开庭</el-radio>
      <el-radio v-model="baoxianbaoan_input.lawsuit_status" label='二审中'>二审中</el-radio>
      <el-radio v-model="baoxianbaoan_input.lawsuit_status" label='已和解'>已和解</el-radio>
      <el-radio v-model="baoxianbaoan_input.lawsuit_status" label='已调解'>已调解</el-radio>
      <el-radio v-model="baoxianbaoan_input.lawsuit_status" label='已判决'>已判决</el-radio>
      <el-radio v-model="baoxianbaoan_input.lawsuit_status" label='执行中'>执行中</el-radio>
      <el-radio v-model="baoxianbaoan_input.lawsuit_status" label='已结案'>已结案</el-radio>
      <div class="baoxianbaoan_apply_cont">诉前服务情况:</div>
      <el-radio v-model="baoxianbaoan_input.pre_svr_status" label='未申请'>未申请</el-radio>
      <el-radio v-model="baoxianbaoan_input.pre_svr_status" label='申请中'>申请中</el-radio>
      <el-radio v-model="baoxianbaoan_input.pre_svr_status" label='服务中'>服务中</el-radio>
      <el-radio v-model="baoxianbaoan_input.pre_svr_status" label='服务结束'>服务结束</el-radio>
      <div class="baoxianbaoan_apply_cont">诉中服务情况:</div>
      <el-radio v-model="baoxianbaoan_input.mid_svr_status" label='未申请'>未申请</el-radio>
      <el-radio v-model="baoxianbaoan_input.mid_svr_status" label='申请中'>申请中</el-radio>
      <el-radio v-model="baoxianbaoan_input.mid_svr_status" label='服务中'>服务中</el-radio>
      <el-radio v-model="baoxianbaoan_input.mid_svr_status" label='服务结束'>服务结束</el-radio>
      <div class="baoxianbaoan_apply_confirm">
        <el-button class="baoxianbaoan_apply_button" type="primary" @click="baoxianbaoanApplyFunc()">确认提交</el-button>
      </div>
    </div>
    <div class="baoxianbaoan_apply" v-show="baoxianbaoanfuwu_nav_active_name=='third'">
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
            <div class="baoxianbaoan_apply_btn">
              <el-button size="small" type="danger" @click="baoxianbaoanApplyDelete(item.id)">取消申请</el-button>
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
  name: "baoxianbaoanfuwu",
  data() {
    return {
      baoxianbaoanfuwu_nav_active_name: 'first',
      baoxianbaoan_input: {},
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
    baoxianbaoanApplyDetail(id){
      var that = this;
      that.dialogVisible = true;
      Ajax(Config.NewAjaxUrl + '/pre/items', {id: id}, function(data){
          if(data.code == 0){
            that.apply_detail = data.data;
          }
        }, function(data){
      })
    },
    baoxianbaoanApplyDelete(id){
      var that = this;
      Ajax(Config.NewAjaxUrl + '/process_svr/insurance_case/delete', {id: id}, function(data){
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
      if(that.baoxianbaoanfuwu_nav_active_name === 'third'){
        Ajax(Config.NewAjaxUrl + '/insurance_case/list', 'get', function(data){
          if(data.code == 0){
          that.apply_list = data.data;
          }
        }, function(data){
        })
      }
    },
    baoxianbaoanApplyFunc(){
      var that = this;
      console.log(Object.keys(that.uploadList))
      // if(Object.keys(that.uploadList).length < 22){
      //   that.$alert('信息未提交完整', '', {
      //     confirmButtonText: '确定',
      //     showClose: false
      //   })
      // }else {
        var reqData = Object.assign({}, that.baoxianbaoan_input)
        reqData.file_id = that.uploadList
        Ajax(Config.NewAjaxUrl + '/insurance_case/submit', reqData, function(data){
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
      //}

    }
  },
  watch:{
    baoxianbaoanfuwu_nav_active_name(val){
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
  .baoxianbaoan_apply_cont{
    margin: 10px 0;
    font-size: 0.16rem;
    color: rgb(29, 72, 114);
  }
  .baoxianbaoan_apply_confirm{
    margin: 20px 0;
    text-align: center
  }
  .baoxianbaoan_apply .baoxianbaoan_title{
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
  .apply_list_card .baoxianbaoan_apply_btn{
    margin-top: 10px;
    text-align: center;
  }
  .apply_list_card .baoxianbaoan_apply_btn button{
    display: inline;
  }
</style>

