<template>
  <div></div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      oldId: null
    }
  },
  props: {
    id: Number,
    title: String,
    content: String,
    variant: String, // có danger, warning, success
  },

  methods: {
    makeToast() {
      this.$bvToast.toast(this.content, {
        title: this.title,
        variant: this.variant,
        solid: true,
      });
    },
  },

  watch: {
    id: function (val) {
      if (this.oldId != val && this.content) {
        this.id = val;
        this.oldId = val;
        this.makeToast();
      }
    },
  },
};
</script>
