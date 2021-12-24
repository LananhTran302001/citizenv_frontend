const ANALYTICS_API = {
    url: "statistics",
}

const ANALYTICS_FIELDS = {
    BY_GENDER: {
        title: "Đồ thị thống kê theo giới tính",
        labels: ["Nam", "Nữ"],
        ids: ["Nam", "Nu"],
        color: ["#3e95cd", "#8e5ea2"],
        unit: "Giới tính"
    },

    BY_AGE: {
        title: "Đồ thị thống kê theo độ tuổi",
        labels: ["Dưới 18", "19-45", "46-65", "66-80", "Trên 80"],
        ids: ["under 18", "19-45", "46-65", "66-80", "above 80"],
        color: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
        unit: "Tuổi"
    },
    BY_EDUCATIONAL_LEVEL: {
        title: "Đồ thị thống kê theo trình độ học vấn",
        labels: [
            "0/10", "1/10", "2/10", "3/10", "4/10",
            "5/10", "6/10", "7/10", "8/10", "9/10",
            "10/10", "0/12", "1/12", "2/12", "3/12",
            "4/12", "5/12", "6/12", "7/12", "8/12",
            "9/12", "10/12", "11/12", "12/12",
    ],
        ids: [
            "0/10", "1/10", "2/10", "3/10", "4/10",
            "5/10", "6/10", "7/10", "8/10", "9/10",
            "10/10", "0/12", "1/12", "2/12", "3/12",
            "4/12", "5/12", "6/12", "7/12", "8/12",
            "9/12", "10/12", "11/12", "12/12",
        ],
        color: [
            '#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850',
            '#94DBBD', '#CE8BF1', '#C9ABBB', '#D6DC30', '#1D839C',
            '#264F92', '#AF1A05', '#9DBA5B', '#E4AB09', '#A6745D',
            '#31E377', '#FB6C68', '#7CF9F5', '#F25D05', '#f39c12',
            '#2ecc71', '#0984e3', '#fd79a8', '#32ff7e'
        ],
        unit: "Học vấn"
    },

    BY_MARRIAGE: {
        title: "Đồ thị thống kê theo tình trạng hôn nhân",
        labels: [
            "Chưa kết hôn", "Đã kết hôn", "Ly hôn"
        ],
        ids: [
            "Chua ket hon", "Da ket hon", "Ly hon"
        ],
        color: [
            '#3e95cd', '#8e5ea2', '#3cba9f'
        ],
        unit: "Tình trạng hôn nhân"
    },

    POPULATION: {
        title: "Tổng số dân",
        id: "population",
    }

}

export const getAnalyticsAPI = function () {
    return ANALYTICS_API;
}

export const getAnalyticsGender = function () {
    return ANALYTICS_FIELDS.BY_GENDER;
}

export const getAnalyticsAge = function () {
    return ANALYTICS_FIELDS.BY_AGE;
}

export const getAnalyticsEducationalLevel = function () {
    return ANALYTICS_FIELDS.BY_EDUCATIONAL_LEVEL;
}

export const getAnalyticsMarriage = function () {
    return ANALYTICS_FIELDS.BY_MARRIAGE;
}

export const getPopulationField = function () {
    return ANALYTICS_FIELDS.POPULATION;
}