import { call, put } from "redux-saga/effects";
import AuthActions from "../Redux/AuthRedux";

// --- Saga to log the user in --- //
export function* loginSaga(api, { data, resolve }) {
  const response = yield call(api.loginApi, data);
  if (response.ok) {
    if (response.data.tokens) {
      localStorage.setItem("access", response.data.tokens.access);
      localStorage.setItem("refresh", response.data.tokens.refresh);
    }
    yield put(AuthActions.loginSuccess(response.data));
    yield call(resolve.onSuccess)
  } else {
    yield put(AuthActions.loginFailure(response.data));
    yield call(resolve.onFailure, response.data);
  }
}

// --- Saga the sign the user up --- //
export function* signupSaga(api, { data, history, onError }) {
  const response = yield call(api.signupApi, data);
  if (response.ok) {
    localStorage.setItem("access", response.data.tokens.access);
    localStorage.setItem("refresh", response.data.tokens.refresh);
    yield put(AuthActions.signupSuccess(response.data));
    history.push({
      pathname: "/HomeScreen",
      state: { token: response.data.tokens.access },
    });
  } else {
    yield put(AuthActions.signupFailure(response.data));
    yield call(onError, response.data);
  }
}

export function* authSaga(api, action) {
  const { history, pathname, token } = action.data;
  const response = yield call(api.authApi, token);
  if (response.ok) {
    localStorage.setItem("access", response.data.tokens.access);
    localStorage.setItem("refresh", response.data.tokens.refresh);
    history.push(pathname);
    yield put(AuthActions.authCheckSuccess(response.data));
  } else {
    history.push("/");
    yield put(AuthActions.authCheckFailure(response.data));
  }
}
