<template>
  <div id="app">
    <header><Navbar/></header>
    <div class="flex-row d-flex">
      <Sidebar />
      <div class="content-style">
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

.content-style {
  padding-left: 100px;
  height: 100%;
}
</style>
