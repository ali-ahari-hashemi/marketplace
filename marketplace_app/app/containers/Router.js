import React from 'react';
import { Container, Header, View, Text, Left, Body, Icon } from 'native-base';
import MainPageContainer from './MainPageContainer';
import LoginPage from '../components/LoginPage'
import { SwitchNavigator } from 'react-navigation';

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends React.Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}

const Screens = SwitchNavigator(
  {
    Login: {
      screen: mapNavigationStateParamsToProps(LoginPage),
    },
    Main: {
      screen: mapNavigationStateParamsToProps(MainPageContainer),
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default class Router extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Screens screenProps={this.props}/>
    );
  }
}
