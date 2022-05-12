<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Add Vehicle</p>
   </div>
  </div>
 </div>
 <div class="container">
  <div class="row">
   <div class="col-md-4">
    <form action="">
     <div class="mb-2">
      <input type="text" class="form-control" placeholder="Brand">
     </div>
     <div class="mb-2">
      <input type="text" class="form-control" placeholder="Model">
     </div>
     <div class="mb-2">
      <input type="text" class="form-control" placeholder="Registartion Number">
     </div>
     <div class="mb-2">
      <select name="" id="" class="form-control">
       <option disabled value="">Choose Insured...</option>
       <option value="Mika Mikic">Mika Mikic</option>
      </select>
     </div>
     <div class="mb-2">
      <input type="submit" class="btn btn-success" value="Create">
     </div>
    </form>
   </div>
  </div>
 </div>
</template>
<script>
export default {
 name: 'AddVehicle',
 data: function(){
  return{
   brand: '',
   model: '',
   registrationNumber: '',
   insured: [],
  }
 }
}
</script>
<style scoped>

</style>