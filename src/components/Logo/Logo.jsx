import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import './Logo.css'
const logo = props => (
  <div className="logo" style={{height: props.height, marginBottom: props.bottom}}>
    <img src={burgerLogo} alt="MyBurger"/>
  </div>
);

export default logo;