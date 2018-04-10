import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
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
  }

});
