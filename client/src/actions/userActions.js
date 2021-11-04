import axios from "axios";
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
  USER_UPDATE_STATS_REQUEST,
  USER_UPDATE_STATS_SUCCESS,
  USER_UPDATE_STATS_FAIL,
  USER_LIST_RESET,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });

  dispatch({ type: USER_REGISTER_RESET });

  dispatch({ type: USER_LIST_RESET });
};

// export const listUsers = (users, userId) => (dispatch) => {
//   try {
//     dispatch({ type: USER_LIST_REQUEST });

//     const index = users.map((user) => user.id).indexOf(userId);

//     const sortedUsers = [...users.filter((user) => user.id !== userId)];

//     if (index !== -1) {
//       sortedUsers.unshift(users[index]);
//     }

//     dispatch({
//       type: USER_LIST_SUCCESS,
//       payload: sortedUsers,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_LIST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const listUsers = (users, userId) => (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    let groupUsers = [];
    let freeUsers = [];

    if (users.length !== 0) {
      const index = users.map((user) => user.id).indexOf(userId);
      const groupId = users[index].groupId || "";

      if (!groupId) {
        // freeUsers = [...users.filter((user) => user.id !== userId)];

        // if (index !== -1) {
        //   freeUsers.unshift(users[index]);
        // }

        users.forEach((user) => {
          if (user.id === userId) {
            freeUsers.unshift(user);
          } else if (!user.groupId) {
            freeUsers.push(user);
          }
        });
      } else {
        users.forEach((user) => {
          if (user.id === userId) {
            groupUsers.unshift(user);
          } else if (user.groupId && user.groupId === groupId) {
            groupUsers.push(user);
          } else if (!user.groupId) {
            freeUsers.push(user);
          }
        });
      }
    }

    const finalUsers = {
      groupUsers,
      freeUsers,
    };

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: finalUsers,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStats = (stats) => (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_STATS_REQUEST });

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    userInfo.stats = stats;

    dispatch({
      type: USER_UPDATE_STATS_SUCCESS,
      payload: userInfo,
    });

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
