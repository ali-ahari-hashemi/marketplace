import React from 'react';
import { Container, Header, View, Text, Left, Body, Icon } from 'native-base';
import MainPage from './app/components/mainPage/MainPage';
import LoginPage from './app/components/LoginPage/LoginPage'
import { StackNavigator } from 'react-navigation';

const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginPage,
    },
    Main: {
      screen: MainPage,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
