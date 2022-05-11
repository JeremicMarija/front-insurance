<template>
<!-- <Spinner/> -->
<NavBar/>
 <router-view></router-view>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
// import Spinner from '@/components/Spinner.vue'
export default {
  name: "App",
  components: {
    NavBar,
    // Spinner
  }
}
</script>
<style>

</style>
