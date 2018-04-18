import React, { Component } from 'react';
import { StyleSheet, View, Text, AppRegistry, TextInput, TouchableOpacity} from 'react-native';

export default class SignUpPage extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}> Sign Up!</Text>
        </View>


        <View style={styles.formContainer}>
            <TextInput
              placeholder="username"
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
                <Text style={styles.buttonText}> SIGN UP </Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 70,
    fontFamily: 'Helvetica-Light',
    fontSize: 40,
    textAlign: 'center',
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
  buttonWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  }
});
