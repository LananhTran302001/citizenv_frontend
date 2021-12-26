const ACCOUNT_API = {
    A0: {
        urlAll: "accounts",
        urlId: "accounts",
        type: "A1",
        fields: [
            { key: "areaId", label: "Mã số", sortable: true },
            { key: "email", label: "Email", sortable: true },
        ]
    },
    OTHER: {
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
}

export const getAccountAPI = function (role) {
    let type = "";
    switch (role) {
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
    if (role == 0) {
        return ACCOUNT_API.A0
    }
    return {
        urlAll: ACCOUNT_API.OTHER.urlAll,
        urlId: ACCOUNT_API.OTHER.urlId,
        type: type,
        fields: ACCOUNT_API.OTHER.fields
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