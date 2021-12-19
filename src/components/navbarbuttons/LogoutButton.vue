<template>
  <div class="button-style">
    <a
      class="flex items-center justify-center relative"
      @click="logout"
    >
      <span>Đăng xuất</span>
    </a>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LogoutButton",
  methods: {
    ...mapActions({logout: "User/logout"}),
  },
};
</script>

<style scoped>
.button-style {
  padding: 5px;
}
</style>
