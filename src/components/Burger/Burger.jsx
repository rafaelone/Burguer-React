import React from 'react'
import './Burger.css'
import Ingredients from './Ingredients/Ingredients'

const burger = props => {
  let transformIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <Ingredients key={igKey + i} type={igKey}/>
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, [])
  if(!transformIngredients.length){
    transformIngredients = <p>Please start adding ingredients!</p>
  }
  return (
    <div className="burger">
      <Ingredients type="bread-top"/>
      {transformIngredients}
      <Ingredients type="bread-bottom"/>
    </div>
  );
};

export default burger;