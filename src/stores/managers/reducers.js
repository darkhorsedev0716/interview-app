import { MANAGERS_LOADING, MANAGERS_SET_DATA } from "./constants";
const initialState = {
  loading: false,
  managers: [],
};
export function managersReducer(state = initialState, action) {
  switch (action.type) {
    case MANAGERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case MANAGERS_SET_DATA:
      return {
        ...state,
        managers: action.payload,
      };
    default:
      return state;
  }
}
