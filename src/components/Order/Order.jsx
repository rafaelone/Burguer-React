import React from 'react';
import './Order.css';

const order = (props) => {
  const ingredients = [];
  console.log(props);
  for (const ingredientName in props.ingredients) {
    ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] });
  }
  const ingredientOutput = ingredients.map((ig) => (
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px',
      }}
      key={ig.name}
    >
      {`${ig.name} (${ig.amount})`}
    </span>
  ));
  console.log(ingredientOutput);
  return (
    <div className="order">
      <p>
        Ingredients:
        {' '}
        {ingredientOutput}
      </p>
      <p>
Price
        {' '}
        <strong>
USD
          {' '}
          {Number.parseFloat(props.price).toFixed(2)}
        </strong>
      </p>
    </div>
  );
};

export default order;
