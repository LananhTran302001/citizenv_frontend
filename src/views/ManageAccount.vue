<template>
    <div>
        <TempTable/>
        <AreaTable/>
    </div>
</template>

<script>

import TempTable from "../components/table/TempTable.vue"
import AreaTable from "../components/table/AreaTable.vue"

export default {
    name: "ManageAccount",
    components: {TempTable, AreaTable}
}
</script>