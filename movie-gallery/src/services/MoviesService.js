import * as request from "./Requester.js";

const baseUrl = "https://localhost:7222/api/movies";

export const getAll = () => {
  return request.get(baseUrl);
};

export const create = async (data, token) => {
  try {
    let response = fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return "Bad response";
    }

    return result;
  } catch (error) {
    throw console.error(error.error);
  }
};
