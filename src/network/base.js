import axios from 'axios';

export function BaseRequest(config){
  const instance = axios.create({
    baseURL:'http://localhost:3001',
    timeout:5000
  })
  return instance(config)
}