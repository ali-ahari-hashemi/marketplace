import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import consts from '../../constants';
import SocketIOClient from 'socket.io-client';


export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  
  componentWillMount() {
    this.socket = SocketIOClient(this.props.host);
    this.socket.emit("getUser", this.props.userID);
    this.socket.on("sendUser", (data) => this.setState({user: data}));
  }
  
  componentWillUnmount() {
    this.socket.disconnect();
  }
  
  render(){
    // Wait till received user info
    if (!this.state.user) { return null; }
    
    return (  
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
          />
            <Text style={styles.title}> FirstName LastName </Text>
            <View style={styles.forms}>
              <View style={styles.formContainer}>
                <TextInput
                  style={{height: 50, borderColor: 'black', borderWidth: 2}}
                  onChangeText={(text) => this.setState({text})}
                  returnKeyType="done"
                  value={this.state.text}
                />
              </View>
              <View style={styles.formContainer}>
              <Text style={styles.title}> Update Password </Text>
                <TextInput
                  placeholder="current password"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  />
                <TextInput
                  placeholder="new password"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput2.focus()}
                  secureTextEntry
                  style={styles.input}
                  ref={(input) => this.passwordInput = input}
                  />
                <TextInput
                  placeholder="confirm new password"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="done"
                  secureTextEntry
                  style={styles.input}
                  ref={(input) => this.passwordInput2 = input}
                  />

                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.buttonText}> UPDATE </Text>
                </TouchableOpacity>

              </View>
            </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f5deb3'
  },
  title: {
    marginTop: 70,
    fontFamily: 'AvenirNext-Heavy',
    fontSize: 20
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    paddingTop: 50

  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  title: {
    marginTop: 10,
    width: 160,
  },
  formContainer: {
    paddingTop: 30
  },
  title: {
    textAlign: 'center',
    paddingBottom: 20,
    fontFamily: 'AvenirNext-Heavy',
    fontSize: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: 'black',
    paddingHorizontal: 10
  },
  buttonContainer: {
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '700'
  }
});
