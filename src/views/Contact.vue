<template>
  <div class="container-style">
    <Navbar /> 
    <router-view />   
    <div class="flex-row d-flex">
      <Sidebar />
      <!-- Page content -->
      <h1>Content</h1>
    </div>
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Contact',
  components: {
    Navbar,
    Sidebar
  }
}
</script>


<style scope>
.container-style {
    margin: 0;
    width: 100%;
    height: 100%;
}

</style>