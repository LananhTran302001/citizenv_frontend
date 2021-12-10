<template>
  <div id="app">
    <Navbar />
    <Sidebar />
  </div>
</template>

<script>

import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  }
}
</script>


<style scope>
#app {
  position: relative;
    overflow-x: hidden;
    background-color: #CFD8DC;
    height: 100vh;
    width: 100vw;
    z-index: 0;
}
</style>