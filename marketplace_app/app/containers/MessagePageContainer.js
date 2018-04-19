import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container, Button, Icon } from 'native-base';
import MessagePage from '../components/MessagePage';

export default class MessagePageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Container>
        <View style={styles.header}>
          <View style={styles.buttonWrapper}>
            <Button transparent
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Message', {userID: this.props.userID})}
            >
                <Icon name='ios-arrow-dropleft-outline' style={styles.buttonIconActive} />
            </Button>
          </View>
        </View>


        <MessagePage
          host={this.props.screenProps.host}
          userID={this.props.userID}
          userID2={this.props.userID2}
          cardID={this.props.cardID}
          cardname={this.props.cardname}
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
