export const title = (currTitle) => {
    if (currTitle.length <= 2 || currTitle.length > 100) {
        return true;
      } else {
        return false;
      }
}

export const category = (currCategory) => {
    if (currCategory.length <= 2 || currCategory.length > 50) {
        return true;
      } else {
        return false;
      }
}

export const year = (currYear) => {
    if (currYear.length === 4 ) {
        return false;
      } else {
        return true;
      }
}

export const image = (currImage) => {
    if (currImage.length <= 5 || currImage.length > 300) {
        return true;
      } else {
        return false;
      }
}

export const duration = (currDuration) => {
    if (currDuration.length <= 2 || currDuration.length > 20) {
        return true;
      } else {
        return false;
      }
}

export const description = (currDescription) => {
    if (currDescription.length <= 10 || currDescription.length > 500) {
        return true;
      } else {
        return false;
      }
}