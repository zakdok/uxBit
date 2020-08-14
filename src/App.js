import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage.js';
import ResearchListPage from "./components/views/ResearchListPage/ResearchListPage.js";
import MatrixPage from "./components/views/MatrixPage/MatrixPage.js";
import NavBar from './components/views/NavBar/NavBar';

function App() {
  return (
    <Router>
      <Suspense fallback={(<div>Loading...</div>)}>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/ResearchList" component={ResearchListPage} />
            <Route exact path="/Matrix" component={MatrixPage} />
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;