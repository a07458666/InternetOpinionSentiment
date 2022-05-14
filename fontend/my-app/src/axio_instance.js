import axios from "axios";
import Config from "./config.json";
const {API_URL,API_KEY} = Config
const instance = axios.create({
  baseURL: API_URL,
  headers: { 
      'Content-Type': 'application/json',
      'api-key' : API_KEY
  },
});
instance.interceptors.response.use(
    function (response) {
        const {status,error_msg,data,query_id} = response;
        switch (status) {
            case "error":
                return Promise.reject(new Error((error_msg != null) ? error_msg : "No ERROR MSG SHOW"))
            case "normal":
                return data;
            default:
                return response;
        }
    },
    function (error) {
      if (error.response){
        switch (error.response.status) {
          case 404:
            console.log("你要找的頁面不存在")
            // go to 404 page
            break
          case 500:
            console.log("程式發生問題")
            // go to 500 page
            break
          default:
            console.log(error.message)
        }
      } 
      if (!window.navigator.onLine) {
        alert("網路出了點問題，請重新連線後重整網頁");
        return;
      }
      return Promise.reject(error);
    }
);
export default instance