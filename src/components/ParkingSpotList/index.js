import React, { Component } from 'react'
import ParkingSpot from '../ParkingSpot';
import './index.css';

export default class index extends Component {
  render() {
    return (
      <div className="spot-list">
        { this.props.parkingSpots && 
          this.props.parkingSpots.map(({spotNumber, taken, currentOccupant}) => {
            return (
              <ParkingSpot
                key={spotNumber}
                spotNumber={spotNumber}
                taken={taken}
                currenOccupant={currentOccupant}
                refreshAll={this.props.refreshAll}
              />
            )
        })}
      </div>
    )
  }
}
