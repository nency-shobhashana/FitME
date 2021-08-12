import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Button, SafeAreaView, Dimensions, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import {HOST_URL} from '../commonConfig'
import {firebaseApp} from '../firebase-config';

class ProductDetail extends React.Component {
  state = { product: null}

  initCategory() {
    console.log("initProducts")

    const productId = this.props.navigation.getParam('productId')
    if(productId != null && productId != undefined && productId != ''){
    let url =HOST_URL + 'product/' + productId
    axios.get(url)
      .then(res => {
        this.setState({product: res.data})
      })
      .catch((error) => console.log('error',error));
    }
  }

  componentDidMount(){
    this.initCategory()
  }

  addTocart(productId)
  {
    
    var self = this;
    // firebaseApp.auth().onAuthStateChanged(function (user) {
      const userId = firebaseApp.auth().currentUser.uid;
      if (userId) {
  
        
        firebaseApp.firestore().collection('cart').doc(userId).get().then(function(doc){
          let items;
          if(doc.exists)
          {
            items = doc.data().items;
            if(Object.keys(items).indexOf(productId) === -1 ){
              items[productId] = 1;
            }else{
              items[productId]++;
            }
          }else{
            // create new cart
             items = {}
             items[productId] = 1;
          } 
          firebaseApp.firestore().collection("cart").doc(userId).set({
            items: items,
            userId:userId
          }).then(() => {
              alert("Item added to cart");
              console.log("Document successfully written!");
            }).catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              // ..
              //window.alert("Error: " + errorMessage);
            });
        })
    
      }
      else {
        alert("You have to sign in to add products");
        self.props.navigation.navigate('SignIn');
      }
    // });
  }

  render() {
    if(this.state.product == null || undefined){
      return (<View/>)
    }
    
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={{position: 'relative'}}>
            <View style={styles.imageView}>
              <Image
                style={styles.image}
                source={{
                  uri: this.state.product.image,
                }}
              /> 
              <View style={styles.imageForground}/>
            </View>
            <View style={{paddingHorizontal: 25, top: -80}}>
              <Text style={styles.itemText}>{this.state.product.name}</Text>
              <View style={styles.itemtitle}>
              </View>
              <Text style={styles.itemtitle}>BMI</Text>
              <Text style={styles.itemDesc}>{this.state.product.bmi}</Text>
              <Text style={styles.itemtitle}>Ingredients</Text>
              <Text style={styles.itemDesc}>{this.state.product.ingredients}</Text>
              <Text style={styles.itemtitle}>How to make it:</Text>
              <Text style={styles.itemDesc}>{this.state.product.details}</Text>
            
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
  imageView: {
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
  itemText: {
    marginBottom: 8,
    fontSize: 30,
    fontWeight: 'bold',
  },
  itemPrice: {
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold',
  },
  itemtitle: {
    marginBottom: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemDesc: {
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#EB6C3E',
    borderWidth: 1,
    backgroundColor: '#EB6C3E',
  },
  textBtn: {
    color: '#FFF',
    fontSize: 17,
  },
});

export default ProductDetail;