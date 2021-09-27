import {
  MODAL_SET_REQUEST,
  MODAL_SET_SUCCESS,
  MODAL_SET_FAIL,
  MODAL_SET_RESET,
} from "../constants/modalConstants";

export const modalSetReducer = (state = {}, action) => {
  switch (action.type) {
    case MODAL_SET_REQUEST:
      return { loading: true };
    case MODAL_SET_SUCCESS:
      return { loading: false, modal: action.payload };
    case MODAL_SET_FAIL:
      return { loading: false, error: action.payload };
    case MODAL_SET_RESET:
      return {};
    default:
      return state;
  }
};
