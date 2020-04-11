import apisauce from "apisauce";
import AppConfig from "../Config/AppConfig";

// ------------ Auxillary Functions ------------ //

const authPrefix = "Bearer";

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

  const authApi = token => {
    api.setHeader("Authorization", `${authPrefix} ${token}`);
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
