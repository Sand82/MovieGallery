const request = async (
  method,
  url,
  data,
  token,
  useFormData = false,
  isBinary = false
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

    if (!response.ok) {
      let errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return isBinary ? await response.blob() : await response.json();
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
