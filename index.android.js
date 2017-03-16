/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Button from './app/components/Button';
import PupImage from './app/components/PupImage';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class NamApp extends Component {

  render() {
    return (

        <PupImage />

    );
  }
}

AppRegistry.registerComponent('NamApp', () => NamApp);
