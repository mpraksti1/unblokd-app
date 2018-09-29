
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
    console.log(this.state);
  }

  submitForm(e) {
    e.preventDefault();

    const self = this;

    window.db.collection("parkingSpots").where("spotNumber", "==", this.props.spotNumber)
      .get()
      .then(function (querySnapshot) {
        console.log({querySnapshot});
        querySnapshot.forEach(function (doc) {
          console.log('doc.id', doc.id);
          // Build doc ref from doc.id
          window.db.collection("parkingSpots").doc(doc.id).update({
            'taken': true,
            'currentOccupant.name': self.state.name,
            'currentOccupant.phoneNumber': self.state.phone,
          });
        });
      }).then(function (docRef) {
        console.log("Document written with ID: ");
        self.closeSelf();
        self.props.refreshAll();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { open } = this.props;
    console.log('rendering!', open);

    const classN = open ? 'modal open' : 'modal';

    return (
      <div className={classN}>
        <div className="close" onClick={this.closeSelf}>X</div>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label htmlFor="name">
            <input type="text" id="name" name="name" onChange={(e) => this.handleChange(e)} />
          </label>
          <label htmlFor="phone">
            <input type="text" id="phone" name="phone" onChange={(e) => this.handleChange(e)} />
          </label>
          <button type="submit">Park me!</button>
        </form>
      </div>
    )
  }
}

export default ParkHereModal;