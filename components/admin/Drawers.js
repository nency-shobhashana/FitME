import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ImagePropTypes } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';


import Dashboard from './Dashboard';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import UserInfo from './UserInfo';
import Profile from './Profile';
import AddadminInfo from './AddadminInfo';

const dashboardStack = createStackNavigator({
  Dashboard: Dashboard,
});

const categoryStack = createStackNavigator({
  Categories: CategoryList,
});

const productStack = createStackNavigator({
  Receipes: ProductList,
});

const userInfoStack = createStackNavigator({
  UserInfo: UserInfo,
});

const profileStack = createStackNavigator({
  Profile: Profile,
});

const TabNavigator = createBottomTabNavigator({
  Home: dashboardStack,
  Category: categoryStack,
  Recipe: productStack,
  UserInfo: userInfoStack,
  Me: profileStack,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName == 'Home') 
      {
        iconName = 'home';
      } 
      else if (routeName == 'Category') 
      {
        iconName = 'apps-sharp';
      } 
      else if (routeName == 'Recipe') 
      {
        iconName = 'ios-leaf-sharp';
      } 
      else if (routeName == 'UserInfo') 
      {
        iconName = 'ios-reader';
      } 
      else if (routeName == 'Me') 
      {
        iconName = 'person';
      } 


      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  initialRouteName:'Home',
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: '#848180',
  },
}
);

export default createAppContainer(TabNavigator);
