import React from 'react'
import './BuildControl.css'
const buildControl = ({added, label}) => (
  <div className="buildControl">
    <div className="label">
      {label}
    </div>
    <button className="less">-</button>
    <button className="more" onClick={added}>+</button>
  </div>
)

export default buildControl;