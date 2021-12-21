<template>
  <div class="container-style">
    <ProgressTable />
  </div>
</template>

<script>
import ProgressTable from "../components/table/ProgressTable.vue"

export default {
    name: "Progress",
    components: { ProgressTable }
}
</script>

<style scoped>
.container-style {
  margin-top: 80px;
}
</style>
