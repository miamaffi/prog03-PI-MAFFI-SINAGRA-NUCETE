import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

function TVShows(props) {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const [filterData, setFilterData] = useState("");

    useEffect(() => {
        fetchShows(paginaActual);
    }, []);

    function fetchShows(pagina) {
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`)
            .then(res => res.json())
            .then(data => {
                let nuevas = data.results.map(show => {
                    show.type = "tv";
                    return show;
                });
                setShows(shows.concat(nuevas));
                setLoading(false);
            })
            .catch(error => console.log(error));
    }

    function cargarMas() {
        let siguientePagina = paginaActual + 1;
        setPaginaActual(siguientePagina);
        fetchShows(siguientePagina);
    }

    function controlarFiltro(event) {
        setFilterData(event.target.value);
    }

    const showsFiltrados = shows.filter(show =>
        show.name.toLowerCase().includes(filterData.toLowerCase())
    );

    return (
        <>
            <h2 className="alert alert-primary">Series populares</h2>

            <form className="filter-form">
                <input
                    type="text"
                    placeholder="Filtrar series..."
                    value={filterData}
                    onChange={(event) => controlarFiltro(event)}
                />
            </form>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <section className="cards all-movies">
                        {showsFiltrados.map((show, index) => (
                            <Card
                                key={show.name + index}
                                data={show}
                                cardClass="single-card-tv"
                                type="tv"
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

export default TVShows;