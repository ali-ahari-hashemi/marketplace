import React, { Component } from 'react';
import { StyleSheet, View, Text, AppRegistry, TextInput, KeyboardAvoidingView} from 'react-native';

export default class AddNewItemPage extends React.Component {
  render () {
    return (
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
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            />
          <TextInput
            placeholder="image URL..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="done"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            />


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
});
