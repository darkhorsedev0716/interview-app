import { CATEGORIES_LOADING, CATEGORIES_SET_DATA } from "./constants";
const initialState = {
  loading: false,
  categories: [],
};
export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CATEGORIES_SET_DATA:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}
