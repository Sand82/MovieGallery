export const formatData = (currentDate) => {
  const dataChange = new Date(currentDate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return dataChange;
};

export const cropText = (text, symbolsCount = 200) => {
  text = convertToPlaneText(text);
  return text.substring(0, symbolsCount).concat("", "...");
};

const convertToPlaneText = (text) => {
  text = text.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, "");
  text = text.replace(/<\/?[^>]+(>|$)/g, "");
  text = text.replace(/&nbsp;/gi, " ");

  return text.replace(/\s+/g, " ").trim();
};
