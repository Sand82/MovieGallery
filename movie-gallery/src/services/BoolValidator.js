export const boolValidator = (value, minValue, maxValue) =>
    value.length <= minValue || value.length > maxValue
