import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig'
import { StackActions, NavigationActions } from 'react-navigation'; 
import  firebase from 'firebase';


class SignIn extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = {email: '', password: '',isLoading: false, error: ''}
  }

  signIn = () => 
  {
    console.log("Working");
    const email = this.state.email;
    const password = this.state.password;
    
    firebaseApp.auth().signInWithEmailAndPassword(email, password).then(() =>
    {
      axios.post(HOST_URL + "user/login",{
        email: this.state.email,
        password: this.state.password,
      }).then((res) => {
      
        console.log(res.data);
        if(res.data.userType === "user")
        {
          const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Home" })],
          });
          this.props.navigation.dispatch(navigateAction);
        }
  
        else
        {
          const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Dashboard" })],
          });
          this.props.navigation.dispatch(navigateAction);
        }
      
        this.textInput1.clear()
        this.textInput2.clear()
      }).catch((e) => {
        console.log(e);
        console.log("Not a valid user");
        alert("Not a valid user");
        this.setState({error: 'Authentication failed', isLoading: false})
      })
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
    return (
    <ScrollView>
      <View style={styles.container}>
        
          <View style={styles.header}>
            {/* <Image source={require('../assets/logo.png')}/> */}
            <Image
            style={{ width: 100, height: 100,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}
            source={require('./logo.png')}
          />
            <Text style={styles.titleText}>
              Login Here!
            </Text>
          </View>

          <View style={styles.footer}>

            {/* Email */}

            <Text style={[styles.text_footer, {marginTop: 35}, {paddingTop: 5}]}>Email</Text>
            <View style={styles.action}>
                <MaterialIcons 
                name = 'mail-outline'
                size = {20}
                color = 'grey'
                style = {styles.inputIcon}
                />

        
                <TextInput style={styles.TextInput} placeholder="Enter your Mail" autoCapitalize='none' onChangeText={email => this.setState({email})} ref={input1 => { this.textInput1 = input1 }}></TextInput>
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
                <TextInput style={styles.TextInput} placeholder="Enter your Password" secureTextEntry={true} onChangeText={password => this.setState({password})} ref={input2 => { this.textInput2 = input2 }}></TextInput>
            </View>

            <View style={styles.signUpbutton}>
                <TouchableOpacity style={[styles.signUp, {color: 'black'}]} onPress={() => this.signIn()}>
                     <Text style={styles.signbtnText}>SignIn</Text>
                </TouchableOpacity>    
            </View>

            <View style={styles.signGoogle}>
                  <TouchableOpacity style={[styles.signUpGoogle, {color: 'black'}]} onPress={() => this.googleSignUp()}>
                      <Text style={styles.signUpGoogleText}>Continue with Google</Text>
                  </TouchableOpacity>    
              </View>

            <Text style={[{textAlign: 'center'}, {marginTop: 25}]} onPress={()=>{this.props.navigation.navigate('SignUp')}}>Register Here!</Text>
            <Text style={[{textAlign: 'center'}, {marginTop: 25}]} onPress={()=>{this.props.navigation.navigate('Payment')}}>Subscribe</Text>

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


  
});

export default SignIn;


