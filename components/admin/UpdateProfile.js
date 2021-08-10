
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions } from 'react-native';
import {firebaseApp} from '../../firebase-config';
import axios from "axios";
import { HOST_URL } from '../../commonConfig';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons'; 

class UpdateProfile extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = { firstname: '', specialisation: '', experience: '', education: '', personal: '', contact: '', languages: ''};
  }

  updateData = () =>
  {
      var self = this;
      const userId = firebaseApp.auth().currentUser.uid;
      axios.post(HOST_URL + "dietician/update?userId=" + userId,
      {
          firstname: self.state.firstname,
          specialisation: self.state.specialisation,
          experience: self.state.experience,
          education: self.state.education,
          personal: self.state.personal,
          contact: self.state.contact,
          languages: self.state.languages,
         })
        .then(res => {
          alert("User data updated");
          self.props.navigation.navigate('Profile');
         }).catch(function (error) {
        console.log("error", error);
      })   
  }


 componentDidMount() 
{
    this.fetchData();
}

 fetchData = () =>
{
    this.setState({firstname: this.props.navigation.state.params.firstname})
    this.setState({specialisation: this.props.navigation.state.params.specialisation})
    this.setState({experience: this.props.navigation.state.params.experience})
    this.setState({education: this.props.navigation.state.params.education})
    this.setState({personal: this.props.navigation.state.params.personal})
    this.setState({contact: this.props.navigation.state.params.contact})
    this.setState({languages: this.props.navigation.state.params.languages})

}
  
  render()
  {

    return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>

            
              <Text style={[styles.text_footer, {marginTop: 40}]}>Name</Text>
              <View style={styles.action}>
                  <TextInput style={styles.TextInput} onChangeText={firstname => this.setState({ firstname })} value={this.state.firstname}></TextInput>
              </View>

              <Text style={[styles.text_footer, {marginTop: 40}]}>Specialisation</Text>
              <View style={styles.action}>
                  <TextInput style={styles.TextInput} onChangeText={specialisation => this.setState({ specialisation })} value={this.state.specialisation}></TextInput>
              </View>

              <Text style={[styles.text_footer, {marginTop: 40}]}>Experience</Text>
              <View style={styles.action}>
                  <TextInput style={styles.TextInput} onChangeText={experience => this.setState({ experience })} value={this.state.experience}></TextInput>
              </View>

              <Text style={[styles.text_footer, {marginTop: 40}]}>Education</Text>
              <View style={styles.action}>
                  <TextInput style={styles.TextInput} onChangeText={education => this.setState({ education })} value={this.state.education}></TextInput>
              </View>

              <Text style={[styles.text_footer, {marginTop: 40}]}>Personal Details</Text>
              <View style={styles.action}>
                  <TextInput style={styles.TextInput} onChangeText={personal => this.setState({ personal })} value={this.state.personal}></TextInput>
              </View>

              <Text style={[styles.text_footer, {marginTop: 40}]}>Contact</Text>
              <View style={styles.action}>
                  <TextInput style={styles.TextInput} onChangeText={contact => this.setState({ contact })} value={this.state.contact}></TextInput>
              </View>


              <Text style={[styles.text_footer, {marginTop: 40}]}>Languages Known</Text>
              <View style={styles.action}>
                  <TextInput style={styles.TextInput} onChangeText={languages => this.setState({ languages })} value={this.state.languages}></TextInput>
              </View>

              <View style={styles.submitbutton}>
                 <TouchableOpacity style={[styles.submit, {color: 'black'}]} onPress={() => this.updateData()}>
                    <Text style={styles.submitbtnText}>Update</Text>
                 </TouchableOpacity>    
                </View>
        </View>
      </View>
    </ScrollView>
  );
  }  
}


const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: 
  {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
  },
  content:
  {
      backgroundColor: '#fff',
  },
  text_footer:
  {
    color: '#ED7A50',
    fontWeight: '300', 
    fontSize: 15,
  },

  action:
  {
      //flexDirection: 'row',
      marginTop: 20,
  },

  TextInput:
  {
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    flex: 1,
    fontSize: 15,
    paddingBottom: 6,
  },

  submitbutton:
  {
     alignItems: 'center',
     marginTop: '8%',
  },

  submit:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#EB6C3E'
  },

  submitbtnText:
  {
      color: '#fff',
      fontSize: 15,
  },

});

export default UpdateProfile;




