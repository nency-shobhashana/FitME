import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {firebaseApp} from '../../firebase-config';
import axios from "axios";
import { HOST_URL } from '../../commonConfig'
import { StackActions, NavigationActions } from 'react-navigation'; 
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat'
import moment from 'moment';

class AdminChat extends React.Component {

  constructor(props){
    super(props);
    this.state = {messages: [], userId: this.props.navigation.getParam('uid')}
  }

  onSend = (newMsg) => {
    console.log(newMsg)
    axios.post(HOST_URL + "chat/admin/add", {
      text: newMsg[0].text,
      userId: this.state.userId
    })
    .then(res => {this.getChat()})
  }

  admin = { _id: 0, name: 'Admin' }

  getChat = () => {
    axios.get(HOST_URL + "chat/" + this.state.userId)
    .then(res => {
      if(res.data == null){
        return
      }
      const data = res.data.messages.map(msg => {
        if(msg.admin){
          return {
            _id: msg.date,
            text: msg.text,
            user: {
              _id: 0,
              name: 'me',
            },
            createdAt: moment(msg.date).toDate(),
          }
        }
        return {
          _id: msg.date,
          text: msg.text,
          user: {
            _id: 2,
            name: 'User',
          },
          createdAt: moment(msg.date).toDate(),
        }
      })
      this.setState({messages: data})
    });
  }

  componentDidMount() {
    this.getChat()
  }

  render()
  {
    if(this.state.userId == undefined){
      return (<View style={styles.container}>
        <Text>Loading</Text>
      </View>)
    }
    return (
    <View style={styles.container}>
      <GiftedChat {...{ onSend: this.onSend, user: this.admin, messages: this.state.messages, inverted: false }} />
    </View>
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

export default AdminChat;


