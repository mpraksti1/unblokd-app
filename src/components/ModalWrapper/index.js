import React, { Component } from 'react'
import ActionModal from '../ActionModal';
import InfoModal from '../InfoModal';
import AuthModal from '../AuthModal';
import SignInModal from '../SignInModal';
import { AUTH_MODAL, ACTION_MODAL, INFO_MODAL, SIGN_IN_MODAL } from '../../Constants/Modals';
import './index.css';
 
 class ModalWrapper extends Component {

  listenKeyboard(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.toggleModal();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
  }

  onDialogClick(event) {
    event.stopPropagation();
  }

  render() {
    const { modalType, modalOpen } = this.props;
    const modalClass = modalOpen ? 'open' : 'closed';

    const MODAL_COMPONENTS = {
      [ACTION_MODAL]: <ActionModal {...this.props} />,
      [INFO_MODAL]: <InfoModal {...this.props} />,
      [AUTH_MODAL]: <AuthModal {...this.props} />,
      [SIGN_IN_MODAL]: <SignInModal {...this.props} />,
    };

    return (
      <div className={modalClass}>
        <div className="modal-overlay-div">
          <div className="modal-content-div">
            <div className="close" onClick={this.props.toggleModal}>X</div>
            { MODAL_COMPONENTS[modalType] }
          </div>
        </div>
      </div>
    );
  }
 }
 
 export default ModalWrapper;