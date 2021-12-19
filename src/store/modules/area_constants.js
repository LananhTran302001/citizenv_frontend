import {getUser} from "../modules/user"

const AREA_API = {
    CITY_PROVINCES: {
        urlAll: "cities",
        urlId:"city",
        fields: [
            { key: "cityProvinceId", label: "Mã tỉnh/thành phố", sortable: true },
            { key: "cityProvinceName", label: "Tên tỉnh/thành phố", sortable: true }
        ]
    },
    DISTRICTS: {
        urlAll: "districts",
        urlId:"district",
        fields: [
            { key: "districtId", label: "Mã quận/huyện", sortable: true },
            { key: "districtName", label: "Tên quận/huyện", sortable: true }
        ]
    },
    WARDS: {
        urlAll: "wards",
        urlId:"ward",
        fields: [
            { key: "wardId", label: "Mã xã/phường", sortable: true },
            { key: "wardName", label: "Tên xã/phường", sortable: true }
        ]
    },
    RESIDENTAL_GROUPS: {
        urlAll: "groups",
        urlId:"group",
        fields: [
            { key: "groupId", label: "Mã thôn/bản/tổ dân phố", sortable: true },
            { key: "groupName", label: "Tên thôn/bản/tổ dân phố", sortable: true }
        ]
    },
};

export function getAreaAPI() {
    const role = getUser.role;
    switch (role) {
        case 1: return AREA_API.CITY_PROVINCES; 
        case 2: return AREA_API.DISTRICTS; 
        case 3: return AREA_API.WARDS; 
        case 4: return AREA_API.RESIDENTAL_GROUPS; 
        default: return null; 
    }
}