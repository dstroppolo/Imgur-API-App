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

class Buttons extends Component {

loadAlbumButtons = () => {
if(this.props.isAlbum && this.props.size > 1)
    return(
    <View style={styles.arrows}>
        <Button title = {'Prev'}  onPress={() => this.props.onNextImage('album')}/>
        <Button title = {'Next'}  onPress={() => this.props.onNextImage('album')}/>
    </View>
    )
}

render(){
    let { currentGalleryID, onNextAlbum, onNextImage } = this.props;
    return(
      <View>
        <View style={styles.loadButton}>
        <Button title = {currentGalleryID == 0 ? "I want pups" : "MORE!!"} onPress={() => onNextImage('gallery')} />
        </View>
        {this.loadAlbumButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrows: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  }

})

export default Buttons;