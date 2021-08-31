import React from "react";

const Message = ({ className, text }) => {
  return <div className={`message ${className}`}>{text}</div>;
};

export default Message;
