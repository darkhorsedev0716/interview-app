import { USERS_LOADING, USERS_SET_DATA } from "./constants";
const initialState = {
  loading: false,
  users: [],
};
export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case USERS_SET_DATA:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
