import axios from "axios"
import { messageFormat } from "../statics/messages"
import { getAnalyticsAPI } from "../statics/analytics_constants"

const Analytics = {
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
            const API = getAnalyticsAPI(data.role);
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const url = `${API.urlId}/${data.area.id}`;
            console.log(url)
            axios
                .delete(url, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.msg,
                                status: res.status
                            }
                        )
                    }
                })
                .catch((err) => {
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.msg,
                            status: err.response.status
                        }
                    )
                    if (err.response.status == 401) {
                        commit("resetToken", "", { root: true })
                    }
                });
        },

    }
}

export default Analytics;
