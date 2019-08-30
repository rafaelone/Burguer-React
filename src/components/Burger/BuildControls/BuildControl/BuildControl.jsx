import React from 'react'
import './BuildControl.css'
const buildControl = ({added, label, removed, disabled}) => (
  <div className="buildControl">
    <div className="label">
      {label}
    </div>
    <button className="less" onClick={removed} disabled={disabled}>-</button>
    <button className="more" onClick={added}>+</button>
  </div>
)

export default buildControl;