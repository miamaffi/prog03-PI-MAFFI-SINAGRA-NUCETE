import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./screens/Home/Home";
import Movies from "./screens/Movies/Movies";
import Detail from "./screens/Detail/Detail";
import NotFound from "./screens/NotFound/NotFound";
import { Switch, Route } from "react-router-dom";

function App() {
    return (
        <React.Fragment>
            <Header title="UdeSA Movies" />
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/movies" component={Movies} />
                <Route path="/detail/:type/:id" component={Detail} />
                <Route path="*" component={NotFound} />
            </Switch>
            <Footer />
        </React.Fragment>
    );
}

export default App;