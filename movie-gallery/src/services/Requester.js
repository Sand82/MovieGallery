export const request = async (method, url, data, token) => {
    try {
        let buildRequest;
        let headers = {};       

        if (token) {           
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (method === 'GET') {
            buildRequest = fetch(url);
        }else {
            buildRequest = fetch(url,{ 
               method,
               headers : {
                ...headers,
                "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
            })
        }        
        const response = await buildRequest;

        const result = await response.json();

        if (!response.ok) {
           return 'Bad response';
        }

        return result;
       
    } catch (error) {
        throw console.error(error.error);
    } 
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const put = request.bind({}, 'PUT');
export const patch = request.bind({}, 'PATCH');
export const del = request.bind({}, 'DELETE');