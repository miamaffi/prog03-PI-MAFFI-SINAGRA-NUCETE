import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header>
                <h1>{this.props.title}</h1>
                <Navbar />
            </header>
        );
    }
}

export default Header;