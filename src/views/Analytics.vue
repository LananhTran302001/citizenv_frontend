// Ý tưởng // --> Chọn vùng: chưa hiện phân tích // --> Chọn analyticsBy &
analyticsChart --> Phân tích, nếu không có vùng thì phân tích chính nó // -->
Thay đổi vùn nhưng vẫn có analyticsBy & analyticsChart --> cập nhật phân tích

<template>
  <b-container fluid class="container-style">

    <!-- Popup chọn nhóm vùng -->
    <SelectForm
      :options="groupAreas"
      :type="groupAreasType"
      v-if="selectingGroupAreas"
      @selected="handleSelectGroupAreas"
      @canceled="resetAllButName"
    />

    <!-- Selection -->
    <b-row class="my-2">
      <b-col xs="12" sm="12" md="6" lg="4" v-if="user.role == 1">
        <!-- Chọn tỉnh thành: A1: role = 1 -->
        <b-form-group
          label="Tỉnh thành"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="4"
          label-align-sm="right"
          class="mb-0"
        >
          <b-form-select
            :disabled="selectingGroupAreas"
            :options="citiesName"
            v-model="currentCity"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col
        xs="12"
        sm="12"
        md="6"
        lg="4"
        v-if="user.role > 0 && user.role < 3"
      >
        <!-- Chọn quận/huyện/thị xã: A1, A2: role = 1,2 -->
        <b-form-group
          label="Quận/huyện/thị xã"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="5"
          label-align-sm="right"
          class="mb-0"
        >
          <b-form-select
            :disabled="selectingGroupAreas"
            :options="districtsName"
            v-model="currentDistrict"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col
        xs="12"
        sm="12"
        md="6"
        lg="4"
        v-if="user.role > 0 && user.role < 4"
      >
        <!-- Chọn xã/phường/thị trấn: A1, A2, A3: role = 1,2,3 -->
        <b-form-group
          label="Xã/phường/thị trấn"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="6"
          label-align-sm="right"
          class="mb-0"
        >
          <b-form-select
            :disabled="selectingGroupAreas"
            :options="wardsName"
            v-model="currentWard"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="my-2">
      <b-col xs="12" sm="12" md="6" lg="4" v-if="user.role == 4">
        <!-- Chọn thôn/xóm/bản/tổ dân phố: B1=A4: role = 4 -->
        <b-form-group
          label="Thôn/bản/tổ dân phố"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="5"
          label-align-sm="right"
          class="mb-0"
        >
          <b-form-select
            :disabled="selectingGroupAreas"
            :options="residentalGroupsName"
            v-model="currentResidentalGroup"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="selectedGroupAreas">
      <b-col cols="1">
        <a @click="resetAll" class="reset-button-style">
          <font-awesome-icon icon="times-circle" size="lg" />
        </a>
      </b-col>
      <b-col cols="11">
        <p>
          Bạn đang lọc các {{ groupAreasType }}:
          {{ getAreaNames(selectedGroupAreas) }}
        </p>
      </b-col>
    </b-row>

    <!-- Dòng thứ 2: chọn phân tích theo đặc tính nào -->
    <b-row>
      <!-- Chọn thuộc tính phân tích -->
      <b-col cols="6">
        <b-form-group
          label="Phân tích:"
          label-cols-xs="6"
          label-cols-sm="5"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
        >
          <b-form-select
            :options="analyticsByOptions"
            v-model="analyticsBy"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <!-- Chọn dạng biểu đồ -->
      <b-col cols="4">
        <b-form-group
          label="Dạng:"
          label-cols-xs="5"
          label-cols-sm="5"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
        >
          <b-form-select
            :options="analyticsChartOptions"
            v-model="analyticsChart"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Phần biểu đồ -->
    <PieChart
      :data="dataChart"
      :options="options"
      v-if="analyticsChart == 'Biểu đồ tròn'"
      :load="load"
    />

    <LineChart
      :data="dataChart"
      :options="options"
      v-if="analyticsChart == 'Biểu đồ đường'"
      :load="load"
    />

    <BarChart
      :data="dataChart"
      :options="options"
      v-if="analyticsChart == 'Biểu đồ cột'"
      :load="load"
    />
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { BACKEND_URL } from "../store/statics/backend_url";
import {
  getAnalyticsAPI,
  getAnalyticsGender,
  getAnalyticsAge,
  getAnalyticsEducationalLevel,
  getAnalyticsMarriage,
} from "../store/statics/analytics_constants";
import {
  getCitiesAPI,
  getDistrictsAPI,
  getWardsAPI,
  getGroupsAPI,
} from "../store/statics/citizen_constants";
import SelectForm from "../components/table/forms/SelectForm.vue";
import PieChart from "../components/chart/PieChart.vue";
import LineChart from "../components/chart/LineChart.vue";
import BarChart from "../components/chart/BarChart.vue";

import axios from "axios";

export default {
  name: "Analytics",
  components: { SelectForm, PieChart, LineChart, BarChart },

  data() {
    return {
      // SELECTION AREAS
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
      citiesName: [],
      // Các quận/huyện/thị xã cho phép chọn: chỉ được xem trong option này
      districtsName: [],
      // Các xã/phường/thị trấn cho phép chọn: chỉ được xem trong option này
      wardsName: [],
      // Các thôn/xóm/tổ dân phố cho phép chọn: chỉ được xem trong option này
      residentalGroupsName: [],

      // SELECTED AREA NAME
      currentAreaId: null,
      currentCity: null,
      currentDistrict: null,
      currentWard: null,
      currentResidentalGroup: null,

      // CHỌN NHÓM VÙNG
      groupAreas: [], // Danh sách nhóm vùng để chọn
      selectedGroupAreas: [], // Tên những vùng được chọn
      selectingGroupAreas: false, // Đang thực hiện chọn nhóm
      groupAreasType: null, // Kiểu vùng: tỉnh thảnh, huyện, xã,..
      groupAreasParentId: null, // Id của vùng chứa các nhóm vùn đang chọn

      load: false, // Tình trạng load xong dữ liệu

      // Chọn thuộc tính phân tích
      analyticsByOptions: [
        "Theo giới tính",
        "Theo độ tuổi",
        "Theo trình độ học vấn",
        "Tình trạng hôn nhân",
      ],
      analyticsBy: null,
      analyticsConfig: null,

      // Chọn biểu đồ biểu diễn
      analyticsChartOptions: ["Biểu đồ cột", "Biểu đồ tròn", "Biểu đồ đường"],
      analyticsChart: null,

      // Tham số cho chart
      dataChart: {},
      options: {},

      population: null,
    };
  },

  computed: {
    ...mapGetters({
      user: "User/getUser",
      serverMsg: "Analytics/getServerMsg",
    }),
  },

  created() {
    this.load = false;
    this.dataChart = {};
    this.options = {};
    this.analyticsBy = null;
    this.analyticsChart = null;
    this.analyticsConfig = null;
    this.resetAll();
    this.fetchAreas();
  },

  methods: {
    resetAll() {
      this.resetConfig();
      this.resetCurrent();
      this.resetGroupAreas();
    },

    resetAllButName() {
      this.resetCurrent()
      //this.resetConfig(); 
      this.groupAreas = [];
      this.selectingGroupAreas = false;
      this.groupAreasType = null;
      this.groupAreasParentId = null;
    },

    resetConfig() {
      this.analyticsChart = null;
      this.analyticsBy = null;
    },

    resetGroupAreas() {
      this.groupAreas = [];
      this.selectingGroupAreas = false;
      this.groupAreasType = null;
      this.groupAreasParentId = null;
      this.selectedGroupAreas = null;
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

    // Hàm setup config thực hiện sau khi chọn xong các điều kiện lọc
    setupConfig() {
      this.load = false;
      if (this.analyticsBy == this.analyticsByOptions[0]) {
        // Theo giới tính
        this.analyticsConfig = getAnalyticsGender();

        // Theo độ tuổi
      } else if (this.analyticsBy == this.analyticsByOptions[1]) {
        this.analyticsConfig = getAnalyticsAge();

        // Theo trình độ học vấn
      } else if (this.analyticsBy == this.analyticsByOptions[2]) {
        this.analyticsConfig = getAnalyticsEducationalLevel();

        // Theo tình trạng hôn nhân
      } else if (this.analyticsBy == this.analyticsByOptions[3]) {
        this.analyticsConfig = getAnalyticsMarriage();
      } 
    },

    getChartData(allData, config) {
      let values = [];
      for (let i of config.ids) {
        values.push(allData[i]);
      }
      // Nếu là biểu đồ đường
      if (this.analyticsChart == this.analyticsChartOptions[2]) {
        return {
          labels: config.labels,
          datasets: [
            {
              data: values,
              label: config.unit,
              backgroundColor: config.color,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.3,
            },
          ],
        };
      }
      return {
        labels: config.labels,
        datasets: [
          {
            data: values,
            label: config.unit,
            backgroundColor: config.color,
          },
        ],
      };
    },

    getOptions(config) {
      // Nếu là biểu đồ tròn
      if (this.analyticsChart == this.analyticsChartOptions[1]) {
        return {
          title: {
            display: true,
            text: config.title,
          },
          responsive: true,
          maintainAspectRatio: false,
        };
      }
      return {
        title: {
          display: true,
          text: config.title,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }],
        },
      };
    },

    // Lấy dữ liệu phân tích của 1 vùng có mã là areaId
    fetchData(areaId) {
      let url = BACKEND_URL + getAnalyticsAPI().url;
      if (areaId) {
        url = `${url}/${areaId}`;
      }
      fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.dataChart = this.getChartData(data, this.analyticsConfig);
          this.options = this.getOptions(this.analyticsConfig);
          // Load = true --> thực hiện render biểu đồ
          this.load = true;
        });
    },

    // Lấy danh sách tên của các đối tượng areas --> hiện trong menu
    getAreaNames(areas) {
      let list = [];
      for (let area of areas) {
        list.push(area.Name);
      }
      return list;
    },

    // Lấy danh sách id của các đối tượng areas
    getAreaIds(areas) {
      let list = [];
      for (let area of areas) {
        list.push(area.Id);
      }
      return list;
    },

    // Lấy id của đối tượng có tên là areaName, nằm trong danh sách areas
    findAreaId(areas, areaName) {
      if (!areas || areas.length == 0) {
        return this.user.user_id;
      }
      return areas.find((obj) => obj.Name === areaName).Id;
    },

    handleSelectGroupAreas(selectedAreas) {
      this.selectedGroupAreas = selectedAreas;
    },

    // Lấy kết quả phân tích của một nhóm vùng
    fetchGroupAreas(areaIds) {
      let url = BACKEND_URL + getAnalyticsAPI().url;
      url = `${url}`;
      const headers = {
        Authorization: `Bearer ${localStorage.token}`,
      };
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
            this.dataChart = this.getChartData(res.data, this.analyticsConfig);
            this.options = this.getOptions(this.analyticsConfig);
            this.load = true; // Bắt đầu tạo và render biểu đồ
          }
        });
    },

    // Hàm fetch danh sách vùng bắt đầu dựa trên role của người dùng
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
          break;
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
  },

  watch: {
    analyticsBy: function (val) {
      this.analyticsBy = val;
      if (val && this.analyticsChart && this.selectedGroupAreas) {
        this.setupConfig();
        this.fetchGroupAreas(this.getAreaIds(this.selectedGroupAreas));
      } else if (val && this.analyticsChart) {
        this.setupConfig();
        this.fetchData(this.currentAreaId);
      }
    },

    // Nếu chọn kiểu hiển thị
    // Và thuộc tính thống kê đã được chọn
    // Thì thực hiện fetch dữ liệu
    analyticsChart: function (val) {
      this.load = false;
      this.analyticsChart = val;
      if (val && this.analyticsBy && this.selectedGroupAreas) {
        this.setupConfig();
        this.fetchGroupAreas(this.getAreaIds(this.selectedGroupAreas));
      } else if (val && this.analyticsBy) {
        this.setupConfig();
        this.fetchData(this.currentAreaId);
      }
    },

    currentCity: function (val) {
      this.load = false;
      if (val) {
        // loại bỏ danh sách nhóm vùng đã chọn
        this.resetGroupAreas();
        this.resetWards();
        this.resetResidentalGroups();
      }
      if (val == "Nhóm tỉnh thành") {
        // Các thông số khi người dùng chọn nhóm tỉnh thành
        this.groupAreasParentId = this.user.user_id;
        this.groupAreas = this.cities;
        this.pAreas = true;
        this.groupAreasType = "tỉnh thành";
        this.currentCity = null;
        this.currentAreaId = null;
      } else if (val) {
        // Khi người dùng chỉ chọn 1 tỉnh thành
        this.currentCity = val;
        let id = this.findAreaId(this.cities, this.currentCity);
        this.fetchDistrictsInCity(id);
        this.currentAreaId = id;
        if (this.analyticsConfig) {
          this.fetchData(id);
        }
      } 
    },

    currentDistrict: function (val) {
      this.load = false;
      if (val) {
        // reset danh sách nhóm vùng đã chọn
        this.resetGroupAreas();
        this.resetResidentalGroups();
      }
      if (val == "Nhóm quận huyện") {
        // Khi người dùn chọn nhóm quận huyện
        this.groupAreasParentId = this.findAreaId(
          this.cities,
          this.currentCity
        );
        this.groupAreas = this.districts;
        this.selectingGroupAreas = true;
        this.groupAreasType = "quận huyện";
        this.currentDistrict = null;
        this.currentAreaId = null;
      } else if (val) {
        // Khi người dùng chỉ chọn 1 quận huyện
        this.currentDistrict = val;
        let id = this.findAreaId(this.districts, this.currentDistrict);
        this.fetchWardsInDistrict(id);
        this.currentAreaId = id;
        if (this.analyticsConfig) {
          this.fetchData(id);
        }
      } 
    },

    currentWard: function (val) {
      this.load = false;
      if (val) {
        // reset danh sách nhóm vùng đã chọn
        this.resetGroupAreas();
      }
      if (val == "Nhóm xã phường") {
        // Khi người dùng chọn nhóm xã phường
        this.groupAreasParentId = this.findAreaId(
          this.districts,
          this.currentDistrict
        );
        this.groupAreas = this.wards;
        this.selectingGroupAreas = true;
        this.groupAreasType = "xã phường";
        this.currentWard = null;
        this.currentAreaId = null;
      } else if (val) {
        // Khi người dùng chọn 1 xã phường
        this.currentWard = val;
        let id = this.findAreaId(this.wards, this.currentWard);
        this.fetchGroupsInWard(id);
        this.currentAreaId = id;
        if (this.analyticsConfig) {
          this.fetchData(id);
        }
      }
    },

    currentResidentalGroup: function (val) {
      this.load = false;
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
        this.currentResidentalGroup = null;
        this.currentAreaId = null;
      }
      // Nếu người dùng chỉ chọn 1 thôn
      else if (val) {
        this.currentResidentalGroup = val;
        let id = this.findAreaId(
          this.residentalGroups,
          this.currentResidentalGroup
        );
        this.currentAreaId = id;
        if (this.analyticsConfig) {
          this.fetchData(id);
        }
      }
    },

    selectedGroupAreas: function (areas) {
      this.load = false;
      this.selectedGroupAreas = areas;
      if (areas) {
        this.currentAreaId = null;
        if (this.analyticsConfig) {
          this.fetchGroupAreas(this.getAreaIds(areas));
        }
      } 
    },
  },
};
</script>

<style scoped>
.container-style {
  margin-top: 80px;
}
</style>
