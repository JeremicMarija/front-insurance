<template>
 <div class="container mt-3">
  <div class="row">
   <p class="h3 text-success fw-bold">Material Damages
    <router-link to="/materialDamages/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> New</router-link>
   </p>
   <form action="" @submit.prevent="search()">
    <div class="row">
     <div class="col-md-6 mt-3">
      <div class="row">
       <div class="col">
        <input v-model="vehicleRegNum" type="text" class="form-control" placeholder="Search By Vehicle REG.NUM.">
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

  <div class="row mt-4" v-if="materialDamages.length > 0">
   <div class="col">
    <table class="table table-hover text-center table-striped shadow-lg">
     <thead class="bg-success text-white">
      <tr>
       <th>Entry Date</th>
       <th>Type Of Damage</th>
       <th>City</th>
       <th>Vehicle</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      <tr v-for="materialDamage of materialDamages" :key="materialDamage">
       <td>{{materialDamage.entryDate}}</td>
       <td>{{materialDamage.typeOfDamage}}</td>
       <td>{{materialDamage.city.name}}</td>
       <td>{{materialDamage.vehicle.registrationNumber}}</td>
       <td>
        <router-link :to="`/materialDamages/edit/${materialDamage.id}`" class="btn btn-success btn-sm mx-2"><i class="fas fa-edit"></i></router-link>
        <router-link :to="`/materialdamageitems/materialDamage/${materialDamage.id}`" class="btn btn-success btn-sm mx-2">View Damage Items</router-link>
        <router-link :to="`/materialDamages/${materialDamage.id}/createItem`" class="btn btn-success btn-sm">Add Damage Item</router-link>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
 </div>

</template>


<script>
import {MaterialDamageService} from '@/services/MaterialDamageService';
import Spinner from '@/components/Spinner.vue'
export default {
 name: 'MaterialDamage',
 components: {
  Spinner,
 },
 data: function(){
  return{
   loading: false,
   materialDamages:[],
   errorMessage: null,
   vehicleRegNum: '',
  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await MaterialDamageService.getAllMaterialDamages();
   this.materialDamages = response.data;
   this.loading = false;
  } catch (error) {
   this.errorMessage = error;
   this.loading = false;
  }
 },
 methods:{
  search: async function(){
   try {
    this.errorMessage = false;
    let responseSearch = await MaterialDamageService.search(this.vehicleRegNum);
    console.log(responseSearch.data);
    this.materialDamages = responseSearch.data;
   } catch (error) {
    console.log(error);
     this.materialDamages = [];
     this.errorMessage = "Material Damage Not Found";
   }
  }
 }


}
</script>

<style scoped>

</style>