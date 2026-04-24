import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Navbar.css";

class Navbar extends Component {
    render() {
        const cookies = new Cookies();
        const sesion = cookies.get("sesion");

        return (
            <nav>
                <ul className="nav nav-tabs my-4">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/movies">Películas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/series">Series</Link>
                    </li>

                    {sesion ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorites">Favoritas</Link>
                        </li>
                    ) :                         <>
                            <li className="nav-item ml-auto">
                                <Link className="nav-link" to="/register">Registro</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>}

                </ul>
            </nav>
        );
    }
}

export default Navbar;