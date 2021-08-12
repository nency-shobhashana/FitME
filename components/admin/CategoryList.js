import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, FlatList, StyleSheet, Text, Button, TouchableOpacity, View, Image, Dimensions, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../../firebase-config';
import {HOST_URL} from '../../commonConfig'
export default class Category extends Component {
  
  state = { categories: ''}

  initCategory() {
    console.log("initCategory")
    
    axios.get(HOST_URL + 'category')
      .then(res => {
        this.setState({categories: res.data})
      });
  }

  componentDidMount(){
    this.initCategory()
    this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
          this.initCategory();
        }
      );
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }


    editCategory(categoryId){
        this.props.navigation.navigate('adminCategory', {categoryId})
    }

    deleteCategory(categoryId){
        axios.delete(HOST_URL + 'category/'+ categoryId)
        .then(res => {
            this.initCategory()
        }); 
    }

    signOutUser = async () => 
    {
      var self = this;
      try {
          await firebaseApp.auth().signOut();
          self.props.navigation.navigate('SignIn');
  
      } catch (e) {
          console.log(e);
      }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.signUpbutton}>
            <TouchableOpacity style={[styles.signUp]} onPress={()=>{this.props.navigation.navigate('adminCategory')}}>
                <Text style={[styles.signbtnText, {textAlign: 'center'}]} >Add New Category</Text>
            </TouchableOpacity>
        </View>
        <SafeAreaView>
          <FlatList
          contentContainerStyle={{paddingBottom:20}}
          data={this.state.categories}
          extraData={this.state}
          renderItem={({item}) => (
              <View style={styles.recipeCardStyle}>
                <View style={styles.imageView}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
                <Text style={styles.itemText}>{item.name}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.editCategory( item._id)}>
                    <AntDesign style={styles.rightIcon} name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.deleteCategory( item._id)}>
                    <AntDesign style={styles.rightIcon} name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
          )}/>
        </SafeAreaView>
      </View>
    )
  }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#FFF',
    flex: 1,
    padding: 20,
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
    // marginTop: 15,
  },
  signUp:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#EB6C3E',
    color: '#FFF'
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
    padding: 12,
    borderColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
  imageView: {
    display: 'flex',
    width: 80, 
    height: 80,
    resizeMode: 'cover',
  },
  image: {
    flexGrow: 1,
    resizeMode: 'center'
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