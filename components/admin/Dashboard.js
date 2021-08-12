import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, TextInput } from 'react-native';
import {firebaseApp} from '../../firebase-config';
import {HOST_URL} from '../../commonConfig';
import axios from 'axios';



class Dashboard extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = {email: '', password: '',isLoading: false, error: '', categoryCount: '', productCount: '', userCount: ''}
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
        <Text style={styles.title}>Welcome to Dr. John Mathew </Text>
        <Text style={styles.titlePanel}>(Dietitian panel)</Text>
        
        <View style={styles.recipeCardStyle}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Category Count: </Text>
            <Text style={styles.text}>{this.state.categoryCount}</Text>
          </View>
        </View>
        
        <View style={styles.recipeCardStyle}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Product Count: </Text>
            <Text style={styles.text}>{this.state.productCount}</Text>
          </View>
        </View>
        
        <View style={styles.recipeCardStyle}>
          <View style={styles.item}>
            <Text style={styles.itemText}>User Count: </Text>
            <Text style={styles.text}>{this.state.userCount}</Text>
          </View>
        </View>

        <View style={styles.recipeCardStyle}>
          <View style={styles.item}>
            <Text style={styles.itemText} onPress={()=>{this.props.navigation.navigate('AddQuote')}}>Add Quotes</Text>
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
  title: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EB6C3E'
  },
  titlePanel: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EB6C3E'
  },
  text: {
    color: '#EB6C3E',
    fontWeight: 'bold',
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
  },
  item: {
    padding: 12,
    borderColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  recipeCardStyle:
  {
    margin: 10,
    marginTop: 8,
    width: deviceWidth -20,
    backgroundColor: "#fff",
    // height: 180,
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
  itemText: {
    fontWeight: 'bold',
  },
});

export default Dashboard;


