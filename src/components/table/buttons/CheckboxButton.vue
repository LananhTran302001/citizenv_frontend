<template>
    <div class="d-flex flex-row align-items-center">
        <input type="checkbox" v-model="checked">
        <label> {{label}} </label>
    </div>
</template>

<script>
export default {
    name: "CheckboxButton",
    props: {label:String},
    data() {
        return {
            checked: null,
        }
    },
    watch: {
        checked: function (val) {
            console.log("check")
            this.checked = val
            if (val) {
                this.$emit("isChecked", true);
            } else {
                this.$emit("isNonChecked", true);
            }
        }
    }
}
</script>

<style scoped>
input {
    height: 18px;
    width: 18px;
    padding: 0;
    border-radius: 5px;
    cursor: pointer;
}

label {
    padding: 3px 12px 3px 12px;
    font-size: 17px;
}
</style>