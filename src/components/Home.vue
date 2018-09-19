<template>
  <div>
  	<Head></Head>
    <router-view></router-view>
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
		
</style>