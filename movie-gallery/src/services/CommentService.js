import * as request from "./Requester.js";

const baseUrl = "https://localhost:7222/api/comments";

export const create = async (data, token) => {
    return request.post(baseUrl, data, token )
  };

  export const edit = async (data, token, commentId) => {
    return request.put(`${baseUrl}/${commentId}`, data, token)
  }