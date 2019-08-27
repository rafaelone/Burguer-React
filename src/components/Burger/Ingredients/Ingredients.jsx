import React from 'react'
import './Ingredients.css'

const ingredients = ({type}) => {
  let ingredient = null;
  switch(type){
    case('brand-bottom'):
      ingredient = <div className='breadBottom'></div>;
      break;
    case('bread-top'):
      ingredient = (
        <div className="breadTop">
          <div className="seeds1"></div>
          <div className="seeds2"></div>
        </div>
      );
      break;
    case('meat'):
      ingredient = <div className="meat"></div>;
      break;
    case('cheese'):
      ingredient = <div className="cheese"></div>;
      break;
    case('bacon'):
      ingredient = <div className="bacon"></div>;
      break;
    case('salad'):
      ingredient = <div className="salad"></div>;
      break;
    default: 
      ingredient = null;
  }
  return ingredient;
}

export default ingredients