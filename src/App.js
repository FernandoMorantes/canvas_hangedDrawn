import React from 'react';
import { Route, Switch} from 'react-router-dom'; 
import MainPage from  './MainPage.js';
import Canvas from './Canvas.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route render={({location}) => (
        <Switch location={location}>
          <Route exact path="/" component={MainPage} /> 
          <Route exact path="/Canvas" component={Canvas}/>
        </Switch>
      )}>
      </Route>
    </div>
  );
}

export default App;
