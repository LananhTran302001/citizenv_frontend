<template>
  <b-modal
    id="citizen-edit-modal"
    ref="modal"
    size="xl"
    scrollable
    title="title"
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
          <b-form-group label="Họ và tên">
            <b-form-input placeholder="Nhập họ và tên" v-model="fullName">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Giới tính">
            <b-form-select
              :options="genderOptions"
              v-model="gender"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Ngày sinh">
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
          <b-form-group label="Dân tộc">
            <b-form-input placeholder="Nhập dân tộc" v-model="nation">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Tôn giáo">
            <b-form-input placeholder="Nhập tôn giáo" v-model="religion">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Hàng 3: Học vấn, nghề nghiệp, tình trạng hôn nhân -->
      <b-row>
        <b-col cols="4">
          <b-form-group label="Tình trạng học vấn">
            <b-form-select
              :options="educationOptions"
              v-model="educationalLevel"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Nghề nghiệp hiện tại">
            <b-form-input placeholder="Nhập nghề nghiệp hiện tại" v-model="job">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Tình trạng hôn nhân">
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
          <b-form-group label="Ví dụ: số nhà 120, ngõ 2, thôn A, xã B, huyện C, tỉnh D">
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
          <b-form-group label="Ví dụ: số nhà 120, ngõ 2, thôn A, xã B, huyện C, tỉnh D">
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
};
</script>
