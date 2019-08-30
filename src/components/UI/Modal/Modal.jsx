import React from 'react'
import './Modal.css'

const modal = ({show, children}) => (
  <div className="modal" style={{
    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: show ? '1' : 0
  }}>
    {children}
  </div>
);

export default modal;