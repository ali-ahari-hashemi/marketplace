import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import Head from './Head';
import SocketIOClient from 'socket.io-client';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.swipeRight = this.swipeRight.bind(this);
    this.swipeLeft = this.swipeLeft.bind(this);
    this.state = {
      cards: null,
    }
  }

  swipeRight() {
    // TODO
  }
  swipeLeft() {
    // TODO
  }

  componentWillMount() {
    this.socket = SocketIOClient(this.props.host);
    this.socket.emit("getCards", this.props.userID);
    this.socket.on("sendCards", (data) => this.setState({cards: data}));
  }

  render() {
    // Wait till received cards
    if (!this.state.cards) {
      return null;
    }

    return (
      <View style={styles.container}>
        <DeckSwiper
          looping={false}
          onSwipeRight={this.swipeRight}
          onSwipeLeft={this.swipeLeft}
          ref={(c) => this._deckSwiper = c}
          dataSource={this.state.cards}
          renderEmpty={() =>
            <View style={{ alignSelf: "center" }}>
              <Text>No More Items Near You</Text>
            </View>
          }
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{item.itemForSale}</Text>
                    <Text note>{item.userName}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                  <Image style={{ height:500, flex:1 }} source={{uri: item.imageURL}} />
              </CardItem>
              <CardItem>
                <View style={styles.cardFooter}>
                  <Text>{item.distance}</Text>
                  <Text>{item.price}</Text>
                </View>
              </CardItem>
            </Card>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
