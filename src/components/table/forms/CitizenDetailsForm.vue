<template>
  <b-modal
    id="citizen-detail-modal"
    ref="modal"
    scrollable
    title="Thông tin chi tiết"
    ok-only
    ok-title="Đóng"
    @ok="hide"
    @hide="hide"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-row class="my-2">
        <b-col cols="5">Họ và tên :</b-col>{{ citizen.name }}
      </b-row>
      <b-row class="my-2">
        <b-col cols="5">Giới tính :</b-col>{{ citizen.sex }}
      </b-row>
      <b-row class="my-2">
        <b-col cols="5">Ngày sinh :</b-col>{{ citizen.DOB }}
      </b-row>
      <b-row class="my-2">
        <b-col cols="5">Căn cước công dân :</b-col>{{ citizen.CCCD }}
      </b-row>
      <b-row class="my-2">
        <b-col cols="5">Dân tộc :</b-col>{{ citizen.nation }}
      </b-row>
      <b-row class="my-2">
        <b-col cols="5">Tôn giáo :</b-col>{{ citizen.religion }}
      </b-row>
      <b-row class="my-2">
        <b-col cols="5">Trình độ học vấn :</b-col>{{ citizen.educationalLevel }}
      </b-row>
      <b-row class="my-2">
        <b-col cols="5">Nghề nghiệp hiện tại :</b-col>{{ citizen.job }}
      </b-row>
      <b-row class="my-2">
        <b-col cols="5">Tình trạng hôn nhân :</b-col>{{ citizen.maritalStatus }}
      </b-row>

      <b-row class="my-2">
        <b-col cols="5">Địa chỉ thường trú :</b-col
        >{{ citizen.permanentResidence }}
      </b-row>

      <b-row class="my-2">
        <b-col cols="5">Địa chỉ tạm trú :</b-col
        >{{ citizen.temporaryResidence }}
      </b-row>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "CitizenDetailsForm",
  props: ["citizen"],

  mounted() {
    this.$bvModal.show("citizen-detail-modal");
  },

  methods: {
    hide() {
      this.$emit("detailed", true);
    },
  },
};
</script>
