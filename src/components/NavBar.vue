<template>
 <nav class="navbar navbar-dark bg-success navbar-expand-sm">
  <div class="container">
   <router-link to="/" class="navbar-brand"><i class="fa-solid fa-car-burst mr-1"></i>Insurance App</router-link>
    <div class="collapse navbar-collapse">
    <ul class="navbar-nav">
     <li class="nav-item">
      <router-link class="nav-link px-4" to="/insureds">Insureds</router-link>
     </li>
     <li class="nav-item">
      <router-link class="nav-link px-4" to="/vehicles">Vehicles</router-link>
     </li>
     <li class="nav-item">
      <router-link class="nav-link px-4" to="/materialDamages">Material Damages</router-link>
     </li>
    </ul>

   </div>
  </div>

 </nav>
</template>

<script>
export default {
 name: 'NavBar',
}
</script>

<style scoped>

</style>