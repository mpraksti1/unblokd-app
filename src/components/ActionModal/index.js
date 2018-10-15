
import React, { Component } from 'react'
import { AUTH_MODAL } from '../../Constants/Modals';
import db from '../../firebase';

class ActionModal extends Component {

  constructor() {
    super();

    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(e) {
    e.preventDefault();

    const self = this;
    const { isParkedHere, user, spotNumber, toggleModal} = this.props;

    const parkingSpotId = (await db.collection("parkingSpots")
      .where("spotNumber", "==", spotNumber)
      .get()
    ).docs[0].id;

    await db.collection("parkingSpots").doc(parkingSpotId).update({
      'taken': isParkedHere ? false : true,
      'currentOccupant.id': isParkedHere ? null : user.uid,
    });
      
    self.props.refreshAll();
    toggleModal();
  }

  render() {
    const { isParkedHere, user, toggleModal } = this.props;

    return (
      <div>
        { user
          ? (
              <div>
                <div>
                  { isParkedHere
                      ? 'Leave this spot'
                      : 'Take this spot'
                  }
                </div>
                <form onSubmit={(e) => this.submitForm(e)}>
                  <button type="submit">
                    { isParkedHere
                        ? "I'm sure, leave this spot"
                        : "I'm sure, park me"
                    }
                  </button>
                </form>
              </div>
            )
          : ( 
              <div>
                <h3>You're not signed up yet!</h3>
                <button onClick={() => toggleModal(AUTH_MODAL, true)}>Let's fix that</button>
              </div>
            )
          }
      </div>
    )
  }
}

export default ActionModal;