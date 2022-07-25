const baseUrl = 'https://localhost:7222/api/movies';

export const getAll = () => {
   return fetch(baseUrl)
        .then(res => res.json())        
}