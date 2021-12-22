<template>
  <div class="container-style">
    <b-modal
      id="area-edit-modal"
      ref="modal"
      :title="title"
      ok-title="Cập nhật"
      cancel-title="Hủy"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      @hide="hide"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :label="titleId">
          <label> {{ oldData.id }} </label>
        </b-form-group>

        <b-form-group
          :label="titleName"
          label-for="area-edit-name"
          :invalid-feedback="msg.name"
          :state="nameState"
        >
          <b-form-input
            id="area-edit-name"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>

import { validateName } from "../../../store/statics/validations"
import { mapActions } from "vuex";

export default {
  name: "AreaEditForm",
  data() {
    return {
      title: "Chỉnh sửa ",
      titleName: "Tên ",
      titleId: "Mã ",

      name: this.oldData.name,
      nameState: null,
      msg: {
        name: String,
      },
    };
  },

  props: { role: Number, api: Object, oldData: Object },

  mounted() {
    this.title = "Chỉnh sửa  " + this.api.type;
    this.titleName = "Tên " + this.api.type;
    this.titleId = "Mã " + this.api.type;
    this.$bvModal.show("area-edit-modal");
  },

  methods: {
    ...mapActions({ updateArea: "Area/updateArea" }),

    resetModal() {
      this.nameState = null;
      this.msg.name = "";
    },

    // Tên vùng chỉ gồm các ký tự chữ cái và số
    checkValidName(val) {
      this.msg.name = validateName(val);
      this.nameState = (this.msg.name.length == 0);
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },

    handleSubmit() {
      this.checkValidName(this.name);
      // Không cho phép submit nếu chưa nhập thông tin hợp lệ
      if (!this.nameState) {
        return;
      }

      console.log("Data cũ");
      console.log(this.oldData);
      // Gửi thông tin đã được nhập đi
      this.updateArea({
        role: this.role,
        area: { id: this.oldData.id, name: this.name },
      });
      // Chọn tiếp 1 trong 2 nút thì đóng
      this.$nextTick(() => {
        this.hide();
      });
    },

    // Đóng modal
    hide() {
      this.$emit("updated", true);
    },
  },

  watch: {
    name: function (val) {
      this.name = val;
      this.checkValidName(val);
    },
  },
};
</script>

<style scoped>
.container-style {
  margin: 0;
}
</style>
