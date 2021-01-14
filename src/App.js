import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./views/Home";
import About from "./views/About";
import Pokemon from "./views/Pokemon";
import MyPokemonsList from "./views/my/List";
import MyPokemonDetail from "./views/my/Detail";

import PokemonContext from "./contexts/PokemonsContext";

/* Apollo Setup START */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});
/* Apollo Setup END */

function App() {
  const MyPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];

  return (
    <div className="relative min-h-screen">
      <ApolloProvider client={client}>
        <PokemonContext.Provider value={MyPokemons}>
          <Router basename="/learning-react">
            <Header />

            <Switch>
              <Route exact path="/">
                <div className="lg:pt-20">
                  <Home />
                </div>
              </Route>

              <Route path="/pokemon/:id">
                <div className="pb-20 lg:pb-0 lg:pt-20">
                  <Pokemon />
                </div>
              </Route>

              <Route path="/my/pokemon/:nickname">
                <div className="pb-20 lg:pb-0 lg:pt-20">
                  <MyPokemonDetail />
                </div>
              </Route>

              <Route path="/my">
                <div className="lg:pt-20">
                  <MyPokemonsList />
                </div>
              </Route>

              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </Router>
        </PokemonContext.Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
