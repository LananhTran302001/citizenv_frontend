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
        <b-form-group
          :label="titleId"
          label-for="area-edit-id"
          :invalid-feedback="msg.id"
          :state="idState"
        >
          <b-form-input
            id="area-edit-id"
            v-model="id"
            :state="idState"
            required
          ></b-form-input>
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
import { mapActions } from "vuex";

export default {
  name: "AreaEditForm",
  data() {
    return {
      title: "Chỉnh sửa ",
      titleName: "Tên ",
      titleId: "Mã ",

      id: this.oldData.id,
      idState: null,
      name: this.oldData.name,
      nameState: null,
      msg: {
        name: String,
        id: String,
      },
    };
  },

  props: { role: Number, api: Object, oldData: Object },

  mounted() {
    if (this.api) {
      this.title = "Chỉnh sửa  " + this.api.type;
      this.titleName = "Tên " + this.api.type;
      this.titleId = "Mã " + this.api.type;
    }
    this.$bvModal.show("area-edit-modal");
  },

  methods: {
    ...mapActions({ updateArea: "Area/updateArea" }),
    
    resetModal() {
      this.nameState = null;
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
      console.log("Data cũ")
      console.log(this.oldData)
      // Gửi thông tin đã được nhập đi
      this.updateArea({
        role: this.role,
        area: { id: this.id, name: this.name },
      });
      // Chọn tiếp 1 trong 2 nút thì đóng
      this.$nextTick(() => {
        this.hide()
      });
    },

    // Đóng modal
    hide() {
      this.$emit("updated", true);
    }
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
  margin: 0;
}
</style>
