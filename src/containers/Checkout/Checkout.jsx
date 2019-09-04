import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount(){
    const { location } = this.props;
    const query = new URLSearchParams(location.search)
    const ingredients = {}
    let price = 0;
    for(let param of query.entries()){
      //['salad', '1']
      if(param[0] === 'price'){
        price = param[1];
      }else{
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price})
  }

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  }

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data')
  }

  render(){
    const { match } = this.props;
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={`${match.path}/contact-data`} 
          render={(props) => (<ContactData {...props} ingredients={this.state.ingredients} 
          price={this.state.totalPrice}/>)}
          />
      </div>
    )
  }

}

export default Checkout;