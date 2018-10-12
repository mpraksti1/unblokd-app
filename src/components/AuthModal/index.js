import React, { Component } from 'react'
import db, { auth } from '../../firebase';

class AuthModal extends Component {

  constructor() {
    super();
    
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
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
      firstName,
      lastName,
      phone,
      email,
      password,
    } = this.state;

    const createUser = await auth.createUserWithEmailAndPassword(email, password);

    await db.collection("users").doc(createUser.user.uid).set({
      firstName,
      lastName,
      phone,
      email,
    });

    this.props.toggleModal();
  }

  render() {
    return (
      <div>
        <h3>Sign up</h3>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label htmlFor="firstName">
            <input type="text" id="firstName" name="firstName" placeholder="First Name" onChange={(e) => this.handleChange(e)} />
          </label>
          <label htmlFor="lastName">
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" onChange={(e) => this.handleChange(e)} />
          </label>
          <label htmlFor="phone">
            <input type="text" id="phone" name="phone" placeholder="Phone #" onChange={(e) => this.handleChange(e)} />
          </label>
          <label htmlFor="email">
            <input type="text" id="email" name="email" placeholder="E-mail" onChange={(e) => this.handleChange(e)} />
          </label>
          <label htmlFor="password">
            <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
          </label>
          <button type="submit">Sign me up!</button>
        </form>
      </div>
    )
  }
}

export default AuthModal;