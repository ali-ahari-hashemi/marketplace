import React from 'react';
import { Container } from 'native-base';
import SwipeInterface from './SwipeInterface';
import Head from '../Head';

export default class MainPage extends React.Component {
  static navigationOptions = { header: null }

  render() {
    return (
      <Container>
        <Head />
        <SwipeInterface />
      </Container>
    );
  }
}
