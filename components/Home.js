import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig'
import { StackActions, NavigationActions } from 'react-navigation'; 

class Home extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = {currentBmi: '',isLoading: false, products: "", error: ''}
  }

  signOutUser = async () => {
    var self = this;
    try {
      await firebaseApp.auth().signOut();

      const navigateAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
      });
      self.props.navigation.dispatch(navigateAction);

    } catch (e) {
      console.log(e);
    }
  }

  fetchBmi = () =>
  {
    var self = this;
    firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) 
    {
      
        const userId = firebaseApp.auth().currentUser.uid;
        axios.get(HOST_URL + "userInfo/getbmiByUserId?userId=" + userId)
        .then(res => {
            self.setState({ currentBmi: parseInt(res.data.bmi) });
        }).catch(function (error) {
          console.log("error", error);
        })
    }
  });

  }

  fetchRecipe = () =>
  {
    let url = HOST_URL + "product";
    axios.get(url).then((res) => {
        this.setState({ products: res.data });
      });
  }

  componentDidMount() 
  {
    this.fetchBmi();
    this.fetchRecipe();
  }

  render()
  {
    return (
    <ScrollView>
      <View style={styles.container}>
      
      <View style ={styles.topCardStyle}>
          <Text style={styles.dateText}>{new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</Text>
      </View>

      <View style ={styles.bmiCardStyle}>
          <View style={{alignItems: 'center'}}>
                <Text style={styles.bmiText}>Your Current BMI is {this.state.currentBmi}</Text>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>

                <Image
                style={{ width: 50, height: 50,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}
                source={require('./clock.png')}
                />

                <View style={{alignItems: 'center', padding: 10}}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 15}}>“The Groundwork 
                    for all Happiness” </Text> 
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.roundButton1}>
                    <Text style={styles.roundBtnText}>+</Text>
                </TouchableOpacity>
            </View>
      </View>

      <Text style={[styles.text_section, { margin: 10 }]}>Recipes</Text>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>

          <View style ={styles.recipeCardStyle}>
              <View style={{alignItems: 'center', padding: 10}}>
              <Image
                style={{ width: 155, height: 116,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}
                source={require('./recipe1.png')}
                />
              </View>

              <View style={{alignItems: 'center', padding: 10}}>
                  <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>Tacos Dishes</Text> 
              </View>
          </View>


          <View style ={styles.recipeCardStyle}>
              <View style={{alignItems: 'center', padding: 10}}>
                <Image
                  style={{ width: 155, height: 116,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}
                  source={require('./recipe2.png')}
                  />
              </View>

              <View style={{alignItems: 'center', padding: 10}}>
                    <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>Salads</Text> 
              </View>
          </View>

      </View>


      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>

          <View style ={styles.recipeCardStyle}>
              <View style={{alignItems: 'center', padding: 10}}>
                <Image
                  style={{ width: 155, height: 116,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}
                  source={require('./recipe3.png')}
                  />
              </View>

              <View style={{alignItems: 'center', padding: 10}}>
                  <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>Keto Dishes</Text> 
              </View>
          </View>


          <View style ={styles.recipeCardStyle}>
              <View style={{alignItems: 'center', padding: 10}}>
                <Image
                  style={{ width: 155, height: 116,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}
                  source={require('./recipe4.png')}
                  />
              </View>

              <View style={{alignItems: 'center', padding: 10}}>
                    <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>Rice Bowls</Text> 
              </View>
          </View>
      </View>

       
      <View style ={styles.bottomCardStyle}>
        <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
          <View style={{alignItems: 'center', padding: 10}}>
              <Image source={require('../assets/book.png')}/>
          </View>

          <View style={{alignItems: 'center', padding: 10}}>
              <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>Learn more about it!</Text> 
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
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
  },

  dateText:
  {
    fontSize: 16,  
    color: '#EB6C3E',
  },

  text_section:
  {
      color: '#524D4C',
      fontWeight: 'bold',
      fontSize: 24,
      marginTop: 20,
  },

  bmiText:
  {
    fontSize: 16,  
    color: '#EB6C3E',
    margin: 8,
  },

  profileFooterBtn:
  {
    paddingTop: '50%',
    paddingRight: '75%',
    color: 'red',
    fontSize: 20,
  },

  topCardStyle:
  {
    marginTop: 30,
    width: deviceWidth-25,
    backgroundColor: "#fff",
    height: 40,
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

  bmiCardStyle:
  {
    marginTop: 8,
    width: deviceWidth-25,
    backgroundColor: "#fff",
    height: 200,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    elevation: 9,
    shadowRadius: 5
  },

  recipeCardStyle:
  {
    margin: 5,
    marginTop: 8,
    width: ((deviceWidth-25)/2)-10,
    backgroundColor: "#fff",
    height: 180,
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
    width: deviceWidth-25,
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

  roundButton1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#F19C7D',
    
  },

  roundBtnText:
  {
    color: '#fff',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }



});

export default Home;
