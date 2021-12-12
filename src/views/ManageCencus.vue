<template>
    <div>
        <!-- Role là vai trò của người sử dụng -->
        <!-- A1 = 1, A2 = 2, A3 = 3, B1 = 4 -->
        <MyTable :role="role"/>
        <SelectColumns :role="role"/>
    </div>
</template>

<script>

import MyTable from "../components/table/MyTable.vue"
import SelectColumns from "../components/table/buttons/SelectColumns.vue"

export default {
    name: "ManageCencus",
    components: {
        MyTable,
        SelectColumns
    },
    data: function() {
        return {
            role: 2
        }
    }
}
</script>