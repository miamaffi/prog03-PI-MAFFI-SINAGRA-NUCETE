import React, { Component } from "react";
import "./Loader.css";

class Loader extends Component {
    render() {
        return (
            <div className="loader-container">
                <p>Cargando...</p>
            </div>
        );
    }
}

export default Loader;