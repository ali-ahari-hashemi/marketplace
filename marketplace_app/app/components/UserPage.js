import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import consts from '../../constants';
import SocketIOClient from 'socket.io-client';


export default class UserPage extends React.Component {
  render(){
    return (
      <View>
        <Text>This will be the user page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
