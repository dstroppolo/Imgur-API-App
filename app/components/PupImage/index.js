import React, { Component } from 'react';
import API_KEY from '../../assets/imgurApiKey';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button
} from 'react-native';

class PupImage extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  };


  render(){
    return(
      <View>
        <Text>{this.props.currentTitle}</Text>
        <Image source={{uri: this.props.currentImage}}
         style={{width: 400, height: 400}} />
      </View>
    );
  }
}



export default PupImage;
