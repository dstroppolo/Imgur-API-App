import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import styles from './Button';

class Button extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableHighlight>
        <Text style={buttonStyles.pupButton}>{this.props.label}</Text>
      </TouchableHighlight>
    );
  }
}

const buttonStyles = StyleSheet.create({
  pupButton: {
    color: 'white',
    fontSize: 30,
    backgroundColor: '#0096f4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'flex-end',

  }

});


export default Button;
