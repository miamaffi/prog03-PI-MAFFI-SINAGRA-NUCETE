import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarDescripcion: false,
            esFavorito: false
        };
    }

    componentDidMount() {
        // Al montar la card reviso si ya está en favoritos en el localStorage
        let storage = localStorage.getItem("favPeliculas");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let existe = storageParseado.filter(fav => fav.id === this.props.data.id).length > 0;
            this.setState({ esFavorito: existe });
        }
    }

    toggleDescripcion() {
        this.setState({ 
            mostrarDescripcion: !this.state.mostrarDescripcion /* !cambiá el valor al contrario */
        });
    }

    agregarFavorito() {
        let storage = localStorage.getItem("favPeliculas");
        if (storage === null) {
            // Si no existe todavía el array en localStorage lo creo con este elemento
            let primerFav = [this.props.data];
            localStorage.setItem("favPeliculas", JSON.stringify(primerFav));
        } else {
            // Si ya existe lo parseo, agrego el elemento y lo guardo de nuevo
            let storageParseado = JSON.parse(storage);
            storageParseado.push(this.props.data);
            localStorage.setItem("favPeliculas", JSON.stringify(storageParseado));
        }
        this.setState({ esFavorito: true });
    }

    quitarFavorito() {
        let storage = localStorage.getItem("favPeliculas");
        if (storage !== null) {
            // Parseo, filtro sacando este elemento y guardo de nuevo
            let storageParseado = JSON.parse(storage);
            let nuevosFavoritos = storageParseado.filter(fav => fav.id !== this.props.data.id);
            localStorage.setItem("favPeliculas", JSON.stringify(nuevosFavoritos));
        }
        this.setState({ esFavorito: false });
    }

    render() {
        let { id, title, name, overview, poster_path } = this.props.data;
        let nombre = title || name;
        return (
            <article className={this.props.cardClass}>
                <img
                    src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                    className="card-img-top"
                    alt={nombre}
                />

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

                    <Link to={`/detail/${this.props.data.type}/${id}`} className="btn btn-primary mr-2">
                        Ir al detalle
                    </Link>

                    {/* El botón de favoritos solo aparece si existe la cookie de sesión */}
                    {cookies.get("sesion") ? (
                     <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.state.esFavorito ? this.quitarFavorito() : this.agregarFavorito()}
                        >
                      {/* Cambio el texto del botón según si ya es favorito o no */}
                    {this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                    </button>
                    ) : null}
                </div>
            </article>
        );
    }
}

export default Card;
