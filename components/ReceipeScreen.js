import * as React from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SafeAreaView, ScrollView, useWindowDimensions, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import axios from "axios";
import { HOST_URL } from '../commonConfig'
import Receipe from './Receipe';

const PlanRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#FFF'}}>
  	<Text>MealPlan</Text>
  </View>
);

 
export default function dietReceipe(props) {
  
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [bmi, setBmi] = React.useState(-1);
  const [routes] = React.useState([
  { key: 'ReceipeVeg', title: 'Veg' },
  { key: 'ReceipeNonVeg', title: 'NonVeg' },
  { key: 'ReceipeKeto', title: 'Keto' },
  { key: 'ReceipeVegan', title: 'Vegan' },
  ]);
 
  const fetchBmi = () =>
  {
    var self = this;
    firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) 
    {
        const userId = firebaseApp.auth().currentUser.uid;
        axios.get(HOST_URL + "userInfo/getbmiByUserId?userId=" + userId)
        .then(res => {
          setBmi(parseInt(res.data.bmi));
        }).catch(function (error) {
          console.log("error", error);
        })
    } else {
      setBmi(0);
    }
  });
  }

  fetchBmi();

  const renderScene = SceneMap({
    ReceipeVeg: () => <Receipe {...props} receipeType='Veg' bmi={bmi} />,
    ReceipeNonVeg: () => <Receipe {...props} receipeType='NonVeg' bmi={bmi}/>,
    ReceipeKeto: () => <Receipe {...props} receipeType='Keto' bmi={bmi}/>,
    ReceipeVegan: () => <Receipe {...props} receipeType='Vegan' bmi={bmi}/>,
  });
 
  const renderTabBar = props => (
  	<TabBar
     	 {...props}
      	activeColor={'#75C34D'}
      	inactiveColor={'black'}
          style={{backgroundColor:'#FFF', fontWeight: 'bold' }}
  	/>
  );

  if(bmi >= 0){
    return (
      <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
      />
    );
  } else {
    return (<View></View>);
  } 
}
