import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default class LoginPage extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../Images/marketplaceLogo.png')}
          />
          <Text style={styles.title}> Welcome to the Marketplace!</Text>
        </View>
        <View style={styles.formContainer}>
        </View>
      </View>
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
    width: 100,
    height: 100
  }

});
