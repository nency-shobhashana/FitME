import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Dashboard from './Dashboard';
// import CategoryList from './CategoryList';
import Category from './Category';
import Product from './Product';

export default function Drawers() {

    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Dashboard">
              <Drawer.Screen name="Dashboard" component={Dashboard} />
              {/* <Drawer.Screen name="CategoryList" component={CategoryList} /> */}
              <Drawer.Screen name="Category" component={Category} />
              <Drawer.Screen name="Product" component={Product} />
            </Drawer.Navigator>
        </NavigationContainer>

    );
}