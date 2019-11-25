import * as actionTypes from './actionTypes';
import axios from '../../Axios-orders';

export const purchaseBurguerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGUER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurguerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGUER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData) => (dispatch) => {
  purchaseBurgerStart();
  axios.post('/orders.json', orderData)
    .then((response) => {
      console.log(response.data);
      dispatch(purchaseBurguerSuccess(response.data.name, orderData));
    })
    .catch((error) => {
      dispatch(purchaseBurguerFail(error));
    });
};


export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});


export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersStart());
  axios.get('/orders.json')
    .then((res) => {
      const fetchedOrders = [];
      for (const key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((err) => {
      dispatch(fetchOrdersFail(err));
    });
};
