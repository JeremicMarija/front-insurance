<template>
 <h2>MaterialDamage</h2>
</template>


<script>
import {MaterialDamageService} from '@/services/MaterialDamageService';
import Spinner from '@/components/Spinner.vue'
export default {
 name: 'MaterialDamage',
 components: {
  Spinner,
 },
 data: function(){
  return{
   loading: false,
   materialDamages:[],
   errorMessage: null
  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await MaterialDamageService.getAllMaterialDamages();
   this.materialDamages = response.data;
   this.loading = false;
  } catch (error) {
   this.errorMessage = error;
   this.loading = false;
  }
 }


}
</script>

<style scoped>

</style>