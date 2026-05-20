import React, { useState, useEffect } from "react";

function Detail(props) {
    const [contenido, setContenido] = useState(null);

    useEffect(() => {
        const { type, id } = props.match.params;
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=es-ES`)
            .then(res => res.json())
            .then(data => {
                setContenido(data);
            })
            .catch(error => console.log(error));
    }, []);

    if (contenido === null) {
        return <h2>Cargando...</h2>;
    }

    const {
        title, name, overview, poster_path,
        vote_average, release_date, first_air_date,
        runtime, genres
    } = contenido;

    let nombre;
    if (title) {
        nombre = title;
    } else {
        nombre = name;
    }

    let fecha;
    if (release_date) {
        fecha = release_date;
    } else {
        fecha = first_air_date;
    }

    return (
        <section className="cards">
            <article className="single-card-movie">
                <img
                    src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                    alt={nombre}
                />
                <div className="cardBody">
                    <h2>{nombre}</h2>
                    <p>{vote_average}</p>
                    <p>{fecha}</p>
                    {runtime ? <p>⏱ {runtime} min</p> : null}
                    <p>{overview}</p>
                    {genres ? <p>{genres.map(g => g.name).join(", ")}</p> : null}
                </div>
            </article>
        </section>
    );
}

export default Detail;