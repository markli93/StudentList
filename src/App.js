import React from 'react';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Studentlist from './components/Studentlist'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render={props =>(<Studentlist{...props}/>)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
