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
  Authorization: 'Client-ID ##',
  Accept: 'application/json'
  }
};

class PupImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentObjectID: null,
      currentImage: null,
      currentTitle: null,
      currentGalleryID: 0,
      isAlbum: false,
      currentAlbumIndex: 0,
      size: 1,
    };
  }


  getObjectId = () => {
    let id = this.state.currentGalleryID;
    fetch('https://api.imgur.com/3/gallery/t/keyboard', req)
      .then((response) =>    { return response.json()} )
      .then((res) =>         {

        this.setState({isAlbum: res.data.items[id].is_album});

        if(this.state.isAlbum){
          this.setState({
            currentObjectID: res.data.items[id].id,
            currentTitle: res.data.items[id].title,
            isAlbum: true,
            size: res.data.items[id].images_count 
          })} 

        else { 
            this.setState({
              currentObjectID: res.data.items[id].id,
              currentTitle: res.data.items[id].title,
              isAlbum: false,
            })}
      })
      .then(() =>            {this.getImageId()})
      .catch((error) =>      {console.warn(error);
      });
    }

    getImageId = () => {
      //TODO: add support for gifv videos 
      let url = 'https://api.imgur.com/3/';
      fetch(url + (this.state.isAlbum ? 'gallery/album/' : '/image/') + this.state.currentObjectID, req)
        .then((response) =>    {return response.json()})
        .then((res) =>         {
          if(this.state.isAlbum)
            this.setState({currentImage: res.data.images[this.state.currentAlbumIndex].link})
          else
            this.setState({currentImage: res.data.link})
        })
        .catch((error) =>      {console.warn(error);
        });
    }

    nextImage = (event) => {
      let size = this.state.size;
      let index = this.state.currentAlbumIndex;
      if(event === 'album'){
        if(index < size-1){
          this.incrementAlbumIndex();
          this.getImageId();
        } else {
          this.setState({currentAlbumIndex: 0});
          this.getImageId();
        }
      } else {
        this.setState({currentAlbumIndex: 0});
        this.incrementImage();
        this.getObjectId();
      }
    }

    incrementImage = () => {
      this.setState({currentGalleryID: this.state.currentGalleryID + 1});
    }

    incrementAlbumIndex = (val) => {
      this.setState({currentAlbumIndex: this.state.currentAlbumIndex + 1});
    }

    loadAlbumButtons = () => {
      if(this.state.isAlbum && this.state.size > 1)
        return(
          <View style={styles.arrows}>
            <Button title = {'Prev'}  onPress={() => this.nextImage('album')}/>
            <Button title = {'Next'}  onPress={() => this.nextImage('album')}/>
          </View>
        )
    }

  render(){
    return(
      <View>
        <Text>{this.state.currentTitle}</Text>

        <Image source={{uri: this.state.currentImage}}
         style={{width: 400, height: 400}} />
        <View style={styles.loadButton}>
        <Button title = {this.state.currentGalleryID == 0 ? "I want pups" : "More!!"} onPress={() => this.nextImage('gallery')} />
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


export default PupImage;
