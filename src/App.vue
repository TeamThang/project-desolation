<template>
  <div id="app">

      <router-view></router-view>
  </div> 






</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
     
    };
  },
  methods: {}
};
</script>

<style>
*{
  	box-sizing: border-box;
}
.header {
  height: 60px;
  width: 100%;
  overflow-y: scroll;
}
html {
  font-size: 625%;

}
body {
  font-size: 0.14rem;
}
html,body,#app{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
[text-right]{
  text-align: right;
}
[text-left]{
  text-align: left;
}
[text-center]{
  text-align: center;
}
[pointer]{
    cursor: pointer;
}
</style>
