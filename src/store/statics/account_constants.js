const ACCOUNT_API = {
    urlAll: "accounts",
    urlId: "accounts",
    fields: [
        { key: "areaId", label: "Mã số", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "startDate", label: "Thời gian bắt đầu", sortable: true },
        { key: "endDate", label: "Thời gian kết thúc", sortable: true },
        { key: "isLocked", label: "Tình trạng", sortable: false }
    ]
}

export const getAccountAPI = function (role) {
    let type = "";
    switch (role) {
        case 0:
            type = "A1";
            break;
        case 1:
            type = "A2";
            break;
        case 2:
            type = "A3";
            break;
        case 3:
            type = "B1";
            break;
        case 4:
            type = "B2";
            break;
    }
    return {
        urlAll: ACCOUNT_API.urlAll,
        urlId: ACCOUNT_API.urlId,
        type: type,
        fields: ACCOUNT_API.fields
    }
}

export const decodeJson = function (data) {
    return {
        id: data.areaId,
        email: data.email,
        startDate: data.startDate,
        endDate: data.endDate,
        isLocked: data.isLocked
    }
}