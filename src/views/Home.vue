<template>
  <div class="container-style">
    <Navbar :isActive="true"/> 
    <router-view />   
    <div class="flex-row d-flex">
      <Sidebar/>
      <div class="content-style">Xin chào</div>
    </div>
  </div>
</template>

<script>


import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar
  },
}
</script>


<style scope>
.container-style {
    margin: 0;
    width: 100%;
    height: 100%;
}
.content-style {
  padding-left: 50px;
}
</style>