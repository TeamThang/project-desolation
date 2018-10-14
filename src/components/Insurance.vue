<template>
  <div id="law">
    <Head></Head>
    <router-view></router-view>
  

  
  </div> 
</template>

<script>
import Head from '@/components/head';
import Config from './../lib/config';
import Ajax from './../lib/ajax';
export default {
  name: "Insurance",
  components:{
    Head: Head
  },
  data() {
    return {
        
    };
  },
  methods: {
      
  }
};
</script>

<style scope>

</style>
