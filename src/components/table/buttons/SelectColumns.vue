<template>
    <div>
        <div id="options" v-show="isOpen">
            <h4>Chọn cột hiển thị</h4>
            <CheckboxButton label="Họ tên"/>
            <CheckboxButton label="Ngày sinh"/>
            <CheckboxButton label="Nhóm máu"/>
            <CheckboxButton label="Giới tính"/>
            <CheckboxButton label="Tôn giáo"/>
            <CheckboxButton label="CCCD"/>
            <CheckboxButton label="Tỉnh/thành" v-if="role == 1"/>
            <CheckboxButton label="Quận/huyện/thị xã/tp thuộc tỉnh" v-if="role > 0 && role < 3"/>
            <CheckboxButton label="Xã/phường/thị trấn" v-if="role > 0 && role < 4"/>
            <CheckboxButton label="Thôn/xóm/bản/tổ dân phố" v-if="role > 0 && role < 5"/>
            <!-- Nút hoàn thành chọn lựa và đóng selcolumn -->
            <button type="button" id="close-selcolumn-btn" @click="openSelectColumns">Áp dụng</button>
        </div>
        <font-awesome-icon 
            icon="table" size="lg" 
            id="open-selcolumn-btn" 
            v-show="!isOpen" @click="openSelectColumns"
        />
    </div>
</template>

<script>

import CheckboxButton from "./CheckboxButton.vue"

export default {
    name: "SelectColumns",
    components: {
        CheckboxButton
    },
    props: {role:Number},
    data: function() {
        return {
            isOpen: false
        }
    },
    methods: {
        openSelectColumns: function() {
            this.isOpen = !this.isOpen
            console.log(this.isOpen)
        }
    }
}
</script>

<style scoped>
#options {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    background-color: rgb(230, 179, 245);
    border: solid 1px #888;
    border-radius: 20px;
    padding: 30px;
}

#close-selcolumn-btn {
    padding: 7px 10px 7px 10px;
    border: solid 1px gainsboro;
    border-radius: 10px;
}

#open-selcolumn-btn {
    position: fixed;
    bottom: 50px;
    right: 30px;
    color: rgb(230, 179, 245);
    font-size: 50px;
    padding: 10px;
    background-color: white;
    border-radius: 50%;
}

#open-selcolumn-btn:hover {
    background-color: rgb(0, 0, 0);
    cursor: pointer;
}

</style>