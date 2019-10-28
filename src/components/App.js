import React, {Component} from 'react';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';
import Firebase from './Firebase';
import {Route, withRouter} from 'react-router-dom';

import './app.css';
class App extends Component {
  state = {
    user: null,
    messages: [],
    messagesLoaded: false
  }
  handleSubmitMessage = msg => {
    const data = {
      msg,
      author: this.state.user.email,
      user_id: this.state.user.uid,
      timestamp: Date.now()
    };
    Firebase.database().ref('messages/').push(data);
  }
  onMessage = snapshot => {
    const messages = Object.keys(snapshot.val()).map(key => {
      const msg = snapshot.val()[key];
      msg.id = key;
      return msg;
    });
    this.setState({messages});
  };
  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      } else {
        this.props.history.push('/login');
      }
    });
    Firebase.database().ref('/messages').on('value', snapshot => {
      this.onMessage(snapshot);
      if (!this.state.messagesLoaded) {
        this.setState({messagesLoaded: true});
      }
    });
  }
  render() {
    return (<div id="container" className="inner-container">
      <Route exact={true} path="/" render={() => (<ChatContainer messagesLoaded={this.state.messagesLoaded} messages={this.state.messages} user={this.state.user} onSubmit={this.handleSubmitMessage}/>)}/>
      <Route path="/login" component={LoginContainer}/>
      <Route path="/users/:id" render={({history, match}) => (<UserContainer messages={this.state.messages} messagesLoaded={this.state.messagesLoaded} userID={match.params.id}/>)}/>
    </div>);
  }
}
export default withRouter(App);
