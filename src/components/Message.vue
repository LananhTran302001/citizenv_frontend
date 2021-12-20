<template>
    <div></div>
</template>

<script>
export default {
    name: "Message",
    props: {
        title:String,
        content:String,
        variant:String, // có danger, warning, success
    },

    methods: {
        makeToast() {
        console.log("make toast")
        this.$bvToast.toast(this.content, {
          title: this.title,
          variant: this.variant,
          solid: true
        })
      }
    },

    watch: {
        content: function(val) {
            this.content = val;
            if (val) {this.makeToast()}
        }
    }
}
</script>