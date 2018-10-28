<template>
  <div id="law">
    <Head></Head>
    <router-view></router-view>
    <div class="ins_wrap">
      <div class="ins_leftwrap">
        <div v-for="(item,index) in ins_list" :key="index" class="ins_menu" @click="changeIns(index)" v-bind:class="{ins_menu_active:index==ins_select}">
          {{item}}
        </div>
      </div>
      <div class="ins_rightwrap">
        <ul class="ins_wqx_ul" v-if="ins_select==0">
          <li class="ins_li"><img src="./../assets/img/ins/wqbz/1.jpg" alt=""></li>
          <li class="ins_li"><img src="./../assets/img/ins/wqbz/2.jpg" alt=""></li>
          <li class="ins_li"><img src="./../assets/img/ins/wqbz/3.jpg" alt=""></li>
          <li class="ins_li"><img src="./../assets/img/ins/wqbz/4.jpg" alt=""></li>
          <li class="ins_li"><img src="./../assets/img/ins/wqbz/5.jpg" alt=""></li>
        </ul>
        <ul class="ins_sqbz_ul" v-if="ins_select==1">
          <li class="ins_li"><img src="./../assets/img/ins/sqbz/1.jpg" alt=""></li>
          <li class="ins_li"><img src="./../assets/img/ins/sqbz/2.jpg" alt=""></li>
          <li class="ins_li"><img src="./../assets/img/ins/sqbz/3.jpg" alt=""></li>
        </ul>
      </div>
    </div>
  </div> 
</template>

<script>
import Head from '@/components/head';
import Bing from '@/components/charts/bing';
import Config from './../lib/config';
import Ajax from './../lib/ajax';
export default {
  name: "Insurance",
  components:{
    Head: Head,
    Bing: Bing
  },
  data() {
    return {
      ins_list:["· 知识产权维权险简介", "· 知识产权申请保障简介"],
      ins_select: 0
    };
  },
  methods: {
    changeIns(val){
      this.ins_select = val
    }
  }
};
</script>

<style>
  .ins_wrap{
    overflow: hidden;
    width: 1280px;
    margin: 10px auto 40px;
    border-radius: 4px;
  }
  .ins_wrap .ins_leftwrap{
    width: 250px;
    float: left;
    /* border-right: solid 1px #00a1d7; */
  }
  .ins_wrap .ins_menu{
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
  .ins_wrap .ins_menu:hover{
    color: #409EFF;
    background-color: #ecf5ff;
  }
  .ins_wrap .ins_menu_active{
    color: #409EFF;
  }
  .ins_wrap .ins_rightwrap{
    width: 1000px;
    float: right;
  }
  .ins_wrap .ins_li{
    list-style: none;
    margin: 0;
    padding: 0;
    display: block;
  }
  .ins_wrap ul{
    
  }
  .ins_wrap .ins_li img{
    width: 100%;
    height: auto;
  }
</style>
