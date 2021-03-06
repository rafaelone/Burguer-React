import React from 'react';
import './Burger.css';
import Ingredients from './Ingredients/Ingredients';

const burger = (props) => {
  let transformIngredients = Object.keys(props.ingredients).map((igKey) => [...Array(props.ingredients[igKey])].map((_, i) => <Ingredients key={igKey + i} type={igKey} />)).reduce((arr, el) => arr.concat(el), []);
  if (!transformIngredients.length) {
    transformIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className="burger">
      <Ingredients type="bread-top" />
      {transformIngredients}
      <Ingredients type="bread-bottom" />
    </div>
  );
};

export default burger;
