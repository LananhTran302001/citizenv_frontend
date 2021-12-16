<template>
    <a
		class="flex items-center justify-center relative button-style"
        @click="logout"
	>
		<span>Đăng xuất</span>
	</a>
</template>

<script>
import { mapActions } from "vuex"

export default {
    name: "LogoutButton",
    methods: {
        ...mapActions(["logout"])
    }
}
</script>

<style scoped>
.button-style {
    padding: 5px;
    margin: 5px auto 5px auto;
}
</style>