import React, { Component } from 'react';
import Interface from '../Interface';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button
} from 'react-native';

class App extends Component {

    render(){
        return(

            <View>
                <Interface />
            </View>

        )
    }

}

export default App;