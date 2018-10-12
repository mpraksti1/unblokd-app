import React, { Component } from 'react';
import db, { auth } from './firebase';
import './App.css';
import ModalWrapper from './components/ModalWrapper';
import ParkingSpotList from './components/ParkingSpotList';
import { AUTH_MODAL, SIGN_IN_MODAL } from './Constants/Modals';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      spots: [],
      mapOpen: false,
      modalOpen: false,
      isParkedAtSelected: null,
      currentSpotSelected: null,
      currentOccupantSelected: null,
    }

    this.getData = this.getData.bind(this);
    this.updateCurrentSelections = this.updateCurrentSelections.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.getData();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  getData = async () => {
    const collection = await db.collection('parkingSpots').get();
    const spots = collection.docs
      .map(doc => doc.data())
      .sort((a, b) => { return a.spotNumber - b.spotNumber });
    this.setState({ spots })
  }

  updateCurrentSelections(blob) {
    this.setState(blob);
  }

  async logout() {
    await auth.signOut();

    this.setState({
      user: null
    });
  }

  toggleMap() {
    this.setState({ mapOpen: !this.state.mapOpen })
  }

  toggleModal(type, relaunch) {
    const { modalOpen } = this.state;

    if(!relaunch) {
      this.setState({ modalOpen: !modalOpen });
    }

    if(type) {
      this.setState({ modalType: type, });    
    }
  }

  render() {
    const classN = this.state.mapOpen ? 'map open' : 'map';
    const {
      isParkedAtSelected,
      currentSpotSelected,
      currentOccupantSelected,
      modalType,
      modalOpen,
      user
    } = this.state;

    return (
      <div className="App" id="firebaseui-auth-container">
        <header className="App-header">
          <h1 className="App-title">UNBLOKD</h1>      
        </header>
        <div className="md map-link">
          <span className="left-link" onClick={this.toggleMap}>
            { this.state.mapOpen
              ? 'Close Map'
              : 'Open Map'
            }
          </span>
          <span className="right-link">              
            { this.state.user 
              ? <span onClick={this.logout}>Log Out</span>                
              : (
                <React.Fragment>
                  <span onClick={() => this.toggleModal(SIGN_IN_MODAL)}>Log In</span>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <span onClick={() => this.toggleModal(AUTH_MODAL)}>Sign Up</span>
                </React.Fragment>
              )
            }
          </span>
        </div>
        
        <ParkingSpotList
          spots={this.state.spots}
          refreshAll={this.getData}
          user={this.state.user}
          toggleModal={this.toggleModal}
          updateCurrentSelections={this.updateCurrentSelections}
        />

        {/* TODO: redo map and move to its own component */}
        <div className={classN}>
          <div className="map-spots">
            {this.state.spots &&
              this.state.spots.map(({ spotNumber, taken }) => {
                const classN = taken ? 'taken map-spot' : 'map-spot';
                return (
                  <div key={spotNumber} className={classN}>
                    {spotNumber}
                  </div>
                );
              })
            }
          </div>
        </div>

        <ModalWrapper 
          user={user}
          isParkedHere={isParkedAtSelected}
          spotNumber={currentSpotSelected}
          currentOccupant={currentOccupantSelected}
          modalType={modalType}
          modalOpen={modalOpen}
          refreshAll={this.getData}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

export default App;
