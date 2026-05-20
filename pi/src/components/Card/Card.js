import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Card(props) {
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        let storage = localStorage.getItem("favPeliculas");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let existe = storageParseado.filter(fav => fav.id === props.data.id).length > 0;
            setEsFavorito(existe);
        }
    }, []);

    function toggleDescripcion() {
        setMostrarDescripcion(!mostrarDescripcion);
    }

    function agregarFavorito() {
        let storage = localStorage.getItem("favPeliculas");
        if (storage === null) {
            let primerFav = [props.data];
            localStorage.setItem("favPeliculas", JSON.stringify(primerFav));
        } else {
            let storageParseado = JSON.parse(storage);
            storageParseado.push(props.data);
            localStorage.setItem("favPeliculas", JSON.stringify(storageParseado));
        }
        setEsFavorito(true);
    }

    function quitarFavorito() {
        let storage = localStorage.getItem("favPeliculas");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let nuevosFavoritos = storageParseado.filter(fav => fav.id !== props.data.id);
            localStorage.setItem("favPeliculas", JSON.stringify(nuevosFavoritos));
        }
        setEsFavorito(false);
    }

    let { id, title, name, overview, poster_path } = props.data;
    let nombre;
    if (title) {
        nombre = title;
    } else {
        nombre = name;
    }

    return (
        <article className={props.cardClass}>
            <img
                src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                className="card-img-top"
                alt={nombre}
            />

            <div className="cardBody">
                <h5 className="card-title">{nombre}</h5>

                <button
                    className="btn btn-secondary btn-sm mb-2"
                    onClick={() => toggleDescripcion()}
                >
                    {mostrarDescripcion ? "Ocultar descripción" : "Ver descripción"}
                </button>

                <p className={mostrarDescripcion ? "card-text" : "card-text oculta"}>
                    {overview}
                </p>

                <Link to={`/detail/${props.data.type}/${id}`} className="btn btn-primary mr-2">
                    Ir al detalle
                </Link>

                {cookies.get("sesion") ? (
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => esFavorito ? quitarFavorito() : agregarFavorito()}
                    >
                        {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                    </button>
                ) : null}
            </div>
        </article>
    );
}

export default Card;