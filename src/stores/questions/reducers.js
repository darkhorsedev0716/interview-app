import { QUESTIONS_LOADING, QUESTIONS_SET_DATA } from "./constants";
const initialState = {
  loading: false,
  questions: [],
};
export function questionReducer(state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case QUESTIONS_SET_DATA:
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
}
