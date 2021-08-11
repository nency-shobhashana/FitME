import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Animated, Easing, TextInput } from 'react-native';


class SplashScreen extends React.Component {

  constructor() 
  {
    super();
    this.state = { spinAnim: new Animated.Value(0) }
  }

  
  componentDidMount()
  {
    Animated.loop(Animated.timing(
        this.state.spinAnim,
      {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )).start();
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

    const spin = this.state.spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      });

    return (
    
      <View style={styles.container}>
        <View style={styles.logo}>
            <Animated.Image
                style={{ width: 180, height: 180,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain', transform: [{rotate: spin}]}}
                source={require('./splashlogo.png')}
            />
            <Image
            style={{ width: 100, height: 100,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}
            source={require('./fitme.png')}
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

  logo:
  {
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default SplashScreen;


