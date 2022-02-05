import React from "react";

const Loader = ({ text = "" }) => (
  <div className="loader">
    <div className="loader-text my-1">{text}</div>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
