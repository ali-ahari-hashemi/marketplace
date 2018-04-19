import React, { Component } from 'react';
import { StyleSheet, View, Text, AppRegistry, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Container, Button, Icon, } from 'native-base';
import SocketIOClient from 'socket.io-client';

export default class AddNewItemPage extends React.Component {

  constructor (props) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.socket = SocketIOClient(this.props.screenProps.host);
    this.state = {
      itemName: '',
      price: '',
      imageURL: '',
    }

  }

  handleAddItem () {
    this.socket.emit("addCard", ({userID: this.props.userID, card: this.state}));
    this.props.navigation.navigate('Main', {userID: this.props.userID});
  }

  render () {
    return (
      <Container>
        <View style={styles.header}>
          <View style={styles.buttonWrapper}>
            <Button transparent
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Main', {userID: this.props.userID})}
            >
                <Icon name='ios-arrow-dropleft-outline' style={styles.buttonIconActive} />
            </Button>
          </View>
        </View>

        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Text style={styles.title}> Add New Item to Sell </Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              placeholder="enter item name..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onChangeText={(itemName) => this.setState({ itemName })}
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              />
            <TextInput
              placeholder="how much?"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              keyboardType='numeric'
              onChangeText={(price) => this.setState({ price })}
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              />
            <TextInput
              placeholder="image URL..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="done"
              onChangeText={(imageURL) => this.setState({ imageURL })}
              onSubmitEditing={() => this.handleAddItem()}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              />

              <View style={styles.buttonWrapper2}>
                <TouchableOpacity
                  style={styles.buttonContainer2}
                  onPress={this.handleAddItem}
                >
                  <Text style={styles.buttonText2}> ADD ITEM </Text>
                </TouchableOpacity>
              </View>
          </View>
        </KeyboardAvoidingView>
      </Container>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    fontFamily: 'Helvetica-Light',
    textAlign: 'center',
    opacity: 5,
    fontSize: 25
  },
  formContainer: {
    paddingTop: 30
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    color: '#FFF',
    fontSize: 18,
    paddingHorizontal: 10,
    borderRadius:10
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
  buttonContainer2: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius:10
  },
  buttonText2: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  buttonWrapper2: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  }
});
