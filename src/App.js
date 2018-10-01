import React, { Component } from 'react';
import './App.css';
import ParkingSpotList from './components/ParkingSpotList'

class App extends Component {
  constructor() {
    super();

    this.state = {
      spots: [],
      mapOpen: false
    }

    this.getData = this.getData.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    window.db.collection('parkingSpots')
      .get()
      .then(collection => {
        const spots = collection.docs
          .map(doc => doc.data())
          .sort((a, b) => { return a.spotNumber - b.spotNumber });
        this.setState({ spots })
      })
  }

  toggleMap() {
    this.setState({ mapOpen: !this.state.mapOpen })
  }

  render() {
    const classN = this.state.mapOpen ? 'map open' : 'map';

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">UNBLOKD</h1>          
        </header>
        <div className="md map-link" onClick={this.toggleMap}>
          { this.state.mapOpen
            ? 'Close Map'
            : 'Open Map'
          }
        </div>
        <ParkingSpotList parkingSpots={this.state.spots} refreshAll={this.getData} />
        <div className={classN}>
          <div className="map-spots">
            {this.state.spots &&
              this.state.spots.map(({ spotNumber, taken }) => {
                const classN = taken ? 'taken map-spot' : 'map-spot';
                return (
                  <div key={spotNumber} className={classN}>
                    {spotNumber}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
