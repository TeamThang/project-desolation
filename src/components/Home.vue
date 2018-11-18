<template>
  <div class="main">
  	<Head></Head>
    <div class="main_wrap">

    </div>
  </div>
</template>

<script>
import Head from '@/components/head'
export default {
  name: 'Home',
  components:{
    Head: Head
  },
  data () {
    return {
      
    }
  }
}
</script>

<style >
.main{
  width: 100%;
  height: 100%;
}
.main_wrap{
  width: 100%;
  height: 100%;
  background: url('./../assets/img/bg/main.jpg') center center no-repeat;
  background-size: cover;
  margin-top: -0.7rem;
}
</style>