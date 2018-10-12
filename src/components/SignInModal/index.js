import React, { Component } from 'react'
import { auth } from '../../firebase';

class SignInModal extends Component {

  constructor() {
    super();
    
    this.state = {
      email: "",
      password: ""
    }
    
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async submitForm(e) {
    e.preventDefault();
    
    const {
      email,
      password,
    } = this.state;

    await auth.signInWithEmailAndPassword(email, password);

    this.props.toggleModal();
  }

  render() {
    return (
      <div>
        <h3>Sign In</h3>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label htmlFor="email">
            <input type="text" id="email" name="email" placeholder="E-mail" onChange={(e) => this.handleChange(e)} />
          </label>
          <label htmlFor="password">
            <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
          </label>
          <button type="submit">Sign me in!</button>
        </form>
      </div>
    )
  }
}

export default SignInModal;