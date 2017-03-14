import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

class PupImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentImage: null
    };
  }

  componentWillMount = () => {
    this.loadData();
  }

  loadData = () => {

    req = {
      Method: 'GET',
      headers: {
      Authorization: 'Client-ID 2430633018d364b',
      Accept: 'application/json'
      }
    }

    fetch('https://api.imgur.com/3/gallery/t/pup', req)
      .then((response) =>    {return response.json()})
      .then((res) =>         {return res.data.items[0].cover;})
        .then((id) =>          {return fetch('https://api.imgur.com/3/image/'+id, req)})
        .then((response2) =>   {return response2.json()})
        .then((res2 =>         {this.setState({currentImage: res2.data.link})}))
      .catch((error) => {
        console.warn(error);
      });
    }

  render(){
    return(
      <View>
      <Image source={{uri: this.state.currentImage}}
       style={{width: 400, height: 400}} />
       </View>
    );
  }
}

export default PupImage;
