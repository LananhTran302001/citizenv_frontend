<template>
    <div class="nav flex-row justify-content-center">
        <label class="nav">{{message}} {{userid}}   </label>
    </div>
</template>

<script>
export default {
    name: "NavbarUserInfo",
    props: {
        message:String,
        userid:String
    }
}
</script>

<style scoped>
div {
    align-items: center;
    padding: 0 20px 0 20px;
}

label {
    font-size: 18px;
    color: black;
    text-align: center;
}

@media (max-width: 800px) {
    label {
        font-size: 12px;
    }
}
</style>