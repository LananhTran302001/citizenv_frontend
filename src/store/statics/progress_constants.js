const PROGRESS_API = {
    B1: {
        urlAll: "progress",
        urlId: "progress",
        fields: [
            { key: "id", label: "Mã", sortable: true },
            { key: "name", label: "Tên", sortable: true },
            { key: "sumCitizen", label: "Đã nhập" },
            { key: "endTime", label: "Hạn cuối", sortable: true },
        ]
    },

    OTHER: {
        urlAll: "progress",
        urlId: "progress",
        fields: [
            { key: "id", label: "Mã", sortable: true },
            { key: "name", label: "Tên", sortable: true },
            { key: "completed", label: "Đã hoàn thành" },
            { key: "endTime", label: "Hạn cuối", sortable: true },
        ]
    }

}

export const getProgressAPI = function (role) {
    if (role > 0 && role < 4) {
        return PROGRESS_API.OTHER
    } else if (role == 4) {
        return PROGRESS_API.B1
    }
    return null
}