<template>
    <div class="container-style">
        <!-- Role là vai trò của người sử dụng -->
        <!-- A1 = 1, A2 = 2, A3 = 3, B1 = 4 -->
        <CitizenTable/>
    </div>
</template>

<script>

import CitizenTable from "../components/table/CitizenTable.vue"

export default {
    name: "ManageCitizen",
    components: {
        CitizenTable
    },
}
</script>

<style scoped>
.container-style {
    margin-top: 80px;
}
</style>