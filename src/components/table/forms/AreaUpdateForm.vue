<template>
  <div class="container-style">
    <b-button @click="show" v-b-modal.area-modal size="sm"> Cấp mã </b-button>

    <b-modal
      id="area-modal"
      ref="modal"
      :title="title"
      ok-title="Thêm"
      cancel-title="Hủy"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
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
      </form>
    </b-modal>
  </div>
</template>

<script>
// import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Chỉnh sửa ",
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
      submittedNames: [],
    };
  },

  props: {role:Number, api:Object},

  created() {
    this.title = "Cấp mã " + this.api.type;
    this.titleName = "Tên " + this.api.type;
    this.titleId = "Mã " + this.api.type;
  },

  methods: {
    ...mapActions ({addArea: "Area/addArea"}),

    show() {
      this.$refs['modal'].show()
    },

    resetModal() {
      this.name = null;
      this.nameState = null;
      this.id = null;
      this.idState = null;
      this.msg.id = "";
      this.msg.name = "";
    },
    // Tên vùng chỉ gồm các ký tự chữ cái và số
    checkValidName(val) {
      if (!val) {
        this.nameState = false;
        this.msg.name = "Bạn phải nhập tên";
      } else if (/[`~,.<>;':"/[\]|{}()=_+-]/.test(this.name)) {
        this.nameState = false;
        this.msg.name = "Trường này chỉ gồm các ký tự chữ cái và số";
      } else {
        this.nameState = true;
        this.msg.name = "";
      }
    },
    // Mã vùng chỉ gồm số
    checkValidId(val) {
      if (!val) {
        this.idState = false;
        this.msg.id = "Bạn phải nhập mã (thêm 2 chữ số)";
      } else if (/^[0-9]*$/.test(this.id)) {
        this.idState = true;
        this.msg.id = "";
      } else {
        this.idState = false;
        this.msg.id = "Trường này chỉ gồm 2 ký tự số";
      }
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
        area : {id: this.id, name: this.name}
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("area-modal");
      });
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
