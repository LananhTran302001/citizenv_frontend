<template>
    <div>
        <div id="options" v-show="isOpen">
            <CheckboxButton label="Họ tên"/>
            <CheckboxButton label="Ngày sinh"/>
            <CheckboxButton label="Nhóm máu"/>
            <CheckboxButton label="Giới tính"/>
            <CheckboxButton label="Tôn giáo"/>
            <CheckboxButton label="CCCD"/>
            <CheckboxButton label="Tỉnh/thành"/>
            <CheckboxButton label="Quận/huyện/thị xã/tp thuộc tỉnh"/>
            <CheckboxButton label="Xã/phường/thị trấn"/>
            <CheckboxButton label="Thôn/xóm/bản/tổ dân phố"/>
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
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: wheat;
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
    color: orangered;
    font-size: 50px;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
}

#open-selcolumn-btn:hover {
    background-color: yellow;
    cursor: pointer;
}

</style>