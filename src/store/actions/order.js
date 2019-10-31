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
      dispatch(purchaseBurguerSuccess(response.data, orderData));
    })
    .catch((error) => {
      dispatch(purchaseBurguerFail(error));
    });
};
