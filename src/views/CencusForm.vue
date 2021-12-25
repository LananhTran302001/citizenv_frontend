<template>
  <b-container class="container-style">
    <!-- Thông báo từ server -->
    <Message
      :id="serverMsg.id"
      :title="serverMsg.title"
      :content="serverMsg.content"
      :variant="serverMsg.variant"
    />
    <form class="form-style">
      <b-row class="mb-1" v-if="user.role == 4">
        <b-col cols="12">
          <b-button variant="primary" @click="handleDownload">
            <font-awesome-icon icon="download" size="lg" />
            Tải phiếu
          </b-button>
        </b-col>
      </b-row>

      <b-row align-h="center" class="mb-5">
        <h2>Phiếu điều tra dân số</h2>
      </b-row>

      <!-- Chọn thôn nhập -->
      <b-row class="first-row-style" v-if="user.role == 4">
        <b-col cols="10">
          <b-form-group
            label="Thôn/bản/tổ dân phố:"
            label-cols-xs="6"
            label-cols-sm="5"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
          >
            <b-form-select
              :options="groupOptionsName"
              v-model="currentGroupName"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

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
          <b-form-group
            label="Số căn cước công dân"
            :invalid-feedback="msg.cccd"
            :state="state.cccd"
          >
            <b-form-input
              placeholder="Nhập số căn cước công dân"
              v-model="cccd"
            >
            </b-form-input>
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
            label="Tình trạng học vấn"
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

      <b-row align-h="center" class="mt-5 mb-5">
        <b-button
          class="button-style"
          variant="primary"
          @click="handleSubmit"
          :disabled="!isValidAll"
        >
          Nộp
        </b-button>
        <b-button class="button-style" variant="primary" @click="resetForm">
          Mới
        </b-button>
      </b-row>
    </form>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { BACKEND_URL } from "../store/statics/backend_url";
import { getGroupsAPI } from "../store/statics/citizen_constants";
import Message from "../components/Message.vue";
import {
  getGenderOptions,
  getMarriageOptions,
  getEducationOption,
} from "../store/statics/form_constants";
import {
  validateName,
  validateCitizenId,
  validateEmpty,
} from "../store/statics/validations";

export default {
  name: "CencusForm",
  components: { Message },

  data() {
    return {
      form_url: "file",

      currentGroupName: null,
      groupOptions: [],
      groupOptionsName: [],
      genderOptions: [],
      marriageOptions: [],
      educationOptions: [],

      isValidAll: false,

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

  computed: {
    ...mapGetters({
      user: "User/getUser",
      serverMsg: "Form/getServerMsg",
    }),
  },

  created() {
    this.genderOptions = getGenderOptions();
    this.marriageOptions = getMarriageOptions();
    this.educationOptions = getEducationOption();
    if (this.user.role == 4) {
      this.fetchGroups();
    }
  },

  methods: {
    ...mapActions({
      submitForm: "Form/submitForm",
      downloadForm: "Form/downloadForm",
    }),

    resetForm() {
      this.fullName = null;
      this.dateOfBirth = null;
      this.cccd = null;
      this.gender = null;
      this.maritalStatus = null;
      this.nation = null;
      this.religion = null;
      this.permanentResidence = null;
      this.temporaryResidence = null;
      this.educationalLevel = null;
      this.job = null;
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

    getAreaNames(areas) {
      let list = [];
      for (let area of areas) {
        list.push(area.Name);
      }
      return list;
    },

    // Lấy các thôn (group) thuộc quyền của B1
    fetchGroups() {
      let url = BACKEND_URL + getGroupsAPI().url;
      url = `${url}/${this.user.user_id}`;
      fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.groupOptions = data.Areas;
          this.groupOptionsName = this.getAreaNames(data.Areas);
          console.log("Đây là các thôn");
          console.log(data);
        });
    },

    handleSubmit() {
      const citizen = {
        name: this.fullName,
        DOB: this.dateOfBirth,
        CCCD: this.cccd,
        sex: this.gender,
        maritalStatus: this.maritalStatus,
        nation: this.nation,
        religion: this.religion,
        permanentResidence: this.permanentResidence,
        temporaryResidence: this.temporaryResidence,
        educationalLevel: this.educationalLevel,
        job: this.job,
      };
      let groupId = null;
      // Nếu người nhập liệu là B2
      if (this.user.role == 5) {
        groupId = this.user.user_id;

        // Nếu người nhập liệu là B1
      } else if (this.user.role == 4) {
        groupId = this.groupOptions.find(
          (obj) => obj.Name === this.currentGroupName
        ).Id;
      }
      this.submitForm({
        id: groupId,
        citizen: citizen,
      });
    },

    handleDownload() {
      this.downloadForm();
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
    cccd: function (val) {
      this.cccd = val;
      this.msg.cccd = validateCitizenId(val);
      this.state.cccd = this.msg.cccd.length == 0;
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

<style scoped>
.form-style {
  margin: 0px;
  padding: 0px 30px 30px 30px;
}

.container-style {
  margin: 100px;
}

.button-style {
  width: 80px;
  margin: 0 20px 0 20px;
}
</style>
