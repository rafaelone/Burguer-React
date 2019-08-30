import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component{
  constructor(props){
    super(props)
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    }

    this.purchaseHandler = this.purchaseHandler.bind(this);
  }

  updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
        .reduce((sum, el) => sum + el, 0) // feito reduce para numero total de ingredientes
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = type => {
    const oldCount  = this.state.ingredients[type]
    const updatedCounted = oldCount +1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updateIngredients})
    this.updatePurchaseState(updateIngredients)
  }

  removeIngredientHandler = type => {
    const oldCount  = this.state.ingredients[type]
    if(oldCount <= 0){
      return;
    }
    const updatedCounted = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updatedCounted;
    const pricededuction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - pricededuction;
    this.setState({totalPrice: newPrice, ingredients: updateIngredients})  
    this.updatePurchaseState(updateIngredients)
  }

  purchaseHandler () {
    this.setState({purchasing : true})
  }

  render(){
    const disableInfo = {
      ...this.state.ingredients
    }
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0
    }
    const { ingredients } = this.state;

    return(
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
          />
      </Aux>
    )
  }
}

export default BurgerBuilder