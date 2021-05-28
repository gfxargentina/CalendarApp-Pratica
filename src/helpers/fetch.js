
const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = ( endpoint, data, method = 'GET') => {
    
    const url =`${ baseUrl }/${ endpoint }`;

    //si el method es igual a get hacer el fetch al url
    if ( method === 'GET ') {
        return fetch( url );
     
     //si el method no es get, hacer el fetch del metodo mandado, post, put, delete etc   
    }else {
        return fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        })
    }
}

export {
    fetchSinToken
}