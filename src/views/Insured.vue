<template>
 <div class="container mt-3">
  <div class="row">
   <p class="h3 text-success fw-bold">Insureds
    <router-link to="/insureds/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> New</router-link>
   </p>
   <div class="col-md-4"> 
    <button class="btn btn-success btn-sm" @click="download">Download pdf list of Insureds</button>
   </div>
   <p class="h5 text-success fw-bold mt-2">{{reportMessage}}</p>
   <form action="" @submit.prevent="search()">
    <div class="row">
     <div class="col-md-12 mt-3">
      <div class="row">
       <div class="col">
        <input type="text" v-model="name" class="form-control" placeholder="Search By Name...">
       </div>
       <div class="col">
        <input type="text" v-model="surname" class="form-control" placeholder="Search By Surname...">
       </div>
       <div class="col">
        <input type="text" v-model="policyNumber" class="form-control" placeholder="Search By PolicyNumber...">
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


  <div class="row mt-4" v-if="insureds.length > 0">
   <div class="col">
    <table class="table table-hover text-center table-striped shadow-lg">
     <thead class="bg-success text-white">
      <tr>
       <th>First Name</th>
       <th>Last Name</th>
       <th>Date of Birth</th>
       <th>Policy Number</th>
       <th>Type of Insurance</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      <tr v-for="insured of insureds" :key="insured">
       <td>{{insured.name}}</td>
       <td>{{insured.surname}}</td>
       <td>{{insured.dateOfBirth}}</td>
       <td>{{insured.policyNumber}}</td>
       <td>{{insured.typeOfInsurance}}</td>
       <td>
        <router-link :to="`/insureds/edit/${insured.id}`" class="btn btn-success btn-sm">
         <i class="fas fa-edit"></i>
        </router-link>
        <router-link :to="`/vehicles/insured/${insured.id}`"  class="btn btn-success btn-sm mx-2">View vehicles</router-link>
        <button @click="addVehicleForInsured(insured.id)" class="btn btn-success btn-sm">Add Vehicle</button>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
 </div>
</template>

<script>
import {InsuredService} from '@/services/InsuredService';
import Spinner from '@/components/Spinner.vue'

export default {
 name: "Insured",
 components: {
  Spinner,
 },
 data: function(){
  return{
   loading: false,
   insureds:[],
   errorMessage: null,
   name:'',
   surname:'',
   policyNumber:'',
   reportMessage: null
  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await InsuredService.getAllInsureds();
   this.insureds = response.data;
   this.loading = false;
  } catch (error) {
   this.errorMessage = error;
   this.loading = false;
  }
 },
 methods: {
   addVehicleForInsured: function(id){

   this.$router.push(`/vehicles/add/${id}`);
  },
  search: async function(){
    try{
      this.errorMessage = false;
      let responseSearch = await InsuredService.search(this.name,this.surname,this.policyNumber)
      console.log(responseSearch.data);
      this.insureds = responseSearch.data;
    }catch (error) {
    // console.log(error);
    if(error.response.status === 404){
      this.insureds = [];
      this.errorMessage = "Insured Not Found";
     }
   }
  },
  download: async function(){
    let responseReport = await InsuredService.getReportOfInsureds();
    console.log(responseReport.data)
    this.reportMessage = responseReport.data;
  }
 }
}
</script>

<style scoped>

</style>