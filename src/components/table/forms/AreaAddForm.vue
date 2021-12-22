<template>
  <div class="container-style">
    <b-button v-b-modal.area-modal size="sm"> Cấp mã </b-button>

    <b-modal
      id="area-modal"
      ref="modal"
      :title="title"
      ok-title="Thêm"
      cancel-title="Hủy"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      @hide="hide"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :label="titleId"
          label-for="area-id"
          :invalid-feedback="msg.id"
          :state="idState"
        >
          <b-form-input
            id="area-id"
            v-model="id"
            :state="idState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :label="titleName"
          label-for="area-name"
          :invalid-feedback="msg.name"
          :state="nameState"
        >
          <b-form-input
            id="area-name"
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
import {
  validateName,
  validateIdWithLength,
} from "../../../store/statics/validations";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Cấp mã ",
      titleName: "Tên ",
      titleId: "Mã ",
      name: null,
      nameState: null,
      id: null,
      idState: null,
      msg: {
        name: String,
        id: String,
      },
    };
  },

  props: { role: Number, api: Object },

  mounted() {
    this.title = "Cấp mã " + this.api.type;
    this.titleName = "Tên " + this.api.type;
    this.titleId = "Mã " + this.api.type;
  },

  methods: {
    ...mapActions({ addArea: "Area/addArea" }),

    resetModal() {
      this.name = null;
      this.nameState = null;
      this.id = null;
      this.idState = null;
      this.msg.id = "";
      this.msg.name = "";
    },

    // Kiểm tra tên vùng
    checkValidName(val) {
      this.msg.name = validateName(val);
      this.nameState = this.msg.name.length == 0;
    },

    // Kiểm tra id
    checkValidId(val) {
      this.msg.id = validateIdWithLength(val, 2);
      this.idState = this.msg.id.length == 0;
    },

    // Kiểm tra tên vùng và mã vùng trước khi submit
    checkFormValidity() {
      this.checkValidName(this.name);
      this.checkValidId(this.id);
      return this.nameState && this.idState;
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },

    handleSubmit() {
      // Không cho phép submit nếu chưa nhập thông tin hợp lệ
      if (!this.checkFormValidity()) {
        return;
      }
      // Gửi thông tin đã được nhập đi
      this.addArea({
        role: this.role,
        area: { id: this.id, name: this.name },
      });

      // Khi ấn nút
      this.$nextTick(() => {
        this.hide();
      });
    },

    // Đóng modal
    hide() {
      this.$bvModal.hide("area-modal");
      this.$emit("added", true);
    },
  },

  watch: {
    name: function (val) {
      this.name = val;
      this.checkValidName(val);
    },
    id: function (val) {
      this.id = val;
      this.checkValidId(val);
    },
  },
};
</script>

<style scoped>
.container-style {
  max-width: 100px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
