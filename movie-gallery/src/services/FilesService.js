import * as request from "./Requester.js";

const baseUrl = "https://localhost:7222/api/Files";

export const getFile = async (fileName, accessToken) => {
  const url = `${baseUrl}${fileName}`;
  return request.get(url, null, accessToken, false, true);
};
