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
        }
    },

    actions: {
        deleteArea({ commit }, data) {
            const API = getAreaAPI(data.role);
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const url = `${API.urlId}/${data.area.id}`;
            axios
                .delete(url, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.message,
                                status: res.status
                            }
                        )
                    }
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

        addArea({ commit }, data) {
            // console.log("data để add")

            const API = getAreaAPI(data.role);
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            axios
                .post(
                    API.urlId,
                    jsonFormat(data),
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.message,
                                status: res.status
                            }
                        )

                    }
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
            const url = `${API.urlId}/${data.area.id}`;
            axios
                .put(
                    url,
                    jsonFormat(data),
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.message,
                                status: res.status
                            }
                        )
                    }
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
        }

    }
}

export default Area