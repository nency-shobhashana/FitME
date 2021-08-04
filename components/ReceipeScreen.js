import * as React from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SafeAreaView, ScrollView, useWindowDimensions, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config'; 
import Receipe from './Receipe';

const PlanRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#FFF'}}>
  	<Text>MealPlan</Text>
  </View>
);

 
export default function dietReceipe(props) {
  
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
  { key: 'ReceipeVeg', title: 'Veg' },
  { key: 'ReceipeNonVeg', title: 'NonVeg' },
  { key: 'ReceipeKeto', title: 'Keto' },
  { key: 'ReceipeVegan', title: 'Vegan' },
  ]);
 
  const renderScene = SceneMap({
    ReceipeVeg: () => <Receipe {...props} receipeType='Veg'/>,
    ReceipeNonVeg: () => <Receipe {...props} receipeType='NonVeg'/>,
    ReceipeKeto: () => <Receipe {...props} receipeType='Keto'/>,
    ReceipeVegan: () => <Receipe {...props} receipeType='Vegan'/>,
  });
 
  const renderTabBar = props => (
  	<TabBar
     	 {...props}
      	activeColor={'#75C34D'}
      	inactiveColor={'black'}
          style={{backgroundColor:'#FFF', fontWeight: 'bold' }}
  	/>
  );

 
  return (
  	<TabView
      	navigationState={{ index, routes }}
      	renderScene={renderScene}
      	renderTabBar={renderTabBar}
      	onIndexChange={setIndex}
      	initialLayout={{ width: layout.width }}
  	/>
  );
}
