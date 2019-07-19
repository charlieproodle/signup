import { call, put } from "redux-saga/effects";
import AuthActions from "../Redux/AuthRedux";

// --- Saga to log the user in --- //
export function* loginSaga(api, action) {
  const { data, history } = action;
  const response = yield call(api.loginApi, data);
  if (response.ok) {

    if (response.data.tokens) {
      localStorage.setItem("access", response.data.tokens.access);
      localStorage.setItem("refresh", response.data.tokens.refresh);
    }

    history.push({
      pathname: "/Loading",
      state: { token: response.data.tokens.access}
    });
    yield put(AuthActions.loginSuccess(response.data));

  } else {
    yield put(AuthActions.loginFailure(response.data));
  }
}

// --- Saga the sign the user up --- //
export function* signupSaga(api, action){
  const response = yield call(api.signupApi, action.data)
  if(response.ok){
    localStorage.setItem("access", response.data.tokens.access);
    localStorage.setItem("refresh", response.data.tokens.refresh);
    yield put(AuthActions.signupSuccess(response.data));
  } else {
    yield put(AuthActions.signupFailure(response.data));
  }
}

export function* authSaga(api, action){
  const { history, pathname, token } = action.data;
  const response = yield call(api.authApi, token)
  if(response.ok){
    console.log("Response", response.data)
    localStorage.setItem("access", response.data.tokens.access);
    localStorage.setItem("refresh", response.data.tokens.refresh);
    history.push(pathname)
    yield put(AuthActions.authCheckSuccess(response.data));
  } else {
    history.push('/')
    yield put(AuthActions.authCheckFailure(response.data));
  }
}