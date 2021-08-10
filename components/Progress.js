import * as React from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SafeAreaView, ScrollView, FlatList, useWindowDimensions, StyleSheet, Text, TouchableOpacity, Dimensions, View, Image, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import {HOST_URL} from '../commonConfig'
import axios from 'axios';
import moment from 'moment';

class Progress extends React.Component {
 
  state = { bmiList: ''}

  initBmi = () => {
    console.log("initBmi")

    var self = this;
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) 
      {
        const userId = firebaseApp.auth().currentUser.uid;
        axios.get(HOST_URL + "userBmi/getbmiByUserId?userId=" + userId)
          .then(res => {
            self.setState({bmiList: res.data})
          });
      }
    });
  }

  componentDidMount(){
    this.initBmi()
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.initBmi();
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
          data={this.state.bmiList}
          extraData={this.state}
          renderItem={({item}) => (
            <View style={styles.recipeCardStyle}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Weight: </Text>
                  <Text style={styles.text}>{item.weight}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Height: </Text>
                  <Text style={styles.text}>{item.height}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Date: </Text>
                  <Text style={styles.text}>{moment(item.currentDate).format("MMMM Do YYYY")}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemText}>BMI: </Text>
                  <Text style={styles.text}>{parseInt(item.bmi)}</Text>
                </View>
              </View>
          )}/>
        </SafeAreaView>
      </View>
    );
  }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    
  },
  item: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  recipeCardStyle:
  {
    margin: 10,
    marginTop: 8,
    width: deviceWidth -20,
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
  itemText: {
    fontWeight: 'bold',
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
    color: '#75c34d',
  }

});

export default Progress;


