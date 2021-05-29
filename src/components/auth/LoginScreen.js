import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';




export const LoginScreen = () => {

    const dispatch = useDispatch();     

    //login
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        logEmail: 'charly@gmail.com',
        logPassword: '1234567'
    });

    const { logEmail, logPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(formLoginValues);

        dispatch( startLogin( logEmail, logPassword )  );
    }

    ///register
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        regName: 'luis',
        regEmail: 'charly@gmail.com',
        regPassword: '1234567',
        regPassword2: '1234567'
    });

    const { regName, regEmail, regPassword, regPassword2 } = formRegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();
        //console.log(formRegisterValues);
        if ( regPassword !== regPassword2 ) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }

        dispatch( startRegister( regName, regEmail, regPassword )  );
    }



    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="email"
                                className="form-control mb-2"
                                placeholder="Correo"
                                
                                name="logEmail"
                                value={ logEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Contraseña"
                                name="logPassword"
                                value={ logPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Nombre"
                                name="regName"
                                value={ regName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="Correo"
                                name="regEmail"
                                value={ regEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Contraseña"
                                name="regPassword"
                                value={ regPassword }
                                onChange={ handleRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Repita la contraseña"
                                name="regPassword2"
                                value={ regPassword2 }
                                onChange={ handleRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

