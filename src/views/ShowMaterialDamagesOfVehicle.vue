<template>
 <div class="container mt-3">
  <div v-if="!errorMessage">
    <p class="h3 text-success fw-bold">All Material Damages Of Vehicle:</p>
    <p class="hw text-success mb-0">Model: <span class="fw-bold">{{vehicle.brand}}</span> </p>
    <p class="hw text-success mb-0">Brand: <span class="fw-bold">{{vehicle.model}}</span> </p>
    <p class="hw text-success mb-0">Registration Number: <span class="fw-bold">{{vehicle.registrationNumber}}</span> </p>
  </div>
  <div class="row">
    <div class="col-md-4 mt-3"> 
      <button class="btn btn-success btn-sm" @click="download">Download pdf list of Material Damages</button>
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
       <th>Entry Date</th>
       <th>Type Of Damage</th>
       <th>City</th>
       <th>Vehicle</th>
       <th>Insured</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      <tr v-for="materialDamage of materialDamages" :key="materialDamage">
       <td>{{materialDamage.entryDate}}</td>
       <td>{{materialDamage.typeOfDamage}}</td>
       <td>{{materialDamage.city.name}}</td>
       <td>{{materialDamage.vehicle.registrationNumber}}</td>
       <td>{{materialDamage.vehicle.insured.name + ' ' + materialDamage.vehicle.insured.surname}}</td>
       <td>
        <router-link :to="`/materialDamages/${materialDamage.id}/createItem`" class="btn btn-success btn-sm">Add Damage Item</router-link>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
  <div class="row mt-3">
   <div class="col back-btn">
    <router-link to="/vehicles" class="btn btn-success btn-sm"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
   </div>
  </div>
 </div>
 <!-- <pre>{{materialDamages}}</pre>
 <pre>{{vehicle}}</pre> -->
</template>

<script>
import {MaterialDamageService} from '@/services/MaterialDamageService';
import { VehicleService } from '@/services/VehicleService';
import Spinner from '@/components/Spinner.vue'
export default {
 name: 'ShowMaterialDamagesOfVehicle',
 components: {
  Spinner,
 },
 data: function(){
  return{
   vehicleId: this.$route.params.vehicleId,
   loading: false,
   materialDamages:[],
   vehicle:{},
   errorMessage: null,
   reportMessage: null
  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await MaterialDamageService.getMaterialDamagesByVehicle(this.vehicleId);
   // console.log(response.data);
   this.materialDamages = response.data;
   let responseVehicle = await VehicleService.getVehicle(this.vehicleId);
   // console.log(responseVehicle.data);
   this.vehicle = responseVehicle.data;
   this.loading = false;
  } catch (error) {
   if(error.response.status === 404){
      this.errorMessage = 'There is no material damage for the requested vehicle';
    }
   this.loading = false;
  }
 },
 methods: {
  download: async function(){
  let responseReport = await MaterialDamageService.getReportMaterialDamgesOfVehicle(this.vehicleId);
  console.log(responseReport.data)
  this.reportMessage = responseReport.data;
  }
 }
}
</script>

<style scoped>

</style>