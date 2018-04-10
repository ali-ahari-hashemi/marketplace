import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  static navigationOptions = { header: null }

  render(){
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../Images/marketplaceLogo.png')}
          />
          <Text style={styles.title}> Welcome to the Marketplace!</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text
                style={styles.buttonText}
                onPress={() => this.props.navigation.navigate('Main')}
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
