import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground,TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import {firebaseApp} from '../firebase-config';
import { Ionicons } from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation'; 
import axios from "axios";
import { EvilIcons } from '@expo/vector-icons';
import { HOST_URL } from '../commonConfig'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class aboutDietician extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = { firstname: '', specialisation: '', experience: '', education: '', personal: '', contact: '', languages: ''};
  }

  componentDidMount()
  {
      this.fetchData();
  }

  fetchData = () =>
  {
        
        var self = this;
        const userId = "TQXRAxwMg3USBQYlNwBwfUNqDzz1"
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

  render()
  {
    const { navigate } = this.props.navigation;
    return (
        
    
      <View style={styles.container}>
        
        <SafeAreaView>
          <ScrollView contentContainerStyle={{position: 'relative'}}>
            <View style={styles.imageView}>
            <Image
            source={require('./doctor.png')}
          />
              <View style={styles.imageForground}/>
            </View>
            <View style={{paddingHorizontal: 25, top: -80, borderRadius: 20}}>
            <View style={{ display: 'flex', flexDirection: 'row'}}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '70%'}}>
                    <Text style={styles.dietName}>{this.state.firstname}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '30%'}}>
                    <Ionicons name="chatbubble-ellipses" size={28} color="#EB6C3E" onPress={()=>{this.props.navigation.navigate('Message')}} />
                </View> 
            </View>
            <View style={styles.specialisation}>
                <Text style={styles.specialisationText}>{this.state.specialisation}</Text> 
            </View>
            <View>
                <Text style={styles.contactText}>{this.state.contact}</Text>
            </View>
           
            <View style={styles.personal}>
            <Text style={styles.Heading}>About Me</Text>
                <Text style={styles.Detail}>{this.state.personal}</Text>
            </View>

            <View style={styles.personal}>
            <Text style={styles.Heading}>Education</Text>
                <Text style={styles.Detail}>{this.state.education}</Text>
            </View>

            <View style={styles.personal}>
            <Text style={styles.Heading}>Experience</Text>
                <Text style={styles.Detail}>{this.state.experience}</Text>
            </View>

            <View style={styles.languages}>
                <Text style={styles.Heading}>Languages Known</Text>
                <Text style={styles.Detail}>{this.state.languages}</Text>
            </View>
            
            </View>
          </ScrollView>
        </SafeAreaView>
        
      </View>
   
  );
  }  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FFF',
      },
      imageView: 
      {
      },
      image: {
        width:'100%',
        aspectRatio:1,
        resizeMode: 'cover'
      },
      imageForground: {
        position:'relative',
        backgroundColor: '#fff',
        width:'100%',
        height: 50,
        top: -50,
        borderTopStartRadius: 45,
        borderTopEndRadius: 45,
        borderWidth: 1,
        borderColor: "#fff"
      },

  

  titleText:
  {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },

  dietName:
  {
      color: "#2B2828",
      fontSize: 23,
      fontWeight: '600'
  },

  specialisation:
  {
    marginTop: 10
  },

  specialisationText:
  {
    color: '#EB6C3E',
    fontSize: 18,
    fontWeight: '300'
  },
  experienceText:
  {
      color: '#000',
      fontSize: 18,
  },
  personal:
  {
      marginTop: 10
  },

  languages:
  {
      marginTop: 20
  },

  Heading:
  {
      color: 'blue',
      fontSize: 18,
      fontWeight: '300'
  },
  Detail:
  {
    marginTop: 10
  },
  personalDetail:
  {
      marginTop: 10
  },
  contactText:
  {
      color: 'grey',
      marginTop: 4,
      marginBottom: 10
  }
  
  

  
  
});

export default aboutDietician;

