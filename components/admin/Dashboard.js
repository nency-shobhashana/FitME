import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import {firebaseApp} from '../../firebase-config';
import {HOST_URL} from '../../commonConfig';
import axios from 'axios';



class Dashboard extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = {email: '', password: '',isLoading: false, error: '', categoryCount: '', productCount: '', userCount: ''}
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

  componentDidMount(){
    this.initDashboard()
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.initDashboard();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  initDashboard() {
    console.log("initProduct")
    
    axios.get(HOST_URL + 'dashboard')
      .then(res => {
        this.setState(res.data)
      });
  }
  
  render()
  {
    return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Welcome to Home</Text>
        <Text>Category Count: {this.state.categoryCount}</Text>
        <Text>Product Count: {this.state.productCount}</Text>
        <Text>User Count: {this.state.userCount}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Dashboard;


