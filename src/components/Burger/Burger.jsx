import React from 'react'
import './Burger.css'
import Ingredients from './Ingredients/Ingredients'

const burger = props => {
  return (
    <div className="burger">
      <Ingredients type="bread-top"/>
      <Ingredients type="bacon"/>
      <Ingredients type="cheese"/>
      <Ingredients type="meat"/>
      <Ingredients type="salad"/>
      <Ingredients type="bread-bottom"/>
    </div>
  );
};

export default burger;