import React, {Component} from 'react';
import LoginContainer from './LoginContainer';
import Firebase from './Firebase';
import './app.css';
class App extends Component {
  statate = { user: null}
  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
  }
  render() {
    return (<div id="container" className="inner-container">
      <LoginContainer/>
    </div>);
  }
}
export default App;
