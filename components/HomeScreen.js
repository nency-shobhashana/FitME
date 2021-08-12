import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ImagePropTypes } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home';
import Plan from './Plan';
import Progress from './Progress';
import Me from './Me';
import About from './aboutDietician';

const PlanStack = createStackNavigator({
    Plan: Plan,
});
const ProgressStack = createStackNavigator({
  Progress: Progress,
});

const ChatStack = createStackNavigator({
    Chat: About,
});

const MeStack = createStackNavigator({
  Me: Me,
});

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Plan: PlanStack,
  Chat: ChatStack,
  Progress: ProgressStack,
  Me: MeStack
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName == 'Home') {
        iconName = 'home';
      } else if (routeName == 'Plan') {
        iconName = 'nutrition';
      } else if (routeName == 'Chat') {
        iconName = 'chatbubble-ellipses-sharp';
    } else if (routeName == 'Progress') {
      iconName = 'bar-chart';
      } else if (routeName == 'Me') {
        iconName = 'person';
      }

      // You can return any component that you like here!
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