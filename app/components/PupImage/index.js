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
  Authorization: 'Client-ID ###########',
  Accept: 'application/json'
  }
};

class PupImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentAlbumID: null,
      currentImage: null,
      currentTitle: null,
      currentID: 0,
    };
  }


  getAlbumId = () => {
    let id = this.state.currentID;
    fetch('https://api.imgur.com/3/gallery/t/pupper', req)
      .then((response) =>    { return response.json()} )
      .then((res) =>         this.setState({currentAlbumID: res.data.items[id].id, currentTitle: res.data.items[id].title}))
      .then(() =>            this.getImageId())
      .then(()=>             this.incrementImage())
      .catch((error) =>      {console.warn(error);
      });
    }

    getImageId = () => {
      fetch('https://api.imgur.com/3/gallery/album/'+this.state.currentAlbumID, req)
        .then((response) =>    {return response.json()})
        .then((res) =>         this.setState({currentImage: res.data.images[0].link}))
        .catch((error) =>      {console.warn(error);
        });
    }

    incrementImage = () => {
      this.setState({currentID: this.state.currentID + 1});
    }

  render(){
    return(
      <View>
        <Image source={{uri: this.state.currentImage}}
         style={{width: 400, height: 400}} />
       <Button title = {this.state.currentID == 0 ? "I want pups" : "More!!"} onPress={this.getAlbumId} />
      </View>
    );
  }
}


export default PupImage;
