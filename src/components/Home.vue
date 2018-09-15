<template>
  <div>
  	<Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Home',
  components:{
    Header: Header
  },
  data () {
    return {
      
    }
  }
}
</script>

<style >
		
</style>