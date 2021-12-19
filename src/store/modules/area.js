import axios from "axios"
import { getAreaAPI, jsonFormat } from "../modules/area_constants"


const Area = {
    namespaced: true,
    state: () => ({
        serverMsg: ""
    }),

    getters: {
        getServerMsg: (state) => state.serverMsg
    },

    mutations: {
        setServerMsg(state, payload) {
            state.serverMsg = payload
        }
    },

    actions: {

        getAllArea({ commit }, data) {
            console.log("Đây là data input")
            console.log(data)
            const API = getAreaAPI(data.role);
            console.log("Đây là data api")
            console.log(API)
            let url = axios.defaults.baseURL + API.urlAll
            fetch(url, {
                headers: { Authorization: `Bearer ${localStorage.token}` },
            })
                .then((response) => {
                    commit("setServerMsg", "success")
                    return response.json();
                });

        },

        deleteArea({ commit }, data) {
            console.log(data)
            const API = getAreaAPI(data.role);
            console.log(API)
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            console.log("đây là url id")
            console.log(API.urlId)
            let url = `${API.urlId}/${data.area.id}`;
            console.log(url)
            axios
                .delete(url, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                    }
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("Day la loi");
                    console.log("-------------------");
                    commit("setServerMsg", err.response.message)
                    console.log(err);
                });
        },

        addArea({ commit }, data) {
            console.log("data để add")

            const API = getAreaAPI(data.role);
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            // Chỉ in ra để xem
            const add_data = jsonFormat(data);
            console.log(add_data)
            axios
                .post(
                    API.urlId,
                    jsonFormat(data),
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                    }
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("Day la loi");
                    console.log("-------------------");
                    commit("setServerMsg", err.response.message)
                    console.log(err);
                });
        },

    }
}

export default Area