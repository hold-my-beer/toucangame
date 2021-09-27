import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_SET_RESET } from "../constants/modalConstants";

const Modal = () => {
  const dispatch = useDispatch();
  const modalSet = useSelector((state) => state.modalSet);
  const { loading, error, modal } = modalSet;

  return (
    <>
      {!loading && !error && modal && (
        <div className={`modal ${modal.isVisible ? "visible" : ""}`}>
          <p className="lead text-center">{modal.text}</p>
          <div className="modalButtons">
            {modal.buttons.map((item, index) => (
              <button
                key={index}
                className={`btn btn-${item.className} modalBtn`}
                onClick={(e) => {
                  item.clickHandler();
                  dispatch({ type: MODAL_SET_RESET });
                }}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
