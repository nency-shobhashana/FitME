import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Drawers from './components/admin/Drawers';
import adminCategoryList from './components/admin/CategoryList';
import adminCategory from './components/admin/Category';
import adminProductList from './components/admin/ProductList';
import adminProduct from './components/admin/Product';
import UserDetail from './components/UserDetail';
import HomeScreen from './components/HomeScreen';

const Navigator = createStackNavigator({
  
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Home: { screen: Home },
  Dashboard: { screen: Drawers, navigationOptions: {headerShown: false}},
  adminCategoryList: { screen: adminCategoryList },
  adminCategory: { screen: adminCategory },
  adminProductList: { screen: adminProductList },
  adminProduct: { screen: adminProduct },
  UserDetail: { screen: UserDetail},
  HomeScreen: {screen: HomeScreen},
},

{
    // Specifing Initial Screen
    initalRoute: 'SignIn'
}

);

const App = createAppContainer(Navigator);

export default App;