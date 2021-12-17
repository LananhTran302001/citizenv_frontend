<template>
  <div class="button-style">
    <router-link
      to="/changepass"
      class="flex items-center justify-center relative"
    >
      <span>Đổi mật khẩu</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ToChangePassButton",
};
</script>

<style scoped>
.button-style {
  padding: 5px;
}
</style>
