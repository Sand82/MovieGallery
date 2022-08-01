export const user = (username) => {
    if (username.length <= 2 || username.length > 50) {
      return true;
    } else {
      return false;
    }
  };

export const password = (pass) => {
    if (pass.length <= 5 || pass.length > 50) {
        return true;
    } else {
        return false;
    }
}

export const emailAddress = (currEmail) => {
   return !String(currEmail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}