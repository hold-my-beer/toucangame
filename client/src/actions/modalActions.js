import {
  MODAL_SET_REQUEST,
  MODAL_SET_SUCCESS,
  MODAL_SET_FAIL,
} from "../constants/modalConstants";

export const setModal =
  ({ isVisible, text, buttons }) =>
  (dispatch) => {
    try {
      dispatch({ type: MODAL_SET_REQUEST });

      dispatch({
        type: MODAL_SET_SUCCESS,
        payload: {
          isVisible,
          text,
          buttons,
        },
      });
    } catch (error) {
      dispatch({
        type: MODAL_SET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
