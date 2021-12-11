<template>
    <router-link to="/logout"
		class="flex items-center justify-center relative button-style"
	>
		<span>Đăng xuất</span>
	</router-link>
</template>

<script>
export default {
    name: "LogoutButton"
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