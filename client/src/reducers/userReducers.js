import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_UPDATE_STATS_REQUEST,
  USER_UPDATE_STATS_SUCCESS,
  USER_UPDATE_STATS_FAIL,
  USER_SET_SOUND_VOLUME,
  USER_UPDATE_SETTINGS_REQUEST,
  USER_UPDATE_SETTINGS_SUCCESS,
  USER_UPDATE_SETTINGS_FAIL,
  USER_UPDATE_SETTINGS_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_UPDATE_STATS_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
    case USER_UPDATE_STATS_SUCCESS:
      return { loading: false, userInfo: action.payload };
    // case USER_UPDATE_STATS_SUCCESS:
    //   return {
    //     loading: false,
    //     userInfo: { ...state.userInfo, stats: action.payload },
    //   };
    case USER_LOGIN_FAIL:
    case USER_UPDATE_STATS_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_SETTINGS_REQUEST:
      return { loading: true };
    case USER_UPDATE_SETTINGS_SUCCESS:
    case USER_SET_SOUND_VOLUME:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_SETTINGS_FAIL:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_SETTINGS_RESET:
      return {};
    default:
      return state;
  }
};

// export const userListReducer = (state = { users: [] }, action) => {
//   switch (action.type) {
//     case USER_LIST_REQUEST:
//       return { loading: true, users: [] };
//     case USER_LIST_SUCCESS:
//       return { loading: false, users: action.payload };
//     case USER_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_LIST_RESET:
//       return { users: [] };
//     default:
//       return state;
//   }
// };

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return {};
    default:
      return state;
  }
};
