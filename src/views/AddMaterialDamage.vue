<template>
<div class="container mt-3">
 <div class="row">
  <div class="col">
   <p class="h3 text-success fw-bold">Add Material Damage</p>
  </div>
 </div>
</div>
<div class="container">
 <div class="row">
  <div class="col-md-4">
   <form action="" @submit.prevent="materialDamageCreate()">
    <div class="mb-2">
     <input required v-model="materialDamage.entryDate" type="date" class="form-control" placeholder="Entry Date">
    </div>
    <div class="mb-2">
     <select required v-model="materialDamage.typeOfDamage" name="" id="" class="form-control" >
      <option value="">Select Type Of Damage...</option>
      <option value="TOTAL_DAMAGE">TOTAL_DAMAGE</option>
      <option value="PARTIAL_DAMAGE">PARTIAL_DAMAGE</option>
     </select>
    </div>
    <div class="mb-2">
     <select required v-model="materialDamage.cityId" v-if="cities.length > 0" class="form-control" >
      <option value="">Select City...</option>
      <option :value="city.id" v-for="city of cities" :key="city.id">{{city.name}}</option>
     </select>
    </div>
    <div class="mb-2">
     <select required :disabled = "isDisabled" ref="selectVehicle" id="selectVehicle" v-model="materialDamage.vehicleId" v-if="vehicles.length > 0" class="form-control" >
      <option value="">Select Vehicle...</option>
      <option :value="vehicle.id" v-for="vehicle of vehicles" :key="vehicle.id">{{vehicle.brand + ' ' + vehicle.model + ' ' + vehicle.registrationNumber}}</option>
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
    <router-link to="/materialDamages" class="btn btn-success btn-sm"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
  </div>
 </div>
</div>
<!-- <pre>{{materialDamage}}</pre> -->

</template>
<script>

import {MaterialDamageService} from "@/services/MaterialDamageService";
import {VehicleService} from "@/services/VehicleService";
import {CityService} from "@/services/CityService";
export default {
 name: "AddMaterialDamage",
 data: function(){
   const mVehicleId = this.$route.params.vehicleId || '';
  return{
   vehicleId: this.$route.params.vehicleId,
   materialDamage:{
    entryDate: '',
    typeOfDamage: '',
    cityId: '',
    vehicleId: mVehicleId,
   },
   cities:[],
   vehicles:[],
  }
 },
 computed: {
  	isDisabled: function(){
     return this.$route.params.vehicleId ? true : false;
    }
  },
 created: async function(){
  try {
   let responseCity = await CityService.getAllCities();
   this.cities = responseCity.data;
   // console.log(responseCity.data);
   let responseVehicle = await VehicleService.getAllVehicles();
   this.vehicles = responseVehicle.data;
   // console.log(responseVehicle.data);
  } catch (error) {
   console.log(error);
  }
 },
 methods: {
  materialDamageCreate: async function(){
   try {
    let response = await MaterialDamageService.createMaterialDamage(this.materialDamage);
    if(response){
     return this.$router.push('/materialDamages');
    }else{
     return this.$router.push('/materialDamages/add');
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