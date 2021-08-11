import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';


class SplashScreen extends React.Component {

  constructor() 
  {
    super();
  }

  componentDidMount()
  {
      this.setTimer();
  }

  setTimer = () =>
  {
      var self = this;
    setTimeout(function(){self.props.navigation.replace('SignIn')
    }, 6000);
  }

  render()
  {
    return (
    
      <View style={styles.container}>
        <View>
            <Image
                style={{ width: 180, height: 180,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}
                source={require('./splashlogo.png')}
            />
        </View>
      </View>
  );
  }  
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EB6C3E',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default SplashScreen;


