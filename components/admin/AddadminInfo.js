import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../../firebase-config'; 
import axios from "axios";
import { HOST_URL } from '../../commonConfig';


class AddadminInfo extends React.Component   {

  constructor() 
  {
    super();
    this.state = { 
      firstname: '',
      specialisation: '',
      experience: '',
      education: '',
      personal: '',
      contact: '',
      languages: '',
    }
  }

 

    addData = () =>
    {
      
      axios.post(HOST_URL + "dietician/add", {
        firstname: this.state.firstname,
        specialisation: this.state.specialisation,
        experience: this.state.experience,
        education: this.state.education,
        personal: this.state.personal,
        contact: this.state.contact,
        languages: this.state.languages,
        userId: firebaseApp.auth().currentUser.uid,
      })
      .then(res => {
        alert("User data added succesfully");
      }).catch(error =>{
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
            {/* <Image source={require('../assets/logo.png')}/> */}
          
           
          </View>


        
          <View style={styles.footer}>

              {/* Email */}

              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Firstname</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'mail-outline'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} onChangeText={firstname => this.setState({ firstname })} value={this.state.firstname} ></TextInput>
              </View>



              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Specialisation</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'mail-outline'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} onChangeText={specialisation => this.setState({ specialisation })} value={this.state.specialisation} ></TextInput>
              </View>


              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>experience</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'mail-outline'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} onChangeText={experience => this.setState({ experience })} value={this.state.experience} ></TextInput>
              </View>

              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Educational experience</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'mail-outline'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} onChangeText={education => this.setState({ education })} value={this.state.education} ></TextInput>
              </View>

              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Personal experience</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'mail-outline'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} onChangeText={personal => this.setState({ personal })} value={this.state.personal} ></TextInput>
              </View>

              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Contact details</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'mail-outline'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} onChangeText={contact => this.setState({ contact })} value={this.state.contact} ></TextInput>
              </View>

              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Languages known</Text>
              <View style={styles.action}>
                  <MaterialIcons 
                  name = 'mail-outline'
                  size = {20}
                  color = 'grey'
                  style = {styles.inputIcon}
                  />
                  <TextInput style={styles.TextInput} onChangeText={languages => this.setState({ languages })} value={this.state.languages} ></TextInput>
              </View>


              <View style={styles.signUpbutton}>
                  <TouchableOpacity style={[styles.signUp, {color: 'black'}]} onPress={() => this.addData()}>
                      <Text style={styles.signbtnText}>Add</Text>
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

export default AddadminInfo;


