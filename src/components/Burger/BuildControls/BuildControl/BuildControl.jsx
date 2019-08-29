import react from 'react'
import './buildControl.css'
const buildControl = props => (
  <div className="buildControl">
    <div className="label">
      {props.label}
    </div>
    <button className="less">-</button>
    <button className="more">+</button>
  </div>
)

export default buildControl;