import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config'; 
import axios from "axios";
import { HOST_URL } from '../commonConfig';
import  firebase from 'firebase';


import { StackActions, NavigationActions } from 'react-navigation'; 


class SignUp extends React.Component   {

  constructor() 
  {
    super();
    this.state = { 
      email: '', 
      password: '',
      firstname: '',
      lastname: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => 
  {
    if(this.state.email === '' && this.state.password === '') 
    {
      Alert.alert('Enter details to signup!')
    }
    else
    {
      this.setState({
        isLoading: true,
      })
    }

    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(firebaseApp.auth().currentUser.uid);
        const uid = firebaseApp.auth().currentUser.uid;
       
          axios.post(HOST_URL + "user/register",{
            email: this.state.email,
            password: this.state.password,
            type: "user",
            userid: firebaseApp.auth().currentUser.uid,
          })
          .then(() => {
        alert('User registered successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('UserDetail')
      })
      
    })
      .catch(error =>{
        console.log(error);
      })      
}


googleSignUp = () =>
{
  var provider = new firebase.auth.GoogleAuthProvider();
  firebaseApp.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebaseApp.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    this.props.navigation.navigate('Home')
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


  render()
  {

    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
      <View style={styles.container}>
        
          <View style={styles.header}>
            <Image source={require('../assets/logo.png')}/>
            <Text style={styles.titleText}>
              Create an Account Here!
            </Text>
          </View>


        
          <View style={styles.footer}>

              {/* Email */}

              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Email</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'mail-outline'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} placeholder="Enter your Mail" autoCapitalize='none' value={this.state.email} onChangeText={(val) => this.updateInputVal(val, 'email')}></TextInput>
              </View>

              {/* Password */}

              <Text style={[styles.text_footer, {marginTop: 40}]}>Password</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'lock-outline'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} placeholder="Enter your Password" secureTextEntry={true} value={this.state.password} onChangeText={(val) => this.updateInputVal(val, 'password')}></TextInput>
              </View>

              {/* First name */}

              {/* <Text style={[styles.text_footer, {marginTop: 40}]}>First Name</Text>
              <View style={styles.action}>
                  <AntDesign 
                  name = 'user'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} placeholder="First Name" value={this.state.firstname} onChangeText={(val) => this.updateInputVal(val, 'firstname')}></TextInput>
              </View> */}

              {/* Last name */}

              {/* <Text style={[styles.text_footer, {marginTop: 40}]}>Last Name</Text>
              <View style={styles.action}>
                  <AntDesign 
                  name="user"
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} placeholder="Last Name" value={this.state.lastname} onChangeText={(val) => this.updateInputVal(val, 'lastname')}></TextInput>
              </View> */}

              <View style={styles.signUpbutton}>
                  <TouchableOpacity style={[styles.signUp, {color: 'black'}]} onPress={() => this.registerUser()}>
                      <Text style={styles.signbtnText}>SignUp</Text>
                  </TouchableOpacity>    
              </View>

              <View style={styles.signGoogle}>
                  <TouchableOpacity style={[styles.signUpGoogle, {color: 'black'}]} onPress={() => this.googleSignUp()}>
                      <Text style={styles.signUpGoogleText}>Continue with Google</Text>
                  </TouchableOpacity>    
              </View>

              <View style={styles.signInbutton}>    
                  <Text style={[{textAlign: 'center'}, {marginTop: 5}]} onPress={()=>{this.props.navigation.navigate('SignIn')}}>Login Here!</Text>
              </View>
          </View>
        
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
   justifyContent: 'center',
   alignItems: 'center',
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
    color: '#58514E',
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
    marginTop: 30,
  },

  signGoogle:
  {
    alignItems: 'center',
    marginTop: 30,
  },

  signInbutton:
  {
    alignItems: 'center',
    marginTop: 15,
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

  signUpGoogle:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#BCBBCC'
  },

  signIn:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#75C34D'
    
  },

  signbtnText:
  {
      color: '#fff',
      fontSize: 15,
  },

  signUpGoogleText:
  {
    color: '#0A090B',
    fontSize: 15,
  },


  
});

export default SignUp;


