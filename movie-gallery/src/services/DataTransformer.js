export const createFormData = (data, file) => {
  const formData = new FormData();

  formData.append("file", file);

  formData.append("data", JSON.stringify(data));

  return formData;
};
