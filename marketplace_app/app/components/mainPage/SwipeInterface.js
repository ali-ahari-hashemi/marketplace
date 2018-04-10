import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

const cards = [
  {
    itemForSale: 'Unused Iphone X',
    userName: 'alihashemi',
    distance: '.5 Miles'
  },
  {
    itemForSale: 'Skittles',
    userName: 'bobiscool',
    distance: '10 Miles',
  },
];

export default class SwipeInterface extends React.Component {
  constructor(props) {
    super(props);
    this.swipeRight = this.swipeRight.bind(this);
    this.swipeLeft = this.swipeLeft.bind(this);
  }
  swipeRight() {
    // TODO
  }
  swipeLeft() {
    // TODO
  }

  render() {
    return (
      <View style={styles.container}>
        <DeckSwiper
          looping={false}
          onSwipeRight={this.swipeRight}
          onSwipeLeft={this.swipeLeft}
          ref={(c) => this._deckSwiper = c}
          dataSource={cards}
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
                <View style={styles.cardbody}>
                </View>
              </CardItem>
              <CardItem>
                <Text>{item.distance}</Text>
              </CardItem>
            </Card>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardbody: {
    height: 400,
  },
});
