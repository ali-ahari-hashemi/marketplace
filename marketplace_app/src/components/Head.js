import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class Head extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.buttonWrapper}>
          <Button transparent style={styles.buttonContainer}>
              <Icon name='ios-contact-outline' style={styles.buttonIcon} />
          </Button>
        </View>

        <View style={styles.buttonWrapper}>
          <Button transparent style={styles.buttonContainer}>
            <Icon name='ios-pricetags-outline' style={styles.buttonIconActive}/>
          </Button>
        </View>

        <View style={styles.buttonWrapper}>
          <Button transparent style={styles.buttonContainer}>
            <Icon name='ios-chatbubbles-outline' style={styles.buttonIcon} />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 75,
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
    color: '#c0392b',
    fontSize: 35,
  },
});
