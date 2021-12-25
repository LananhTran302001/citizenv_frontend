const CITIZEN_API = {
    urlAll: "citizens",
    urlGroup: "citizens_areas",
    urlId: "citizen",
    fields: [
        {key: "name", label: "Họ và tên", sortable: true},
        {key: "CCCD", label: "CCCD", sortable: true},
        {key: "DOB", label: "Ngày sinh", sortable: true},
        {key: "sex", label: "Giới tính", sortable: true},
        {key: "maritalStatus", label: "Tình trạng hôn nhân"},
        {key: "nation", label: "Dân tộc", sortable: true},
        {key: "religion", label: "Tôn giáo", sortable: true},
        {key: "permanentResidence", label: "Địa chỉ thường trú", sortable: true},
        {key: "temporaryResidence", label: "Địa chỉ tạm trú", sortable: true},
        {key: "educationalLevel", label: "Học vấn", sortable: true},
        {key: "job", label: "Nghề nghiệp", sortable: true},
    ]
}

const AREA_API = {
    CITY_PROVINCES: {
        url: "cities",
        type: "tỉnh/thành phố",
        fields: [
            { key: "Id", label: "Mã tỉnh/thành phố", sortable: true },
            { key: "Name", label: "Tên tỉnh/thành phố", sortable: true }
        ]
    },
    DISTRICTS: {
        url: "districts",
        type: "quận/huyện",
        fields: [
            { key: "Id", label: "Mã quận/huyện", sortable: true },
            { key: "Name", label: "Tên quận/huyện", sortable: true }
        ]
    },
    WARDS: {
        url: "wards",
        type: "xã/phường",
        fields: [
            { key: "Id", label: "Mã xã/phường", sortable: true },
            { key: "Name", label: "Tên xã/phường", sortable: true }
        ]
    },
    RESIDENTAL_GROUPS: {
        url: "groups",
        type: "thôn/bản/tổ dân phố",
        fields: [
            { key: "Id", label: "Mã thôn/bản/tổ dân phố", sortable: true },
            { key: "Name", label: "Tên thôn/bản/tổ dân phố", sortable: true }
        ]
    },
}

export const getCitizenAPI = function () {
    return CITIZEN_API
};

export const getCitiesAPI = function () {
    return AREA_API.CITY_PROVINCES
};

export const getDistrictsAPI = function () {
    return AREA_API.DISTRICTS;
}

export const getWardsAPI = function () {
    return AREA_API.WARDS;
}

export const getGroupsAPI = function () {
        return AREA_API.RESIDENTAL_GROUPS;
}

