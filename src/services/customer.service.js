// // Sitas failas suvalgo Spring endpointus ir leidzia naudoti funkcijose, pagal metodo pavadinimus
// import httpClient from "../http-common";

// const getAll = () => {
//   return httpClient.get("/customers");
// };

// const create = (data) => {
//   return httpClient.post("/customers", data);
// };

// const get = (id) => {
//   return httpClient.get(`/customers/${id}`);
// };

// const update = (data) => {
//   return httpClient.post(`/customers`, data);
// };

// // const update = (data, id) => {
// //   return httpClient.put(`/customers/${id}`, data);
// // };

// const remove = (id) => {
//   return httpClient.delete(`/customers/${id}`);
// };
// export default { getAll, create, get, update, remove };

import httpClient from "../http-common";
import authHeader from './auth-header';
import axios from 'axios';


const API_URL = 'http://localhost:8080/api/v1/';
const getAll = () => {
  return axios.get(API_URL + 'customers', { headers: authHeader() });
};

const create = (data) => {
  return axios.post(API_URL + 'customers', data, { headers: authHeader() });
};

const get = (id) => {
  return axios.get(API_URL + `customers/${id}`, { headers: authHeader() });
};

const update = (data) => {
  return axios.post(API_URL + 'customers', data, { headers: authHeader() });
};

// const update = (data, id) => {
//   return httpClient.put(`/customers/${id}`, data);
// };

const remove = (id) => {
  return axios.delete(API_URL + `customers/${id}`, { headers: authHeader() });
};
export default { getAll, create, get, update, remove };
