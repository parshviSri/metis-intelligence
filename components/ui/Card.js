import React from "react";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
