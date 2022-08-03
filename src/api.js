import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000"
// axios.defaults.withCredentials = true;

// const getCookie = (name) => {
//   // 변수를 선언한다.
//   const cookies = document.cookie.split(";");

//   // 쿠키를 추출한다.
//   for (var i in cookies) {
//       if (cookies[i].search(name) !== -1) {
//           return cookies[i];
//       }
//   }
//   return null;
// };

export default {
  signin(data) {
    return axios.post("/signin/", data);
  },

  signup(data) {
    return axios.post("/signup/", data);
  },

  getMainList() {
    return axios.get("/main")
  },
  getMainListWithSetting(period, threshold) {
    return axios.get("/main?period=" + period + "&threshold=" + threshold)
  },

  getDetail(name) {
    return axios.get("/detail/" + name)
  },
  getDetailWithSetting(name, threshold) {
    return axios.get("/detail/" + name + "?threshold=" + threshold)
  },
  getDetailForAnalysis(name, box, id) {
    return axios.get("/detail/" + name + "?box=" + box + "&id=" + id)
  },
  getDetailForDrawer(name, box) {
    return axios.get("/detail/" + name + "?box=" + box)
  },
  getSettingMode(header) {
    return axios.get("/setting/mode", header)
  },
  // getSettingMode(){
  //   return axios.get("/setting/mode",{
  //       headers: {
  //         token: getCookie("access").replace("access=","")
  //     }
  //   })
  // }
};

