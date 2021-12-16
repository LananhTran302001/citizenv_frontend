<template>
  <a>
    <router-link
      to="/changepass"
      class="flex items-center justify-center relative button-style"
    >
      <span>Đổi mật khẩu</span>
    </router-link>
  </a>
</template>

<script>
export default {
  name: "ToChangePassButton",
};
</script>

<style scoped>
.button-style {
  padding: 5px;
  margin: 5px auto 5px auto;
}
</style>
