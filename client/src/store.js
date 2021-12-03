import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userUpdateSettingsReducer,
} from "./reducers/userReducers";

import { gameGetReducer, gameUpdateTurnReducer } from "./reducers/gameReducers";

import { modalSetReducer } from "./reducers/modalReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateSettings: userUpdateSettingsReducer,
  userList: userListReducer,
  gameGet: gameGetReducer,
  gameUpdateTurn: gameUpdateTurnReducer,
  modalSet: modalSetReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { loading: false, userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
