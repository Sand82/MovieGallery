import { boolValidator } from "./BoolValidator.js";

export const title = (currTitle) => boolValidator(currTitle, 2, 100);

export const category = (currCategory) => boolValidator(currCategory, 2, 50);

export const image = (currImage) => boolValidator(currImage, 5, 300);

export const duration = (currDuration) => boolValidator(currDuration, 2, 20);

export const description = (currDescription) =>
  boolValidator(currDescription, 10, 500);

export const year = (currYear) => {
  if (currYear.length === 4) {
    return false;
  } else {
    return true;
  }
};
