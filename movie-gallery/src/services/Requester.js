export const request = async (
  method,
  url,
  data,
  token,
  useFormData = false
) => {
  try {
    let headers = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let options = {
      method,
      headers,
    };

    if (method !== "GET") {
      if (useFormData) {
        options.body = data;
      } else {
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
      }
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || `HTTP error! Status: ${response.status}`
      );
    }

    return result;
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error;
  }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const put = request.bind({}, "PUT");
export const patch = request.bind({}, "PATCH");
export const del = request.bind({}, "DELETE");
