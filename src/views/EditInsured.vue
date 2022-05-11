<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Edit Insured</p>
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

 <div class="container mt-3" v-if="!loading && isDone()">
  <div class="row">
   <div class="col-md-4">
    <form action="" @submit.prevent="updateSubmit()">
     <div class="mb-2">
      <input v-model="insured.name" type="text" class="form-control" placeholder="First Name">
     </div>
     <div class="mb-2">
      <input v-model="insured.surname" type="text" class="form-control" placeholder="Last Name">
     </div>
     <div class="mb-2">
      <input v-model="insured.dateOfBirth" type="date" class="form-control" placeholder="Data of Birth">
     </div>
     <div class="mb-2">
      <input v-model="insured.policyNumber" type="text" class="form-control" placeholder="Policy Number">
     </div>
     <div class="mb-2">
      <select v-model="insured.typeOfInsurance" name="" id="" class="form-control">
       <option value="">Choose...</option>
       <option value="TOTAL_INSURANCE">TOTAL_INSURANCE</option>
       <option value="PARCIAL_INSURANCE">PARCIAL_INSURANCE</option>
       <option value="ADDITIONAL_INSURANCE">ADDITIONAL_INSURANCE</option>
      </select>
     </div>
     <div class="mb-2">
      <input type="submit" class="btn btn-success" value="Update">
     </div>
    </form>
   </div>
  </div>
 </div>
</template>

<script>
import { InsuredService } from '@/services/InsuredService'
import Spinner from '@/components/Spinner.vue'
export default {
 name: "EditInsured",
 components: {
  Spinner
 },
 data: function(){
  return{
   insuredId: this.$route.params.insuredId,
   loading: false,
   insured: {
    name: '',
    surname: '',
    dateOfBirth: '',
    policyNumber: '',
    typeOfInsurance: '',
   },
   errorMessage: null,
  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await InsuredService.getInsured(this.insuredId);
   this.insured = response.data;
   this.loading = false;
  } catch (error) {
   this.errorMessage = error;
   this.loading = false;
  }
 },
 methods: {
  isDone: function(){
   return Object.keys(this.insured).length > 0;
  },
  updateSubmit: async function(){
   try {
    let response = await InsuredService.updateInsured(this.insured, this.insuredId);
    if(response){
     return this.$router.push('/')
    }else{
     return this.$router.push(`/insureds/edit/${this.insuredId}`)
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