import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import { StackActions, NavigationActions } from 'react-navigation'; 
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig'

class SignUp extends React.Component   {

  constructor() 
  {
    super();
    this.state = { 
      email: '', 
      password: '',
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
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
          password: '',
          firstname: '',
          lastname: '',
        })
        this.props.navigation.navigate('Login')
      })
      
    })
      .catch(error =>{
        console.log(error);
      })      
}


  render()
  {

    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
      <View style={styles.container}>
        
          <View style={styles.header}>

            <Text style={styles.titleText}>
              Welcome
            </Text>

            <View style={{ display: 'flex', flexDirection: 'row'}}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '90%'}}>
                  {/* <AntDesign name="edit" size={24} color="grey"/> */}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column'}}>
                  <AntDesign name="edit" size={24} color="grey"/>
                </View>
            </View>
           
          </View>


        
          <View style={styles.footer}>

              {/* Name */}

              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Name</Text>
              <View style={styles.action}>
              <AntDesign 
              name="profile" 
              size={20} 
              color="grey" 
              style = {styles.inputIcon}/>
                  <TextInput style={styles.TextInput} value={this.state.email} onChangeText={(val) => this.updateInputVal(val, 'email')}></TextInput>
              </View>

              {/* Date of birth */}

              <Text style={[styles.text_footer, {marginTop: 40}]}>Date of birth</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'date-range'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput}secureTextEntry={true} value={this.state.password} onChangeText={(val) => this.updateInputVal(val, 'password')}></TextInput>
              </View>

              {/*  */}

              <Text style={[styles.text_footer, {marginTop: 40}]}>Gender</Text>
              <View style={styles.action}>
                  <AntDesign 
                  name = 'user'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} value={this.state.firstname} onChangeText={(val) => this.updateInputVal(val, 'firstname')}></TextInput>
              </View>

              <View style ={styles.bottomCardStyle1}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
                  <View style={{alignItems: 'center', padding: 10}}>
                      <Image source={require('../assets/book.png')}/>
                  </View>

                  <View style={{alignItems: 'center', padding: 10}}>
                      <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>Learn more about it!</Text> 
                  </View>
                </View>
              </View>

              <View style ={styles.bottomCardStyle}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
                  <View style={{alignItems: 'center', padding: 10}}>
                      <Image source={require('../assets/book.png')}/>
                  </View>

                  <View style={{alignItems: 'center', padding: 10}}>
                      <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>Learn more about it!</Text> 
                  </View>
                </View>
              </View>

              <View style ={styles.bottomCardStyle}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
                  <View style={{alignItems: 'center', padding: 10}}>
                      <Image source={require('../assets/book.png')}/>
                  </View>

                  <View style={{alignItems: 'center', padding: 10}}>
                      <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>Learn more about it!</Text> 
                  </View>
                </View>
              </View>
          </View>
        
      </View>
      </ScrollView>
  );
  }   
}


const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 50,
  },

  header: {
   flex: 2,
   justifyContent: 'flex-end',
   paddingHorizontal: 20,
   paddingBottom: 20,
  },


  footer:
  {
    flex: 2,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  

  titleText:
  {
    color: '#ED7A50',
    fontSize: 30,
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

  bottomCardStyle1:
  {
    marginTop: 45,
    width: deviceWidth-30,
    backgroundColor: "#ED7A50",
    height: 100,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    elevation: 9,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomCardStyle:
  {
    marginTop: 8,
    width: deviceWidth-30,
    backgroundColor: "#ED7A50",
    height: 100,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    elevation: 9,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },


 

  
});

export default SignUp;

