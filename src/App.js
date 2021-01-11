import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./views/Home";
import About from "./views/About";
import Pokemon from "./views/Pokemon";

function App() {
  return (
    <div className="relative pb-8 min-h-screen">
      <Router basename="/learning-react">
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/pokemon/:id">
            <Pokemon />
          </Route>

          <Route path="/about">
            <About />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
