<template>
    <div
		class="flex items-center justify-center relative button-style"
        @click="logout"
	>
		<span>Đăng xuất</span>
	</div>
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
    padding: 5px 10px 5px 10px;
    margin-left: 15px;
    margin-right: 15px;
    background-color: transparent;
    border: solid 1px gainsboro;
    border-radius: 10px;
    color: mediumorchid;
}
</style>