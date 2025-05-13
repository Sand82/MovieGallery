import * as request from "./Requester.js";

const baseUrl = "https://localhost:7222/api/comments";

const ratingUrl = "https://localhost:7222/api/ratings";

const favoriteUrl = "https://localhost:7222/api/favorites";

const staticDataUrl = "https://localhost:7222/api/StaticData";

export const createComment = async (data, token) => {
  return request.post(baseUrl, data, token);
};

export const editComment = async (data, token) => {
  return request.put(`${baseUrl}/${data.id}`, data, token);
};

export const removeComment = async (movieId, token) => {
  let data = {};
  return request.del(`${baseUrl}/${movieId}`, data, token);
};

export const addRating = async (data, token) => {
  return request.post(ratingUrl, data, token);
};

export const getRating = async (data, token) => {
  return request.put(ratingUrl, data, token);
};

export const addFavorite = async (data, token) => {
  return request.post(favoriteUrl, data, token);
};

export const getFavorite = async (data, token) => {
  return request.put(favoriteUrl, data, token);
};

export const getFavoriteMovies = async (userId) => {
  const encodedValue = encodeURIComponent(userId);
  return request.get(`${favoriteUrl}?userId=${encodedValue}`);
};

export const getStaticData = async () => {
  return request.get(staticDataUrl);
};
