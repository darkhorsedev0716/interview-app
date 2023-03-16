import { SHARED_INTERVIEW_LOADING, SHARED_INTERVIEW_SET_DATA, SHARED_INTERVIEW_SET_DETAILS, SHARED_INTERVIEW_SET_BASIC_DETAILS } from "./constants";
const initialState = {
  loading: false,
  sharedInterviews: [],
  sharedInterview: {},
  basicDetails: {}
};
export function sharedInterviewReducer(state = initialState, action) {
  switch (action.type) {
    case SHARED_INTERVIEW_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SHARED_INTERVIEW_SET_DATA:
      return {
        ...state,
        sharedInterviews: action.payload,
      };
    case SHARED_INTERVIEW_SET_DETAILS:
      return {
        ...state,
        sharedInterview: action.payload,
      };
    case SHARED_INTERVIEW_SET_BASIC_DETAILS:
      return {
        ...state,
        basicDetails: action.payload,
      };
    default:
      return state;
  }
}
