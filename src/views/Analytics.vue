<template>
  <div>
    Phân tích dữ liệu
    <button @click="get"></button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BACKEND_URL } from "../../store/statics/backend_url";
import { getAnalyticsAPI } from "../statics/analytics_constants";

// Cần đọc json lấy dữ liệu
// Cần hiển thị = vue chart

export default {
  name: "Analytics",
  data() {
      return {
          gender: {
              male: null,
              female: null
          },
          marriage: {
              married: null,
              notMarried: null,
              divorce: null
          },
          population: null
      }
  },

  computed: {
    ...mapGetters({
      user: "User/getUser",
    }),
  },

  created() {
      this.fetchData()
  },

  methods: {
    fetchData() {
      let url = BACKEND_URL + getAnalyticsAPI().url;
      url = `${url}/${this.user.user_id}`;
      fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // this accounts for api urls in which the data is not the first result
          
          console.log("Đây là các tỉnh");
          console.log(data);
        });
    },
  },
};
</script>
