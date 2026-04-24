import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card"; 
import "./CardsSection.css";

class CardsSection extends Component {
    render() {
        return (
            <>
                <h2 className={this.props.titleClass}>{this.props.title}</h2>

                <section className="cards" id={this.props.idSection}>
                    {this.props.data.map(
                        (item, index) => (
                        <Card
                            key={item.id + index}
                            data={item}
                            cardClass={this.props.cardClass}
                            type = {this.props.idSection === "movies" ? "movie" : "tv"}
                        />
                    ))}
                </section>

                {this.props.link ? (
                    <Link to={this.props.link} className="btn btn-outline-primary btn-sm mb-4">
                        Ver todas
                    </Link>
                ) : null}
            </>
        );
    }
}

export default CardsSection;