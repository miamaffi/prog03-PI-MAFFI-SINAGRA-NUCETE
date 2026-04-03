import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true,
            paginaActual: 1,
            filterData: ""
        };
    }

    componentDidMount() {
        this.fetchMovies(this.state.paginaActual);
    }

    fetchMovies(pagina) {
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        // Traigo la página que corresponde según el número de página actual
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`)
            .then(res => res.json())
            .then(data => {
                // Con concat agrego las nuevas películas a las que ya tenía, no las reemplazo
                let nuevas = data.results.map(movie => {
                    movie.type = "movie";
                    return movie;
                });
                this.setState({
                    movies: this.state.movies.concat(nuevas),
                    loading: false
                });
            })
            .catch(error => console.log(error));
    }

    // Aumento el número de página y vuelvo a llamar al fetch
    cargarMas() {
        let siguientePagina = this.state.paginaActual + 1;
        this.setState({ paginaActual: siguientePagina });
        this.fetchMovies(siguientePagina);
    }

    controlarFiltro(event) {
        this.setState({ filterData: event.target.value });
    }

    render() {
        // Filtro las películas por título según lo que escribe el usuario
        const moviesFiltradas = this.state.movies.filter(movie =>
            movie.title.toLowerCase().includes(this.state.filterData.toLowerCase())
        );

        return (
            <>
                <h2 className="alert alert-primary">Películas populares</h2>

                {/* Filtro de contenido ya cargado - punto 6 consigna */}
                <form className="filter-form">
                    <input
                        type="text"
                        placeholder="Filtrar películas..."
                        value={this.state.filterData}
                        onChange={(event) => this.controlarFiltro(event)}
                    />
                </form>

                {this.state.loading ? (
                    <Loader />
                ) : (
                    <>
                        <section className="cards all-movies">
                            {moviesFiltradas.map((movie, index) => (
                                <Card
                                    key={movie.id + index}
                                    data={movie}
                                    cardClass="single-card-movie"
                                />
                            ))}
                        </section>

                        {/* Botón cargar más */}
                        <button
                            className="btn btn-outline-primary mb-4"
                            onClick={() => this.cargarMas()}
                        >
                            Cargar más
                        </button>
                    </>
                )}
            </>
        );
    }
}

export default Movies;