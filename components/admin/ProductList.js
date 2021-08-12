import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, Button, TouchableOpacity, Dimensions, View, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {HOST_URL} from '../../commonConfig'

export default class Product extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    headerRight: () => (
      <View style={{marginEnd: 20}}>
        <TouchableOpacity style={[styles.signUp]} onPress={()=>{navigation.navigate('adminProduct')}}>
            <Text style={[styles.signbtnText, {textAlign: 'center'}]} >ADD</Text>
        </TouchableOpacity>
      </View>
    ),
  };
};
  
  state = { products: ''}

  initProduct() {
    console.log("initProduct")
    
    axios.get(HOST_URL + 'product')
      .then(res => {
        this.setState({products: res.data})
      });
  }

  componentDidMount(){
    this.initProduct()
    this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
          this.initProduct();
        }
      );
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }


    editProduct(productId){
        this.props.navigation.navigate('adminProduct', {productId})
    }

    deleteProduct(productId){
        axios.delete(HOST_URL + 'product/'+ productId)
        .then(res => {
            this.initProduct()
        }); 
    }
  render() {
    return (
      <View style={styles.container}>
        
        <SafeAreaView>
        <FlatList
          data={this.state.products}
          extraData={this.state}
          renderItem={({item}) => {
            return (
            <TouchableOpacity style={styles.recipeCardStyle} onPress={() => 
            this.props.navigation.navigate('ProductDetail', {productId: item._id})
            }>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
              <Text style={styles.itemText}>{item.name}</Text>
              <TouchableOpacity style={styles.button} onPress={() => this.editProduct( item._id)}>
                    <AntDesign style={styles.rightIcon} name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.deleteProduct( item._id)}>
                    <AntDesign style={styles.rightIcon} name="delete" size={24} color="black" />
                </TouchableOpacity>
            </TouchableOpacity>
          )}}/>
        </SafeAreaView></View>
    )
  }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#FFF',
    flex: 1,
    padding: 20,
    marginBottom: 70,
  },
  titleText:
  {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  signUpbutton:
  {
    alignItems: 'center',
  },
  signUp:
  {
    paddingHorizontal: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#EB6C3E'
  },
  recipeCardStyle:
  {
    display: 'flex',
    flexDirection: 'row',
    // margin: 15,
    padding: 15,
    marginTop: 10,
    backgroundColor: "#fff",
    height: 120,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    elevation: 9,
    shadowRadius: 5,
    alignItems: 'center'
  },
  signbtnText:
  {
    color: '#fff',
    fontSize: 15,
  },
  TextInput:
  {
    borderWidth: 1,
    borderColor: 'grey',
    flex: 1,
    fontSize: 15,
    padding: 15,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    borderColor: '#000',
    // backgroundColor: '#e2ffd4',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowRadius: 6,
    // shadowOpacity: 1,  
  },
  button: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    marginLeft: 10,
    marginTop: 3,
    flexGrow: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    marginLeft: 10,
    flex: 2,
    marginTop: 4,
  },
  imageView: {
    display: 'flex',
    width: 80, 
    height: 80,
    resizeMode: 'cover',
  },
  image: {
    flexGrow: 1,
    resizeMode: 'cover'
  },
  productCount: {
    flexShrink:1,
    marginRight: 20,
  },
  rightIcon:{
    flexShrink:1,
    color: '#EB6C3E',
  }
});