import React, { Component } from 'react'
import ParkingSpot from '../ParkingSpot';

export default class index extends Component {
  data = [];
  
  constructor() {
    super();
    this.state = {
      spots: []
    }
    this.getData = this.getData.bind(this);
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
          .sort((a,b) => { return a.spotNumber - b.spotNumber});
        this.setState({ spots })
        console.log(this.state);
    })
  }

  render() {
    return (
      <div>
        { this.state.spots && 
          this.state.spots.map(({spotNumber, taken, currentOccupant}) => {
            return <ParkingSpot
              key={spotNumber}
              spotNumber={spotNumber}
              taken={taken}
              currenOccupant={currentOccupant}
              refreshAll={this.getData}
            />
        })}
      </div>
    )
  }
}
