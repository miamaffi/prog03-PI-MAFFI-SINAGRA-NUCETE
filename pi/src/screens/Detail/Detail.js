import React, { Component } from "react";

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contenido: null
        };
    }

    componentDidMount() {
        // Tomo el type y el id de la URL, igual que en la práctica con el id del personaje
        const { type, id } = this.props.match.params;
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=es-ES`)
            .then(res => res.json())
            .then(data => {
                this.setState({ contenido: data });
            })
            .catch(error => console.log(error));
    }

    render() {
        // Mientras no llegaron los datos muestro texto de carga
        if (this.state.contenido === null) {
            return <h2>Cargando...</h2>;
        }

        // Las películas tienen "title", las series tienen "name"
        const {
            title, name, overview, poster_path,
            vote_average, release_date, first_air_date,
            runtime, genres
        } = this.state.contenido;

        const nombre = title || name;
        // Las películas tienen release_date, las series tienen first_air_date
        const fecha = release_date || first_air_date;

        return (
            <section className="cards">
                <article className="single-card-movie">
                    <img
                        src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                        alt={nombre}
                    />
                    <div className="cardBody">
                        <h2>{nombre}</h2>
                        <p> {vote_average}</p>
                        <p>{fecha}</p>
                        {/* runtime solo viene en películas, en series no existe */}
                        {runtime ? <p>⏱ {runtime} min</p> : null}
                        <p>{overview}</p>
                        {/* genres es un array de objetos, uno con join para mostrarlo */}
                        {genres ? <p>{genres.map(g => g.name).join(", ")}</p> : null}

                        {/* Favoritos solo si existe la cookie de sesión - punto 7 consigna */}
                        {document.cookie.includes("sesion=") ? (
                            <button className="btn alert-primary">🩶 Agregar a favoritos</button>
                        ) : null}
                    </div>
                </article>
            </section>
        );
    }
}

export default Detail;