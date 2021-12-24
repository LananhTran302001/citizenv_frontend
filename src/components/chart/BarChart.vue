<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["data", "options", "load"],
  watch: {
    load: function (val) {
      this.load = val;
      if (val) {
        console.log(val);
        console.log("đang render đồ thị...");
        this.renderChart(this.data, this.options);
      }
    },
  },
};
</script>
