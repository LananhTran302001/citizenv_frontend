const AREA_API = {
    CITY_PROVINCES: {
        urlAll: "cities",
        urlId: "city",
        type: "tỉnh/thành phố",
        fields: [
            { key: "cityProvinceId", label: "Mã tỉnh/thành phố", sortable: true },
            { key: "cityProvinceName", label: "Tên tỉnh/thành phố", sortable: true }
        ]
    },
    DISTRICTS: {
        urlAll: "districts",
        urlId: "district",
        type: "quận/huyện",
        fields: [
            { key: "districtId", label: "Mã quận/huyện", sortable: true },
            { key: "districtName", label: "Tên quận/huyện", sortable: true }
        ]
    },
    WARDS: {
        urlAll: "wards",
        urlId: "ward",
        type: "xã/phường",
        fields: [
            { key: "wardId", label: "Mã xã/phường", sortable: true },
            { key: "wardName", label: "Tên xã/phường", sortable: true }
        ]
    },
    RESIDENTAL_GROUPS: {
        urlAll: "groups",
        urlId: "group",
        type: "thôn/bản/tổ dân phố",
        fields: [
            { key: "groupId", label: "Mã thôn/bản/tổ dân phố", sortable: true },
            { key: "groupName", label: "Tên thôn/bản/tổ dân phố", sortable: true }
        ]
    },
};

export const getAreaAPI = function (role) {
    switch (role) {
        case 1: return AREA_API.CITY_PROVINCES;
        case 2: return AREA_API.DISTRICTS;
        case 3: return AREA_API.WARDS;
        case 4: return AREA_API.RESIDENTAL_GROUPS;
        default: return null;
    }
}

export const jsonFormat = function (data) {
    switch (data.role) {
        case 1:
            return {
                cityProvinceId: data.area.id,
                cityProvinceName: data.area.name,
            };
        case 2:
            return {
                districtId: data.area.id,
                districtName: data.area.name,
            };
        case 3:
            return {
                wardId: data.area.id,
                wardName: data.area.name,
            };
        case 4:
            return {
                groupId: data.area.id,
                groupName: data.area.name,
            };
        default: return null;
    }
}

export const decodeJson = function (data) {
    switch (data.role) {
        case 1:
            return {
                id: data.area.cityProvinceId,
                name: data.area.cityProvinceName,
            };
        case 2:
            return {
                id: data.area.districtId,
                name:data.area.districtName,
            };
        case 3:
            return {
                id: data.area.wardId,
                name: data.area.wardName,
            };
        case 4:
            return {
                id: data.area.groupId,
                name: data.area.groupName,
            };
        default: return null;
    }
}