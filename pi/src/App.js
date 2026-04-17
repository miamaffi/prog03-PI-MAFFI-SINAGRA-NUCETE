import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./screens/Home/Home";
import Movies from "./screens/Movies/Movies";
import Detail from "./screens/Detail/Detail";
import NotFound from "./screens/NotFound/NotFound";
import { Switch, Route } from "react-router-dom";
import TVShows from "./screens/TVShows/TVShows";
import Search from "./screens/Search/Search"
import Favorites from "./screens/Favorites/Favorites"
import Register from "./screens/Register/Register"

function App() {
    return (
        <React.Fragment>
            <Header title="Pochocleados" />
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/movies" component={Movies} />
                <Route path="/detail/:type/:id" component={Detail} />
                <Route path="/series" component={TVShows} />
                <Route path="/search/:type/:query" component={Search} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/register" component={Register} />
                <Route path="*" component={NotFound} />
            </Switch>
            <Footer />
        </React.Fragment>
    );
}

export default App;