<template>
    <b-form-group
    :label="title"
    :label-cols-xs="xs"
    :label-cols-sm="sm"
    :label-cols-md="md"
    :label-cols-lg="lg"
    label-align-sm="right"
    label-size="sm"
    class="mb-0"    
    >
        <b-form-select
        :options="options"
        size="sm"
        ></b-form-select>
    </b-form-group>
</template>

<script>
export default {
    name: "DropdownButton",
    props: ["title", "xs", "sm", "md", "lg", "options"]
}
</script>
