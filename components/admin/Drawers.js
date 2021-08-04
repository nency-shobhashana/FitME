import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Dashboard from './Dashboard';
import CategoryList from './CategoryList';
import ProductList from './ProductList';

export const Drawers = createDrawerNavigator({
  Dashboard: { screen: Dashboard },
  Category: { screen: CategoryList },
  Product: { screen: ProductList },

}, {
  initialRouteName: 'Dashboard',
  navigationOptions: ({ navigation }) => ({
    initialRouteName: 'MainScreen',
    headerMode: 'screen',
    headerTitle: 'Main Screen Header',
    drawerLabel: 'Main Screen',
  }),
});

// export default function Drawers() {



//   return (
//     <Drawer.Navigator initialRouteName="Dashboard">
//       <Drawer.Screen name="Dashboard" component={Dashboard} />
//       <Drawer.Screen name="Category" component={CategoryList} />
//       <Drawer.Screen name="Product" component={Product} />
//     </Drawer.Navigator>

//   );
// }