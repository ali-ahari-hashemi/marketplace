import React, { Component } from 'react';
import { StyleSheet, View, Text, AppRegistry, TextInput} from 'react-native';

export default class UpdateBio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Update Your Bio Here...' };
  }
   updateText = () => {
      this.setState({myText: 'My Changed Text'})
   }
  render (){
    return (
      <View style={styles.container}>
      <TextInput
        style={{height: 50, borderColor: 'black', borderWidth: 2}}
        onChangeText={(text) => this.setState({text})}
        returnKeyType="done"
        value={this.state.text}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  title: {
    textAlign: 'center',
    paddingBottom: 10
  }
});
