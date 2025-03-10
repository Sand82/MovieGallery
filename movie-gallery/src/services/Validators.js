export const isNotEmpty = (value) => value.trim() !== "";

export const hasLength = (value, minLength, maxLength) =>
  value.length >= minLength && value.length <= maxLength;

export const minLength = (value, minLength) => value.length >= minLength;

export const isEqualToOtherValue = (value, otherValue) => value === otherValue;

export const isValidUrl = (value) => value && validateImageUrl(value);

export const isValidNumberValue = (value, limit) => +value >= limit;

export const isEmail = (value) => {
  let regex = new RegExp(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/);
  return regex.test(value);
};

const validateImageUrl = (url) => {
  return (
    url.endsWith(".png") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".jpg") ||
    url.endsWith(".gif")
  );
};
