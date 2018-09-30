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
        <div className="blocker-name">{name}</div>
        <div className="md">is your blocker! Yell at them at this #:</div>
        <div className="blocker-phone">
          <a href="tel:+" className="basic-link">{phoneNumber}</a>
        </div>
      </div>
      <p className="sm">Parked here and leaving? <span className="basic-link" onClick={clearNClose}>Clear this spot!</span></p>
    </div>
  )
}

export default WhosHereModal;
