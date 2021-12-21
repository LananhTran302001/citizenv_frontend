<template>
  <div class="container-style">
    <b-modal
      size="lg"
      id="account-edit-modal"
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
        <b-row>
          <b-col lg="6">
            <!-- ID không được chỉnh sửa -->
            <b-form-group :label="titleId">
              <label> {{ accountId }} </label>
            </b-form-group>

            <!-- Name edit -->
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

            <!-- Email edit -->
            <b-form-group label="Email" label-for="email">
              <b-form-input id="email" required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col lg="6">
            <!-- Cấp quyền -->
            <b-form-group label="Chức năng thêm/sửa/xóa">
              <b-button v-if="isLocked" @click="unLock">
                <font-awesome-icon icon="lock" size="md" /> Đang khóa
              </b-button>
              <b-button v-if="!isLocked" @click="lock">
                <font-awesome-icon icon="lock-open" size="md" /> Đang mở
              </b-button>
            </b-form-group>

            <!-- Đặt ngày bắt đầu -->
            <b-form-group label="Ngày bắt đầu">
              <b-form-datepicker
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
                v-model="startDate"
              ></b-form-datepicker>
            </b-form-group>

            <!-- Đặt ngày kết thúc -->
            <b-form-group label="Ngày kết thúc">
              <b-form-datepicker
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
                v-model="endDate"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AccountEditForm",

  data() {
    return {
      title: "Cấp tài khoản ",
      titleId: "Mã ",
      titleName: "Tên ",

      name: null,
      email: null,
      isLocked: null,
      startDate: null,
      endDate: null,

      nameState: null,
      emailState: null,
      startDateState: null,
      endDateState: null,
      msg: {
        name: String,
        email: String,
        isLocked: String,
        startDate: String,
        endDate: String,
      },
    };
  },

  props: { role: Number, api: Object, accountId: Number },

  mounted() {
    if (this.api) {
      this.title = "Cấp tài khoản các " + this.api.type;
      this.titleName = "Tên " + this.api.type;
      this.titleId = "Mã " + this.api.type;
    }
    this.$bvModal.show("account-edit-modal");
  },

  methods: {
    ...mapActions({ updateAccount: "Account/updateAccount" }),
    resetModal() {
      this.name = null;
      this.nameState = null;
      this.id = null;
      this.idState = null;
      this.msg.id = "";
      this.msg.name = "";
    },

    lock() {
      this.isLocked = true;
    },

    unLock() {
      this.isLocked = false;
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
  },

  // Kiểm tra tên vùng và mã vùng trước khi submit
  checkFormValidity() {
    this.checkValidName(this.name);
    return this.nameState;
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
    this.updateAccount({
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
    this.$emit("updated", true);
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
