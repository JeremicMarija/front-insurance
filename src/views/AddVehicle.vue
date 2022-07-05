<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Add Vehicle</p>
   </div>
  </div>
 </div>
 <!-- <pre>{{vehicle}}</pre> -->
 <div class="container">
  <div class="row">
   <div class="col-md-4">
    <form action="" @submit.prevent="vehicleCreate()">
     <div class="mb-2">
      <input required v-model="vehicle.brand" type="text" class="form-control" placeholder="Brand">
     </div>
     <div class="mb-2">
      <input required v-model="vehicle.model" type="text" class="form-control" placeholder="Model">
     </div>
     <div class="mb-2">
      <input required v-model="vehicle.registrationNumber" type="text" class="form-control" placeholder="Registartion Number">
     </div>
     <div class="mb-2">
      <select required :disabled = "isDisabled" name="" ref="selectInsured" id="selectInsured" v-model="vehicle.insuredId" class="form-control" v-if="insureds.length > 0">
       <option value="">Select Insured...</option>
       <option :value="insured.id" v-for="insured of insureds" :key="insured.id">{{insured.name + ' ' + insured.surname}}</option>
      </select>
     </div>
     <div class="mb-2">
      <input type="submit" class="btn btn-success" value="Create">
     </div>
    </form>
   </div>
  </div>
  <div class="row mt-3">
   <div class="col-md-4 back-btn">
    <router-link to="/vehicles" class="btn btn-success btn-sm"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
   </div>
  </div>
 </div>
</template>
<script>
import {InsuredService} from "@/services/InsuredService";
import {VehicleService} from "@/services/VehicleService";

export default {
 name: 'AddVehicle',
 data: function(){
  const vInsuredId = this.$route.params.insuredId || '';

  return{
   insuredId: this.$route.params.insuredId,
   vehicle:{
   brand: '',
   model: '',
   registrationNumber: '',
   insuredId: vInsuredId,
   },
   insureds:[]
  }
 },
 computed: {
  	isDisabled: function(){
     return this.$route.params.insuredId ? true : false;
    }
  },
 created: async function(){
  try {
   let response = await InsuredService.getAllInsureds();
   this.insureds = response.data;
  } catch (error) {
   console.log(error);
  }
 },
 methods: {
  vehicleCreate: async function(){
   try {
    let response = await VehicleService.createVehicle(this.vehicle);
    if(response){
     return this.$router.push('/vehicles');
    }else{
     return this.$router.push('/vehicles/add');
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
}
.form-control{
 opacity: 0.6;
}
</style>