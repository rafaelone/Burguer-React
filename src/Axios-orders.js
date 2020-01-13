import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burguer-df7fe.firebaseio.com/',
});

export default instance;
