import { convertFromHTML, ContentState } from "draft-js";

export const formatData = (currentDate) => {
  const dataChange = new Date(currentDate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return dataChange;
};

export const convertHtmlToContentState = (html) => {
  const blocksFromHTML = convertFromHTML(html);
  return ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
};

export const convertToOptions = (rawOptions) => {
  return rawOptions.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};

export const convertToEntity = (rawOptions) => {
  return rawOptions.map((item) => ({
    id: item.value,
    name: item.label,
  }));
};

export const cropText = (text, symbolsCount = 200) => {
  text = convertToPlaneText(text);

  let cropedText = text.substring(0, symbolsCount);
  let index = symbolsCount;

  while (text.charAt(index + 1) !== " " && index < text.length - 1) {
    cropedText += text.charAt(index);
    index++;
  }

  return cropedText.concat(text.charAt(index), "...");
};

export const multiSelectStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 2,
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 2,
  }),
};

export const arrayToString = (arr) => {
  return arr.map((obj) => obj.name).join(", ");
};

export const objectArrayToStringArray = (arr) => {
  return arr.map(item => item.name);
}

export const adjustMovieImageURL = (imageName) => {
  return `https://localhost:7222/images/${imageName}`
}

export const formatFileName = (filename, size = "1000x1600") => {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return null;
  } 

  const namePart = filename.slice(0, lastDotIndex).replace(/\s+/g, "-");
  const extension = filename.slice(lastDotIndex);

  return `${namePart}-${size}${extension}`; 
}

const convertToPlaneText = (text) => {
  text = text.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, "");
  text = text.replace(/<\/?[^>]+(>|$)/g, "");
  text = text.replace(/&nbsp;/gi, " ");

  return text.replace(/\s+/g, " ").trim();
};
