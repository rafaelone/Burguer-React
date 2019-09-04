import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  componentDidMount(){
    const { location } = this.props;
    const query = new URLSearchParams(location.search)
    const ingredients = {}
    for(let param of query.entries()){
      //['salad', '1']
      ingredients[param[0]] = +param[1]
    }
    this.setState({ingredients: ingredients})
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
        <Route path={`${match.path}/contact-data`} component={ContactData}/>
      </div>
    )
  }

}

export default Checkout;