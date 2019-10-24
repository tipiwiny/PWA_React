import React, {Component} from 'react';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';
import Firebase from './Firebase';
import {Route, withRouter} from 'react-router-dom';

import './app.css';
class App extends Component {
  statate = {
    user: null
  }
  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      } else {
        this.props.history.push('/login');
      }
    });
  }
  render() {
    return (<div id="container" className="inner-container">
      <Route exact path="/" component={ChatContainer}/>
      <Route path="/login" component={LoginContainer}/>
       <Route path="/users/:id" component={UserContainer} />
    </div>);
  }
}
export default withRouter(App);
