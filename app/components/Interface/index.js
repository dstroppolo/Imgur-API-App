import React, { Component } from 'react';
import API_KEY from '../../assets/imgurApiKey';
import PupImage from '../PupImage';
import Buttons from '../Buttons';
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
    Authorization: 'Client-ID ' + API_KEY,
    Accept: 'application/json'
  }
};

class Interface extends Component {

    constructor(props){
        super(props);
        this.state = {
        currentObjectID: null,
        currentImage: null,
        currentTitle: null,
        currentGalleryID: 0, //current index of the gallery, 0->59
        currentAlbumIndex: 0,
        isAlbum: false,
        size: 1,
        };
    }

  getObjectId = () => {
    let id = this.state.currentGalleryID;
    fetch('https://api.imgur.com/3/gallery/t/doggo', req)
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
      fetch(url + (this.state.isAlbum ? 'gallery/album/' : 'image/') + this.state.currentObjectID, req)
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

    render(){
        return(

            <View>
                <PupImage 
                    currentObjectID= {this.state.currentObjectID}
                    currentImage= {this.state.currentImage}
                    currentTitle= {this.state.currentTitle}
                    currentGalleryID= {this.state.currentGalleryID}
                    currentAlbumIndex= {this.state.currentAlbumIndex}
                    isAlbum= {this.state.isAlbum}
                    size= {this.state.size}
                />
                <Buttons
                    currentGalleryID= {this.state.currentGalleryID}
                    isAlbum= {this.state.isAlbum}
                    size= {this.state.size}
                    onNextAlbum= {this.getObjectId}
                    onNextImage= {this.nextImage}
                 />
            </View>

        )
    }

}

export default Interface;