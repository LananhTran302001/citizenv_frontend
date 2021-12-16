import axios from "axios";

const Area = {
    state: () => ({
        area: {
            serverMsg: ""
        },
        getters: {
            getServerMsg: (state) => state.serverMsg,
        },
        mutations: {
            setServerMsg (state, payload) {
                state.serverMsg = payload
            }
        },
        actions: {
            deleteCity({ commit }, cityId) {
                var url = "city/" + cityId
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.token}`
                }
                axios.delete(url, {id:cityId}, {headers:headers})
                .then((res) => {
                    if (res.status == 200) {
                        commit("setServerMsg", res.data.message)
                    }
                }).catch(err => {
                    console.log("Day la loi")
                    console.log(err.response.data)
                })
            }
        }
    })
}

export default Area;