<template>
    <div class="d-flex flex-row align-items-center">
        <input type="checkbox" :checked=checked>
        <label> {{label}} </label>
    </div>
</template>

<script>
export default {
    name: "CheckboxButton",
    props: {label:String},
    data: function() {
        return {
            checked: false
        }
    }
}
</script>

<style scoped>
input {
    height: 22px;
    width: 22px;
    padding: 0;
    border-radius: 5px;
    cursor: pointer;
}

label {
    padding: 5px 12px 5px 12px;
    font-size: 18px;
}
</style>