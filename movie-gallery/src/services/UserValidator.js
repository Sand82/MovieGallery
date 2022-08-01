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