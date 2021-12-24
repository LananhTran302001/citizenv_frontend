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
