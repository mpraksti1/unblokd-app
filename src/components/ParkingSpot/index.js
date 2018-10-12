import React, { Component } from 'react'
import { ACTION_MODAL, INFO_MODAL } from '../../Constants/Modals';
import './index.css';

export default class ParkingSpot extends Component {
  constructor(props) {
    super(props);
    this.renderTakenStatus = this.renderTakenStatus.bind(this);
    this.toggleActionModal = this.toggleActionModal.bind(this);
    this.toggleInfoModal = this.toggleInfoModal.bind(this);
    this.state = {
      actionOpen: false,
      infoOpen: false,
    }
  }

  renderTakenStatus = () => {
    const { taken, user, currentOccupant } = this.props;
    
    let isParkedHere;
    if (user) {
      isParkedHere = user.uid === currentOccupant.id;
    }

    if (taken) {
      if (isParkedHere) {
        return (
          <React.Fragment>
            <div className="teal">MY SPOT</div>
            <div className="basic-link" onClick={this.toggleActionModal}>Leave Spot</div>
          </React.Fragment>
        )
      }

      return (
        <React.Fragment>
          <div className="red">OPEN</div>
          <div className="basic-link" onClick={this.toggleInfoModal}>Who's here?</div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <div className="green ">OPEN</div>
          <div className="basic-link" onClick={this.toggleActionModal}>Park here</div>
        </React.Fragment>
      )
    }
  };

  updateGlobalWithCurrentSelection() {
    const { spotNumber, currentOccupant, user } = this.props;

    let isParkedHere;

    if (user) {
      isParkedHere = user.uid === currentOccupant.id;
    }

    const blob = {
      isParkedAtSelected: isParkedHere,
      currentSpotSelected: spotNumber,
      currentOccupantSelected: currentOccupant,
    }

    this.props.updateCurrentSelections(blob);
  }

  toggleActionModal = () => {
    this.updateGlobalWithCurrentSelection();
    this.props.toggleModal(ACTION_MODAL);
  };

  toggleInfoModal = () => {
    this.updateGlobalWithCurrentSelection();
    this.props.toggleModal(INFO_MODAL);
  };

  render() {
    const { spotNumber, taken } = this.props;
    const classN = taken ? 'taken spot' : 'spot';

    return (
      <div className={classN}>
        <div className="num ">
          {spotNumber}
        </div>
        {this.renderTakenStatus()}
      </div>
    )
  }
}
