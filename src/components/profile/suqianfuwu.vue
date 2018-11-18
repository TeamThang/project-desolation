<template>
  <div class="casemanage_wrap">
    <div class="casemanage_info">
      <el-tabs v-model="suqianfuwu_nav_active_name" @tab-click="handleClick">
        <el-tab-pane class="suqianfuwu_nav_title" label="诉前服务介绍" name="first"></el-tab-pane>
        <el-tab-pane class="suqianfuwu_nav_title" label="诉前服务申请" name="second"></el-tab-pane>
        <el-tab-pane class="suqianfuwu_nav_title" label="诉前服务状态" name="third"></el-tab-pane>
        <el-tab-pane class="suqianfuwu_nav_title" label="诉前服务报告" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="suqian_apply" v-show="suqianfuwu_nav_active_name=='second'">
      <div class="suqian_apply_cont">请输入保单号:</div>
      <el-input v-model="suqian_input.baodan" placeholder="请输入保单号 "></el-input>
      <div class="suqian_apply_cont">请上传保单扫描件:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.baodan_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请输入报案人名称:</div>
      <el-input v-model="suqian_input.baoanren" placeholder="请输入报案人名称 "></el-input>
      <div class="suqian_apply_cont">请输入被保险人名称:</div>
      <el-input v-model="suqian_input.baoanren" placeholder="请输入被保险人名称 "></el-input>
      <div class="suqian_apply_cont">请上传份证复印件或营业执照或统一社会信用代码证复印件:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.shenfen_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传专利使用许可合同或许可备案证明:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.xuke_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请输入被侵权的投保专利号:</div>
      <el-input v-model="suqian_input.baoanren" placeholder="请输入专利号 "></el-input>
      <div class="suqian_apply_cont">请上传专利证书复印件:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.zhengshu_fileList">
        <div slot="tip" class="el-upload__tip">包括权利要求书、专利说明书及附图</div>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传半年内的专利登记簿副本或最近一年的专利年费收据:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.dengji_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传相关合同及履行证据:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.lvxing_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传备案证明:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.beian_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传国家专利局（非检索中心）作出的专利评价报告:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.baogao_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传引用或借鉴的最接近技术或设计方案及产品样品:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.jiejian_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传专利产品或方案最早公开的相关发布载体:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.zuizao_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请输入被告侵权方名称:</div>
      <el-input v-model="suqian_input.baoanren" placeholder="请输入被告侵权方名称 "></el-input>
      <div class="suqian_apply_cont">请上传专利产品:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.chanpin_fileList">
        <div slot="tip" class="el-upload__tip">如产品过大或过于贵重，可提供六面视图和立体图</div>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传涉嫌侵权产品样品:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.qinquanyangpin_fileList">
        <div slot="tip" class="el-upload__tip">必须提供样品本身，不能只提供图纸，产品的包装应当完整</div>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传涉嫌侵权产品的取得渠道及方式的说明及相关证明材料:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.qinquanqudao_fileList">
        <div slot="tip" class="el-upload__tip">如购买产品的网站、网站及账号、实体店名称、准确位置及名片、联系方式等</div>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传相关单据:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.xianguan_fileList">
        <div slot="tip" class="el-upload__tip">购买或取得涉嫌侵权产品的合同、发票、送货单、收据、银行转账单等</div>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传涉嫌侵权产品的广告宣传资料:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.qinquanxuanchuan_fileList">
        <div slot="tip" class="el-upload__tip">即刊登有侵权产品的网站、杂志、广告等资料</div>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传侵权人的主体资料或信息:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.qinquanzhuti_fileList">
        <div slot="tip" class="el-upload__tip">身份证或身份证号码、侵权单位的准确名称或工商登记资料等</div>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_cont">请上传拟起诉金额和依据:</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :file-list="suqian_input.qisu_fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="suqian_apply_confirm">
        <el-button class="suqian_apply_button" type="primary" @click="suqianApplyFunc()">确认提交</el-button>
      </div>  
    </div>
  </div>
</template>

<script>
  import Ajax from "./../../lib/ajax";
  import Config from "./../../lib/config";
  export default {
  name: "suqianfuwu",
  props:['info'],
  data() {
    return {
      suqianfuwu_nav_active_name: 'first',
      suqian_input: {}
    }
  },
  methods: {
    handleClick(val){

    }
  },
  watch:{
    handleClick(val){

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
</style>

