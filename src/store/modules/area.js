import axios from "axios"
import { messageFormat } from "../statics/messages"
import { getAreaAPI, jsonFormat } from "../statics/area_constants"


const Area = {
    namespaced: true,
    state: () => ({
        serverMsg: {
            id: 0,
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
            state.serverMsg = messageFormat(
                state.serverMsg.id + 1,
                payload.title,
                payload.content,
                payload.status
            )
            console.log("đây là server message")
            console.log(state.serverMsg)
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
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.message,
                                status: res.status
                            }
                        )
                    }
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("-------------------");
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
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
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.message,
                                status: res.status
                            }
                        )

                    }
                    console.log(res.data.message);
                    console.log("-------------------");
                })
                .catch((err) => {
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                });

        },


        updateArea({ commit }, data) {
            const API = getAreaAPI(data.role);
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            // Chỉ in ra để xem
            const update_data = jsonFormat(data);
            const url = `${API.urlId}/${data.area.id}`;
            console.log(update_data)
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
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: res.data.message,
                            status: res.status
                        }
                    )
                    console.log("-------------------");
                    console.log("-------------------");
                })
                .catch((err) => {
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                    console.log(err.response.data.message);
                });
        }

    }
}

export default Area