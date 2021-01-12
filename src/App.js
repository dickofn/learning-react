import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./views/Home";
import About from "./views/About";
import Pokemon from "./views/Pokemon";

function App() {
  return (
    <div className="relative min-h-screen">
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

          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
