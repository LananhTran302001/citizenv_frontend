<template>
    <div class="container-style">
        <AccountTable />
    </div>
</template>

<script>
import AccountTable from "../components/table/AccountTable.vue"
export default {
    name: "ManageAccount",
    components: {AccountTable},
}
</script>

<style scoped>
.container-style {
    margin-top: 80px;
}
</style>