import React, {components} from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

function Header(props) {
        return (
            <header>
                <img src="/LogoPochocleados.png" alt="Pochocleados" className="logo" />
                <h1>{props.title}</h1>
                
                <Navbar />
            </header>
        );
    }



export default Header;