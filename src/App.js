import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./views/Home";
import About from "./views/About";
import Pokemon from "./views/Pokemon";
import MyPokemonsList from "./views/my/List";
import MyPokemonDetail from "./views/my/Detail";

import PokemonContext from "./contexts/PokemonsContext";

function App() {
  const MyPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];

  return (
    <div className="relative min-h-screen">
      <PokemonContext.Provider value={MyPokemons}>
        <Router basename="/learning-react">
          <Header />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/pokemon/:id">
              <div className="pb-20">
                <Pokemon />
              </div>
            </Route>

            <Route path="/my/pokemon/:nickname">
              <MyPokemonDetail />
            </Route>

            <Route path="/my">
              <MyPokemonsList />
            </Route>

            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Router>
      </PokemonContext.Provider>
    </div>
  );
}

export default App;
