import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Mainpage from "./component/Mainpage/index";
import Container from "./component/Resize tool/resize";
import Detail from "./component/Detail/index";


function App() {
  return (
    <div className="App">
        <Container>
          <Router>
              <Route exact path="/" component={Mainpage} />
              <Route path="/detail/:img" component={Detail}/>
          </Router>
        </Container>

    </div>
  );
}

export default App;
