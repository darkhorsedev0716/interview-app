import { PROFILE_LOADING, PROFILE_SET_DATA } from "./constants";
const initialState = {
  loading: false,
  profile: {},
};
export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_SET_DATA:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
}
