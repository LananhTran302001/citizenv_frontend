<template>
  <div class="button-style">
    <!-- Thông báo từ server -->
    <Message
      :id="serverMsg.id"
      :title="serverMsg.title"
      :content="serverMsg.content"
      :variant="serverMsg.variant"
    />
    <a
      class="flex items-center justify-center relative"
      @click="logout"
    >
      <span>Đăng xuất</span>
    </a>
  </div>
</template>

<script>

import Message from "../Message.vue"
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LogoutButton",
  components: { Message },
  
  computed: {
    ...mapGetters({
      serverMsg: "User/getServerLogoutMsg"
    })
  },

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
