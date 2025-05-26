const ALLOWED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];

export const isNotEmpty = (value) => value.trim() !== "";

export const hasLength = (value, minLength, maxLength) =>
  value.length >= minLength && value.length <= maxLength;

export const minLength = (value, minLength) => value.length > minLength;

export const isEqualToOtherValue = (value, otherValue) => value === otherValue;

export const isEqualToExactLenght = (value, otherValue) =>
  value.length === otherValue;

export const isValidUrl = (value) => value && validateImageUrl(value);

export const isValidNumberValue = (value, limit) => +value >= limit;

export const hasLengthNumberValue = (value, minBound, maxBound) =>
  +value >= minBound && +value <= maxBound;

export const isEmail = (value) => {
  let regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regex.test(value.toLowerCase());
};

export const fileImageValidator = (fileType) => {
  return ALLOWED_FILE_TYPES.includes(fileType);
};

const validateImageUrl = (url) => {
  return (
    url.endsWith(".png") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".jpg") ||
    url.endsWith(".gif")
  );
};
