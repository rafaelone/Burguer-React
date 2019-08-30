import React from 'react';
import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Aux'

const orderSummary = props => {

const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>)

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A Delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout ?</p>
      <Button btnType="danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
}

export default orderSummary;