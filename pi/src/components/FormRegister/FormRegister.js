import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./Form.css";

const cookies = new Cookies();

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    controlarCambio(evento) {
        this.setState({ [evento.target.name]: evento.target.value });
    }

    onSubmit(evento) {
        evento.preventDefault();

        let usuarioACrear = {
            email: this.state.email,
            password: this.state.password,
            createdAt: Date.now()
        };

        if (this.state.password.length < 6) {
            this.setState({ error: "La contraseña debe tener mínimo 6 caracteres" });
            return;
        }

        if (this.state.email.length < 6) {
            this.setState({ error: "Debe ingresar un correo electrónico válido" });
            return;
        }

        let usersStorage = localStorage.getItem("users");

        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage);

            let usersFiltrado = usersParseado.filter((user) => user.email === this.state.email);

            if (usersFiltrado.length > 0) {
                this.setState({ error: "Ya existe un usuario con el email ingresado" });
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

        cookies.set("sesion", this.state.email, { path: "/" });
        this.props.history.push("/");
    }
    
    render() {
        return (
        
            <div className="form-container"  >
            <form onSubmit={(evento) => this.onSubmit(evento)}>
                {this.state.error !== "" ? (
                    <p className="alert alert-danger">{this.state.error}</p>
                ) : null}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(evento) => this.controlarCambio(evento)}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={this.state.password}
                    onChange={(evento) => this.controlarCambio(evento)}
                />

                <button type="submit" className="btn btn-primary">
                    Crear cuenta
                </button>
            </form>
            </div>
        );
    }
}

export default FormRegister;