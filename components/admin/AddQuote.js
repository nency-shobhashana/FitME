import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import { HOST_URL } from '../../commonConfig';


class AddQuote extends React.Component   {

  constructor() 
  {
    super();
    this.state = { 
      quotes: ''
    }
  }
    addData = () =>
    {
      
      axios.post(HOST_URL + "quote/add", {
        quotes: this.state.quotes,
      })
      .then(res => {
        this.setState({
          quotes: ''
        })
        alert("Data added succesfully");
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
      
          </View>

          <View style={styles.footer}>

              <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Enter the quote</Text>
              <View style={styles.action}>
                  <TextInput style={styles.TextInput} onChangeText={quotes => this.setState({ quotes })} value={this.state.quotes} ></TextInput>
              </View>


              <View style={styles.signUpbutton}>
                  <TouchableOpacity style={[styles.signUp, {color: 'black'}]} onPress={() => this.addData()}>
                      <Text style={styles.signbtnText}>Add</Text>
                  </TouchableOpacity>    
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

export default AddQuote;


