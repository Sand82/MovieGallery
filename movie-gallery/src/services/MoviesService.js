import * as request from "./Requester.js";

import { createFormData } from "../services/DataTransformer.js";

const baseUrl = "https://localhost:7222/api/movies";

export const getAll = (filters) => {
  return request.get(
    `${baseUrl}?search=${filters.search}&select=${filters.select}&sort=${filters.sort}&itemsPerPage=${filters.itemsPerPage}&currentPage=${filters.currentPage}`
  );
};

export const getOne = (movieId, userId, token) => {
  let data = {};
  return request.get(`${baseUrl}/${movieId}?userId=${userId}`, data, token);
};

export const create = async (dataInfo, token, file) => {
  let data = createFormData(dataInfo, file);
  console.log(data);
  return request.post(baseUrl, data, token, true);
};

export const edit = async (data, token) => {
  return request.put(`${baseUrl}/${data.id}`, data, token);
};

export const remove = async (movieId, token) => {
  let data = {};
  return request.del(`${baseUrl}/${movieId}`, data, token);
};
