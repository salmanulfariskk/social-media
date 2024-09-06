import axios from 'axios';
import store from '../app/store';
import { destroySession } from '../features/session/sessionReducer';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(response => response, error => {  
  if (error.response.status === 401 && error.response.data.code === 3101) {
    store.dispatch(destroySession())

    return Promise.reject(error)
  }

  return Promise.reject(error)
})

export default axiosInstance;

