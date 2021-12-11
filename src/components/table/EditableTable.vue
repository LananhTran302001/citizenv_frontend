<template>
    <table>
        <caption> {{title}} </caption>
        <thead>
            <tr>
                <th scope="col" v-for="(column, index) in columns" :key="index"> {{column}} </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td v-for="(column, indexColumn) in columns" :key="indexColumn">{{item[column]}}</td>
                <td v-if="canDelete">
                    
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "EditableTable",
    props: ["title", "items", "columns", "canDelete", "canEdit", "canAdd"]
}
</script>