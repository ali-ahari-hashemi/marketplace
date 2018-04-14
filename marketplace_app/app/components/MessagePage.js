import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import consts from '../../constants';
import SocketIOClient from 'socket.io-client';


export default class MessagePage extends React.Component {
  render(){
    return (
      <View>
        <Text>This will be the messsaging page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
