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
    <form action="" @submit.prevent="createDamageItem()">
     <div class="mb-2">
      <input v-model="damageItem.itemNumber" type="number" class="form-control" placeholder="Item Number">
     </div>
     <div class="mb-2">
      <input v-model="damageItem.description" type="text" class="form-control" placeholder="Description">
     </div>
     <div class="mb-2">
      <input v-model="damageItem.estimatedPrice" type="number" class="form-control" placeholder="Estimated Price">
     </div>
     <div class="mb-2">
      <select v-model="damageItem.damageTypeId"  class="form-control" v-if="damageTypes.length > 0">
       <option value="">Select Damage Type...</option>
       <option :value="damageType.id" v-for="damageType of damageTypes" :key="damageType.id">{{damageType.name}}</option>
      </select>
     </div>
     <div class="mb-2">
      <input disabled hidden v-model="materialDamage.id" type="text" class="form-control" placeholder="Material Damage ID">
     </div>
     <div class="mb-2">
      <input type="submit" class="btn btn-success" value="Create Damage Item">
     </div>
    </form>
   </div>
  </div>
 </div>
 <!-- <pre>{{damageItem}}</pre>
 <pre>{{materialDamage}}</pre> -->
 <!-- <pre>{{damageTypes}}</pre> -->
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import {MaterialDamageService} from "@/services/MaterialDamageService";
import {DamageItemService} from "@/services/DamageItemService";
import {DamageTypeService} from "@/services/DamageTypeService";

export default {
 name: "DamageItem",
 components: {
  Spinner,
 },
 data: function(){

  const DamageItemMaterialDamageId = this.$route.params.materialDamageId;

  return{
   damageItemId: this.$route.params.damageItemId,
   materialDamageId: this.$route.params.materialDamageId,
   loading: false,
   materialDamage: {
    entryDate: '',
    typeOfDamage: '',
    cityId: '',
    vehicleId: '',
   },
   // loading: false,
   damageItem:{
    itemNumber: '',
    description: '',
    estimatedPrice: '',
    damageTypeId: '',
    materialDamageId: DamageItemMaterialDamageId,
   },
   damageTypes:[],
   errorMessage: null,
  }
 },
 created: async function(){
  try {
   this.loading = false;
   let responseMaterialDamage = await MaterialDamageService.getMaterialDamage(this.materialDamageId);
   this.materialDamage = responseMaterialDamage.data;
   let responseDamageType = await DamageTypeService.getAllDamageTypes();
   // console.log(responseDamageType.data);
   this.damageTypes = responseDamageType.data;
 
  } catch (error) {
   this.errorMessage = error;
   this.loading = false;
  }
 },
 methods: {
  createDamageItem: async function(){
   try {
    let response = await DamageItemService.createDamageItem(this.damageItem, this.damageItemId);
    if(response){
     return this.$router.push('/materialDamages');
    }else{
     return this.$router.push(`/materialDamages/${materialDamage.id}/createItem`)
    }
   } catch (error) {
    console.log(error);
   }
  }
 }
}
</script>

<style scoped>
.form-control::-webkit-input-placeholder {
 color: #212529;
 /* opacity: 0.8; */
}
.form-control{
 opacity: 0.6;
}
</style>