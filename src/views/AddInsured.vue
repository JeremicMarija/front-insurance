<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Add Insured</p>
   </div>
  </div>
 </div>
 <div class="container mt-3">
  <div class="row">
   <div class="col-md-4">
    <form action="" @submit.prevent="insuredCreate()">
     <div class="mb-2">
      <input required v-model="insured.name" type="text" class="form-control" placeholder="First Name">
     </div>
     <div class="mb-2">
      <input required v-model="insured.surname" type="text" class="form-control" placeholder="Last Name">
     </div>
     <div class="mb-2">
      <input required v-model="insured.dateOfBirth" type="date" class="form-control" placeholder="Data of Birth">
     </div>
     <div class="mb-2">
      <input required v-model="insured.policyNumber" type="text" class="form-control" placeholder="Policy Number">
     </div>
     <div class="mb-2">
      <select required v-model="insured.typeOfInsurance" name="" id="" class="form-control">
       <option disabled value="">Choose...</option>
       <option value="TOTAL_INSURANCE">TOTAL_INSURANCE</option>
       <option value="PARCIAL_INSURANCE">PARCIAL_INSURANCE</option>
       <option value="ADDITIONAL_INSURANCE">ADDITIONAL_INSURANCE</option>
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
    <router-link to="/insureds" class="btn btn-success btn-sm"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
   </div>
  </div>
 </div>
</template>

<script>
import { InsuredService } from '@/services/InsuredService'
export default {
 name: "AddInsured",
 data: function(){
  return {
   insured:{
    name: '',
    surname: '',
    dateOfBirth: '',
    policyNumber: '',
    typeOfInsurance: '',
   }
  }
 },
 methods: {
  insuredCreate: async function(){
   try {
    let response = await InsuredService.createInsured(this.insured);
    if(response){
     return this.$router.push('/insureds');
    }else{
     return this.$router.push('/insureds/add')
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