import * as request from "./Requester.js";

const baseUrl = "https://localhost:7222/api/movies";

export const getAll = () => {
  return request.get(baseUrl);
};

export const create = async (data, token) => {
  return request.post(baseUrl, data, token )
};

export const edit = async(data, token) => {
  return request.put(`${baseUrl}/${data.id}`, data, token)
}

export const remove = async (movieId, token) => {
  let data = {};
  return request.del(`${baseUrl}/${movieId}`, data ,token )
};
