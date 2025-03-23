export const formatData = (currentDate) => {
  const dataChange = new Date(currentDate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return dataChange;
};

export const cropText = (text, symbolsCount = 100) => {
  return text.substring(0, symbolsCount).concat("", "...");
};
