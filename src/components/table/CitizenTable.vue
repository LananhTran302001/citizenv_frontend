<template>
  <b-container fluid class="container-style">
    <!-- Thông báo từ server -->
    <Message
      :id="serverMsg.id"
      :title="serverMsg.title"
      :content="serverMsg.content"
      :variant="serverMsg.variant"
    />

    <!-- Popup chọn nhóm vùng -->
    <SelectForm
      :options="groupAreas"
      :type="groupAreasType"
      v-if="selectingGroupAreas"
      @selected="fetchGroupAreas"
    />

    <CitizenEditForm
      :citizen="editingCitizen"
      v-if="editingCitizen"
      @updated="forceRefresh"
    />
    <!-- User interface control -->
    <b-row>
      <!-- Search bar -->
      <b-col xs="10" sm="10" md="6" lg="6" class="my-1">
        <b-form-group
          label="Tìm kiếm"
          label-for="search-input"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="3"
          label-cols-lg="2"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <!-- Chỗ nhập input -->
            <b-form-input
              id="search-input"
              v-model="filter"
              type="search"
              placeholder="Nhập để tìm kiếm"
            >
            </b-form-input>
            <!-- Nút Clear -->
            <b-input-group-append>
              <b-button>Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Rows per page -->
      <b-col xs="10" sm="10" md="6" lg="6" class="my-1">
        <b-form-group
          label="Số dòng/trang"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            :options="rowsPerPageOptions"
            v-model="rowsPerPage"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Selection -->
    <b-row>
      <b-col xs="12" sm="12" md="6" lg="3" class="my-1">
        <!-- Chọn tỉnh thành: A1: role = 1 -->
        <b-form-group
          v-if="user.role == 1"
          label="Tỉnh thành"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="4"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            :disabled="selectingGroupAreas"
            :options="citiesName"
            v-model="currentCity"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col xs="12" sm="12" md="6" lg="3" class="my-1">
        <!-- Chọn quận/huyện/thị xã: A1, A2: role = 1,2 -->
        <b-form-group
          v-if="user.role > 0 && user.role < 3"
          label="Quận/huyện/thị xã"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="5"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            :disabled="selectingGroupAreas"
            :options="districtsName"
            v-model="currentDistrict"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col xs="12" sm="12" md="6" lg="3" class="my-1">
        <!-- Chọn xã/phường/thị trấn: A1, A2, A3: role = 1,2,3 -->
        <b-form-group
          v-if="user.role > 0 && user.role < 4"
          label="Xã/phường/thị trấn"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="6"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            :disabled="selectingGroupAreas"
            :options="wardsName"
            v-model="currentWard"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col xs="12" sm="12" md="6" lg="3" class="my-1">
        <!-- Chọn thôn/xóm/bản/tổ dân phố: A1, A2, A3, B1=A4: role = 1,2,3,4 -->
        <b-form-group
          v-if="user.role > 0 && user.role < 5"
          label="Thôn/bản/tổ dân phố"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="5"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            :disabled="selectingGroupAreas"
            :options="residentalGroupsName"
            v-model="currentResidentalGroup"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="selectedGroupAreasName.length > 0">
      <b-col cols="1">
        <a @click="resetAll" class="reset-button-style">
          <font-awesome-icon icon="times-circle" size="lg" />
        </a>
      </b-col>
      <b-col cols="11">
        <h5>
          Bạn đang lọc các {{ groupAreasType }}: {{ selectedGroupAreasName }}
        </h5>
      </b-col>
    </b-row>

    <!-- Main table -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="rowsPerPage"
      :filter="filter"
      sort-icon-left
      responsive="sm"
      class="my-2 table-style"
    >
      <template #cell(index)="row">
        {{ row.index + 1 }}
      </template>
      <template #cell(authorization)="row">
        <b-button
          size="xs"
          class="mr-2 sm-button-style sm-button-style"
          v-if="user.role == 4 && !user.is_locked"
          @click="deleteRow(row)"
        >
          <font-awesome-icon icon="trash" size="sm" />
        </b-button>
        <b-button
          size="xs"
          class="mr-2 sm-button-style sm-button-style"
          v-if="user.role == 4 && !user.is_locked"
          @click="editRow(row)"
        >
          <font-awesome-icon icon="edit" size="sm" />
        </b-button>
        <b-button
          size="xs"
          class="mr-2 sm-button-style sm-button-style"
          @click="detailsRow(row)"
        >
          <font-awesome-icon icon="eye" size="sm" />
        </b-button>
      </template>
    </b-table>
    <!-- Total rows -->
    <b-row class="my-2">
      <span class="ml-5">Danh sách có tổng cộng {{ totalRows }} dòng </span>
    </b-row>
    <!-- Pages of table -->
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="rowsPerPage"
      aria-controls="area-table"
      class="justify-content-center"
    ></b-pagination>

    <!-- Chọn các cột hiển thị -->
    <div class="select-cols-style">
      <div class="menu-style" v-show="isOpenSelectCols">
        <h5>Chọn cột hiển thị</h5>
        <CheckboxButton
          v-for="(field, i) in api.fields"
          :key="i"
          :label="field.label"
          @isChecked="selectColIsChecked(api.fields[i])"
          @isNonChecked="selectColIsNonChecked(api.fields[i])"
        />
        <b-row class="justify-content-start">
          <b-col cols="8">
            <b-button
              type="button"
              variant="primary"
              class="close-selcolumn-btn"
              :disabled="showFields.length == 0"
              @click="applySelectCols"
            >
              Áp dụng
            </b-button>
          </b-col>
          <b-col cols="4">
            <b-button
              type="button"
              variant="secondary"
              class="close-selcolumn-btn"
              @click="hideSelectCols"
            >
              Hủy
            </b-button>
          </b-col>
        </b-row>
      </div>
      <font-awesome-icon
        icon="table"
        size="lg"
        id="open-selcolumn-btn"
        v-show="!isOpenSelectCols"
        @click="openSelectCols"
      />
    </div>
  </b-container>
</template>

<script>
import CheckboxButton from "./buttons/CheckboxButton.vue";
import { mapGetters, mapActions } from "vuex";
import { BACKEND_URL } from "../../store/statics/backend_url";
import Message from "../../components/Message.vue";
import SelectForm from "../../components/table/forms/SelectForm.vue";
import CitizenEditForm from "../../components/table/forms/CitizenEditForm.vue";
import {
  getCitizenAPI,
  getCitiesAPI,
  getDistrictsAPI,
  getWardsAPI,
  getGroupsAPI,
} from "../../store/statics/citizen_constants";
import axios from "axios";

export default {
  name: "CitizenTable",
  components: {
    Message,
    SelectForm,
    CitizenEditForm,
    CheckboxButton,
  },

  data: function () {
    return {
      totalRows: 1, // Tổng số dòng
      currentPage: 1, // Trang bảng hiện tại
      rowsPerPageOptions: [5, 10, 30, 50, 100], // Các options cho số dòng hiện / trang bảng
      rowsPerPage: 10, // Số dòng/trang đang chọn
      filter: null, // Phần text tìm kiếm trong bảng

      // AREA FILTER
      // Các tỉnh/thành phố cho phép chọn: chỉ được xem trong option này
      cities: [],
      // Các quận/huyện/thị xã cho phép chọn: chỉ được xem trong option này
      districts: [],
      // Các xã/phường/thị trấn cho phép chọn: chỉ được xem trong option này
      wards: [],
      // Các thôn/xóm/tổ dân phố cho phép chọn: chỉ được xem trong option này
      residentalGroups: [],

      // AREA NAME
      //
      citiesName: [],
      // Các quận/huyện/thị xã cho phép chọn: chỉ được xem trong option này
      districtsName: [],
      // Các xã/phường/thị trấn cho phép chọn: chỉ được xem trong option này
      wardsName: [],
      // Các thôn/xóm/tổ dân phố cho phép chọn: chỉ được xem trong option này
      residentalGroupsName: [],

      // CHOICE FILTER
      currentCity: null,
      currentDistrict: null,
      currentWard: null,
      currentResidentalGroup: null,

      // CHỌN NHÓM VÙNG
      groupAreas: [],
      selectedGroupAreasName: [],
      showGroupAreasName: false,
      selectingGroupAreas: false,
      groupAreasType: null,
      groupAreasParentId: null,

      // DATA:
      api: null,
      items: [],
      fields: [],
      showFields: [],
      isOpenSelectCols: false,

      // CONTROL
      editingCitizen: null,
      detailingCitizen: null,
    };
  },

  computed: {
    ...mapGetters({
      user: "User/getUser",
      serverMsg: "Citizen/getServerMsg",
    }),
  },

  created() {
    this.api = getCitizenAPI();
    this.fields = this.api.fields.slice(0, this.api.fields.length);
    this.fields.push({ key: "authorization", label: "Chỉnh sửa" });
    this.fields.unshift({ key: "index", label: "STT" });
    this.fetchData();
  },

  methods: {
    ...mapActions({
      deleteCitizen: "Citizen/deleteCitizen"
    }),

    resetFields() {
      this.fields = null;
      this.isOpenSelectCols = false;
    },

    forceRefresh() {
      this.editingCitizen = null;
      this.detailingCitizen = null;
      this.resetCurrent();
      setTimeout(() => this.fetchData(), 2000);
    },

    resetAll() {
      this.resetCurrent();
      this.resetGroupAreas();
    },

    resetGroupAreas() {
      this.groupAreas = [];
      this.selectingGroupAreas = false;
      this.groupAreasType = null;
      this.selectedGroupAreasName = [];
    },

    resetCurrent() {
      this.currentResidentalGroup = null;
      this.currentWard = null;
      this.currentDistrict = null;
      this.currentCity = null;
    },

    resetWards() {
      this.wards = [];
      this.wardsName = [];
      this.currentWard = null;
    },

    resetResidentalGroups() {
      this.residentalGroupsName = [];
      this.residentalGroups = [];
      this.currentResidentalGroup = null;
    },

    // Xóa thông tin 1 người dân
    deleteRow(row) {
      this.deleteCitizen({citizen: {CCCD: row.item.CCCD}});
      this.forceRefresh();
    },

    // Sửa thông tin 1 người dan
    editRow(row) {
      this.editingCitizen = row.item;
    },

    detailsRow(val) {
      console.log(val);
    },

    getAreaNames(areas) {
      let list = [];
      for (let area of areas) {
        list.push(area.Name);
      }
      return list;
    },

    getAreaIds(areas) {
      let list = [];
      for (let area of areas) {
        list.push(area.Id);
      }
      return list;
    },

    findAreaId(areas, areaName) {
      if (!areas || areas.length == 0) {
        return this.user.user_id;
      }
      return areas.find((obj) => obj.Name === areaName).Id;
    },

    fetchData(areaId) {
      this.fetchAreas();
      let url = BACKEND_URL + this.api.urlAll;
      if (areaId) {
        url = `${url}/${areaId}`;
      }
      console.log("----------url-----------");
      console.log(url);
      fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.items = data.Citizens;
          console.log(data);
          this.totalRows = this.items.length;
        });
    },

    fetchGroupAreas(areas) {
      let url = BACKEND_URL + this.api.urlGroup;
      url = `${url}/${this.groupAreasParentId}`;
      const headers = {
        Authorization: `Bearer ${localStorage.token}`,
      };
      this.selectedGroupAreasName = this.getAreaNames(areas);
      const areaIds = this.getAreaIds(areas);
      axios
        .post(
          url,
          {
            areas: areaIds,
          },
          { headers: headers }
        )
        .then((res) => {
          if (res.status == 200) {
            this.items = res.data.Citizens;
            console.log(res.data);
            this.totalRows = this.items.length;
            this.resetCurrent();
          }
        });
    },

    fetchAreas() {
      switch (this.user.role) {
        case 1:
          this.fetchCities();
          break;
        case 2:
          this.fetchDistrictsInCity(null);
          break;
        case 3:
          this.fetchWardsInDistrict(null);
          break;
        case 4:
          this.fetchGroupsInWard(null);
          break;
        default:
          console.log("Làm j có quyền");
      }
    },

    fetchCities() {
      let url = BACKEND_URL + getCitiesAPI().url;
      url = `${url}/${this.user.user_id}`;
      fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.cities = data.Areas;
          this.citiesName = this.getAreaNames(data.Areas);
          this.citiesName.push("Nhóm tỉnh thành");
        });
    },

    fetchDistrictsInCity(cityId) {
      if (!cityId) {
        cityId = this.user.user_id;
      }
      let url = BACKEND_URL + getDistrictsAPI().url;
      url = `${url}/${cityId}`;
      fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.districts = data.Areas;
          this.districtsName = this.getAreaNames(data.Areas);
          this.districtsName.push("Nhóm quận huyện");
        });
    },

    fetchWardsInDistrict(districtId) {
      if (!districtId) {
        districtId = this.user.user_id;
      }
      let url = BACKEND_URL + getWardsAPI().url;
      url = `${url}/${districtId}`;
      fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.wards = data.Areas;
          this.wardsName = this.getAreaNames(data.Areas);
          this.wardsName.push("Nhóm xã phường");
        });
    },

    fetchGroupsInWard(wardId) {
      if (!wardId) {
        wardId = this.user.user_id;
      }
      let url = BACKEND_URL + getGroupsAPI().url;
      url = `${url}/${wardId}`;
      fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.residentalGroups = data.Areas;
          this.residentalGroupsName = this.getAreaNames(data.Areas);
          this.residentalGroupsName.push("Nhóm thôn bản");
        });
    },

    openSelectCols() {
      this.isOpenSelectCols = true;
    },

    hideSelectCols() {
      this.isOpenSelectCols = false;
    },

    // Áp dụng danh sách các cột sẽ hiện vào bảng
    applySelectCols() {
      this.hideSelectCols();
      let list = Array.of(...this.api.fields);
      let listnew = [];
      this.resetFields();
      for (let field of list) {
        if (this.showFields.indexOf(field) != -1) {
          listnew.push(field);
        }
      }
      listnew.push({ key: "authorization", label: "Chỉnh sửa" });
      listnew.unshift({ key: "index", label: "STT" });
      this.fields = listnew;
    },

    // Thêm 1 cột trong danh sách hiện
    selectColIsChecked(row) {
      this.showFields.push(row);
    },

    // Xóa 1 cột trong danh sách hiện
    selectColIsNonChecked(row) {
      this.showFields.splice(this.showFields.indexOf(row), 1);
    },
  },

  watch: {
    currentCity: function (val) {
      this.currentCity = val;
      if (val) {
        // reset danh sách nhóm vùng đã chọn
        this.resetGroupAreas();
        this.resetWards();
        this.resetResidentalGroups();
      }
      if (val == "Nhóm tỉnh thành") {
        this.groupAreasParentId = this.user.user_id;
        this.groupAreas = this.cities;
        this.selectingGroupAreas = true;
        this.groupAreasType = "tỉnh thành";
        console.log("Chọn nhóm tỉnh thành");
      } else if (val) {
        let id = this.findAreaId(this.cities, this.currentCity);
        this.fetchDistrictsInCity(id);
        this.fetchData(id);
      }
    },

    currentDistrict: function (val) {
      this.currentDistrict = val;
      if (val) {
        // reset danh sách nhóm vùng đã chọn
        this.resetGroupAreas();
        this.resetResidentalGroups();
      }
      if (val == "Nhóm quận huyện") {
        this.groupAreasParentId = this.findAreaId(
          this.cities,
          this.currentCity
        );
        this.groupAreas = this.districts;
        this.selectingGroupAreas = true;
        this.groupAreasType = "quận huyện";
      } else if (val) {
        let id = this.findAreaId(this.districts, this.currentDistrict);
        this.fetchWardsInDistrict(id);
        this.fetchData(id);
      }
    },

    currentWard: function (val) {
      this.currentWard = val;
      if (val) {
        // reset danh sách nhóm vùng đã chọn
        this.resetGroupAreas();
      }
      if (val == "Nhóm xã phường") {
        this.groupAreasParentId = this.findAreaId(
          this.districts,
          this.currentDistrict
        );
        this.groupAreas = this.wards;
        this.selectingGroupAreas = true;
        this.groupAreasType = "xã phường";
      } else if (val) {
        let id = this.findAreaId(this.wards, this.currentWard);
        this.fetchGroupsInWard(id);
        this.fetchData(id);
      }
    },

    currentResidentalGroup: function (val) {
      this.currentResidentalGroup = val;
      if (val) {
        // reset danh sách nhóm vùng đã chọn
        this.resetGroupAreas();
      }
      // Nếu chọn nhóm thôn bản
      if (val == "Nhóm thôn bản") {
        // Cập nhật giá trị các biến danh sách nhóm vùng
        this.groupAreasParentId = this.findAreaId(this.wards, this.currentWard);
        this.groupAreas = this.residentalGroups;
        this.selectingGroupAreas = true;
        this.groupAreasType = "thôn/bản/tổ dân phố";

        // Nếu chỉ chọn 1 vùng
      } else if (val) {
        let id = this.findAreaId(
          this.residentalGroups,
          this.currentResidentalGroup
        );
        this.fetchData(id);
      }
    },
  },
};
</script>

<style scoped>
.container-style {
  padding: 15px;
}
.table-style {
  background-color: white;
  font-size: 13px;
}

.sm-button-style {
  padding: 5px;
  color: rgba(1, 5, 58, 0.836);
  background-color: transparent;
  border: none;
  font-size: 16px;
}

.sm-button-style:hover {
  color: #32b890;
  background-color: white;
}

.reset-button-style {
  margin: 0;
  padding: 0;
  color: gray;
  cursor: pointer;
}

.select-cols-style .menu-style {
  position: fixed;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgb(190, 231, 248);
  border: solid 1px #888;
  border-radius: 20px;
  padding: 30px;
}

.select-cols-style #open-selcolumn-btn {
  position: fixed;
  bottom: 50px;
  right: 30px;
  color: rgb(230, 179, 245);
  font-size: 50px;
  padding: 10px;
  background-color: rgb(245, 250, 170);
  border-radius: 50%;
}

.select-cols-style #open-selcolumn-btn:hover {
  background-color: rgb(0, 0, 0);
  cursor: pointer;
}
</style>
