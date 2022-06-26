import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000"
// axios.defaults.withCredentials = true;


export default {
    signin(data) {
      return axios.post("/signin/", data);
    },

    signup(data) {
      return axios.post("/signup/", data);
    },

    getMainList(){
      return axios.get("/main")
    },
    getMainListWithSetting(period, threshold){
      return axios.get("/main?period="+period+"&threshold="+threshold)
    },

    getDetail(name){
      return axios.get("/detail/"+name)
    },
    getDetailWithSetting(name,threshold){
      return axios.get("/detail/"+name+"?threshold="+threshold)
    },
    getDetailForAnalysis(name,box,id){
      return axios.get("/detail/"+name+"?box="+box+"&id="+id)
    },
    getDetailForDrawer(name,box){
      return axios.get("/detail/"+name+"?box="+box)
    }
};

