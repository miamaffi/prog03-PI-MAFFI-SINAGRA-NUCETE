import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarDescripcion: false
        };
    }

    toggleDescripcion() {
        this.setState({
            mostrarDescripcion: !this.state.mostrarDescripcion
        });
    }

    render() {
        let { id, title, name, overview, poster_path, type } = this.props.data;
        let nombre = title || name;
        let imagen = `https://image.tmdb.org/t/p/w342${poster_path}`;

        return (
            <article className={this.props.cardClass}>
                <img src={imagen} className="card-img-top" alt={nombre} />

                <div className="cardBody">
                    <h5 className="card-title">{nombre}</h5>

                    <button
                        className="btn btn-secondary btn-sm mb-2"
                        onClick={() => this.toggleDescripcion()}
                    >
                        {this.state.mostrarDescripcion ? "Ocultar descripción" : "Ver descripción"}
                    </button>

                    <p className={this.state.mostrarDescripcion ? "card-text" : "card-text oculta"}>
                        {overview}
                    </p>

                    <Link to={`/detail/${type}/${id}`} className="btn btn-primary mr-2">
                        Ver más
                    </Link>

                    {/* El botón de favoritos solo aparece si existe la cookie de sesión - punto 3 consigna */}
                    {document.cookie.includes("sesion=") ? (
                    <button className="btn alert-primary">🩶 Favorito</button>
                    ) : null}
                </div>
            </article>
        );
    }
}

export default Card;