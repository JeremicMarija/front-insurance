<template>
 <div class="container mt-3">
   <div v-if="!errorMessage">
      <p class="h3 text-success fw-bold">All Damage Items of Material Damage:</p>
      <p class="hw text-success mb-0">Entry Date: <span class="fw-bold">{{materialDamage.entryDate}}</span></p>
      <p class="hw text-success mb-0">Type Of Damage: <span class="fw-bold">{{materialDamage.typeOfDamage}}</span></p>
      <p class="hw text-success mb-0">Vehicle: <span class="fw-bold">{{vehicle.brand + ' ' + vehicle.model + ' ' + vehicle.registrationNumber}}</span></p>
   </div>
   <div class="row">
      <div class="col-md-4 mt-3"> 
         <button class="btn btn-success btn-sm" @click="download">Download pdf list of Damage Items</button>
      </div>
      <p class="h5 text-success fw-bold mt-2">{{reportMessage}}</p>
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

  <div class="row mt-4">
   <div class="col">
    <table class="table table-hover text-center table-striped shadow-lg">
     <thead class="bg-success text-white">
      <tr>
       <th>Item Number</th>
       <th>Description</th>
       <th>Estimated Price</th>
       <th>Damage Type</th>
      </tr>
     </thead>
     <tbody>
      <tr v-for="damageItem of damageItems" :key="damageItem">
       <td>{{damageItem.itemNumber}}</td>
       <td>{{damageItem.description}}</td>
       <td>{{damageItem.estimatedPrice}}</td>
       <td>{{damageItem.damageType.name}}</td>
      </tr>
     </tbody>
    </table>
   </div>

  </div>
  <div class="row mt-3">
   <div class="col back-btn">
    <router-link to="/materialDamages" class="btn btn-success btn-sm"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
   </div>
  </div>
 </div>
 <!-- <pre>{{damageItems}}</pre> -->
 <!-- <pre>{{materialDamage}}</pre>
 <pre>{{vehicle}}</pre> -->
</template>
<script>
import {DamageItemService} from '@/services/DamageItemService';
import {MaterialDamageService} from '@/services/MaterialDamageService';
import { VehicleService } from '@/services/VehicleService';
import Spinner from '@/components/Spinner.vue'
export default {
 name: 'ShowDamageItemsOfMaterialDamage',
 components: {
  Spinner,
 },
 data: function(){
  return{
   materialDamageId: this.$route.params.materialDamageId,
   loading: false,
   damageItems: [],
   materialDamage: {},
   errorMessage: null,
   vehicle: {},
   reportMessage: null
  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await DamageItemService.getDamageItemByMaterialDamage(this.materialDamageId);
   this.damageItems = response.data;
   let responseMaterialDamage = await MaterialDamageService.getMaterialDamage(this.materialDamageId);
   this.materialDamage = responseMaterialDamage.data;
   let responseVehicle = await VehicleService.getVehicle(this.materialDamage.vehicleId);
   this.vehicle = responseVehicle.data;
   // console.log(responseVehicle.data);
   this.loading = false;
  } catch (error) {
   if(error.response.status === 404){
      this.errorMessage = 'There is no damage item for the requested material damage';
    }
   this.loading = false;
  }
 },
 methods: {
   download: async function(){
      let responseReport = await DamageItemService.getReportDamageItemsOfMaterialDamage(this.materialDamageId);
      console.log(responseReport.data)
      this.reportMessage = responseReport.data;
  }
 }
}
</script>