import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button
} from 'react-native';


const req = {
  Method: 'GET',
  headers: {
  Authorization: 'Client-ID 2430633018d364b',
  Accept: 'application/json'
  }
};

class PupImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      tagArray: [],
      albumIdArray: [],
      albumLinkArray: [],
      imageLink: null,
      tagKey: 0,
      galleryKey: 0,
    };
  }

  loadCurrentTag = () => {
    fetch('https://api.imgur.com/3/gallery/t/pup', req)
      .then((response) => {return response.json()} )
      .then((res) => {this.setState({tagArray: res.data.items})})
      .catch((error) => alert(error)); 
  }

  createAlbumIdArray = () => {
    let t = this.state.tagArray;
    for(let x = 0; x < t.length; x++){
      if(t[x].is_album) 
        this.state.albumIdArray.push(t[x].id)
    }
  }

  createImageLinkArray = () => {
    let id = this.state.albumIdArray;
    for(let x = 0; x < id.length; x++){
      fetch('https://api.imgur.com/3/gallery/album/'+id[x], req)
      .then((response) => {return response.json()} )
      .then((res) => {this.setState({albumLinkArray: res.data.link})})
      .catch((error) => alert(error)); 
    }
    alert(this.state.albumLinkArray[0]);
  }

  getAlbumId = () => {

      return this.state.tagArray[this.state.tagKey].id;

  }

  incrementTagKey = () => {
    this.setState({tagKey: this.state.tagKey + 1});
  }

  decrementTagKey = () => {
    this.setState({tagKey: this.state.tagKey - 1});
  }



  render(){
    return(
      <View style = {styles.container}>
        <View style = {styles.imageWrapper}>
        <Image source = {{uri: this.state.imageLink}} style={{width: 400, height: 400}} />
        </View>
        <View style = {styles.buttonWrapper}>
          <Button style = {styles.button} title = "Next" onPress={this.createImageLinkArray} />
          <Button style = {styles.button} title = "Load" onPress={this.loadCurrentTag} />
          <Button style = {styles.button} title = "Next" onPress={this.createAlbumIdArray} />
        </View>
        <Text>{this.state.tagKey}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  imageWrapper: {
    alignItems: 'center',
  },

  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },


});


export default PupImage;
