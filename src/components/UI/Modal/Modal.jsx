import React, { Component } from 'react'
import Auxi from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'

class Modal extends Component {
  
  constructor(props){
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show ||  nextProps.children !== this.props.children;
  }

  render(){
    const { show, children, modalClosed } = this.props;
    return (
      <Auxi>
        <Backdrop show={show} clicked={modalClosed}/>
        <div className="modal" style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : 0
        }}>
          {children}
        </div>
      </Auxi>
    );
  }
}

export default Modal;