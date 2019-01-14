<template>
  <div id="header">
      <header class="header">
        <div class="hideTabCsroll">
            <ul class="tabAll" >
                <li  v-for="(item,index) in tabList" :key=index class="tabList" @click="showSecondTab(index)" >
                    <div class="icon"></div>
                    <div class="tabName"> {{item.tab}}</div>
                    <div class="upDown"></div> 
                    <div   class="secondTab"   >
                        <ul>
                          <li v-for="(itemSecond, indexSecond) in item.secondList" :key=indexSecond>
                            {{itemSecond.secondTab}}
                          </li>
                        </ul>
                    </div>            
                </li>
                
            </ul>
          </div>
      </header>
   

  
  </div> 
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      secondTab: false,
      secondTabPosition: 0,
      tempList : [{
          tab: "知识产权查询",
          secondList: [
            {
              secondTab: "专利",
              power: ["P", "A"]
            },
            {
              secondTab: "商标",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "版权",
              power: ["F", "B", "P", "A"]
            }
          ],
          power: ["F", "B", "P", "A"]
        }],
      tabList: [
        {
          tab: "知识产权查询",
          secondList: [
            {
              secondTab: "专利",
              power: ["P", "A"]
            },
            {
              secondTab: "商标",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "版权",
              power: ["F", "B", "P", "A"]
            }
          ],
          power: ["F", "B", "P", "A"]
        },
        {
          tab: "专家推荐",
          secondList: [
            {
              secondTab: "代理人",
              power: ["P", "A"]
            },
            {
              secondTab: "代理机构",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "律师",
              power: ["F", "B", "P", "A"]
            }
          ],
          power: ["F", "B", "P", "A"]
        },
        {
          tab: "知识产权保险",
          secondList: [
            {
              secondTab: "专利被侵权损失保险",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "知识产权综合保险",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "其他知识产权保险",
              power: ["F", "B", "P", "A"]
            }
          ],
          power: ["P", "A"]
        },
        {
          tab: "培训模块",
          secondList: [
            {
              secondTab: "知识产权诉讼法规查询",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "典型知识产权诉讼案件解读",
              power: ["F", "B", "P", "A"]
            }
          ],
          power: ["F", "B", "P", "A"]
        },
        {
          tab: "用户管理",
          secondList: [
            {
              secondTab: "个人信息",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "安全设置",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "保险信息",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "案件管理",
              power: ["F", "B", "P", "A"]
            },
            {
              secondTab: "登录记录查询",
              power: ["F", "B", "P", "A"]
            }
          ],
          power: ["F", "B", "P", "A"]
        }
      ]
    };
  },
  methods: {
    handleData: function(){
      for(var i = 0; i < this.tabList.length; i++){
        this.tabList[i].status = true;
      }
    },
    showSecondTab: function(index){
      console.log("1111")
      // for(var i = 0; i < this.tabList.length; i++){
      //    this.tabList[i].status = 0;
      // }
      //   this.tabList[index].status = 1;
        console.log(this.tabList);
    }
    

  },
  mounted: function(){
    this.handleData()


  }
};
</script>

<style scope>
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 625%;
}
body {
  font-size: 12px;
}
.header {
  height: 2.5rem;
  width: 100%;
  overflow: auto;
  color: white;
  line-height: 0.47rem;
  width: 100%;
  position: fixed;
  top: 0;
  -webkit-transform: translateZ(0);
  scrollbar-arrow-color: transparent;
  scrollbar-face-color: transparent;
  scrollbar-shadow-color: transparent;
  scrollbar-track-color: transparent;
}
.header::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
.header::-webkit-scrollbar-track {
  background-color: transparent;
}

.header::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 0.15rem;
  -webkit-box-shadow: none;
}

.header::-webkit-scrollbar-thumb:hover {
  background-color: transparent;
}
.header::-webkit-scrollbar-corner {
  background-color: transparent;
}
.tabAll {
  white-space: nowrap;
  height: .47rem;
  width: 5.38rem;
}
.tabList {
  height: .47rem;
  display: inline-block;
  position: relative;
    background-color: #515a6e;
}
.tabList div {
  float: left;
}

.secondTab {
  color: #000;
  position: absolute;
  top: 0.47rem;
  left: 0;
  width: 100%;
}
.secondTab ul {
  display: block;
}
.secondTab ul li {
  line-height: 0.35rem;
  display: block;
}
.tabName {
  padding: 0 0.1rem;
}
li {
  list-style: none;
}
.contain {
  margin-top: 1rem;
}
.upDown{
  height: 0.47rem;
  width: 0.3rem;
  background-image: url(../assets/img/header/arrow.png);
  background-size:50%;
  background-position: left;
  background-repeat: no-repeat; 
}

</style>
