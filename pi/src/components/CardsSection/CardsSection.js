import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "./CardsSection.css";

function CardsSection(props) {
    return (
        <>
            <h2 className={props.titleClass}>{props.title}</h2>

            <section className="cards" id={props.idSection}>
                {props.data.map(
                    (item, index) => (
                    <Card
                        key={item.id + index}
                        data={item}
                        cardClass={props.cardClass}
                        type={props.idSection === "movies" ? "movie" : "tv"}
                    />
                ))}
            </section>

            {props.link ? (
                <Link to={props.link} className="btn btn-outline-primary btn-sm mb-4">
                    Ver todas
                </Link>
            ) : null}
        </>
    );
}

export default CardsSection;
