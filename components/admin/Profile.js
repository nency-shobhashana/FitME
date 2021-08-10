import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions } from 'react-native';
import {firebaseApp} from '../../firebase-config';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import axios from "axios";
import { HOST_URL } from '../../commonConfig';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Profile extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = { firstname: '', specialisation: '', experience: '', education: '', personal: '', contact: '', languages: ''};
  }

  fetchData = () =>
  {
        var self = this;
        const userId = firebaseApp.auth().currentUser.uid;
        axios.get(HOST_URL + "dietician/getInfobyUserId?userId=" + userId)
        .then(res => {
            self.setState({ firstname: res.data.firstname});
            self.setState({ specialisation: res.data.specialisation});
            self.setState({ experience: res.data.experience});
            self.setState({ education: res.data.education});
            self.setState({ personal: res.data.personal});
            self.setState({ contact: res.data.contact});
            self.setState({ languages: res.data.languages});
        }).catch(function (error) {
          console.log("error", error);
        })
  }
 

  componentDidMount()
  {
      this.props.navigation.addListener('willFocus', () => {
      this.fetchData()
  
    });
  }

  signOutUser = async () => {
    var self = this;
    try {
      await firebaseApp.auth().signOut();
      this.props.navigation.navigate('SignIn')

    } catch (e) {
      console.log(e);
    }
  }
  
  render()
  {

    const { navigate } = this.props.navigation;

    return (
    <ScrollView>
      <View style={styles.container}>
      <View style ={styles.nameCardStyle}>
        <View style={styles.cardContent}>
            <View style={{ display: 'flex', flexDirection: 'row'}}>
              
                <View style={{ display: 'flex', flexDirection: 'column', width: '20%'}}>
                    <FontAwesome name="user-circle-o" size={50} color="grey" />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', width: '70%'}}>
                  <Text style={{ fontWeight: 'bold',fontSize: 23, color: 'blue'}}>{this.state.firstname}</Text>
                  <Text style={{ fontWeight: '400',fontSize: 15, color: '#FFA500'}}>{this.state.contact}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column'}}>
                  <AntDesign name="edit" size={24} color="#EB6C3E" onPress={()=>{this.props.navigation.navigate('UpdateProfile', {firstname: this.state.firstname, specialisation: this.state.specialisation, experience: this.state.experience, education: this.state.education, personal: this.state.personal, contact: this.state.contact, languages: this.state.languages})}}/>
                </View>

            </View>
        </View>
      </View>

      <View style ={styles.contentCardStyle}>
        <View style={styles.cardContent}>
          <View style={{ display: 'flex', flexDirection: 'row'}}>
                <EvilIcons name="check" size={24} color="#EB6C3E" />
                <Text style={styles.cardHeading}>SPECIALISATION</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{this.state.specialisation}</Text> 
          </View>
        </View>          
      </View>

      <View style ={styles.contentCardStyle}>
        <View style={styles.cardContent}>
           <View style={{ display: 'flex', flexDirection: 'row'}}>
                <EvilIcons name="check" size={24} color="#EB6C3E" />
                <Text style={styles.cardHeading}>EXPERIENCE</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{this.state.experience}</Text> 
          </View>
        </View>          
      </View>

      <View style ={styles.contentCardStyle}>
        <View style={styles.cardContent}>
          <View style={{ display: 'flex', flexDirection: 'row'}}>
                <EvilIcons name="check" size={24} color="#EB6C3E" />
                <Text style={styles.cardHeading}>EDUCATION DETAILS</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{this.state.education}</Text> 
          </View>
        </View>          
      </View>

      <View style ={styles.contentCardStyle}>
        <View style={styles.cardContent}>
          <View style={{ display: 'flex', flexDirection: 'row'}}>
                <EvilIcons name="check" size={24} color="#EB6C3E" />
                <Text style={styles.cardHeading}>PERSONAL DETAILS</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{this.state.personal}</Text> 
          </View>
        </View>          
      </View>

      <View style ={styles.contentCardStyle}>
        <View style={styles.cardContent}>
          <View style={{ display: 'flex', flexDirection: 'row'}}>
                <EvilIcons name="check" size={24} color="#EB6C3E" />
                <Text style={styles.cardHeading}>CONTACT DETAILS</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{this.state.contact}</Text> 
          </View>
        </View>          
      </View>

      <View style ={styles.contentCardStyle}>
        <View style={styles.cardContent}>
          <View style={{ display: 'flex', flexDirection: 'row'}}>
                <EvilIcons name="check" size={24} color="#EB6C3E" />
                <Text style={styles.cardHeading}>LANGUAGES KNOWN</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{this.state.languages}</Text> 
          </View>
        </View>          
      </View>

      <View style={styles.profileFooterBtn}>
          <TouchableOpacity style={styles.button} onPress={() => this.signOutUser()}>
            <Text>Logout</Text>
          </TouchableOpacity>
      </View>

      </View>
    </ScrollView>
  );
  }  
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  nameCardStyle:
  {
    marginTop: 10,
    width: deviceWidth-25,
    backgroundColor: "#fff",
    height: 100,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    elevation: 9,
    shadowRadius: 5,
  },

  contentCardStyle:
  {
    marginTop: 10,
    width: deviceWidth-25,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    elevation: 9,
    shadowRadius: 5,
  },

  cardContent:
  {
    margin: 20
  },

  cardHeading:
  {
    fontWeight: '700',
    color: '#EB6C3E'
  },

  carddetails:
  {
    marginTop: 10
  },

  button: {
    margin: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#EB6C3E',
    borderWidth: 1,
    backgroundColor: '#EB6C3E',
    width: deviceWidth-30,
  },

  profileFooterBtn:
  {
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export default Profile;


