import React, { Component } from "react";
import Cookies from "universal-cookie";
import "../FormRegister/Form.css"

class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    controlarCambios(evento) {
        this.setState({
            [evento.target.name]: evento.target.value
        });
    }

    enviarFormulario(evento) {
        evento.preventDefault();

        // Recupero los usuarios guardados en localStorage
        let usersStorage = localStorage.getItem("users");

        if (usersStorage === null) {
            this.setState({
                error: "Las credenciales ingresadas son inválidas"
            });
            return;
        }

        // Parseo el string a array de objetos
        let usersParseado = JSON.parse(usersStorage);

        // Busco si existe un usuario con el email ingresado
        let usersFiltrado = usersParseado.filter((user) => {
            return user.email === this.state.email;
        });

        if (usersFiltrado.length === 0) {
            this.setState({
                error: "El usuario ingresado no existe"
            });
            return;
        }

        // Verifico si la password coincide con la guardada
        if (usersFiltrado[0].password !== this.state.password) {
            this.setState({
                error: "Las credenciales ingresadas son inválidas"
            });
            return;
        }

        // Creo la cookie de sesión
        const cookies = new Cookies();
        cookies.set("sesion", this.state.email);

        // Redirijo al home
        this.props.history.push("/");
    }

    render() {
        return (

            <div className="form-container">
            <form onSubmit={(evento) => this.enviarFormulario(evento)}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={(evento) => this.controlarCambios(evento)}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(evento) => this.controlarCambios(evento)}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Iniciar sesión
                </button>

                {this.state.error !== "" ? (
                    <p className="text-danger mt-3">{this.state.error}</p>
                ) : null}
            </form>
            </div>
        );
    }
}

export default FormLogin;