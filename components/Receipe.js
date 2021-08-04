import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig'
import { StackActions, NavigationActions } from 'react-navigation'; 


class Receipe extends React.Component {
  
  render()
  {
    return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Welcome to {this.props.receipeType} Meal Plan</Text>
      </View>
    </ScrollView>
  );
  }  
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 50,
  },

  header: {
   flex: 1,
   justifyContent: 'flex-end',
   paddingHorizontal: 20,
   paddingBottom: 50,
  },


  footer:
  {
    flex: 3,
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  

  titleText:
  {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },

  action:
  {
      flexDirection: 'row',
      marginTop: 20,
  },

  TextInput:
  {
    paddingLeft: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    flex: 1,
    fontSize: 15,
    paddingBottom: 6,
  },

  inputIcon:
  {
    position: 'absolute',
  },

  signUpbutton:
  {
    alignItems: 'center',
    marginTop: 50,
  },

  signInbutton:
  {
    alignItems: 'center',
    marginTop: 20,
  },

  signUp:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#EB6C3E'
  },

  signIn:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EB6C3E'
    
  },

  signbtnText:
  {
      color: '#fff',
      fontSize: 15,
  },

  signGoogle:
  {
    alignItems: 'center',
    marginTop: 30,
  },

  signUpGoogle:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#BCBBCC'
  },

  signUpGoogleText:
  {
    color: '#0A090B',
    fontSize: 15,
  },

  profileFooterBtn:
  {
    paddingTop: '5%',
    paddingRight: '75%',
    color: 'red',
    fontSize: 20,
  },

  button: {
    margin: 12,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#EB6C3E',
    borderWidth: 1,
    backgroundColor: '#EB6C3E',
  }
});

export default Receipe;


