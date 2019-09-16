import React from 'react';
import './Button.css';

const button = (props) => (
  <button
    type="button"
    className={['button', props.btnType].join(' ')}
    disabled={props.disabled}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
