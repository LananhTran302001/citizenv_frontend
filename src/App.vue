<template>
  <div id="app">
    <header><Navbar/></header>
    <div class="flex-row d-flex container-style">
      <Sidebar />
      <div class="content-style">
        <!-- Điều kiện v-if user -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
  },
};
</script>

<style scoped>
#app {
  position: relative;
  overflow-x: hidden;
  background-color: #cfd8dc;
  height: 100vh;
  width: 100vw;
  z-index: 0;
}

.container-style {
  height: 100%;
  width: 100%;
}

.content-style {
  height: 100%;
  width: 100%;
}
</style>
