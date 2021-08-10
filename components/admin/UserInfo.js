import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, Button, TouchableOpacity, View, Dimensions, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {HOST_URL} from '../../commonConfig'
class UserInfo extends React.Component {
  state = { users: ''}

  initUsers() {
    console.log("initUsers")
    
    axios.get(HOST_URL + 'userInfo')
      .then(res => {
        this.setState({users: res.data})
      });
  }

  componentDidMount(){
    this.initUsers()
    this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
          this.initUsers();
        }
      );
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
        <FlatList
          data={this.state.users}
          extraData={this.state}
          renderItem={({item}) => {
            return (
            <TouchableOpacity style={styles.recipeCardStyle} 
            // onPress={() => 
            // this.props.navigation.navigate('ProductDetail', {productId: item._id})
            // }
            >
              <Text style={styles.itemText}>{item.firstname}</Text>
              {/* <Text style={styles.itemText}>{item.emailId}</Text> */}
              <Text style={[styles.itemText, {fontWeight: 'normal'}]}>BMI: {parseInt(item.bmi)}</Text>
              <TouchableOpacity style={styles.button} onPress={() => 
                this.props.navigation.navigate('adminChat', {uid: item.userId})
                }>
                  <AntDesign style={styles.rightIcon} name="wechat" size={24} color="black" />
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.button} onPress={() => this.deleteProduct( item._id)}>
                  <AntDesign style={styles.rightIcon} name="delete" size={24} color="black" />
              </TouchableOpacity> */}
            </TouchableOpacity>
          )}}/>
        </SafeAreaView></View>
    )
  }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
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
    marginTop: 30,
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
    flexDirection: 'column',
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
  recipeCardStyle:
  {
    margin: 15,
    marginTop: 10,
    width: deviceWidth -30,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
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
    padding: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'tomato',
    backgroundColor: '#FFF',
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

export default UserInfo;


