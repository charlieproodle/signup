import { takeLatest, all } from "redux-saga/effects";
// import "regenerator-runtime/runtime";
import API from "../Services/Api";

/* ------------- Types ------------- */

import { AuthTypes } from "../Redux/AuthRedux";

/* ------------- Sagas ------------- */

import {
  loginSaga,
  signupSaga,
  authSaga
} from "./Workers";


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([takeLatest(AuthTypes.LOGIN_REQUEST, loginSaga, api)]);
  yield all([takeLatest(AuthTypes.SIGNUP_REQUEST, signupSaga, api)]);
  yield all([takeLatest(AuthTypes.AUTH_CHECK_REQUEST, authSaga, api)]);
}
