import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, Icon } from 'native-base';
import MainPage from '../components/MainPage';
import { SwitchNavigator } from 'react-navigation';

export default class MainPageContainer extends React.Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <View style={styles.header}>
          <View style={styles.buttonWrapper}>
            <Button transparent
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('User', {userID: this.props.userID})}
            >
                <Icon name='ios-contact-outline' style={styles.buttonIcon} />
            </Button>
          </View>

          <View style={styles.buttonWrapper}>
            <Button transparent style={styles.buttonContainer}>
              <Icon name='ios-pricetags-outline' style={styles.buttonIconActive}/>
            </Button>
          </View>

          <View style={styles.buttonWrapper}>
            <Button transparent
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Message', {userID: this.props.userID})}
            >
              <Icon name='ios-chatbubbles-outline' style={styles.buttonIcon} />
            </Button>
          </View>
        </View>

        <MainPage
          host={this.props.screenProps.host}
          userID={this.props.userID}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  buttonWrapper: {
    padding: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonIcon: {
    color: '#1f1f1f',
    fontSize: 35,
  },
  buttonIconActive: {
    color: '#3498db',
    fontSize: 35,
  },
});
