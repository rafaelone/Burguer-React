import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux'
import './SideDrawer.css'

const sideDrawer = props => {
  let attachedClasses = ['sideDrawer', 'close']
  if (props.open) {
    attachedClasses = ['sideDrawer', 'open']
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
          <Logo height="11%" bottom="32px"/>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer;