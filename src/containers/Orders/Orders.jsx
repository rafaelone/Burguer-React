import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../Axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount(){
    this.props.onFetchOrders()
  }

  render() {
    let orders = <Spinner />
    if(!this.props.loading){
      orders = this.props.orders.map(order => (
            <Order 
            
              key={order.id}
              ingredients={order.Ingredients}
              price={order.price}
            />
          ))      
    }
    return (
      <div style={{
        height: 'auto',
        overflow: 'auto',
        position: 'absolute',
        width: '100%'
      }}>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders: () => dispatch(actions.fetchOrders())
})

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

