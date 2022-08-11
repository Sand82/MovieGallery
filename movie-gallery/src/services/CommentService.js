import * as request from "./Requester.js";

const baseUrl = "https://localhost:7222/api/comments";

const ratingUrl = 'https://localhost:7222/api/ratings';

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
  return request.post(ratingUrl, data, token);
}

export const getRating = async(data, token) => {
  return request.put(ratingUrl, data, token);
}

export const addFavorite = async(data, token) => {
  return request.put('', data, token);
}