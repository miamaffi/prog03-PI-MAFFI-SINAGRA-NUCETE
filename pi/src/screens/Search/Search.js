import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            loading: true
        };
    }

    componentDidMount() {
        const apiKey = "07331310659d2393d5664c23ad6370d3";

        // Tomo el query de la URL, igual que en Detail tomamos el id
        const query = this.props.match.params.query;
        const type = this.props.match.params.type;

        // El endpoint de búsqueda de películas de TMDB
        fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&language=es-ES&query=${query}`)
            .then(res => res.json())
            .then(data => {
                // Agrego el type para que el link al detalle funcione
                let resultados = data.results.map(movie => {
                    movie.type = "movie";
                    return movie;
                });
                this.setState({
                    results: resultados,
                    loading: false
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <>
                <h2 className="alert alert-primary">Resultados de búsqueda</h2>

                {this.state.loading ? (
                    <Loader />
                ) : (
                    <section className="cards all-movies">
                        {this.state.results.map((movie, index) => (
                            <Card
                                key={movie.id + index}
                                data={movie}
                                cardClass="single-card-movie"
                                type={this.props.match.params.type}
                            />
                        ))}
                    </section>
                )}
            </>
        );
    }
}

export default Search;