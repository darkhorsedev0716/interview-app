import { CANDIDATES_LOADING, CANDIDATES_SET_DATA, CANDIDATES_SET_DETAILS } from "./constants";
const initialState = {
  loading: false,
  openCandidates: [],
  closedCandidates: [],
  onHoldCandidates: [],
  candidate: {}
};
export function candidateReducer(state = initialState, action) {
  switch (action.type) {
    case CANDIDATES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CANDIDATES_SET_DATA:
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    case CANDIDATES_SET_DETAILS:
      return {
        ...state,
        candidate: action.payload,
      };
    default:
      return state;
  }
}
