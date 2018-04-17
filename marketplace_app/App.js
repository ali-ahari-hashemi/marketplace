import React from 'react';
import { Container, Header, View, Text, Left, Body, Icon } from 'native-base';
import Router from './app/containers/Router';
import SocketIOClient from 'socket.io-client';
import * as consts from './constants';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.host = consts.HOST;
  }

  render() {
    return (
      <Router host={this.host} />
    );
  }
}
