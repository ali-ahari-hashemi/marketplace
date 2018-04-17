import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export default class UpdatePasswordForm extends React.Component {
  render () {
    return (
      <View tyle={styles.container}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
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
