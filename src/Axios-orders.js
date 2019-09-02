import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-535d8.firebaseio.com/'
});

export default instance;