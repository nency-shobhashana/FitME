import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions,FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig'
import { StackActions, NavigationActions } from 'react-navigation';
import moment from 'moment'; 

class Home extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state = {currentBmi: '',isLoading: false, products: [], error: '', quote: ''}
    global.recipes = [];
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
            self.setState({ currentBmi: parseInt(res.data.bmi)});
        }).catch(function (error) {
          console.log("error", error);
        })
    }
  });
  }


  fetchRecipe = () =>
  {
    var self = this;
    let url = HOST_URL + "product/randomRecipe";
    axios.get(url).then((res) => {
        self.setState({ products: res.data });
      });
  }

  fetchQuote = () =>
  {
    axios.get(HOST_URL + "quote/randomQuote").then((res) =>
    {
        this.setState({ quote: res.data.quotes})
    })
  }

  componentDidMount()
{
    this.fetchRecipe();
    this.props.navigation.addListener('willFocus', () => {
    this.fetchBmi();
    this.fetchQuote();
  });
  
}

  render()
  {
    var currentDate = new Date();
    
    return (
    <ScrollView>
      <View style={styles.container}>
      
      <View style ={styles.topCardStyle}>
          <Text style={styles.dateText}>{moment(currentDate).format("MMMM Do YYYY")}</Text>
      </View>

      <View style ={styles.bmiCardStyle}>
          <View style={{alignItems: 'center'}}>
             <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 5}}>

               <View style={{ display: 'flex', flexDirection: 'column', width: '20%'}}>
                  <Image
                    style={{ width: 50, height: 50,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain', padding: 5}}
                    source={require('./clock.png')}
                    />
               </View>

               <View style={{ display: 'flex', flexDirection: 'column', width: '60%', alignItems: 'center', backgroundColor: 'white'}}>
                  <Text style={styles.bmiText}>Your Current BMI is {this.state.currentBmi}</Text>
               </View>

               <View style={{ display: 'flex', flexDirection: 'column', width: '20%'}}>
                  
               </View>

              </View>
            </View>
            
          
            <View style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <View style={{alignItems: 'center', padding: 10, flexWrap: 'wrap'}}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 15, alignItems: 'center', flexWrap: 'wrap', textAlign: 'center', backgroundColor: 'light-grey'}}>"{this.state.quote}"</Text> 
                </View>
            </View>
            
            <View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
                <TouchableOpacity style={styles.roundButton1} onPress={()=>{this.props.navigation.navigate('Bmi')}}>
                    <Text style={styles.roundBtnText}>+</Text>
                </TouchableOpacity>
            </View>


      </View>

      {/* *********************************************** */}

      <Text style={[styles.text_section, { margin: 10 }]}>Recipes</Text>

      <FlatList
            // columnWrapperStyle={{ justifyContent: "space-evenly" }}
            data={this.state.products}
            numColumns={2}
            extraData={this.state}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.recipeCardStyle}
                  onPress={() =>
                    this.props.navigation.navigate("ProductDetail", {
                      productId: item._id,
                    })
                  }
                >
                  <View style={styles.imageView}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.image,
                      }}
                    />
                  </View>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />

       
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
    fontSize: 18,  
    color: '#EB6C3E',
    margin: 2,
    fontWeight: '700'
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
    // height: 200,
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
    marginBottom: 10,
  },

  roundBtnText:
  {
    color: '#fff',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    // borderColor: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowRadius: 6,
    // shadowOpacity: 1,  
  },
  itemText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },

  imageView: {
    display: "flex",
    width: 80,
    height: 80,
  },
  image: {
    flexGrow: 1,
    resizeMode: "center",
  },



});

export default Home;
