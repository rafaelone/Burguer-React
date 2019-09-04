import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary';

const checkoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => (
  <div className="">
    <h1>We hope it tastes well!!</h1>
    <div style={{
      width: '100%',
      height: 300,
      margin: 'auto',
    }}
    >
      <Burger ingredients={ingredients} />
    </div>
    <Button
      btnType="danger"
      clicked={checkoutCancelled}
    >
CANCEL

    </Button>
    <Button btnType="success" clicked={checkoutContinued}>CONTINUE</Button>
  </div>
);

export default checkoutSummary;
