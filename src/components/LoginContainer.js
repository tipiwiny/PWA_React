import React, {Component} from 'react';
import Header from './Header';
import Firebase from './Firebase';
class LoginContainer extends Component {
  state = {
    email: '',
    password: ''
  };
  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  };
  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  };
  login = async () => {
    try {
      if (this.state.email && this.state.password) {
        const res = await Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      } else {
        this.setState({error: 'Please fill in both fields.'});
      }
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        this.signup();
      } else{
        this.setState({error: e.message});
      }
    }
  }

  signup = async() => {
    try {
      await Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    } catch (e) {
      this.setState({error: e.message});
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({error: ''});
    if (this.state.email && this.state.password) {
      await this.login();
    } else {
      this.setState({error: 'Please fill in both fields.'});
    }
  };

  render() {
    return (<div id="LoginContainer" className="inner-container">
      <Header/>
      <form onSubmit={this.handleSubmit}>
        <p>Sign or sign up by entering your email and password.</p>
        <input type="text" onChange={this.handleEmailChange} value={this.state.email} placeholder="Your email"/>
        <input type="password" onChange={this.handlePasswordChange} value={this.state.password} placeholder="Your password"/>
        <p className="error">{this.state.error}</p>
        <button className="red light" type="submit">Login</button>
      </form >
    </div>)
  }
}
export default LoginContainer;
