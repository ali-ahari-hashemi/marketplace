import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem } from "react-native-elements";
import { Container, Button, Icon } from 'native-base';
import MessagePage from '../components/MessagePage';
import { withNavigation } from 'react-navigation';
import SocketIOClient from 'socket.io-client';


class ConversationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      conversations: null
    };
  }

  componentWillMount() {
    this.socket = SocketIOClient(this.props.host);
    this.socket.emit("getConversations", this.props.userID);
    this.socket.on("sendConversations", (data) => {
      this.setState({conversations: data})
      console.log(this.state);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render(){
    if (!this.state.conversations) { return null; }
    return (
      <View style={styles.container}>
        <List>
          <FlatList
            data={this.state.conversations}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MessagePage', {userID: this.props.userID, userID2: item.userID2})}
              >
                <ListItem
                  title={item.username}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.userID2}
          />
        </List>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header: {
    height: 80,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  buttonWrapper: {
    padding: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonIcon: {
    color: '#1f1f1f',
    fontSize: 35,
  },
  buttonIconActive: {
    color: '#3498db',
    fontSize: 35,
  },
});

export default withNavigation(ConversationPage);
