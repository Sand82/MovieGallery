import * as request from "./Requester.js";

const baseUrl = 'https://localhost:7222/api/movies';

export const getAll = () => {
   return request.get(baseUrl)               
}

export const create = (data, token) => {

   fetch(baseUrl,{ 
      method: 'POST',
      headers : {
       "Content-Type": "application/json",
       'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
   })
   .then(res => {
      console.log(res);
   })

   
   return request.post(baseUrl, data);
}
