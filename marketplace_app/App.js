import React from 'react';
import { Container, Header, View, Text, Left, Body, Icon } from 'native-base';
import MainPage from './src/components/mainPage/MainPage'
import Head from './src/components/Head';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Head />
        <MainPage />
      </Container>
    );
  }
}
