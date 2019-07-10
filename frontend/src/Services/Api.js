import apisauce from "apisauce";
import AppConfig from "../Config/AppConfig";

// ------------ Auxillary Functions ------------ //

const authPrefix = "Bearer";
var accessToken = localStorage.getItem("access");

const create = (baseURL = AppConfig.APIServer) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: "*/*"
    },
    timeout: 10000
  });

  // ------------ APIs ------------ //

  const loginApi = data => {
    return api.post("login/", {
      username: data.username,
      password: data.password
    });
  }  

  const signupApi = data => {
    return api.post("register/", {
      username: data.username,
      password: data.password
    })
  }

  const authApi = () => {
    api.setHeader("Authorization", `${authPrefix} ${accessToken}`);
    return api.get("auth/")
  }

  // ------------ Exports ------------ //

  return {
    loginApi,
    signupApi,
    authApi
  };
};

export default {
  create
};
