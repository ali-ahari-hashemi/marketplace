import React from 'react';
import { Container } from 'native-base';
import MainPage from '../components/MainPage';
import Head from '../components/Head';

export default class MainPageContainer extends React.Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    console.log("In Main");
    console.log(props);
  }

  render() {
    return (
      <Container>
        <Head />
        <MainPage
          host={this.props.screenProps.host}
          userID={this.userID}
        />
      </Container>
    );
  }
}
