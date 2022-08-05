import { boolValidator } from './BoolValidator.js';

export const user = (username) => boolValidator(username, 2, 50);    

export const password = (pass) => boolValidator(pass, 5, 50); 
 
export const emailAddress = (currEmail) => {
   return !String(currEmail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}