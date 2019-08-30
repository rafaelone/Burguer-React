import React from 'react'
import './Backdrop.css'

const backdrop = ({show, clicked}) => (
  show ? <div className="backdrop" onClick={clicked}></div> : null
)

export default backdrop;