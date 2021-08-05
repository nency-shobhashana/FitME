import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, TouchableOpacity, View, Image,Dimensions, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig'
import { StackActions, NavigationActions } from 'react-navigation'; 


class Receipe extends React.Component {

  state = { products: "" };

  initCategory() {
    console.log("initProducts");

    const catId = this.props.navigation.getParam("categoryId");
    const searchText = this.props.navigation.getParam("searchText");
    let displayProducts;

    
    let productNames = [];

    let url = HOST_URL + "product";
    if (catId != null && catId != undefined && catId != "") {
      url = url + "?categoryId=" + catId + "&receipeType="+ this.props.receipeType;

      axios.get(url).then((res) => {
        this.setState({ products: res.data });
      });

    }
    else if (searchText != null && searchText != undefined)
    {
      var self = this;
      console.log("search else if **************");
      let searchlist = [];
      let pName;
      let searchtext = searchText.toLowerCase();
     
      axios.get(url).then((res) => {
        res.data.forEach(element => {
          pName = element.name.toLowerCase();
          if (((searchText.toLowerCase()).includes(pName)) || (pName.includes(searchText.toLowerCase()))) {
            console.log(pName, searchText.toLowerCase());
            url = HOST_URL + "product/search?searchText=" + element.name;
            console.log(url);
            axios.get(url).then((res) => {
              searchlist.push(res.data[0]);
            
            });
          }
        });
      }).then(()=>
      {
        self.setState({ products: searchlist });
      });
      
    }

  }

  componentDidMount() {
    this.initCategory();
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
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
        </SafeAreaView>
      </View>
    );
  } 
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
   flex: 1,
   justifyContent: 'flex-end',
   paddingHorizontal: 20,
   paddingBottom: 50,
  },


  footer:
  {
    flex: 3,
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  

  titleText:
  {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },

  action:
  {
      flexDirection: 'row',
      marginTop: 20,
  },

  TextInput:
  {
    paddingLeft: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    flex: 1,
    fontSize: 15,
    paddingBottom: 6,
  },

  inputIcon:
  {
    position: 'absolute',
  },

  signUpbutton:
  {
    alignItems: 'center',
    marginTop: 50,
  },

  signInbutton:
  {
    alignItems: 'center',
    marginTop: 20,
  },

  signUp:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#EB6C3E'
  },

  signIn:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EB6C3E'
    
  },

  signbtnText:
  {
      color: '#fff',
      fontSize: 15,
  },

  signGoogle:
  {
    alignItems: 'center',
    marginTop: 30,
  },

  signUpGoogle:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#BCBBCC'
  },

  signUpGoogleText:
  {
    color: '#0A090B',
    fontSize: 15,
  },

  profileFooterBtn:
  {
    paddingTop: '5%',
    paddingRight: '75%',
    color: 'red',
    fontSize: 20,
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
    width: "46%",
    padding: 10,
    marginVertical: 8,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
  itemText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  itemPrice: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  imageView: {
    display: "flex",
    width: 120,
    height: 120,
    padding: 10,
    borderWidth: 2,
    borderColor: "tomato",
    backgroundColor: "#FFF",
  },
  image: {
    flexGrow: 1,
    resizeMode: "center",
  },
});

export default Receipe;


