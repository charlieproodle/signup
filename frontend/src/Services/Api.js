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

  const loginApi = ({ username, password }) => {
    return api.post("login/", {
      username,
      password
    });
  }  

  const signupApi = ({ username, password}) => {
    return api.post("signup/", {
      username,
      password
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
