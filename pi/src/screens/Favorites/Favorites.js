import React, { useState } from "react";
import Card from "../../components/Card/Card";

function Favorites(props) {
    let storage = localStorage.getItem("favPeliculas");
    const [favoritos, setFavoritos] = useState(storage !== null ? JSON.parse(storage) : []);

    let peliculas = favoritos.filter(item => item.type === "movie");
    let series = favoritos.filter(item => item.type === "tv");

    return (
        <>
            <h2 className="alert alert-primary">Mis favoritos</h2>

            <h3>Películas favoritas</h3>
            {peliculas.length === 0 ? (
                <p>No tenés películas en favoritos.</p>
            ) : (
                <section className="cards">
                    {peliculas.map((movie, index) => (
                        <Card
                            key={movie.id + index}
                            data={movie}
                            cardClass="single-card-movie"
                        />
                    ))}
                </section>
            )}

            <h3>Series favoritas</h3>
            {series.length === 0 ? (
                <p>No tenés series en favoritos.</p>
            ) : (
                <section className="cards">
                    {series.map((show, index) => (
                        <Card
                            key={show.id + index}
                            data={show}
                            cardClass="single-card-tv"
                        />
                    ))}
                </section>
            )}
        </>
    );
}

export default Favorites;
