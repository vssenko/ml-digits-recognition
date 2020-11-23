import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Digits Recognition Application</h2>
        </div>
        <p className="App-intro">
          Here you can upload your serialized network and see how it works with your own human input! 
        </p>
      </div>
    );
  }
}

export default App;
