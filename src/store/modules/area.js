import axios from "axios"
const Area = {
    state: () => ({
        area: {

        }
    }),

    actions: {

        getAllArea() {

        },

        deleteArea(areaId) {
            console.log(areaId)
            const headers = {
                Authorization: `Bearer ${localStorage.token}`
            }
            console.log("Day la id: " + areaId)
            let url = "city/"
            axios
                .delete(url, {
                    params: {
                      city_id : areaId
                    }}, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message)
                    }
                    console.log("-------------------")
                }).catch(err => {
                    console.log("Day la loi")
                    console.log("-------------------")
                    console.log(err)
                })
        }, 

        addArea(area) {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
              };
              let url = "city";
              axios
                .post(
                  url,
                  {
                    cityProvinceId: area.id,
                    cityProvinceName: area.name,
                  },
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
                  console.log(err);
                });
        },

        updateArea() {

        }
    }
}

export default Area