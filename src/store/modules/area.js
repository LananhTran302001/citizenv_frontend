import axios from "axios"
import { messageFormat } from "../statics/messages"
import { getAreaAPI, jsonFormat } from "../statics/area_constants"


const Area = {
    namespaced: true,
    state: () => ({
        serverMsg: {
            title: "",
            content: "",
            varient: "info"
        }
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
        deleteArea({ commit }, data) {
            const API = getAreaAPI(data.role);
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const url = `${API.urlId}/${data.area.id}`;
            console.log(url)
            axios
                .delete(url, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                        const message = messageFormat(
                            "Thông báo",
                            res.data.Message,
                            res.status
                        )
                        commit("setServerMsg", message)
                    }
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("Day la loi");
                    console.log("-------------------");
                    const msg = messageFormat(
                        "Thông báo",
                        err.response.message,
                        400
                    )
                    commit("setServerMsg", msg)
                    console.log(msg)
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
                        console.log(res);
                    }
                    const message = messageFormat(
                        "Thông báo",
                        res.data.Message,
                        res.status
                    )
                    commit("setServerMsg", message)
                    console.log("-------------------");
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("Day la loi");
                    console.log("-------------------");
                    const msg = messageFormat(
                        "Thông báo",
                        err.response.message,
                        410
                    )
                    commit("setServerMsg", msg)
                    console.log(msg)
                    console.log(err);
                });
            
        },


        updateArea({ commit }, data) {
            const API = getAreaAPI(data.role);
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            // Chỉ in ra để xem
            const add_data = jsonFormat(data);
            const url = `${API.urlId}/${data.area.id}`;
            console.log(add_data)
            axios
                .put(
                    url,
                    jsonFormat(data),
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                    }
                    const message = messageFormat(
                        "Thông báo",
                        res.data.Message,
                        res.status
                    )
                    commit("setServerMsg", message)
                    console.log("-------------------");
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("Day la loi");
                    console.log("-------------------");
                    const msg = messageFormat(
                        "Thông báo",
                        err.response.message,
                        410
                    )
                    commit("setServerMsg", msg)
                    console.log(msg)
                    console.log(err);
                });
        }

    }
}

export default Area