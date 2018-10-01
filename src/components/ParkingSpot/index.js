import React, { Component } from 'react'
import ParkHereModal from '../ParkHereModal';
import WhosHereModal from '../WhosHereModal';
import './index.css';

export default class ParkingSpot extends Component {
    constructor() {
        super();
        this.renderTakenStatus = this.renderTakenStatus.bind(this);
        this.toggleParkingModal = this.toggleParkingModal.bind(this);
        this.toggleWhosHereModal = this.toggleWhosHereModal.bind(this);
        this.clearSpot = this.clearSpot.bind(this);

        this.state = {
            parkingOpen: false,
            whosHereOpen: false
        }
    }

    renderTakenStatus = () => {
        const { taken } = this.props;

        if (taken) {
            return (
                <React.Fragment>
                    <div className="red">OPEN</div>
                    <div className="basic-link" onClick={this.toggleWhosHereModal}>Who's here!?</div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="green ">OPEN</div>
                    <div className="basic-link" onClick={this.toggleParkingModal}>Park here!</div>
                </React.Fragment>
            )
        }
    };

    clearSpot() {
        const self = this;
        window.db.collection("parkingSpots").where("spotNumber", "==", this.props.spotNumber)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // Bud doc ref from doc.id
                    window.db.collection("parkingSpots").doc(doc.id).update({
                        'taken': false,
                        'currentOccupant.name': null,
                        'currentOccupant.phoneNumber': null,
                    });
                });
            }).then(function (docRef) {
                self.props.refreshAll();
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    toggleParkingModal = () => {
        this.setState({ parkingOpen: !this.state.parkingOpen });
    };

    toggleWhosHereModal = () => {
        this.setState({ whosHereOpen: !this.state.whosHereOpen });
    };

    render() {
        const { spotNumber, taken, currenOccupant } = this.props;
        const classN = taken ? 'taken spot' : 'spot';

        return (
            <div className={classN}>
                <div className="num ">
                    {spotNumber}
                </div>
                {this.renderTakenStatus()}
                <ParkHereModal
                    spotNumber={spotNumber}
                    open={this.state.parkingOpen}
                    closeSelf={this.toggleParkingModal}
                    refreshAll={this.props.refreshAll}
                />
                <WhosHereModal
                    open={this.state.whosHereOpen}
                    currentOccupant={currenOccupant}
                    closeSelf={this.toggleWhosHereModal}
                    clearSpot={this.clearSpot}
                />
            </div>
        )
    }
}
