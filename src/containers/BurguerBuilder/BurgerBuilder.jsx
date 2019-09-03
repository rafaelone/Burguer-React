import React, { Component } from 'react'
import Auxi from '../../hoc/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../Axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    }

    this.purchaseHandler = this.purchaseHandler.bind(this);
  }

  componentDidMount(){
    axios.get('https://react-burger-535d8.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data})
      }).catch(error => {
        this.setState({error: true})
      })
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

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // alert('You continue !')
    this.setState({loading: true})
    const order = {
      Ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Rafael',
        address: {
          street: 'TestStreet 1',
          zipCode: '31231',
          country: 'Brazil'
        },
        email: 'teste@teste.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false})
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false})
      })
  }

  render(){
    const { ingredients, loading } = this.state;

    const disableInfo = {
      ...this.state.ingredients
    }
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if(this.state.ingredients){
      burger = (
        <Auxi>
          <Burger ingredients={ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
            />
        </Auxi>
        );
        orderSummary =<OrderSummary 
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
    }
    
    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return(
      <Auxi>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxi>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)