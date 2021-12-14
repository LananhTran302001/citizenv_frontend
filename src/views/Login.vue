<template>
    <div class="flex flex-col items-center container-style">
        <header>
            <Navbar :isActive="false"/>
        </header>
        <LoginBox />
    </div>
</template>

<script>

import Navbar from "../components/Navbar.vue"
import LoginBox from "../components/LoginBox.vue"

export default {
    name: "Login",
    components: {
        Navbar,
        LoginBox
    },
}
</script>

<style scoped>
.container-style {
    height: 100%;
}

header {
    min-height: 18px;
}

</style>