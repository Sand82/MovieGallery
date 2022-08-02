import * as request from "./Requester.js";

const baseUrl = 'https://localhost:7222/api/movies';

export const getAll = () => {
   return request.get(baseUrl)               
}