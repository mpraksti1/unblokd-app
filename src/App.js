import React, { Component } from 'react';
import './App.css';
import ParkingSpotList from './components/ParkingSpotList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">UNBLOKD</h1>
        </header>
        <ParkingSpotList />
      </div>
    );
  }
}

export default App;
