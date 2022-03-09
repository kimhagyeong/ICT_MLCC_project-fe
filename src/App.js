import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Mainpage from "./component/Mainpage/index";
import Container from "./component/Resize tool/resize";
import About from "./component/About/index";

function App() {
  return (
    <div className="App">
        <Container>
          <Router>
              <Route exact path="/" component={Mainpage} />
              <Route path="/about/:img" component={About}/>
          </Router>
        </Container>
    </div>
  );
}

export default App;
