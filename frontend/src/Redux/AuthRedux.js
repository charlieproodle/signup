import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ["data"],
  loginSuccess: ["payload"],
  loginFailure: ["error"],
  signupRequest: ["data"],
  signupSuccess: ["payload"],
  signupFailure: ["error"]
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
  isLoggedIn: false
});

/* ------------- Reducers ------------- */

export const loginRequest = state => state.merge({ fetching: true });

export const loginSuccess = (state, action) =>
  state.merge({
    fetching: false,
    error: null,
    accessToken: action.payload.tokens.access,
    refreshToken: action.payload.tokens.refresh,
    userId: action.payload.user_details.id,
    username: action.payload.user_details.username,
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
    userId: action.payload.user_details.id,
    username: action.payload.user_details.username,
    isLoggedIn: true
  });

export const signupFailure = (state, action) =>
  state.merge({ fetching: false, error: action.error, isLoggedIn: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure
});

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getAccessToken: state => state.auth.accessToken,
  getRefreshToken: state => state.auth.refreshToken,
  getAuthError: state => state.auth.error,
  getUserId: state => state.auth.userId,
  getUsername: state => state.auth.username,
  isLoggedIn: state => state.auth.isLoggedIn
};
