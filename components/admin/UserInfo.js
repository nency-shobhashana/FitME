import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, Button, TouchableOpacity, View, Image, TextInput } from 'react-native';
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
            <TouchableOpacity style={styles.item} 
            // onPress={() => 
            // this.props.navigation.navigate('ProductDetail', {productId: item._id})
            // }
            >
              <Text style={styles.itemText}>{item.firstname}</Text>
              <Text style={styles.itemText}>{item.emailId}</Text>
              <Text style={[styles.itemText, {fontWeight: 'normal'}]}>BMI: {item.bmi}</Text>
              <TouchableOpacity style={styles.button} onPress={() => 
                this.props.navigation.navigate('adminChat', {uid: item.userId})
                }>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
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
  button: {
    padding: 12,
    borderColor: '#000',
    // backgroundColor: '#e2ffd4',
    borderBottomWidth: 1,
    borderRadius: 5,
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


