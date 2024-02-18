import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
