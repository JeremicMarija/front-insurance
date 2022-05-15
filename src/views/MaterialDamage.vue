<template>
 <div class="container mt-3">
  <div class="row">
   <p class="h3 text-success fw-bold">Material Damages
    <router-link to="/materialDamages/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> New</router-link>
   </p>
   <form action="">
    <div class="row">
     <div class="col-md-6 mt-3">
      <div class="row">
       <div class="col">
        <input type="text" class="form-control" placeholder="Search By City">
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

  <div class="row mt-4">
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
        <button class="btn btn-success btn-sm"><i class="fas fa-edit"></i></button>
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
   errorMessage: null
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
 }


}
</script>

<style scoped>

</style>