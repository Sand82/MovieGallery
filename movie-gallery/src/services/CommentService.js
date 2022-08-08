import * as request from "./Requester.js";

const baseUrl = "https://localhost:7222/api/comments";

export const create = async (data, token) => {
    return request.post(baseUrl, data, token )
  };

export const edit = async (data, token) => {
  return request.put(`${baseUrl}/${data.id}`, data, token)
}

export const remove = async (movieId, token) => {
  let data = {};
  return request.del(`${baseUrl}/${movieId}`, data ,token );
}

export const addRating = async (data, token) => {
  return request.post('https://localhost:7222/api/ratings', data, token);
}

export const getRating = async(data, token) => {
  return request.put(`https://localhost:7222/api/ratings`, data, token);
}