import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxi from '../../../hoc/Auxi'
import './SideDrawer.css'

const sideDrawer = props => {
  let attachedClasses = ['sideDrawer', 'close']
  if (props.open) {
    attachedClasses = ['sideDrawer', 'open']
  }
  return (
    <Auxi>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
          <Logo height="11%" bottom="32px"/>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxi>
  )
}

export default sideDrawer;