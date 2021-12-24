<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["data", "options", "load"],

  watch: {
    load: function (val) {
      this.load = val;
      if (val) {
        console.log("đang render đồ thị...");
        this.renderChart(this.data, this.options);
      }
    },
  },
};
</script>
