import React, { Component } from 'react';
import API_KEY from '../../assets/imgurApiKey';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button,
} from 'react-native';

class PupImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      lastPress: 0,
    }
  };

  doubleTap = () => {
    let delta = new Date().getTime() - this.state.lastPress;
    if(delta < 300) {
      this.props.nextImage('gallery');
    }
    this.setState({
      lastPress: new Date().getTime()
    })
  }


  render(){
    return(
      <View>
        {this.props.currentTitle && <View style={styles.titleWrap}>
          <Text style={styles.title}>{this.props.currentTitle}</Text>
        </View>}
        <TouchableHighlight onPress={this.doubleTap} style={{alignItems: 'center'}}>
          <Image 
            source={{uri: this.props.currentImage}}
            style={{width: 400, height: 400}}
          />
        </TouchableHighlight >

      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleWrap: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  

})



export default PupImage;
