<template>
  <b-container fluid class="container-style">
    <!-- Dòng đầu tiên: chọn phân tích theo đặc tính nào -->
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
import PieChart from "../components/chart/PieChart.vue";
import LineChart from "../components/chart/LineChart.vue";
import BarChart from "../components/chart/BarChart.vue";

export default {
  name: "Analytics",
  components: { PieChart, LineChart, BarChart },

  data() {
    return {
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
    }),
  },

  created() {
    this.load = false;
    this.dataChart = {};
    this.options = {};
    this.analyticsBy = null;
    this.analyticsChart = null;
    this.analyticsConfig = null;
  },

  methods: {
    setupConfig() {
      this.load = false;
      if (this.analyticsBy == this.analyticsByOptions[0]) {
        // Theo giới tính
        console.log("Setup theo giới tính")
        this.analyticsConfig = getAnalyticsGender();
      
      // Theo độ tuổi
      } else if (this.analyticsBy == this.analyticsByOptions[1]) {
        console.log("Setup theo tuổi")
        this.analyticsConfig = getAnalyticsAge();
      
      // Theo trình độ học vấn
      } else if (this.analyticsBy == this.analyticsByOptions[2]) {
        console.log("Setup theo học vấn")
        this.analyticsConfig = getAnalyticsEducationalLevel();
      
      // Theo tình trạng hôn nhân
      } else if (this.analyticsBy == this.analyticsByOptions[3]) {
        console.log("Setup theo hôn nhân")
        this.analyticsConfig = getAnalyticsMarriage();
      
      
      } else {
        console.log("Chọn nhầm rồi");
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
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.3,
            },
          ],
        };
      }
      return  {
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
        }
      }
      return {
        title: {
          display: true,
          text: config.title,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{ ticks: {beginAtZero: true} }]
        }
      };
    },

    fetchData(areaId) {
      let url = BACKEND_URL + getAnalyticsAPI().url;
      if (areaId) {
        url = `${url}/${areaId}`;
      }
      // trước tiên , lấy số liệu của nó  '/stastics thôi
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
  },

  watch: {
    analyticsBy: function (val) {
      this.analyticsBy = val;
      if (val && this.analyticsBy) {
        this.setupConfig();
        this.fetchData(null);
      }
    },

    // Nếu chọn kiểu hiển thị
    // Và thuộc tính thống kê đã được chọn
    // Thì thực hiện fetch dữ liệu
    analyticsChart: function (val) {
      this.analyticsChart = val;
      if (val && this.analyticsBy) {
        this.setupConfig();
        this.fetchData(null);
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
