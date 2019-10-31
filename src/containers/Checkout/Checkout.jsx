import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class Checkout extends Component {

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
    let summary = <Redirect to="/"/>
    if(this.props.ings){
      summary = (
        <div>
        <CheckoutSummary 
        ingredients={this.props.ings}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}
      />
      <Route path={`${match.path}/contact-data`} 
          component={ContactData}
          />
      </div>
      )
    }
      return summary
  }

}

const mapStateToProps = state => {
  return {
    ings: state.burguerBuilder.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout);