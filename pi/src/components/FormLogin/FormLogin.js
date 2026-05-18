import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../FormRegister/Form.css"

        // Creo la cookie de sesión
        const cookies = new Cookies();
        cookies.set("sesion", email);

function FormLogin(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const history = useHistory();


    


    function controlarCambio(evento) {
    if (evento.target.name === "email") {
        setEmail(evento.target.value);
    } else if (evento.target.name === "password") {
        setPassword(evento.target.value);
    }
}

    function enviarFormulario(evento) {
        evento.preventDefault();

        // Recupero los usuarios guardados en localStorage
        const usersStorage = localStorage.getItem("users");

        if (usersStorage === null) {
            setError("Las credenciales ingresadas son inválidas")
            return;
        }

        // Parseo el string a array de objetos
        const usersParseado = JSON.parse(usersStorage);

        // Busco si existe un usuario con el email ingresado
        let usersFiltrado = usersParseado.filter((user) => {
            return user.email === email;
        });

        if (usersFiltrado.length === 0) {
                setError("El usuario ingresado no existe")
            };
            return;
        }

        // Verifico si la password coincide con la guardada
        if (usersFiltrado[0].password !== password) {
            setError("Las credenciales ingresadas son inválidas");
            return;
        }

        // Redirijo al home
        history.push("/");
}
    

        return (

            <div className="form-container">
            <form onSubmit={enviarFormulario}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={controlarCambio}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={controlarCambio}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Iniciar sesión
                </button>

                {error !== "" ? (
                    <p className="text-danger mt-3">{error}</p>
                ) : null}
            </form>
            </div>
        );


export default FormLogin;