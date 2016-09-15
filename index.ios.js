import React, { Component } from 'react';
  import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  StatusBar,
  View
} from 'react-native';

import Main from './App/Main.js';
window.React = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  }
});


class RekoClient extends Component {
  render() {
    return (
        <NavigatorIOS
          initialRoute={{ title: 'Recko', component: Main }}
          style={styles.container}
        />
    );
  }
}

AppRegistry.registerComponent('RekoClient', () => RekoClient);
