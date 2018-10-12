import React, { Component } from 'react'
import './index.css';
import db from '../../firebase';

class InfoModal extends Component {
  constructor() {
    super();
    
    this.state = {
      fullName: null,
      email: null,
      phone: null,
    }
  }

  componentDidMount() {
    this.getFullUserProfile()
  }

  async getFullUserProfile() {
    const { currentOccupant: { id } } = this.props;
    
    const expandedUserProfile = (await db.collection("users").doc(id).get()).data();
    
    const {
      firstName,
      lastName,
      email,
      phone,
    } = expandedUserProfile
    
    const fullName = `${firstName} ${lastName}`;

    this.setState({
      fullName,
      email,
      phone,
    })
  }
  
  render() {
    const {
      fullName,
      email,
      phone,
    } = this.state;

    return (
      <div className="blocker">
        <div className="blocker-name">{fullName}</div>
        <div className="md">is your blocker!</div>
        <div className="md">
          <a href={`tel:${phone}`} className="basic-link">{phone}</a>
        </div>
        <div className="md">
          <a href={`mailto: ${email}`} className="basic-link">{email}</a>
        </div>
      </div>
    )
  }
}

export default InfoModal;