import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import './CheckoutSummary'

const checkoutSummary = ({ingredients}) => {

  return (
    <div className="">
      <h1>We hope it tastes well!!</h1>
      <div style={{
        width: "100%",
        height:300,
        margin: 'auto'
      }}>
        <Burger ingredients={ingredients}/>
      </div>
      <Button btnType="danger" clicked>CANCEL</Button>
      <Button btnType="success" clicked>CONTINUE</Button>
    </div>
  );

}

export default checkoutSummary;