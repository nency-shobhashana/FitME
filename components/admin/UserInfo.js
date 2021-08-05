import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import {firebaseApp} from '../../firebase-config';



class UserInfo extends React.Component {

  constructor(props) 
  {
    super(props);
  }
  
  render()
  {
    return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Welcome to UserInfo</Text>
      </View>
    </ScrollView>
  );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserInfo;


