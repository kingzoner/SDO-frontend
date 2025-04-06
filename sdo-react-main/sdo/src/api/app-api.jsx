import axios from "axios";

export const appApiIns = axios.create(
    {
        baseURL : 'http://127.0.0.1:8000/',
        headers :{
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token') 
        }
    }
)

appApiIns.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );