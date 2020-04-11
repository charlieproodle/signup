import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  logout: null,

  loginRequest: ["data", "resolve"],
  loginSuccess: ["payload"],
  loginFailure: ["error"],

  signupRequest: ["data", "resolve"],
  signupSuccess: ["payload"],
  signupFailure: ["error"],

  authCheckRequest: ["data"],
  authCheckSuccess: ["payload"],
  authCheckFailure: ["failure"],

  changeName: ["data"],
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  user: {}
});

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getAccessToken: state => state.auth.accessToken,
  getRefreshToken: state => state.auth.refreshToken,
  getAuthError: state => state.auth.error,
  getUser: state => state.auth.user,
  getUsername: state => state.auth.username,
  isAuthenticated: state => state.auth.isAuthenticated,
  getName: state => state.auth.name,
};

/* ------------- Reducers ------------- */

export const changeName = (state, { data }) => {
  return state.merge({ name: data });
};

export const logout = state => state.merge({ fetching: true });

export const loginRequest = state => state.merge({ fetching: true });

export const loginSuccess = (state, { payload }) =>
  state.merge({
    accessToken: payload.access,
    refreshToken: payload.refresh,
    isAuthenticated: true,
  });

export const loginFailure = (state, action) =>
  state.merge({ fetching: false, error: action.error, isAuthenticated: false });

export const signupRequest = state => state.merge({ fetching: true });

export const signupSuccess = (state, { payload }) =>
  state.merge({
    accessToken: payload.access,
    refreshToken: payload.refresh,
    isAuthenticated: true,
  });

export const signupFailure = (state, action) =>
  state.merge({ fetching: false, error: action.error, isAuthenticated: false });

export const authCheckRequest = (state, action) => {
  return state.merge({ fetching: true });
};

export const authCheckSuccess = (state, { payload }) => {
  const { tokens, user } = payload;
  return state.merge({
    user: user,
    tokens: tokens,
    isAuthenticated: true,
  });
};

export const authCheckFailure = (state, action) =>
  state.merge({ fetching: false, error: action.error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_NAME]: changeName,
  [Types.LOGOUT]: logout,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
  [Types.AUTH_CHECK_REQUEST]: authCheckRequest,
  [Types.AUTH_CHECK_SUCCESS]: authCheckSuccess,
  [Types.AUTH_CHECK_FAILURE]: authCheckFailure,
});
