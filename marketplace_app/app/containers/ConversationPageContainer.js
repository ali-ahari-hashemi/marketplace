import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, Icon, Content } from 'native-base';
import ConversationPage from '../components/ConversationPage';

export default class ConversationPageContainer extends React.Component {
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
              onPress={() => this.props.navigation.navigate('User', {userID: this.props.userID})}
            >
                <Icon name='ios-contact-outline' style={styles.buttonIcon} />
            </Button>
          </View>

          <View style={styles.buttonWrapper}>
            <Button transparent
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Main', {userID: this.props.userID})}
            >
              <Icon name='ios-pricetags-outline' style={styles.buttonIcon}/>
            </Button>
          </View>

          <View style={styles.buttonWrapper}>
            <Button transparent style={styles.buttonContainer}>
              <Icon name='ios-chatbubbles-outline' style={styles.buttonIconActive} />
            </Button>
          </View>
        </View>

        <Content contentContainerStyle={{flexGrow: 1}}>
          <ConversationPage
            host={this.props.screenProps.host}
            userID={this.props.userID}
          />
        </Content>
        
      </Container>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
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
