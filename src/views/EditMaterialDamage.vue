<template>
 <div class="container mt-3">
 <div class="row">
  <div class="col">
   <p class="h3 text-success fw-bold">Edit Material Damage</p>
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
     <form action="" @submit.prevent="updateMaterialDamage()">
      <div class="mb-2">
       <input v-model="materialDamage.entryDate" type="date" class="form-control" placeholder="Date">
      </div>
      <div class="mb-2">
       <select name="" id="" class="form-control" v-model="materialDamage.typeOfDamage">
        <option value="">Select Type Of Damage...</option>
        <option value="TOTAL_DAMAGE">TOTAL_DAMAGE</option>
        <option value="PARTIAL_DAMAGE">PARTIAL_DAMAGE</option>
       </select>
      </div>
      <div class="mb-2">
       <input disabled :value="city.name" type="text" class="form-control" placeholder="City">
      </div>
      <div class="mb-2">
       <input disabled :value="vehicle.brand + ' '+ vehicle.model + ' ' + vehicle.registrationNumber" type="text" class="form-control" placeholder="Vehicle">
      </div>
      <div class="mb-2">
      <input type="submit" class="btn btn-success" value="Update">
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


</template>

<script>
import Spinner from '@/components/Spinner.vue'
import {MaterialDamageService} from "@/services/MaterialDamageService";
import {VehicleService} from "@/services/VehicleService";
import {CityService} from "@/services/CityService";
export default {
 name: 'EditMaterialDamage',
 components: {
  Spinner,
 },
 data: function(){
  return{
   materialDamageId: this.$route.params.materialDamageId,
   loading: false,
   materialDamage: {
    entryDate: '',
    typeOfDamage: '',
    cityId: '',
    vehicleId: '',
   },
   errorMessage: null,
   city:{
    name: '',
    zipCode: '',
   },
   vehicle: {
    brand: '',
    model: '',
    registrationNumber: '',
    insuredId: '',
   }
  }
 },
 created: async function(){
  try {
   this.loading = false;
   let response = await MaterialDamageService.getMaterialDamage(this.materialDamageId);
   this.materialDamage = response.data;
   // console.log(response.data);
   let cityResponse = await CityService.getCity(response.data.cityId);
   this.city = cityResponse.data;
   let vehicleResponse = await VehicleService.getVehicle(response.data.vehicleId);
   this.vehicle = vehicleResponse.data;
  } catch (error) {
   this.errorMessage = error;
   this.loading = false;
  }
 },
 methods: {
  updateMaterialDamage: async function(){
   try {
    let response = await MaterialDamageService.updateMaterialDamage(this.materialDamage, this.materialDamageId);
    if(response){
     return this.$router.push('/materialDamages');
    }else{
     return this.$router.push('/materialDamages/edit')
    }
   } catch (error) {
    console.log(error);
   }
  }
 }
}
</script>