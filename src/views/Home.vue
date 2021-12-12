<template>
  <div class="container-style">
    <Navbar :isActive="true"/> 
    <router-view />   
    <div class="flex-row d-flex">
      <Sidebar :role="4"/>
      <PageContent>
        <p>Xin chào</p>
        <p>Đây là home của citizenv</p>
      </PageContent>
    </div>
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import PageContent from '../components/PageContent.vue'

export default {
  name: 'Home',
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