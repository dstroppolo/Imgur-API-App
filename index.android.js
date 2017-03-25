/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import App from './app/components/app/';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class NamApp extends Component {

  render() {
    return (
      <View>
        <App />
      </View>
    );
  }
}


AppRegistry.registerComponent('NamApp', () => NamApp);
