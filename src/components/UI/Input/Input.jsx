import React from 'react';
import './Input.css';

const input = (props) => {
  let inputElement = null;
  switch (props.inputyype) {
    case 'input':
      inputElement = <input className="inputElement" {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea className="inputElement" {...props} />;
      break;
    default:
      inputElement = <input className="inputElement" {...props} />;
  }
  return (
    <div className="input">
      <label className="label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
