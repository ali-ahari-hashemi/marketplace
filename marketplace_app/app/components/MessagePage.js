import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import consts from '../../constants';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'


// TODO switch from getting user info to message info

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.state = { messages: null }
  }
  
  componentWillMount() {
    // this.socket = SocketIOClient(this.props.host);
    // this.socket.emit("getMessages", this.props.userID);
    // this.socket.on("sendMessages", (data) => this.setState({messages: data}));
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://www.fullstacklabs.co/img/developersReact/react_big-7648094b.png',
          },
        },
        {
          _id: 2,
          text: 'Hello hi',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://www.fullstacklabs.co/img/developersReact/react_big-7648094b.png',
          },
        },
        {
          _id: 3,
          text: 'wassup',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://www.fullstacklabs.co/img/developersReact/react_big-7648094b.png',
          },
        },
      ],
    })
  }
  
  componentWillUnmount() {
    //this.socket.disconnect();
  }
  
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    console.log(this.state.messages);
  }
  
  render(){
    if (!this.state.messages) { return null; } // Wait till received message info 
    return (
      // <View>
      //   <Text>This will be the messsaging page</Text>
      //   <Text>For user: {this.props.userID}</Text>
      // </View>
      
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
