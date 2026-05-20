import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

function Search(props) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiKey = "07331310659d2393d5664c23ad6370d3";
        const query = props.match.params.query;
        const type = props.match.params.type;

        fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&language=es-ES&query=${query}`)
            .then(res => res.json())
            .then(data => {
                let resultados = data.results.map(item => {
                    item.type = type;
                    return item;
                });
                setResults(resultados);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <h2 className="alert alert-primary">Resultados de búsqueda</h2>

            {loading ? (
                <Loader />
            ) : (
                <section className="cards all-movies">
                    {results.map((movie, index) => (
                        <Card
                            key={movie.id + index}
                            data={movie}
                            cardClass="single-card-movie"
                            type={props.match.params.type}
                        />
                    ))}
                </section>
            )}
        </>
    );
}

export default Search;