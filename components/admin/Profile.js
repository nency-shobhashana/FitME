import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions } from 'react-native';
import {firebaseApp} from '../../firebase-config';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

class Profile extends React.Component {

  constructor(props) 
  {
    super(props);
  }
  
  render()
  {
    return (
    <ScrollView>
      <View style={styles.container}>
      <View style ={styles.nameCardStyle}>
        <View style={styles.cardContent}>
            <View style={{ display: 'flex', flexDirection: 'row'}}>
                <FontAwesome name="user-circle-o" size={50} color="grey" />
               <Text style={{ fontWeight: 'bold',fontSize: 15}}>Doctor Name</Text> 
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
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text> 
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
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</Text> 
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
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</Text> 
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
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</Text> 
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
            <Text>4167892456</Text> 
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
            <Text>English, French</Text> 
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
});

export default Profile;


