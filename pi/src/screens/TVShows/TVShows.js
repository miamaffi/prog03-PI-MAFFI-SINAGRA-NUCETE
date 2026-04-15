import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

class TVShows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: [],
            loading: true,
            paginaActual: 1,
            filterData: ""
        };
    }

    componentDidMount() {
        this.fetchShows(this.state.paginaActual);
    }

    fetchShows(pagina) {
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        // El endpoint de series populares es /tv/popular en vez de /movie/popular
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`)
            .then(res => res.json())
            .then(data => {
                // Agrego type "tv" para que el link al detalle funcione correctamente
                let nuevas = data.results.map(show => {
                    show.type = "tv";
                    return show;
                });
                this.setState({
                    shows: this.state.shows.concat(nuevas),
                    loading: false
                });
            })
            .catch(error => console.log(error));
    }

    cargarMas() {
        let siguientePagina = this.state.paginaActual + 1;
        this.setState({ paginaActual: siguientePagina });
        this.fetchShows(siguientePagina);
    }

    controlarFiltro(event) {
        this.setState({ filterData: event.target.value });
    }

    render() {
        // Las series usan "name" en vez de "title" para filtrar
        const showsFiltrados = this.state.shows.filter(show =>
            show.name.toLowerCase().includes(this.state.filterData.toLowerCase())
        );

        return (
            <>
                <h2 className="alert alert-primary">Series populares</h2>

                <form className="filter-form">
                    <input
                        type="text"
                        placeholder="Filtrar series..."
                        value={this.state.filterData}
                        onChange={(event) => this.controlarFiltro(event)}
                    />
                </form>

                {this.state.loading ? (
                    <Loader />
                ) : (
                    <>
                        <section className="cards all-movies">
                            {showsFiltrados.map((show, index) => (
                                <Card
                                    key={show.id + index}
                                    data={show}
                                    cardClass="single-card-tv"
                                    type = "tv"
                                />
                            ))}
                        </section>

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

export default TVShows;