import axios from "axios";
import { Data } from '@type/type';

const baseURL = "http://localhost:9000";

export const getAllProducts = () => {
  return axios.get(`${baseURL}/products`)
}

export const getNormalProducts = () => {
  return axios.get(`${baseURL}/products?isVIP=false`)
}

export const getVipProducts = () => {
  return axios.get(`${baseURL}/products?isVIP=true`)
}

export const updateStock = (id: number, data: Data) => {
  return axios.put(`${baseURL}/products/${id}`, { ...data })
}

export const updatePurchase = (data: { id: number, quantity: number }) => {
  return axios.post(`${baseURL}/purchase`, { ...data })
}
