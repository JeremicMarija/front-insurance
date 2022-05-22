<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Add Damage Item</p>
   </div>
  </div>
 </div>
 <!-- Spinner -->
  <div v-if="loading">
   <div class="container">
    <div class="row">
     <div class="col">
      <Spinner/>
     </div>
    </div>
   </div>
  </div>

  <!-- Error Message -->
  <div v-if="!loading && errorMessage">
   <div class="conatiner mt-3">
    <div class="row">
     <div class="col">
      <p class="h4 text-danger fw-bold">{{errorMessage}}</p>
     </div>
    </div>
   </div>
  </div>

 <div class="container">
  <div class="row">
   <div class="col-md-4">
    <form action="">
     <div class="mb-2">
      <input type="text" class="form-control" placeholder="Item Number">
     </div>
     <div class="mb-2">
      <input type="text" class="form-control" placeholder="Description">
     </div>
     <div class="mb-2">
      <input type="number" class="form-control" placeholder="Estimated Price">
     </div>
     <div class="mb-2">
      <input type="text" class="form-control" placeholder="Damage Type ID">
     </div>
     <div class="mb-2">
      <input type="text" class="form-control" placeholder="Material Damage ID">
     </div>
     <div class="mb-2">
      <input type="submit" class="btn btn-success" value="Create Damage Item">
     </div>
    </form>
   </div>
  </div>
 </div>
 <pre>{{damageItem}}</pre>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import {MaterialDamageService} from "@/services/MaterialDamageService";
import {DamageItemService} from "@/services/DamageItemService";
export default {
 name: "DamageItem",
 components: {
  Spinner,
 },
 data: function(){
  return{
   damageItemId: this.$route.params.damageItemId,
   // materialDamageId : this.$route.params.materialDamageId,
   loading: false,
   damageItem:{
    itemNumber: '',
    description: '',
    estimatedPrice: '',
    damageTypeId: '',
    materialDamageId: '',
   },
   errorMessage: null,
   materalDamage: {
    entryDate: '',
    typeOfDamage: '',
    cityId: '',
    vehicleId: '',
   }
  }
 },
 created: async function(){
  try {
   this.loading = false;
   let responseDamageItem = await DamageItemService.getDamageItem(2);
   console.log(responseDamageItem.data);
   // let responseMaterialDamage = await MaterialDamageService.getMaterialDamage(this.damageItem.materialDamageId);
   // console.log(responseMaterialDamage.data);
  } catch (error) {
   this.errorMessage = error;
   this.loading = false;
  }
 }

}
</script>

<style scoped>

</style>