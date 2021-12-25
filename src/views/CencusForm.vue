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
          <b-button variant="primary">
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
          <b-form-group label="Họ và tên">
            <b-form-input placeholder="Nhập họ và tên" v-model="fullName"> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Giới tính">
            <b-form-select :options="genderOptions" v-model="gender"></b-form-select>
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
            <b-form-input placeholder="Nhập số căn cước công dân" v-model="cccd">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Dân tộc">
            <b-form-input placeholder="Nhập dân tộc" v-model="nation"> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Tôn giáo">
            <b-form-input placeholder="Nhập tôn giáo" v-model="religion"> </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Hàng 3: Học vấn, nghề nghiệp, tình trạng hôn nhân -->
      <b-row>
        <b-col cols="4">
          <b-form-group label="Tình trạng học vấn">
            <b-form-select :options="educationOptions" v-model="educationalLevel"></b-form-select>
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
            <b-form-select :options="marriageOptions" v-model="maritalStatus"></b-form-select>
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
        <b-col cols="8">
          <b-form-group label="Số nhà, phố">
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
        <b-col cols="8">
          <b-form-group label="Số nhà, phố">
            <b-form-input v-model="temporaryResidence"> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Thôn/bản/tổ dân phố">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-group label="Xã/phường/thị trấn">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Quận/huyện/thị xã">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Tỉnh/thành phố">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row align-h="center" class="mt-5 mb-5">
        <b-button class="button-style" variant="primary" @click="handleSubmit"> Nộp </b-button>
        <b-button class="button-style" variant="primary" @click="resetForm"> Mới </b-button>
      </b-row>
    </form>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { BACKEND_URL } from "../store/statics/backend_url";
import { getGroupsAPI } from "../store/statics/citizen_constants"
import Message from "../components/Message.vue"
import {
  getGenderOptions,
  getMarriageOptions,
  getEducationOption,
} from "../store/statics/form_constants";


export default {
  name: "CencusForm",
  components: { Message },

  data() {
    return {
      currentGroupName: null,
      groupOptions: [],
      groupOptionsName: [],
      genderOptions: [],
      marriageOptions: [],
      educationOptions: [],

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
      tempGroup: null,
      tempWard: null,
      tempDistrict: null,
      tempCity: null,
    };
  },

  computed: {
    ...mapGetters({
      user: "User/getUser",
      serverMsg: "Citizen/getServerMsg"
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
      submitForm: "Citizen/submitForm"
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
      this.tempGroup = null;
      this.tempWard = null;
      this.tempDistrict = null;
      this.tempCity = null;
      this.educationalLevel = null;
      this.job = null;
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
      }
      let groupId = null;
      // Nếu người nhập liệu là B2
      if (this.user.role == 5) {
        groupId = this.user.user_id;

        // Nếu người nhập liệu là B1
      } else if (this.user.role == 4) {
        groupId = this.groupOptions.find(obj =>  obj.Name === this.currentGroupName).Id;
      }
      this.submitForm({
        id: groupId,
        citizen: citizen
      })
    }
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
