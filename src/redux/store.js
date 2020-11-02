import { applyMiddleware, combineReducers, createStore } from "redux";
import { signUpReducer } from "./signUp/reducer";
import { signUpMiddleware } from "./signUp/middlewares";
import {composeWithDevTools} from "redux-devtools-extension";

const middlewares = [signUpMiddleware];

const rootReducer = combineReducers({
  signUp: signUpReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export { store };
