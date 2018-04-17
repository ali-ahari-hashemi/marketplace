import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateBio from './UpdateBio';

export default class ProfilePage extends React.Component {
  render(){
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../Images/profile.png')}
          />
            <Text style={styles.title}> FirstName LastName </Text>

            <View style={styles.forms}>

              <View style={styles.formContainer}>
                <UpdateBio />
              </View>

              <View style={styles.formContainer}>
                <UpdatePasswordForm />
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
  }
});
