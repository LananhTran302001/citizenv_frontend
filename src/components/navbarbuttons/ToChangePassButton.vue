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

@media (max-width: 700px) {
  span {
    font-size: 18px;
  }
}

@media (max-width: 400px) {
  span {
    font-size: 14px;
  }
}
</style>
