<template>
    <div class="container-style">
        <AreaTable/>
    </div>
</template>

<script>

import AreaTable from "../components/table/AreaTable.vue"

export default {
    name: "ManageAccount",
    components: {AreaTable}
}
</script>

<style scoped>
.container-style {
    margin-top: 80px;
}
</style>