<template>
    <router-link to="/login"
		class="flex items-center justify-center relative button-style"
	>
		<span>Đăng nhập</span>
	</router-link>
</template>

<script>
export default {
    name: "ToLoginButton"
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