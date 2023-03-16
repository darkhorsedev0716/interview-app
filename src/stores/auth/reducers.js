import { AUTH_LOADING, AUTH_SET_TOKEN, AUTH_LOGOUT } from "./constants";
const initialState = {
  loading: false,
  token: null,
  profile: {},
};
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        profile: action.payload.user,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        profile: {}
      };
    default:
      return state;
  }
}
