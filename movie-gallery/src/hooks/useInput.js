import { useEffect, useState } from "react";

export const useInput = (defaultValue, validationFn) => {
  const [value, setValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const changeHeandler = (e) => {
    setValue(e.target.value);
    setDidEdit(false);
  };

  const valioIsValid = validationFn(value);

  const inputBlurHeandler = () => {
    setDidEdit(true);
  };

  const resetValue = () => {
    setValue("");
  };

  return {
    value: value,
    changeHeandler,
    inputBlurHeandler,
    hasError: didEdit && !valioIsValid,
    resetValue,
  };
};