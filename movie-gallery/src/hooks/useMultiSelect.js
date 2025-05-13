import { useState } from "react";

export const useMultiSelect = (defaultOptions, validationMessage) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
  const [hasError, setHasError] = useState("");
  const [isTouched, setIsTouched] = useState(
    defaultOptions.length > 0 ? true : false
  );

  const changeHandler = (selected) => {
    setSelectedOptions(selected);
    setIsTouched(true);

    if (!selected || selected.length === 0) {
      setHasError(validationMessage);
    } else {
      setHasError("");
    }
  }; 

  return {
    selectedOptions,
    hasError,
    changeHandler,
    isTouched,
  };
};
