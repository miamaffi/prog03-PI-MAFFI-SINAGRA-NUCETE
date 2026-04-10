import React, { Component } from "react";
import CardsSection from "../../components/CardsSection/CardsSection";
import Loader from "../../components/Loader/Loader";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popularMovies: [],
            popularShows: [],       
            loading: true,
            searchData: "",
        };
    }

    componentDidMount() {
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        // Hago las 3 consultas al mismo tiempo con Promise.all
        Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`)
                .then(res => res.json()),
            fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES&page=1`)   // ← endpoint de series
                .then(res => res.json())
        ])
            .then(([popularData, showsData]) => {
                // Agrego el type "movie" para saber a qué endpoint ir en el detalle
                let populares = popularData.results.filter((movie, index) => index <4).map(movie => {
                    movie.type = "movie";
                    return movie;
                });
                // Agrego el type "tv" para las series
                let series = showsData.results.filter((show, index) => index <4).map(show => {
                    show.type = "tv";
                    return show;
                });

                this.setState({
                    popularMovies: populares,
                    popularShows: series,    // guardo las series en el estado
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
        // navego la pagina de resultados, le paso el texto por la url
        this.props.history.push("/search/" + this.state.searchData);
    }


    render() {
        return (
            <>
                {/* Buscador en el cuerpo, no en el header - punto 3  */}
                <form className="search-form" onSubmit={(event) => this.evitarSubmit(event)}>
                    <input
                        type="text"
                        placeholder="Buscar películas o series..."
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
                    
                        {/* Segundo grupo: series - viene de un endpoint diferente */}
                        <CardsSection
                            title="Series populares"
                            titleClass="alert alert-primary"
                            idSection="tv-shows"
                            cardClass="single-card-tv"
                            link="/series"
                            data={this.state.popularShows}
                        />
                    </>
                )}
            </>
        );
    }
}
export default Home;