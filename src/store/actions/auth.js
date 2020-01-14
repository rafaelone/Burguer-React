import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAILED,
  error,
});

export const auth = (email, password, isSignup) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCPaPLdnR1sSokse5-OLr5iz0_lGwVt_gU';
  if (!isSignup) {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCPaPLdnR1sSokse5-OLr5iz0_lGwVt_gU';
  }
  axios.post(url, authData)
    .then((response) => {
      console.log(response);
      dispatch(authSuccess(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
};
