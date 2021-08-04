import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig'
import { StackActions, NavigationActions } from 'react-navigation'; 
import {Card} from 'react-native-shadow-cards';


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
      
      <Card style={{width: '100%', height: 40, paddingTop: 10, marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.dateText}>{new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</Text>
      </Card>

      <Card style={{width: '100%', height: 180, paddingTop: 10, marginTop: 10}}>
        <View style={{alignItems: 'center'}}>
            <Text style={styles.bmiText}>Your Current BMI is {this.state.currentBmi}</Text>
        </View>
        
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>

             <Image source={require('../assets/clock.png')}/>

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
      </Card>


      <Text style={[styles.text_section, { margin: 10 }]}>Recipes</Text>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
            <Card style={[styles.cardStyle]}>

                    <View style={{alignItems: 'center', padding: 10}}>
                        <Image source={require('../assets/recipe1.png')}/>
                    </View>

                    <View style={{alignItems: 'center', padding: 10}}>
                        <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>Tacos Dishes</Text> 
                    </View>
            </Card>

            <Card style={[styles.cardStyle]}>
                    <View style={{alignItems: 'center', padding: 10}}>
                        <Image source={require('../assets/recipe2.png')}/>
                    </View>

                    <View style={{alignItems: 'center', padding: 10}}>
                        <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>Salads</Text> 
                    </View>
            </Card>
    </View>

    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
            <Card style={[styles.cardStyle]}>   

                    <View style={{alignItems: 'center', padding: 10}}>
                        <Image source={require('../assets/recipe3.png')}/>
                    </View>

                    <View style={{alignItems: 'center', padding: 10}}>
                        <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>Keto Dishes</Text> 
                    </View>
            </Card>

            <Card style={[styles.cardStyle]}>
                    <View style={{alignItems: 'center', padding: 10}}>
                        <Image source={require('../assets/recipe4.png')}/>
                    </View>

                    <View style={{alignItems: 'center', padding: 10}}>
                        <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>Rice Bowls</Text> 
                    </View>
            </Card>
    </View>


      <Card style={{width: '100%', height: 100, paddingTop: 10, marginTop: 10, backgroundColor: '#ED7A50'}}>
        <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>

            <View style={{alignItems: 'center', padding: 10}}>
                <Image source={require('../assets/book.png')}/>
            </View>

            <View style={{alignItems: 'center', padding: 10}}>
                <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>Learn more about it!</Text> 
            </View>

        </View>
      </Card>

      

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
    padding: 10,
    //paddingTop: 50,
    //backgroundColor: 'red',
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
  },

  profileFooterBtn:
  {
    paddingTop: '50%',
    paddingRight: '75%',
    color: 'red',
    fontSize: 20,
  },

  cardStyle:
  {
    width: '49%', 
    height: 180, 
    marginTop: 10
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


