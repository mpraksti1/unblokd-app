import React from 'react';
import './index.css';

const WhosHereModal = ({open, currentOccupant, closeSelf, clearSpot}) => {
  const { name, phoneNumber } = currentOccupant;
  const classN = open ? 'modal open' : 'modal';
  
  const clearNClose = () => {
    clearSpot();
    closeSelf();
  }

  return (
    <div className={classN}>
      <div className="close" onClick={closeSelf}>X</div>
      <div className="blocker">
        <div>{name}</div>
        <div>
          <a href="tel:+">{phoneNumber}</a>
        </div>
      </div>
      <p>Parked here and leaving? <span className="clear" onClick={clearNClose}>Clear this spot!</span></p>
    </div>
  )
}

export default WhosHereModal;
