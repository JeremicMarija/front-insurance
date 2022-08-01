<template>
 <div class="container mt-3">
 <div v-if="!errorMessage">
    <p class="h3 text-success fw-bold">All Vehicles Of Insured</p>
    <p class="hw text-success mb-0">Name: <span class="fw-bold">{{insured.name}}</span> </p>
    <p class="hw text-success mb-0">Surname: <span class="fw-bold">{{insured.surname}}</span> </p>
    <p class="hw text-success mb-0">Policy Number: <span class="fw-bold">{{insured.policyNumber}}</span> </p>
 </div>
 <div class="row">
  <div class="col-md-4 mt-3"> 
  <button class="btn btn-success btn-sm" @click="download">Download pdf list of Vehicles</button>
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
       <th>Brand</th>
       <th>Model</th>
       <th>Registation Number</th>
       <th>Insured</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      <tr v-for="vehicle of vehicles" :key="vehicle">
       <td>{{vehicle.brand}}</td>
       <td>{{vehicle.model}}</td>
       <td>{{vehicle.registrationNumber}}</td>
       <td>{{vehicle.insured.name + ' ' + vehicle.insured.surname}}</td>
       <td>
        <button @click="addMaterialDamageForVehicle(vehicle.id)" class="btn btn-success btn-sm">Add Material Damage</button>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
  <div class="row mt-3">
   <div class="col back-btn">
    <router-link to="/insureds" class="btn btn-success btn-sm"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
   </div>
  </div>
  
 </div>
 
 <!-- <pre>{{insured}}</pre> -->

</template>
<script>
import {VehicleService} from "@/services/VehicleService";
import Spinner from '@/components/Spinner.vue'
import { InsuredService } from '@/services/InsuredService';
export default {
 name: 'ShowVehiclesOfInsured',
 components: {
  Spinner,
 },
 data: function(){
  return{
   insuredId: this.$route.params.insuredId,
   loading: false,
   vehicles: [],
   insured: {},
   errorMessage: null,
   reportMessage: null

  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await VehicleService.getVehiclesByInsured(this.insuredId);
   // console.log(response.data);
   this.vehicles = response.data;
   let responseInsured = await InsuredService.getInsured(this.insuredId);
  //  console.log(responseInsured.data);
   this.insured = responseInsured.data;
   this.loading = false;
  } catch (error) {
    if(error.response.status === 404){
      this.errorMessage = 'There is no vehicle for the requested insured';
    }
    // console.log(error);
  //  this.errorMessage = error;
   this.loading = false;
  }
 },
 methods:{
   addMaterialDamageForVehicle: function(id){

   this.$router.push(`/materialDamages/add/${id}`);
  },
  download: async function(){
    let responseReport = await VehicleService.getReportVehiclesOfInsured(this.insuredId);
    console.log(responseReport.data)
    this.reportMessage = responseReport.data;
  }
 }
}
</script>
<style scoped>

</style>