import * as request  from "./Requester.js";

const baseUrl = 'https://localhost:7222/api/users'

export const login = (data) => {
  return request.post(`${baseUrl}/login`, data);        
};

export const register = (data) => {
  return request.post(`${baseUrl}/register`, data);
}