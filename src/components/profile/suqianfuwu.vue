<template>
  <div class="casemanage_wrap">
    <div class="casemanage_info">
      <el-tabs v-model="suqianfuwu_nav_active_name" @tab-click="handleClick">
        <el-tab-pane class="suqianfuwu_nav_title" label="诉前服务介绍" name="first"></el-tab-pane>
        <el-tab-pane class="suqianfuwu_nav_title" label="诉前服务申请" name="second"></el-tab-pane>
        <el-tab-pane class="suqianfuwu_nav_title" label="诉前服务状态" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="suqian_apply" v-show="suqianfuwu_nav_active_name=='first'">
      <h3 class="suqian_title">诉前服务：</h3>
      <div class="suqian_subtitle">根据案件的相关资料，提示被保险人即将面临的维权风险</div>
      <ul class="suqian_ul">
        <li>参照法院的立案标准审查被保险人提供的资料是否齐备、合格。</li>
        <li>对专利的稳定性进行初步评价。</li>
        <li>对专利被侵权事实进行初步评价。</li>
        <li>综合诉前资料，提示被保险人可能会面临的诉讼风险。</li>
      </ul>
    </div>
    <div class="suqian_apply" v-show="suqianfuwu_nav_active_name=='second'">
      <el-container>
        <el-aside class="suqian_apply_aside" width="40px">保单</el-aside>
        <el-main>
          <div class="suqian_apply_cont">请输入保单号:</div>
          <el-input v-model="suqian_input.baodanhao" placeholder="请输入保单号 "></el-input>
          <div class="suqian_apply_cont">请上传保单扫描件:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="3"
            :name="$store.state.user + '::baodan'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'baodan')"
            :file-list="suqian_input.baodan_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-main>
      </el-container>
      <el-container>
        <el-aside class="suqian_apply_aside" width="40px">报案人主体资料</el-aside>
        <el-main>
          <div class="suqian_apply_cont">请输入报案人名称:</div>
          <el-input v-model="suqian_input.baoanren" placeholder="请输入报案人名称 "></el-input>
          <div class="suqian_apply_cont">请输入被保险人名称:</div>
          <el-input v-model="suqian_input.baoxianren" placeholder="请输入被保险人名称 "></el-input>
          <div class="suqian_apply_cont">请上传份证复印件:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="3"
            :name="$store.state.user + '::shenfen'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'shenfen')"
            :file-list="suqian_input.shenfen_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传营业执照或统一社会信用代码证复印件:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="3"
            :name="$store.state.user + '::yingyezhizhao'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'yingyezhizhao')"
            :file-list="suqian_input.yingyezhizhao_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传专利使用许可合同或许可备案证明:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="3"
            :name="$store.state.user + '::xuke'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'xuke')"
            :file-list="suqian_input.xuke_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-main>
      </el-container>
      <el-container>
        <el-aside class="suqian_apply_aside" width="40px">专利权证明</el-aside>
        <el-main>
          <div class="suqian_apply_cont">请输入被侵权的投保专利号:</div>
          <el-input v-model="suqian_input.zhuanlihao" placeholder="请输入专利号 "></el-input>
          <div class="suqian_apply_cont">请上传专利证书复印件:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::zhengshu'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'zhengshu')"
            :file-list="suqian_input.zhengshu_fileList">
            <div slot="tip" class="el-upload__tip">包括权利要求书、专利说明书及附图</div>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传半年内的专利登记簿副本或最近一年的专利年费收据:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::dengji'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'dengji')"
            :file-list="suqian_input.dengji_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传相关合同及履行证据:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::lvxing'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'lvxing')"
            :file-list="suqian_input.lvxing_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传备案证明:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::beian'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'beian')"
            :file-list="suqian_input.beian_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-main>
      </el-container>
      <el-container>
        <el-aside class="suqian_apply_aside" width="40px">专利稳定性证明</el-aside>
        <el-main>
          <div class="suqian_apply_cont">请上传国家专利局（非检索中心）作出的专利评价报告:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::baogao'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'baogao')"
            :file-list="suqian_input.baogao_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传引用或借鉴的最接近技术或设计方案及产品样品:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::jiejian'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'jiejian')"
            :file-list="suqian_input.jiejian_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传专利产品或方案最早公开的相关发布载体:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::zuizao'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'zuizao')"
            :file-list="suqian_input.zuizao_fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-main>
      </el-container>
      <el-container>
        <el-aside class="suqian_apply_aside" width="40px">初步的侵权证据材料或线索</el-aside>
        <el-main>
          <div class="suqian_apply_cont">请输入被告侵权方名称:</div>
          <el-input v-model="suqian_input.qinquanfang" placeholder="请输入被告侵权方名称 "></el-input>
          <div class="suqian_apply_cont">请上传专利产品:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::chanpin'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'chanpin')"
            :file-list="suqian_input.chanpin_fileList">
            <div slot="tip" class="el-upload__tip">如产品过大或过于贵重，可提供六面视图和立体图</div>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传涉嫌侵权产品样品:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::qinquanyangpin'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'qinquanyangpin')"
            :file-list="suqian_input.qinquanyangpin_fileList">
            <div slot="tip" class="el-upload__tip">必须提供样品本身，不能只提供图纸，产品的包装应当完整</div>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传涉嫌侵权产品的取得渠道及方式的说明及相关证明材料:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::qinquanqudao'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'qinquanqudao')"
            :file-list="suqian_input.qinquanqudao_fileList">
            <div slot="tip" class="el-upload__tip">如购买产品的网站、网站及账号、实体店名称、准确位置及名片、联系方式等</div>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传相关单据:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::xiangguan'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'xiangguan')"
            :file-list="suqian_input.xiangguan_fileList">
            <div slot="tip" class="el-upload__tip">购买或取得涉嫌侵权产品的合同、发票、送货单、收据、银行转账单等</div>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传涉嫌侵权产品的广告宣传资料:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::qinquanxuanchuan'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'qinquanxuanchuan')"
            :file-list="suqian_input.qinquanxuanchuan_fileList">
            <div slot="tip" class="el-upload__tip">即刊登有侵权产品的网站、杂志、广告等资料</div>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="suqian_apply_cont">请上传侵权人的主体资料或信息:</div>
          <el-upload
            class="upload-demo"
            action="http://47.92.38.167:8901/file/upload"
            :limit="1"
            :name="$store.state.user + '::qinquanzhuti'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'qinquanzhuti')"
            :file-list="suqian_input.qinquanzhuti_fileList">
            <div slot="tip" class="el-upload__tip">身份证或身份证号码、侵权单位的准确名称或工商登记资料等</div>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-main>
      </el-container>
      <el-container>
        <el-aside class="suqian_apply_aside" width="40px">诉讼请求</el-aside>
        <el-main>
          <div class="suqian_apply_cont">请上传拟起诉金额和依据:</div>
        <el-upload
          class="upload-demo"
          action="http://47.92.38.167:8901/file/upload"
          :limit="1"
          :name="$store.state.user + '::qisu'"
            :on-success="uploadSuccess.bind(uploadSuccess, 'qisu')"
          :file-list="suqian_input.qisu_fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        </el-main>
      </el-container>
      <div class="suqian_apply_confirm">
        <el-button class="suqian_apply_button" type="primary" @click="suqianApplyFunc()">确认提交</el-button>
      </div>  
    </div>
    <div class="suqian_apply" v-show="suqianfuwu_nav_active_name=='third'">
      <div v-if="apply_list.length > 0">
        <li v-for="item in apply_list">
          <el-card class="apply_list_card">
            <div class="clearfix">
              <span>服务ID：</span>{{item.id}}
              <span>服务状态：</span>{{item.status || '审核中'}}
            </div>
            <div class="clearfix">
              <span>创建时间：</span>{{item.create_at}}
              <span>更新时间：</span>{{item.update_at}}
            </div>
            <div class="suqian_apply_btn">
              <el-button size="small" type="primary" @click="suqianApplyDetail(item.id)">查看详情</el-button>
              <el-button size="small" type="danger" @click="suqianApplyDelete(item.id)">取消申请</el-button>
            </div>
          </el-card>
        </li>
      </div>
      <div v-else>
        <h3 class="suzhong_title">暂无状态</h3>
      </div>
    </div>

    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="30%" class="apply_detail_dialog">
      <li v-for="item in apply_detail">
        <div v-if="item.i_type=='info'">
         <div ><span>{{suqianmap[item.i_key]}}:</span></div>
         <div>{{item.i_value}}</div>
        </div>
        <div v-else>
          <div ><span>{{suqianmap[item.i_key]}}:</span></div>
         <div @click="downloadFile('http://47.92.38.167:8901/file/download?uri=' + item.i_value)"><i class="el-icon-document"></i><el-button type="text">{{item.i_value.split('_')[0]}}</el-button></div>
        </div>
        
      </li>
      
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Ajax from "./../../lib/ajax";
  import Config from "./../../lib/config";
  import Suqianmap from "./../../lib/suqianmap";
  export default {
  name: "suqianfuwu",
  props:['info'],
  data() {
    return {
      suqianfuwu_nav_active_name: 'first',
      suqian_input: {},
      uploadList: {},
      apply_list: [],
      apply_detail:[],
      dialogVisible: false,
      suqianmap: Suqianmap
    }
  },
  methods: {
    downloadFile(url){
      window.open(url);
    },
    suqianApplyDetail(id){
      var that = this;
      that.dialogVisible = true;
      Ajax(Config.NewAjaxUrl + '/pre/items', {id: id}, function(data){
          if(data.code == 0){
            that.apply_detail = data.data;
            console.log('apply_list', data)
          }
        }, function(data){
      })
    },
    suqianApplyDelete(id){
      var that = this;
      Ajax(Config.NewAjaxUrl + '/pre/delete', {id: id}, function(data){
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
      console.log('response',response)
      console.log('file',file)
      if(!this.uploadList[key] || this.uploadList[key].length <= 0) {
        this.uploadList[key] = []
      }
      this.uploadList[key].push(response[this.$store.state.user + '::' + key][0].id) 
      console.log('uploadList', this.uploadList)
    },
    handleClick(val){
      var that = this;
      if(that.suqianfuwu_nav_active_name === 'third'){
        Ajax(Config.NewAjaxUrl + '/pre/list', 'get', function(data){
          if(data.code == 0){
          that.apply_list = data.data;
          }
        }, function(data){
        })
      }
    },
    suqianApplyFunc(){
      var that = this;
      console.log(Object.keys(that.uploadList))
      // if(Object.keys(that.uploadList).length < 22){
      //   that.$alert('信息未提交完整', '', {
      //     confirmButtonText: '确定',
      //     showClose: false
      //   })
      // }else {
        var reqData = Object.assign({}, that.suqian_input, that.uploadList)
        Ajax(Config.NewAjaxUrl + '/pre/submit', reqData, function(data){
          that.$alert('提交成功！', '', {
            confirmButtonText: '确定',
            showClose: false
          })
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
    suqianfuwu_nav_active_name(val){
      this.suzhong_input = {};
      this.uploadList = {};
      // if(val === 'third'){
      //   Ajax(config.NewAjaxUrl, reqData, function(){

      //   })
      // }
    }
  },
  created: function() {
    console.log(this.info)
    //this.info = {}
  }
  }
</script>

<style>
  .casemanage_wrap{
    overflow-y: auto;
    padding: 20px 0;
  }
  .suqianfuwu_info {
    padding: 22px 0;
    position: relative;
  }
  .el-tabs__item{
    font-size: 0.17rem !important;
    font-weight: 700 !important;
  }
  .suqian_apply_cont{
    margin: 10px 0;
    font-size: 0.16rem;
    color: rgb(29, 72, 114);
  }
  .suqian_apply_confirm{
    margin: 20px 0;
    text-align: center
  }
  .suqian_apply_aside{
    width: 30px;
    vertical-align: middle;
    align-items: center;
    display: flex;
    font-size: 0.18rem;
    font-weight: 700; 
  }
  .suqian_apply .el-container{
    border-bottom: 1px solid #e5e9ef;
  }
  .suqian_apply .el-main{
    border-left: 1px solid #e5e9ef;
  }
  .suqian_apply .el-aside{
    padding: 0 10px;
  }
  .suqian_apply .suqian_title{
    font-size: 0.2rem;
    font-weight: 700;
  }
  .suqian_apply .suqian_subtitle{
    font-size: 0.18rem;
    text-indent: 2em;
  }
  .suqian_apply .suqian_ul{
    margin-top: 30px; 
  }
  .suqian_apply .suqian_ul li{
    list-style: square;
    font-size: 0.2rem;
    color: rgb(29, 72, 114);
    margin: 15px 0;
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
  .apply_list_card .suqian_apply_btn{
    margin-top: 10px;
    text-align: center;
  }
  .apply_list_card .suqian_apply_btn button{
    display: inline;
  }
  .apply_detail_dialog{
    word-break: break-all;
    font-size: 0.17rem;
  }
  .apply_detail_dialog li{
    list-style: none;
    margin: 10px 0;
  }
  .apply_detail_dialog li span{
    color: #409EFF;
    font-weight: 700;
  }
</style>

