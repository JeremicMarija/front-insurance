<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Edit Vehicle</p>
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
  <div class="container mt-3">
   <div class="row">
    <div class="col-md-4">
     <form action="" @submit.prevent="updateVehicle()">
      <div class="mb-2">
       <input v-model="vehicle.brand" type="text" class="form-control" placeholder="Brand">
      </div>
      <div class="mb-2">
       <input v-model="vehicle.model" type="text" class="form-control" placeholder="Model">
      </div>
      <div class="mb-2">
       <input v-model="vehicle.registrationNumber" type="text" class="form-control" placeholder="Registartion Number">
      </div>
      <!-- <div class="mb-2">
       <select name="" id="" v-model="vehicle.insuredId" class="form-control" v-if="insureds.length > 0">
        <option value="">Select Insured...</option>
        <option :value="insured.id" v-for="insured of insureds" :key="insured.id">{{insured.name}}</option>
      </select>
      </div> -->
      <div class="mb-2">
        <!-- <input v-model="insured.name" type="text" class="form-control" placeholder="Insured"> -->
        <input disabled :value="insured.name + ' ' + insured.surname" type="text" class="form-control" placeholder="Insured">
      </div>
      <div class="mb-2">
       <input type="submit" class="btn btn-success" value="Update">
      </div>
     </form>
    </div>
   </div>
  </div>

  <!-- <pre>{{vehicle}}</pre>
  <pre>{{insured}}</pre> -->
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import {VehicleService} from '@/services/VehicleService'
import {InsuredService} from '@/services/InsuredService'
export default {
 name: 'EditVehicle',
 components: {
  Spinner,
 },
 data: function(){
  return{
   vehicleId: this.$route.params.vehicleId,
   loading: false,
   vehicle:{
    brand: '',
    model: '',
    registrationNumber: '',
    insuredId: '',
   },
   errorMessage: null,
  //  insureds:[],
  insured:{
    name: '',
    surname: '',
    dateOfBirth: '',
    policyNumber: '',
    typeOfInsurance: '',
  },
  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await VehicleService.getVehicle(this.vehicleId);
  //  let insuredResponse = await InsuredService.getAllInsureds();
  this.vehicle = response.data;
  let insuredResponse = await InsuredService.getInsured(response.data.insuredId);
  // console.log(this.vehicle);
  //  this.insureds = insuredResponse.data;
  this.insured = insuredResponse.data;
  // console.log(this.insured);
  this.loading = false;

  } catch (error) {
   this.errorMessage = error;
   this.loading = false;
  }
 },
 methods: {
  updateVehicle: async function(){
   try {
    let response = await VehicleService.updateVehicle(this.vehicle, this.vehicleId);
    if(response){
     return this.$router.push('/vehicles');
    }else{
     return this.$router.push(`/vehicles/edit/${this.vehicleId}`);
    }
   } catch (error) {
    console.log(error);
   }
  }
 }
}
</script>

<style scoped>

</style>