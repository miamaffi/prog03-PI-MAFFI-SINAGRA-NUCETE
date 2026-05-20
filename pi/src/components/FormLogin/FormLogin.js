import React, { useState } from "react";
import Cookies from "universal-cookie";
import "../FormRegister/Form.css";

function FormLogin(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function controlarCambios(evento) {
        if (evento.target.name === "email") {
            setEmail(evento.target.value);
        } else if (evento.target.name === "password") {
            setPassword(evento.target.value);
        }
    }

    function enviarFormulario(evento) {
        evento.preventDefault();

        let usersStorage = localStorage.getItem("users");

        if (usersStorage === null) {
            setError("Las credenciales ingresadas son inválidas");
            return;
        }

        let usersParseado = JSON.parse(usersStorage);

        let usersFiltrado = usersParseado.filter((user) => {
            return user.email === email;
        });

        if (usersFiltrado.length === 0) {
            setError("El usuario ingresado no existe");
            return;
        }

        if (usersFiltrado[0].password !== password) {
            setError("Las credenciales ingresadas son inválidas");
            return;
        }

        const cookies = new Cookies();
        cookies.set("sesion", email);

        props.history.push("/");
    }

    return (
        <div className="form-container">
            <form onSubmit={(evento) => enviarFormulario(evento)}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(evento) => controlarCambios(evento)}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(evento) => controlarCambios(evento)}
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
}

export default FormLogin;