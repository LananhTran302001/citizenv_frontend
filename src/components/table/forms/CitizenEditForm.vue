<template>
  <b-modal
    id="citizen-edit-modal"
    ref="modal"
    size="xl"
    scrollable
    title="Chỉnh sửa thông tin người dân"
    ok-title="Cập nhật"
    cancel-title="Hủy"
    @hidden="resetModal"
    @ok="handleOk"
    @hide="hide"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <!-- Hàng đầu tiên: Họ và tên, giới tính, ngày sinh -->
      <b-row>
        <b-col cols="4">
          <b-form-group
            label="Họ và tên"
            :invalid-feedback="msg.fullName"
            :state="state.fullName"
          >
            <b-form-input placeholder="Nhập họ và tên" v-model="fullName">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="Giới tính"
            :invalid-feedback="msg.gender"
            :state="state.gender"
          >
            <b-form-select
              :options="genderOptions"
              v-model="gender"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="Ngày sinh"
            :invalid-feedback="msg.dateOfBirth"
            :state="state.dateOfBirth"
          >
            <b-form-datepicker
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: 'short',
              }"
              v-model="dateOfBirth"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Hàng thứ 2: Số căn cước công dân, dân tộc, tôn giáo -->
      <b-row>
        <b-col cols="4">
          <b-form-group label="Số căn cước công dân">
            <label> {{ citizenId }} </label>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="Dân tộc"
            :invalid-feedback="msg.nation"
            :state="state.nation"
          >
            <b-form-input placeholder="Nhập dân tộc" v-model="nation">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="Tôn giáo"
            :invalid-feedback="msg.religion"
            :state="state.religion"
          >
            <b-form-input placeholder="Nhập tôn giáo" v-model="religion">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Hàng 3: Học vấn, nghề nghiệp, tình trạng hôn nhân -->
      <b-row>
        <b-col cols="4">
          <b-form-group
            label="Trình độ học vấn"
            :invalid-feedback="msg.educationalLevel"
            :state="state.educationalLevel"
          >
            <b-form-select
              :options="educationOptions"
              v-model="educationalLevel"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="Nghề nghiệp hiện tại"
            :invalid-feedback="msg.job"
            :state="state.job"
          >
            <b-form-input placeholder="Nhập nghề nghiệp hiện tại" v-model="job">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="Tình trạng hôn nhân"
            :invalid-feedback="msg.maritalStatus"
            :state="state.maritalStatus"
          >
            <b-form-select
              :options="marriageOptions"
              v-model="maritalStatus"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Dòng thứ 4: Địa chỉ thường trú -->
      <b-row>
        <b-col cols="12">
          <h5>Địa chỉ thường trú</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="10">
          <b-form-group
            label="Ví dụ: số nhà 120, ngõ 2, thôn A, xã B, huyện C, tỉnh D"
            :invalid-feedback="msg.permanentResidence"
            :state="state.permanentResidence"
          >
            <b-form-input v-model="permanentResidence"> </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Dòng thứ 5: Địa chỉ tạm trú -->
      <b-row>
        <b-col cols="12">
          <h5>Địa chỉ tạm trú</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="10">
          <b-form-group
            label="Ví dụ: số nhà 120, ngõ 2, thôn A, xã B, huyện C, tỉnh D"
            :invalid-feedback="msg.temporaryResidence"
            :state="state.temporaryResidence"
          >
            <b-form-input v-model="temporaryResidence"> </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import {
  getGenderOptions,
  getMarriageOptions,
  getEducationOption,
} from "../../../store/statics/form_constants";
import {
  validateName,
  validateEmpty,
} from "../../../store/statics/validations";

export default {
  name: "CitizenEditForm",
  props: ["citizen"],
  data() {
    return {
      genderOptions: [],
      marriageOptions: [],
      educationOptions: [],

      citizenId: this.citizen.CCCD,
      fullName: this.citizen.name,
      dateOfBirth: this.citizen.DOB,
      gender: this.citizen.sex,
      maritalStatus: this.citizen.maritalStatus,
      nation: this.citizen.nation,
      religion: this.citizen.religion,
      permanentResidence: this.citizen.permanentResidence,
      temporaryResidence: this.citizen.temporaryResidence,
      educationalLevel: this.citizen.educationalLevel,
      job: this.citizen.job,

      msg: {
        fullName: null,
        gender: null,
        dateOfBirth: null,
        cccd: null,
        nation: null,
        religion: null,
        educationalLevel: null,
        job: null,
        maritalStatus: null,
        permanentResidence: null,
        temporaryResidence: null,
      },

      state: {
        fullName: null,
        gender: null,
        dateOfBirth: null,
        cccd: null,
        nation: null,
        religion: null,
        educationalLevel: null,
        job: null,
        maritalStatus: null,
        permanentResidence: null,
        temporaryResidence: null,
      },
    };
  },

  created() {
    this.genderOptions = getGenderOptions();
    this.marriageOptions = getMarriageOptions();
    this.educationOptions = getEducationOption();
  },

  mounted() {
    this.setModalStart();
    this.$bvModal.show("citizen-edit-modal");
  },

  methods: {
    ...mapActions({
      updateCitizen: "Citizen/updateCitizen",
    }),

    resetModal() {
      this.fullName = null;
      this.dateOfBirth = null;
      this.gender = null;
      this.maritalStatus = null;
      this.nation = null;
      this.religion = null;
      this.permanentResidence = null;
      this.temporaryResidence = null;
      this.educationalLevel = null;
      this.job = null;
    },

    setModalStart() {
      this.citizenId = this.citizen.CCCD;
      this.fullName = this.citizen.name;
      this.dateOfBirth = this.citizen.DOB;
      this.gender = this.citizen.sex;
      this.maritalStatus = this.citizen.maritalStatus;
      this.nation = this.citizen.nation;
      this.religion = this.citizen.religion;
      this.permanentResidence = this.citizen.permanentResidence;
      this.temporaryResidence = this.citizen.temporaryResidence;
      this.educationalLevel = this.citizen.educationalLevel;
      this.job = this.citizen.job;
    },

    check() {
      this.isValidAll =
        this.state.fullName &&
        this.state.gender &&
        this.state.dateOfBirth &&
        this.state.cccd &&
        this.state.nation &&
        this.state.religion &&
        this.state.educationalLevel &&
        this.state.job &&
        this.state.maritalStatus &&
        this.state.permanentResidence &&
        this.state.temporaryResidence;
    },

    getCitizen() {
      return {
        name: this.fullName,
        DOB: this.dateOfBirth,
        CCCD: this.citizen.CCCD,
        sex: this.gender,
        maritalStatus: this.maritalStatus,
        nation: this.nation,
        religion: this.religion,
        permanentResidence: this.permanentResidence,
        temporaryResidence: this.temporaryResidence,
        educationalLevel: this.educationalLevel,
        job: this.job,
      };
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },

    handleSubmit() {
      const updatedCitizen = this.getCitizen();
      this.updateCitizen({ citizen: updatedCitizen });
      this.$nextTick(() => {
        this.hide();
      });
    },

    hide() {
      this.$emit("updated", true);
    },
  },

  watch: {
    fullName: function (val) {
      this.fullName = val;
      this.msg.fullName = validateName(val);
      this.state.fullName = this.msg.fullName.length == 0;
      this.check();
    },
    gender: function (val) {
      this.gender = val;
      this.msg.gender = validateEmpty(val);
      this.state.gender = this.msg.gender.length == 0;
      this.check();
    },
    dateOfBirth: function (val) {
      this.dateOfBirth = val;
      this.msg.dateOfBirth = validateEmpty(val);
      this.state.dateOfBirth = this.msg.dateOfBirth.length == 0;
      this.check();
    },
    nation: function (val) {
      this.nation = val;
      this.msg.nation = validateName(val);
      this.state.nation = this.msg.nation.length == 0;
      this.check();
    },
    religion: function (val) {
      this.religion = val;
      this.msg.religion = validateName(val);
      this.state.religion = this.msg.religion.length == 0;
      this.check();
    },
    educationalLevel: function (val) {
      this.educationalLevel = val;
      this.msg.educationalLevel = validateEmpty(val);
      this.state.educationalLevel = this.msg.educationalLevel.length == 0;
      this.check();
    },
    job: function (val) {
      this.job = val;
      this.msg.job = validateEmpty(val);
      this.state.job = this.msg.job.length == 0;
      this.check();
    },
    maritalStatus: function (val) {
      this.maritalStatus = val;
      this.msg.maritalStatus = validateEmpty(val);
      this.state.maritalStatus = this.msg.maritalStatus.length == 0;
      this.check();
    },
    permanentResidence: function (val) {
      this.permanentResidence = val;
      this.msg.permanentResidence = validateEmpty(val);
      this.state.permanentResidence = this.msg.permanentResidence.length == 0;
      this.check();
    },
    temporaryResidence: function (val) {
      this.temporaryResidence = val;
      this.msg.temporaryResidence = validateEmpty(val);
      this.state.temporaryResidence = this.msg.temporaryResidence.length == 0;
      this.check();
    },
  },
};
</script>
