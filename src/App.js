import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Mainpage from "./component/Mainpage/index";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Route path="/" component={Mainpage} />
        </main>
      </Router>
    </div>
  );
}

export default App;
