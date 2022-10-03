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
    return axios.post("/signin", data);
  },

  signup(data) {
    return axios.post("/signup", data);
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

  // getSettingMode(access){
  //   return axios.get("/setting/mode", {
  //     headers:{
  //       token:access
  //     }
  //   })
  // },
  getSettingMode(access){
    return axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/setting/mode',
      headers: { 
        'token':access
      }
    })
  },
  settingMode(access,mode) {
    return axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/setting',
      headers: { 
        'token':access,
        'mode': mode
      }
    })
  },

  getThrMode(access){
    return axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/setting/thr',
      headers: { 
        'token':access
      }
    })
  },

  setThrMode(access,thr){
    return axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/setting',
      headers: { 
        'token':access,
        'threshold': thr
      }
    })
  },
  // learningMode(access,thr){
  //   return axios.post("/setting", {
  //     headers:{
  //       // token:header,
  //       threshold:thr,
  //     }
  //   })
  // }
  getLog(access){
    return axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/log'
    })
  }
};

