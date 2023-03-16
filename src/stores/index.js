
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer,autoRehydrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'

// Reducers imported
import { profileReducer } from "./profile/reducers";
import { authReducer } from "./auth/reducers";
import { categoryReducer } from "./categories/reducers";
import { questionReducer } from "./questions/reducers";
import { interviewReducer } from "./interviews/reducers";
import { candidateReducer } from "./candidates/reducers";
import { sharedInterviewReducer } from "./sharedInterviews/reducers";
import { managersReducer } from "./managers/reducers";
import { usersReducer } from "./users/reducers";

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  categories: categoryReducer,
  questions: questionReducer,
  interviews: interviewReducer,
  candidates: candidateReducer,
  sharedInterviews: sharedInterviewReducer,
  managers: managersReducer,
  users: usersReducer
});
// // Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method
  storage,
  // Merge two-levels deep.
  stateReconciler: autoMergeLevel2,
  // Whitelist (Save Specific Reducers)
  whitelist: ["auth"],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    
  ],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  let store = createStore(persistedReducer,composeWithDevTools(middleWareEnhancer))
  let persistor = persistStore(store)
  return { store, persistor }
}