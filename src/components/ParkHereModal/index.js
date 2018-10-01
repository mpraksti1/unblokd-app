
import React, { Component } from 'react'
import './index.css';

class ParkHereModal extends Component {

  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeSelf = this.closeSelf.bind(this);

    this.state = {
      name: "",
      phone: ""
    }
  }

  closeSelf() {
    this.props.closeSelf();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitForm(e) {
    e.preventDefault();

    const self = this;

    window.db.collection("parkingSpots").where("spotNumber", "==", this.props.spotNumber)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // Build doc ref from doc.id
          window.db.collection("parkingSpots").doc(doc.id).update({
            'taken': true,
            'currentOccupant.name': self.state.name,
            'currentOccupant.phoneNumber': self.state.phone,
          });
        });
      }).then(function (docRef) {
        self.closeSelf();
        self.props.refreshAll();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { open } = this.props;

    const classN = open ? 'modal open' : 'modal';

    return (
      <div className={classN}>
        <div>Take this spot!</div>
        <div className="close" onClick={this.closeSelf}>X</div>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label htmlFor="name">
            <input type="text" id="name" name="name" placeholder="Name" onChange={(e) => this.handleChange(e)} />
          </label>
          <label htmlFor="phone">
            <input type="text" id="phone" name="phone" placeholder="Phone #" onChange={(e) => this.handleChange(e)} />
          </label>
          <button type="submit">Park me!</button>
        </form>
      </div>
    )
  }
}

export default ParkHereModal;