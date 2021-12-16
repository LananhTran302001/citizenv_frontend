<template>
    <div>
        <!-- Role là vai trò của người sử dụng -->
        <!-- A1 = 1, A2 = 2, A3 = 3, B1 = 4 -->
        <CencusTable :role="role"/>
        <SelectColumns :role="role"/>
    </div>
</template>

<script>

import CencusTable from "../components/table/CencusTable.vue"
import SelectColumns from "../components/table/buttons/SelectColumns.vue"

export default {
    name: "ManageCencus",
    components: {
        CencusTable,
        SelectColumns
    },
    data: function() {
        return {
            role: 2
        }
    }
}
</script>