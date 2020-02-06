import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/AppContainer';
import * as Font from 'expo-font';
import firebase from 'firebase';
import { firebaseConfig } from './src/Configurations/config';


firebase.initializeApp(firebaseConfig)
export default class App extends React.Component {
  state={
    fontLoaded:false
  }
  componentDidMount() {
    console.disableYellowBox = true
    Font.loadAsync({
        'open-sans-bold': require('./assets/fonts/Lato-Medium.ttf'),
        'open-sans-simple': require('./assets/fonts/Lato-Light.ttf')

    }).then(()=>{
    this.setState({ fontLoaded: true });
      
    })
}
  render() {
    return (
    this.state.fontLoaded &&  <AppContainer />
    ) ;
  }
}
