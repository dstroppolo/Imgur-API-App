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
            <View style={styles.container}>
                <Image source={require('../../assets/images/paws.png')}  style={styles.backgroundImage} />
                <Interface />
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
container: {
     flex: 1,

     backgroundColor: 'skyblue',
},
     backgroundImage:{
        position: 'absolute',
   }
})


export default App;