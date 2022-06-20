<template>
 <div class="container mt-3">
  <div class="row">
   <p class="h3 text-success fw-bold">Vehicles
    <router-link to="/vehicles/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> New</router-link>
   </p>
   <form action="" @submit.prevent="search()">
    <div class="row">
     <div class="col-md-6 mt-3">
      <div class="row">
       <div class="col">
        <input v-model="registrationNumber" type="text" class="form-control" placeholder="Search By Registration Number">
       </div>
       <div class="col">
        <input type="submit" class="btn btn-outline-dark">
       </div>
      </div>
     </div>
    </div>
   </form>
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
<!-- <pre>{{vehicles}}</pre> -->
  <div class="row mt-4" v-if="vehicles.length > 0">
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
        <router-link :to="`/vehicles/edit/${vehicle.id}`" class="btn btn-success btn-sm"><i class="fas fa-edit"></i></router-link>
        <router-link :to="`/materialdamages/vehicle/${vehicle.id}`" class="btn btn-success btn-sm mx-2">View Material Damages</router-link>
        <button @click="addMaterialDamageForVehicle(vehicle.id)" class="btn btn-success btn-sm mx-2">Add Material Damage</button>
        </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
 </div>
</template>
<script>
import {VehicleService} from "@/services/VehicleService";
import {InsuredService} from "@/services/InsuredService";
import Spinner from '@/components/Spinner.vue';
export default {
 name: 'Vehicle',
 components: {
  Spinner,
 },
 data: function(){
  return{
   loading: false,
   vehicles:[],
   errorMessage: null,
   registrationNumber: '',
  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await VehicleService.getAllVehicles();
   this.vehicles = response.data;
   this.loading = false;
  } catch (error) {
   this.errorMessage = error;
   this.loading = false;
  }
 },
 methods:{
   addMaterialDamageForVehicle: function(id){

   this.$router.push(`/materialDamages/add/${id}`);
  },
  search: async function(){
    try{
      this.errorMessage = false;
      let responseSearch = await VehicleService.search(this.registrationNumber);
      this.vehicles = responseSearch.data;
    }catch (error) {
     console.log(error);
     if(error.response.status === 404){
      this.vehicles = [];
      this.errorMessage = "Vehicle Not Found";
     }
   }
  }
 }
}
</script>
<style scoped>

</style>