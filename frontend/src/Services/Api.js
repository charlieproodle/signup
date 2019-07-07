import apisauce from "apisauce";
import AppConfig from "../Config/AppConfig";

// ------------ Auxillary Functions ------------ //

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

  // ------------ Exports ------------ //

  return {
    loginApi,
    signupApi
  };
};

export default {
  create
};
