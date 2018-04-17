import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import consts from '../../constants';
import SocketIOClient from 'socket.io-client';


export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  
  componentWillMount() {
    this.socket = SocketIOClient(this.props.host);
    this.socket.emit("getUser", this.props.userID);
    this.socket.on("sendUser", (data) => this.setState({user: data}));
  }
  
  componentWillUnmount() {
    this.socket.disconnect();
  }
  
  render(){
    // Wait till received user info
    if (!this.state.user) { return null; }
    
    return (
      <View>
        <Text>UserPage For user: {this.state.user.username}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
