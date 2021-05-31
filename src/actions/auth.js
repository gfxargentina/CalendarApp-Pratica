import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";




export const startLogin = ( email, password ) => {
    return async(dispatch) => {
       // console.log(email, password)

       const resp = await fetchSinToken( 'auth', { email, password }, 'POST');
       const body = await resp.json();
       //console.log(body);

       //si el body.ok = true , grabo el token en el localStorage junto con el dia y la hora
       if ( body.ok ) {
           localStorage.setItem( 'token', body.token );
           localStorage.setItem( 'token-init-date', new Date().getTime() );

           dispatch( login({
                uid: body.uid,
                name: body.name
           }))
       } else {
           Swal.fire('Error', body.msg, 'error');

       }
    }
}

export const startRegister = ( name, email, password ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'auth/new', { name, email, password }, 'POST');
        const body = await resp.json();
       //console.log(body);

       //si el body.ok = true , grabo el token en el localStorage junto con el dia y la hora
       if ( body.ok ) {
           localStorage.setItem( 'token', body.token );
           localStorage.setItem( 'token-init-date', new Date().getTime() );

           dispatch( login({
                uid: body.uid,
                name: body.name
           }))
       } else {
           Swal.fire('Error', body.msg, 'error');

       }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken( 'auth/renew');
        const body = await resp.json();
       //console.log(body);

       //si el body.ok = true , grabo el token en el localStorage junto con el dia y la hora
       if ( body.ok ) {
           localStorage.setItem( 'token', body.token );
           localStorage.setItem( 'token-init-date', new Date().getTime() );

           dispatch( login({
                uid: body.uid,
                name: body.name
           }))
       } else {           
           dispatch( checkingFinish() );

       }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})


