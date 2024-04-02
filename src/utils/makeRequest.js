import Axios from "axios";
import { BASE_URL } from "../constants";
import getAccessToken from "./getAccessToken";
import { message, notification } from "antd";

const EN_US = "en-US,en;q=0.9";
const ORIGIN_AUTHORIZATION =
  "Origin, X-Requested-With, Authorization, Content-Type, Accept";
const APPLICATION_JSON = "application/json";
const MULTIPART_FORM = "multipart/form-data";

// Login url
let LOGIN_URL ="";
// LOGIN_URL ="https://qa.lumenore.com/api/";   //qa
// LOGIN_URL ="https://qa.testlume.in/api/";  // qa test
LOGIN_URL ="https://rsh.lumenore.com/api/";  // rsh      


if (process.env.NODE_ENV === "production") {
  // LOGIN_URL = window.location.origin + "/api/";

  LOGIN_URL ="https://rsh.lumenore.com/api/";  // rsh  added hardcoded as of now     

}

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error?.response?.status === 401 || error?.response?.data?.status?.code === 401) {
      notification.error({
        message: "User Unauthorized",
      });

      sessionStorage.clear();
      // window.location.reload(true);
    }

    if (error?.response?.data?.error) {
      message.error(error?.response?.data?.error_message);
    }

  }
);

export const computeVersion = () =>{
  return "rsh"   // hardecoded as of now 
  if(window.location.origin === "http://localhost:3000" || window.location.origin === "https://rsh.lumenore.com"){
    return "rsh"
  }else if(window.location.origin === "https://qa.lumenore.com" ||  window.origin === 'https://qa.testlume.in'){
    return "qa"
  }else{
    return ""
  }
}

export default {
  postAuth(url, data, file, extraHeaders) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "post",
        url: `${BASE_URL}${url}`,
        data: data,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "content-type": file ? MULTIPART_FORM : APPLICATION_JSON,
          "accept-language": EN_US,
          "version":computeVersion(),
          ...extraHeaders,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.status === 401) {
            console.log("session expires");
          } else {
            reject(error);
          }
        });
    });
  },

  getAuthLogin(url, data, extraHeaders) {  
    return new Promise((resolve, reject) => {
      Axios({
        method: "get",
        url: `${LOGIN_URL}${url}`,
        data: data,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "content-type": APPLICATION_JSON,
          "accept-language": EN_US,
          "version":computeVersion(),
          ...extraHeaders,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.status === 401) {
            console.log("session expires");
          } else {
            reject(error);
          }
        });
    });
  },

  postAuthLogin(url, data, file, extraHeaders) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "post",
        url: `${LOGIN_URL}${url}`,
        data: data,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "content-type": file  ? MULTIPART_FORM : APPLICATION_JSON,
          "accept-language": EN_US,
          "version":computeVersion(),
          ...extraHeaders,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.status === 401) {
            console.log("session expires");
          } else {
            reject(error);
          }
        });
    });
  },

  putAuth(url, data, file, extraHeaders) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "put",
        url: `${BASE_URL}${url}`,
        data: data,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "content-type": file ? MULTIPART_FORM : APPLICATION_JSON,
          "accept-language": EN_US,
          "version":computeVersion(),
          ...extraHeaders,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.status === 401) {
            console.log("session expires");
          } else {
            reject(error);
          }
        });
    });
  },

  deleteAuth(url, data, file, extraHeaders) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "delete",
        url: `${BASE_URL}${url}`,
        data: data,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "content-type": file ? MULTIPART_FORM : APPLICATION_JSON,
          "accept-language": EN_US,
          "version":computeVersion(),
          ...extraHeaders,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.status === 401) {
            console.log("session expires");
          } else {
            reject(error);
          }
        });
    });
  },
};
