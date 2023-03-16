import { INTERVIEWS_LOADING, INTERVIEWS_SET_DATA, INTERVIEWS_SET_DETAILS } from "./constants";
const initialState = {
  loading: false,
  openInterviews: [],
  closedInterviews: [],
  onHoldInterviews: [],
  interview: {}
};
export function interviewReducer(state = initialState, action) {
  switch (action.type) {
    case INTERVIEWS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case INTERVIEWS_SET_DATA:
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    case INTERVIEWS_SET_DETAILS:
      return {
        ...state,
        interview: action.payload,
      };
    default:
      return state;
  }
}
