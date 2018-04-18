import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import consts from '../../constants';
import SocketIOClient from 'socket.io-client';


export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Your Bio Goes Here...',
      user: null
    };
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
          <Image style={styles.logo}/>
          <Text style={styles.title}> FirstName LastName </Text>
          <TextInput style={styles.biobox}
            style={{borderRadius:10, color:'#FFF', backgroundColor: 'rgba(255,255,255,0.7)', fontFamily: 'Helvetica-Light', fontSize: 17, textAlign: 'center', width: 300, height: 85, borderColor: 'powderblue', borderWidth: 1.5}}
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(text) => this.setState({text})}
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

            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}> UPDATE </Text>
              </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#3498db'
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
  formContainer: {
    paddingTop: 30
  },
  title: {
    textAlign: 'center',
    paddingBottom: 20,
    fontFamily: 'Helvetica-Light',
    fontSize: 30
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
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius:10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  buttonWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  }
});
