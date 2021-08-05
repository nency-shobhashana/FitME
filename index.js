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
import adminUserInfo from './components/admin/UserInfo';
import adminProfile from './components/admin/Profile';
import UserDetail from './components/UserDetail';
import HomeScreen from './components/HomeScreen';
import Chat from './components/Chat';
import Progress from './components/Progress';
import Plan from './components/Plan';
import Me from './components/Me';
import ReceipeScreen from './components/ReceipeScreen';
import ProductDetail from './components/ProductDetail';
import Bmi from './components/Bmi';


const Navigator = createStackNavigator({
  
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Home: { screen: HomeScreen, navigationOptions: {headerShown: false}  },
  Bmi : { screen: Bmi},
  Dashboard: { screen: Drawers, navigationOptions: {headerShown: false}},
  adminCategoryList: { screen: adminCategoryList },
  adminCategory: { screen: adminCategory },
  adminProductList: { screen: adminProductList },
  adminProduct: { screen: adminProduct },
  adminUserInfo: { screen: adminUserInfo },
  adminProfile: {screen: adminProfile},
  UserDetail: { screen: UserDetail},
  Chat: { screen: Chat},
  Progress: { screen: Progress},
  Plan: { screen: Plan},
  Me: { screen: Me},
  ReceipeScreen: { screen: ReceipeScreen},
  ProductDetail: { screen: ProductDetail },
},

{
    // Specifing Initial Screen
    initalRoute: 'SignIn'
}

);

const App = createAppContainer(Navigator);

export default App;