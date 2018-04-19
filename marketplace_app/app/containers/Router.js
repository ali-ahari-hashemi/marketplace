import React from 'react';
import { Container, Header, View, Text, Left, Body, Icon } from 'native-base';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import MainPageContainer from './MainPageContainer';
import UserPageContainer from './UserPageContainer';
import MessagePageContainer from './MessagePageContainer';
import ConversationPageContainer from './ConversationPageContainer';
import AddNewItemPage from '../components/AddNewItemPage';
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
    Signup: {
      screen: mapNavigationStateParamsToProps(SignUpPage),
    },
    Main: {
      screen: mapNavigationStateParamsToProps(MainPageContainer),
    },
    User: {
      screen: mapNavigationStateParamsToProps(UserPageContainer),
    },
    Message: {
      screen: mapNavigationStateParamsToProps(ConversationPageContainer),
    },
    MessagePage: {
      screen: mapNavigationStateParamsToProps(MessagePageContainer),
    },
    AddNewItemPage: {
      screen: mapNavigationStateParamsToProps(AddNewItemPage),
    }
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
