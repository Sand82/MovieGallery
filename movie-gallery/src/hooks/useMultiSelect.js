import { useState } from "react";

export const useMultiSelect = (defaultOptions, validationMessage) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
  const [error, setError] = useState("");

  const changeHandler = (selected) => {
    setSelectedOptions(selected);

    if (!selected || selected.length === 0) {
      setError(validationMessage);
    } else {
      setError("");
      // const selectedIds = selected.map((opt) => opt.value);
      // const selectedNames = selected.map((opt) => opt.label);
      // console.log('Selected IDs:', selectedIds);
      // console.log('Selected Names:', selectedNames);
    }
  };

  return {
    selectedOptions,
    error,
    changeHandler,
  };
};
