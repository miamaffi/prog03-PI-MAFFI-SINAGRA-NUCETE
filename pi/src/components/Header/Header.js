import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header>
                <img src="/LogoPochocleados.png" alt="Pochocleados" className="logo" />
                <h1>{this.props.title}</h1>
                
                <Navbar />
            </header>
        );
    }
}



export default Header;