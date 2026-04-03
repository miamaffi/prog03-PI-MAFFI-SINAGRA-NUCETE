import React, { Component } from "react";
import CardsSection from "../../components/CardsSection/CardsSection";
import Loader from "../../components/Loader/Loader";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popularMovies: [],
            nowPlayingMovies: [],
            loading: true,
            searchData: ""
        };
    }

    componentDidMount() {
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        // Hago las 2 consultas al mismo tiempo con Promise.all
        Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`)
                .then(res => res.json()),
            fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-ES&page=1`)
                .then(res => res.json())
        ])
            .then(([popularData, nowPlayingData]) => {
                // Agrego el type para saber a qué endpoint ir en el detalle
                let populares = popularData.results.slice(0, 4).map(movie => {
                    movie.type = "movie";
                    return movie;
                });
                let cartel = nowPlayingData.results.slice(0, 4).map(movie => {
                    movie.type = "movie";
                    return movie;
                });

                this.setState({
                    popularMovies: populares,
                    nowPlayingMovies: cartel,
                    loading: false
                });
            })
            .catch(error => console.log(error));
    }

    controlarInput(event) {
        this.setState({ searchData: event.target.value });
    }

    evitarSubmit(event) {
        event.preventDefault();
        console.log("Búsqueda:", this.state.searchData);
    }

    render() {
        return (
            <>
                {/* Buscador en el cuerpo, no en el header - punto 3 consigna */}
                <form className="search-form" onSubmit={(event) => this.evitarSubmit(event)}>
                    <input
                        type="text"
                        placeholder="Buscar películas..."
                        value={this.state.searchData}
                        onChange={(event) => this.controlarInput(event)}
                    />
                    <button type="submit" className="btn btn-success btn-sm">
                        Buscar
                    </button>
                </form>

                {/* Muestro el loader mientras esperamos la respuesta de la API */}
                {this.state.loading ? (
                    <Loader />
                ) : (
                    <>
                        <CardsSection
                            title="Películas populares"
                            titleClass="alert alert-primary"
                            idSection="movies"
                            cardClass="single-card-movie"
                            link="/movies"
                            data={this.state.popularMovies}
                        />
                        <CardsSection
                            title="En cartel ahora"
                            titleClass="alert alert-primary"
                            idSection="now-playing"
                            cardClass="single-card-playing"
                            link="/now-playing"
                            data={this.state.nowPlayingMovies}
                        />
                    </>
                )}
            </>
        );
    }
}

export default Home;