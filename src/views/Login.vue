<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Login Form</p>
   </div>
  </div>
 </div>
 <div class="container">
  <div class="row">
   <div class="col-md-4">
    <form action="" @submit.prevent="login()">
     <div class="mb-2">
      <input v-model="user.username" type="text" class="form-control" placeholder="Username">
     </div>
     <div class="mb-2">
      <input v-model="user.password" type="password" class="form-control" placeholder="Password">
     </div>
     <div class="mb-2">
      <input type="submit" class="btn btn-success" value="Login">
     </div>
    </form>
   </div>
  </div>
 </div>
</template>
<script>
import { LoginService} from '@/services/LoginService'
export default {
 name: 'Login',
 data: function(){
  return {
   user: {
    username: '',
    password: ''
   }
  }
 },
 methods:{
  login: async function(){
   try {
    let response = await LoginService.login(this.user);
    console.log(response.data);
    localStorage.setItem('Authorization', response.data.jwt);
    if(response){
     return this.$router.push('/');
    }else{
     return this.$router.push('/login')
    }
   } catch (error) {
    
   }
  }
 }
}
</script>
<style scoped>

</style>