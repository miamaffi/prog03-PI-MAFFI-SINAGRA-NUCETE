import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "universal-cookie";
import "./Form.css";

const cookies = new Cookies();

function FormRegister(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    function controlarCambio(evento) {
        if (evento.target.name === "email") {
            setEmail(evento.target.value);
        } else if (evento.target.name === "password") {
            setPassword(evento.target.value);
        }
    }

    function onSubmit(evento) {
        evento.preventDefault();

        let usuarioACrear = {
            email: email,
            password: password,
            createdAt: Date.now()
        };

        if (password.length < 6) {
            setError("La contraseña debe tener mínimo 6 caracteres");
            return;
        }

        if (email.length < 6) {
            setError("Debe ingresar un correo electrónico válido");
            return;
        }

        let usersStorage = localStorage.getItem("users");

        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage);

            let usersFiltrado = usersParseado.filter((user) => user.email === email);

            if (usersFiltrado.length > 0) {
                setError("Ya existe un usuario con el email ingresado");
                return;
            } else {
                usersParseado.push(usuarioACrear);
                let usersEnJson = JSON.stringify(usersParseado);
                localStorage.setItem("users", usersEnJson);
            }
        } else {
            let usersInicial = [usuarioACrear];
            let usersEnJson = JSON.stringify(usersInicial);
            localStorage.setItem("users", usersEnJson);
        }

        cookies.set("sesion", email, { path: "/" });
        history.push("/");
    }

    return (
        <div className="form-container">
            <form onSubmit={(evento) => onSubmit(evento)}>
                {error !== "" ? (
                    <p className="alert alert-danger">{error}</p>
                ) : null}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(evento) => controlarCambio(evento)}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(evento) => controlarCambio(evento)}
                />

                <button type="submit" className="btn btn-primary">
                    Crear cuenta
                </button>
            </form>
        </div>
    );
}

export default FormRegister;