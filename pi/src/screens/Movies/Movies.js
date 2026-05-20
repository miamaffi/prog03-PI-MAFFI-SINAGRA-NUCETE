import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

function Movies(props) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const [filterData, setFilterData] = useState("");

    useEffect(() => {
        fetchMovies(paginaActual);
    }, []);

    function fetchMovies(pagina) {
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`)
            .then(res => res.json())
            .then(data => {
                let nuevas = data.results.map(movie => {
                    movie.type = "movie";
                    return movie;
                });
                setMovies(movies.concat(nuevas));
                setLoading(false);
            })
            .catch(error => console.log(error));
    }

    function cargarMas() {
        let siguientePagina = paginaActual + 1;
        setPaginaActual(siguientePagina);
        fetchMovies(siguientePagina);
    }

    function controlarFiltro(event) {
        setFilterData(event.target.value);
    }

    const moviesFiltradas = movies.filter(movie =>
        movie.title.toLowerCase().includes(filterData.toLowerCase())
    );

    return (
        <>
            <h2 className="alert alert-primary">Películas populares</h2>

            <form className="filter-form">
                <input
                    type="text"
                    placeholder="Filtrar películas..."
                    value={filterData}
                    onChange={(event) => controlarFiltro(event)}
                />
            </form>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <section className="cards all-movies">
                        {moviesFiltradas.map((movie, index) => (
                            <Card
                                key={movie.id + index}
                                data={movie}
                                cardClass="single-card-movie"
                                type="movie"
                            />
                        ))}
                    </section>

                    <button
                        className="btn btn-outline-primary mb-4"
                        onClick={() => cargarMas()}
                    >
                        Cargar más
                    </button>
                </>
            )}
        </>
    );
}

export default Movies;