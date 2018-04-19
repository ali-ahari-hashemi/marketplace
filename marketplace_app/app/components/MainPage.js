import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Content, Footer } from 'native-base';
import Head from './Head';
import SocketIOClient from 'socket.io-client';
import { withNavigation } from 'react-navigation';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.swipeRight = this.swipeRight.bind(this);
    this.swipeLeft = this.swipeLeft.bind(this);
    this.state = {
      cards: null,
      currentCard: null,
      DeckSwiper: null,
    }
  }

  swipeRight() {
    this.cardID = this.state.DeckSwiper.wrappedInstance.state.selectedItem.cardID;
    this.userID2 = this.state.DeckSwiper.wrappedInstance.state.selectedItem.userID;
    console.log(this.cardID);
    this.socket.emit("swipe", { userID1: this.props.userID, userID2: this.userID2, cardID: this.cardID, swipeDirection: 1 })
  }
  swipeLeft() {
    // TODO
  }

  componentWillMount() {
    this.socket = SocketIOClient(this.props.host);
    this.socket.emit("getCards", this.props.userID);
    this.socket.on("sendCards", (data) => this.setState({cards: data}));
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    // Wait till received cards
    if (!this.state.cards) {
      return null;
    }

    return (
      <Container>
        <Content contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
              <DeckSwiper
                looping={false}
                ref={(c) => {
                  this._deckSwiper = c;
                  this.state.DeckSwiper = this._deckSwiper;
                }}
                onSwipeRight={this.swipeRight}
                onSwipeLeft={this.swipeLeft}
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
        </Content>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('AddNewItemPage', {userID: this.props.userID})}
          >
            <Text style={styles.buttonText}> ADD NEW ITEM </Text>
          </TouchableOpacity>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    backgroundColor: 'powderblue',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius:10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  buttonWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  }
});

export default withNavigation(MainPage);
