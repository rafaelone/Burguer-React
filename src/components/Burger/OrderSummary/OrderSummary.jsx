import React from 'react';
import Button from '../../UI/Button/Button';
import Auxi from '../../../hoc/Auxi';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey) => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
:
        {' '}
        {props.ingredients[igKey]}
      </li>
    ));

  return (
    <Auxi>
      <h3>Your Order</h3>
      <p>A Delicious burger with the following ingredients:</p>
      <ul style={{ listStyle: 'none' }}>
        {ingredientSummary}
      </ul>
      <p>
        <strong>
Total Price:
          {' '}
          {props.price.toFixed(2)}
        </strong>
        {' '}
      </p>
      <p>Continue to Checkout ?</p>
      <Button btnType="danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Auxi>
  );
};

export default orderSummary;
