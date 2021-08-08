import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

import { StackActions, NavigationActions } from 'react-navigation'; 
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Me extends React.Component   {

  constructor() 
  {
    super();
    this.state = { name: '', date: '', gender: '', height: '', weight: '', bmi: ''};
  }


  fetchData = () =>
  {
    var self = this;
    firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) 
    {
      
        const userId = firebaseApp.auth().currentUser.uid;
        axios.get(HOST_URL + "userInfo/getbmiByUserId?userId=" + userId)
        .then(res => {
            console.log(res.data.date);
            self.setState({ name: res.data.firstname});
            self.setState({ date: res.data.date});
            self.setState({ gender: res.data.gender});
            self.setState({ height: res.data.height});
            self.setState({ weight: res.data.weight});
            self.setState({ bmi: res.data.bmi});
        }).catch(function (error) {
          console.log("error", error);
        })
    }
  });
  }

  componentDidMount() {
    this.fetchData();
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
                  <TextInput style={styles.TextInput} onChangeText={name => this.setState({ name })} value={this.state.name}></TextInput>
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
                  <TextInput style={styles.TextInput} onChangeText={date => this.setState({ date })} value={this.state.date}></TextInput>
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
                  <TextInput style={styles.TextInput} onChangeText={gender => this.setState({ gender })} value={this.state.gender}></TextInput>

              </View>

              <View style ={styles.bottomCardStyle1}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
                  <View style={{alignItems: 'center', padding: 10}}>
                      <FontAwesome5 name="weight" size={30} color="white" />
                  </View>

                  <View style={{alignItems: 'center', padding: 10}}>
                      <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>Your Current height is {this.state.height} m</Text> 
                  </View>
                </View>
              </View>

              <View style ={styles.bottomCardStyle}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
                  <View style={{alignItems: 'center', padding: 10}}>
                    <MaterialCommunityIcons name="human-male-height" size={35} color="#fff" />
                  </View>

                  <View style={{alignItems: 'center', padding: 10}}>
                      <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>Your Current weight is {this.state.weight} kg</Text> 
                  </View>
                </View>
              </View>

              <View style ={styles.bottomCardStyle}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
                  <View style={{alignItems: 'center', padding: 10}}>
                      <FontAwesome5 name="calculator" size={30} color="#fff" />
                  </View>

                  <View style={{alignItems: 'center', padding: 10}}>
                      <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>Your Current BMI is {parseInt(this.state.bmi)}</Text> 
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

  text_footer:
  {
    color: '#ED7A50',
    fontWeight: '700', 
    fontSize: 20,
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

export default Me;

