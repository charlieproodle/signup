import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  logout: null,
  loginRequest: ["data", "history"],
  loginSuccess: ["payload"],
  loginFailure: ["error"],
  signupRequest: ["data"],
  signupSuccess: ["payload"],
  signupFailure: ["error"],
  authCheckRequest: ["data"],
  authCheckSuccess: ["payload"],
  authCheckFailure: ["failure"]
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  accessToken: null,
  refreshToken: null,
  userId: null,
  username: null,
  fetching: false,
  error: null,
  isLoggedIn: false,
});

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getAccessToken: state => state.auth.accessToken,
  getRefreshToken: state => state.auth.refreshToken,
  getAuthError: state => state.auth.error,
  getUser: state => state.auth.user,
  isLoggedIn: state => state.auth.isLoggedIn,
};

/* ------------- Reducers ------------- */

export const logout = state => 
  state.merge({ fetching: true });


export const loginRequest = state => state.merge({ fetching: true });

export const loginSuccess = (state, {payload}) =>
  state.merge({
    fetching: false,
    error: null,
    accessToken: payload.tokens.access,
    refreshToken: payload.tokens.refresh,
    userId: payload.user_details.id,
    username: payload.user_details.username,
    isLoggedIn: true
  });

export const loginFailure = (state, action) =>
  state.merge({ fetching: false, error: action.error, isLoggedIn: false });

export const signupRequest = state => state.merge({ fetching: true });

export const signupSuccess = (state, action) =>
  state.merge({
    fetching: false,
    error: null,
    accessToken: action.payload.tokens.access,
    refreshToken: action.payload.tokens.refresh,
    user: action.payload.user_details,
    isLoggedIn: true
  });

export const signupFailure = (state, action) =>
  state.merge({ fetching: false, error: action.error, isLoggedIn: false });

export const authCheckRequest = (state, action) => {
  return state.merge({ fetching: true });
}

export const authCheckSuccess = (state, { payload }) => {
  const {
    tokens, user 
  } = payload;
  return state.merge({
    fetching: false,
    error: null,
    user: user,
    tokens: tokens,
    isLoggedIn: true
  });
};

export const authCheckFailure = (state, action) =>
  state.merge({ fetching: false, error: action.error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGOUT]: logout,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
  [Types.AUTH_CHECK_REQUEST]: authCheckRequest,
  [Types.AUTH_CHECK_SUCCESS]: authCheckSuccess,
  [Types.AUTH_CHECK_FAILURE]: authCheckFailure
});