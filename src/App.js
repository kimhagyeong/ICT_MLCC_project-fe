import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import mainpage from "./component/mainpage";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Route path="/" component={mainpage} />
        </main>
      </Router>
    </div>
  );
}

export default App;
