import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import consts from '../../constants';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'
let interval;

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.state = { messages: null }
    console.log(props)
  }

  componentWillMount() {
    this.socket = SocketIOClient(this.props.host);
    this.socket.emit("getMessages", {userID1: this.props.userID, userID2:this.props.userID2});
    this.socket.on("sendMessages", (data) => this.setState({messages: data}));
  }

  componentDidMount() {
    interval = setInterval(() => {
      this.socket.emit("getMessages", {userID1: this.props.userID, userID2: this.props.userID2});
      this.socket.on("sendMessages", (data) => this.setState({messages: data}));
      console.log(this.state.messages);
    }, 1000);
  }

  componentWillUnmount() {
    this.socket.disconnect();
    clearInterval(interval);
  }

  onSend(messages = []) {
    var date = new Date();
    var iso = date.toISOString();
    this.socket.emit("sendMessage", {userID1: this.props.userID, userID2: this.props.userID2, cardID: this.props.cardID, timestamp: iso, message: messages[0].text});
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render(){
    if (!this.state.messages) { return null; } // Wait till received message info
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{ _id: 1,}}
      />
    );
  }
}

const styles = StyleSheet.create({
});
