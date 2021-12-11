<template>
  <div class="container-style">
    <Navbar /> 
    <router-view />   
    <div class="flex-row d-flex">
      <Sidebar />
      <!-- Page content -->
      <h1>Content</h1>
      <PageContent>
        <h1>Đây là phần contact</h1>
      </PageContent>
    </div>
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import PageContent from '../components/PageContent.vue'

export default {
  name: 'Contact',
  components: {
    Navbar,
    Sidebar,
    PageContent
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