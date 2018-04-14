import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import consts from '../../constants';
import SocketIOClient from 'socket.io-client';


export default class LoginPage extends React.Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.socket = SocketIOClient(this.props.screenProps.host);
  }

  handleLogin() {
      this.socket.emit("validateLogin", this.state);
      this.socket.on("validUser", (userID) => {
        this.props.navigation.navigate('Main', {userID: userID});
      });
      this.socket.on("invalidUser", () => {
        // TODO
      });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render(){
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../Images/marketplaceLogo.png')}
          />
          <Text style={styles.title}> Welcome to the Marketplace!</Text>
        </View>

        <View style={styles.formContainer}>
          <StatusBar
            barStyle="light-content"
          />

          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder="username"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onSubmitEditing={() => this.passwordInput.focus()}
          />

          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder="password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            secureTextEntry
            ref={(input) => this.passwordInput = input}
            style={styles.input}
            onSubmitEditing={this.handleLogin}
          />

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.handleLogin}
            >
              <Text
                style={styles.buttonText}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
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
    width: 160,
    textAlign: 'center',
    opacity: 5
  },
  logo: {
    width: 120,
    height: 120
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
