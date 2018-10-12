import React from 'react'
import ParkingSpot from '../ParkingSpot';
import './index.css';

const ParkingSpotList = ({
  spots,
  refreshAll,
  user,
  updateCurrentSelections,
  toggleModal
}) => (
  <div className="spot-list">
    { spots && 
      spots.map(({spotNumber, taken, currentOccupant}) => {
        return (
          <ParkingSpot
            key={spotNumber}
            spotNumber={spotNumber}
            taken={taken}
            currentOccupant={currentOccupant}
            refreshAll={refreshAll}
            user={user}
            toggleModal={toggleModal}
            updateCurrentSelections={updateCurrentSelections}
          />
        )
    })}
  </div>
)

export default ParkingSpotList;