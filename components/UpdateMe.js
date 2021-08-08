
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions } from 'react-native';
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class UpdateMe extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = {firstname: '', gender: '', date: '', isLoading: false, error: ''}
  }

  updateData = () =>
  {
      var self = this;
      firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) 
      {
        const userId = firebaseApp.auth().currentUser.uid;
        axios.post(HOST_URL + "userInfo/update?userId=" + userId,
        {
            firstname: self.state.firstname,
            gender: self.state.gender,
            date: self.state.date,
         })
        .then(res => {
          alert("User data updated");
          self.props.navigation.navigate('Me');
         }).catch(function (error) {
        console.log("error", error);
      })  
      }}) 
 }


 componentDidMount() 
{
    this.fetchData();
}

 fetchData = () =>
{
    this.setState({firstname: this.props.navigation.state.params.name})
    this.setState({date: this.props.navigation.state.params.date})
    this.setState({gender: this.props.navigation.state.params.gender})
}
  
  render()
  {

    const { navigate } = this.props.navigation;

    return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>

            
                {/* Name */}
                <Text style={[styles.text_footer, { margin: 10 }, { fontSize: 15 }]}>Name</Text>
                <TextInput style={styles.resultText} onChangeText={firstname => this.setState({ firstname })} value={this.state.firstname} />

                {/* Date of Birth */}
                <Text style={[styles.text_footer, { margin: 10 }, { fontSize: 15 }]}>Date of Birth</Text>
                <TextInput style={styles.resultText} onChangeText={date => this.setState({ date })} value={this.state.date} />

                {/* Gender */}
                <Text style={[styles.text_footer, { margin: 10 }, { fontSize: 15 }]}>Gender</Text>
                <TextInput style={styles.resultText} onChangeText={gender => this.setState({ gender })} value={this.state.gender} />

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
  resultText:
  {
      height: 50,
      borderWidth: 0.5,
      borderRadius: 5,
      padding: 10,
      borderColor: '#393838',
  },
  text_footer:
  {
      fontSize: 10,
  },
  cotent:
  {
      backgroundColor: '#fff',
  },

  submitbutton:
  {
     alignItems: 'center',
     marginTop: '2%',
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

export default UpdateMe;




