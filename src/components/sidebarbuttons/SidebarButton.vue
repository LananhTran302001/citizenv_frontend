<template>
    <router-link
		:to="address"
		class="flex items-center justify-center relative group link-style"
	>
        <font-awesome-icon :icon="icon" size="lg" />
		<span>{{text}}</span>
	</router-link>
</template>

<script>
export default {
	name: "SidebarButton",
	props: ["address", "icon", "text"],
};
</script>


<style scoped>
.link-style {
  display: block;
  color: white;
  text-decoration: none;
  padding: 15px 15px 15px 30px;
}
.link-style:hover {
  text-decoration: none;
  outline: none;
  margin-left: 20px;
}
.link-style:hover,
.link-style:active,
.link-style:focus {
  color: #fff;
  text-decoration: none;
  background-color: transparent;
}

.link-style span {
  margin-left: 10px;
  font-size: 20px;
}

</style>