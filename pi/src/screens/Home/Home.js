import React, { useState, useEffect } from "react";
import CardsSection from "../../components/CardsSection/CardsSection";
import Loader from "../../components/Loader/Loader";

function Home(props) {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularShows, setPopularShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`)
                .then(res => res.json()),
            fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES&page=1`)
                .then(res => res.json())
        ])
            .then(([popularData, showsData]) => {
                let populares = popularData.results.filter((movie, index) => index < 4).map(movie => {
                    movie.type = "movie";
                    return movie;
                });
                let series = showsData.results.filter((show, index) => index < 4).map(show => {
                    show.type = "tv";
                    return show;
                });
                setPopularMovies(populares);
                setPopularShows(series);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, []);

    function controlarInput(event) {
        setSearchData(event.target.value);
    }

    function evitarSubmit(event) {
        event.preventDefault();
        props.history.push("/search/" + type + "/" + searchData);
    }

    return (
        <>
            <form className="search-form" onSubmit={(event) => evitarSubmit(event)}>
                <input
                    type="text"
                    placeholder="Buscar películas o series..."
                    value={searchData}
                    onChange={(event) => controlarInput(event)}
                />
                <input
                    type="radio"
                    onChange={(event) => setType(event.target.value)}
                    name="seleccion"
                    value="movie"
                />
                <label>Peliculas</label>
                <input
                    type="radio"
                    onChange={(event) => setType(event.target.value)}
                    name="seleccion"
                    value="tv"
                />
                <label>Series</label>
                <button type="submit" className="btn btn-success btn-sm">
                    Buscar
                </button>
            </form>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <CardsSection
                        title="Películas populares"
                        titleClass="alert alert-primary"
                        idSection="movies"
                        cardClass="single-card-movie"
                        link="/movies"
                        data={popularMovies}
                    />
                    <CardsSection
                        title="Series populares"
                        titleClass="alert alert-primary"
                        idSection="tv-shows"
                        cardClass="single-card-tv"
                        link="/series"
                        data={popularShows}
                    />
                </>
            )}
        </>
    );
}

export default Home;